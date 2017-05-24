function paginationObject() {

    var page = 0;
    var pageCount = -1;
    var countPerPage = 10;
    var totalCount = -1;
    var selectElement;

    var configuration = {
        _containerClass: 'pagi-cont',
        _itemClass: 'pagi-item',
        containerElement: 'ul',
        itemElement: 'li',
        hideInMiddle:  true,
        itemsPerPage: countPerPage,
    };

    var events = {
        'onPageChange': [],
    }

    function total(val) {
        if (!val) {
            totalCount = val;
        }
        pageCount = Math.ceil(val/countPerPage);
        return totalCount;
    }

    function nextPage(by) {
        var npage = page;
        if ((npage + by) >= pageCount) {
            npage = pageCount - 1;
        } else {
            npage += by
        }
        selectPage(npage);
    }

    function prevPage(by) {
        var npage = page;
        if ((npage - by) < 0) {
            npage = 0;
        } else {
            npage -= by;
        }
        selectPage(npage);
    }

    function firstPage() {
        selectPage(0);
    }

    function lastPage() {
        selectPage(pageCount - 1);
    }

    function selectPage(pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        if (pageNumber > -1) {
            page = pageNumber
        }
        if (selectElement) {
            selectElement.value = pageNumber;
        }
        fireEvent('onPageChange');
    }

    function getCurrentPage() {
        return page;
    }

    function itemsPerPage() {
        return configuration.itemsPerPage;
    }

    function onPageChange(callback) {
        events['onPageChange'].push(callback);
    }

    function fireEvent(eventName) {
        events[eventName].map(function(callback) {
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    function createAnchor(text, callbackOnClick) {
        var li = jshp.create('li'),
            a = jshp.create('a');
        jshp.addClass(li, configuration._itemClass);
        jshp.attr(a, 'href', '#');
        jshp.text(a, text);
        jshp.append(a, li);
        jshp.on(a, 'click', callbackOnClick);
        return li;
    }

    function createSelect() {
        var li = jshp.create('li');
        jshp.addClass(li, configuration._itemClass);
        selectElement = jshp.create('select');
        jshp.attr(selectElement, 'name', 'pageNumber');
        jshp.on(selectElement, 'change', function(event) {
            event.preventDefault();
            selectPage(event.target.value);
        });
        Array.apply(null, Array(pageCount)).map(function(_, idx) {
            var optionElement = jshp.create('option');
            jshp.attr(optionElement, 'value', idx);
            jshp.text(optionElement, idx+1);
            jshp.append(optionElement, selectElement);
        });
        jshp.append(selectElement, li);
        return li;
    }

    function render(target) {
        var container = jshp.create(configuration.containerElement);
        jshp.addClass(container, configuration._containerClass);
        var firstPageItem = createAnchor('<<', function(event) {
            event.preventDefault();
            firstPage();
        });
        var lastPageItem = createAnchor('>>', function(event) {
            event.preventDefault();
            lastPage();
        });
        var prevPageItem = createAnchor('<', function(event) {
            event.preventDefault();
            prevPage(1);
        });
        var nextPageItem = createAnchor('>', function(event) {
            event.preventDefault();
            nextPage(1);
        });
        var selectElementItem = createSelect();
        //
        jshp.append(firstPageItem, container);
        jshp.append(prevPageItem, container);
        //
        jshp.append(selectElementItem, container);
        //
        jshp.append(nextPageItem, container);
        jshp.append(lastPageItem, container);
        //
        jshp.append(container, target);
    }

    return {
        total: total,
        current: getCurrentPage,
        itemsPerPage: itemsPerPage,
        next: nextPage,
        prev: prevPage,
        select: selectPage,
        render: render,
        onPageChange: onPageChange,
    }
}

function tableObject(element, config) {
    var data = [];
    var cfg = null;
    var tfoot = jshp.get('tfoot td')[0];

    var po = paginationObject();

    po.onPageChange(function() {
        var t = jshp.get('.table-body')[0];
        jshp.empty(t);
        var sliceStart = po.current() * po.itemsPerPage();
        var sliceEnd = sliceStart + po.itemsPerPage();
        data.slice(sliceStart, sliceEnd).map(function (item) {
            insertRow(item, t);
        });
    });

    function init() {
        cfg = config;
        jshp.empty(element);
        var tr = jshp.create('tr');
        cfg.map(function(column) {
            var th = jshp.create('th');
            jshp.text(th, column.title);
            jshp.append(th, tr);
        });
        jshp.addClass(tr, 'table-head');
        jshp.append(tr, element);
    }

    init();

    function insertRow(item, element) {
        var tr = jshp.create('tr');
        for (var i=0; i<cfg.length; i++) {
            var td = jshp.create('td');
            jshp.text(td, getProp(item, cfg[i].target))
            if (cfg[i].className) {
              jshp.addClass(td, cfg[i].className)
            }
            for (var attr in cfg[i].attrs) {
                var attrValue = getProp(item, cfg[i].attrs[attr]);
                jshp.setAttr(td, attr, attrValue);
            }
            jshp.append(td, tr);
        }
        jshp.append(tr, element);
    }

    function getProp(obj, path) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : undefined;
        }, obj);
    }

    function updateTable(newData, element) {
        data = newData;
        //reset
        jshp.empty(element);
        po.select(0);
        // set
        po.total(data.length);
        // update
        po.render(tfoot);
    }

    function filterData(data, query, fields = []) {
        return data.filter(function (item) {
            return item['firstName'].toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
    }

    function sortData(data, field) {
        return data.sort(function (a, b) {
            if (a[field] > b[field]) {
                return 1;
            }
            if (a[field] < b[field]) {
                return -1;
            }
            return 0;
        });
    }

    return {
        updateTable: updateTable
    }
}

function errorHandler(error) {
    console.log(error);
}

jshp.ready(function () {
    var bounce = null;

    var table = jshp.get('.table')[0];
    var tableHeader = jshp.findChildren(table, 'thead')[0];
    var tableBody = jshp.findChildren(table, '.table-body')[0];
    var tableConfig = [
        {
            title: '#',
            type: 'number',
            sortable: true,
            target: 'id',
            className: 'bold',
        }, {
            title: 'Departure city',
            type: 'object',
            target: 'departure.city',
            className: 'departure',
            attrs: {id: 'departure.id'},
        }, {
            title: 'Departure time',
            type: 'object',
            target: 'departure.time',
        }, {
            title: 'Arrival city',
            type: 'object',
            target: 'arrival.city',
            className: 'arrival',
            attrs: {id: 'arrival.id'},
        }, {
            title: 'Arrival time',
            type: 'object',
            target: 'arrival.time',
        }, {
            title: 'Airline',
            type: 'object',
            target: 'airline.name'
      }
    ];

    var to = tableObject(tableHeader, tableConfig);

    jshp.ajaxGet({
        url: '//localhost:3000/flights'
    }, function (data) {
      to.updateTable(JSON.parse(data), tableBody);
      var elems = jshp.get('td.arrival, td.departure');
      for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        jshp.on(elem, 'click', function () {
          window.location = '//localhost:3000/airports/' + jshp.getAttr(this, 'id');
        });
      }
    }, errorHandler)

    // event

    // $('.table-query').on('keydown', function() {
    //     if (bounce) {
    //         clearTimeout(bounce);
    //         bounce = null;
    //     }
    //     bounce = setTimeout(function() {
    //         let query = $('.table-query').val();
    //         bounce = null;
    //         updateTable(
    //             sortData(
    //                 filterData(tableData, query)
    //             , 'firstName'), $tableBody
    //         );
    //     }, 500);
    // });
});
