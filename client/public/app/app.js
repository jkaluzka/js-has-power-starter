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
        jshp.empty(target);
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
        initModal();
    }

    init();

    function initModal() {
        var _airports, _airlines;
        var modal = jshp.get('#modal')[0];
        jshp.addListener(jshp.get('#addFlight')[0], 'click', function () {
            jshp.css(modal, 'display', 'block');
            jshp.ajaxGet({url: '/airports'}, function (data) {
                _airports = data;
                var ports = data.map(function (a) {
                    return Object.assign({}, a, {name: a.city + ' [' + a.IAA + ']'});
                })
                insertOptions('dept_city', ports);
                insertOptions('arrival_city', ports);
            }, errorHandler)
            jshp.ajaxGet({url: '/airlines'}, function (data) {
                _airlines = data
                insertOptions('airline', _airlines);
            }, errorHandler)
        });

        jshp.addListener(jshp.get('span.close')[0], 'click', function () {
            jshp.css(modal, 'display', 'none');
        });

        Array.prototype.forEach.call(jshp.get('button.time'), function (button) {
            jshp.addListener(button, 'click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                var elem = jshp.get('input[name="' + jshp.getAttr(this, 'data-for') + '"]')[0];
                elem.value = new Date().toISOString();
            });
        });

        jshp.addListener(jshp.get('#modal .submit')[0], 'click', function () {
            event.stopPropagation();
            event.preventDefault();
            var airline = _getSelectedValue('select[name="airline"]', _airlines);

            var departure = _getSelectedValue('select[name="dept_city"]', _airports);
            departure.time = jshp.get('input[name="dept_time"]')[0].value

            var arrival = _getSelectedValue('select[name="arrival_city"]', _airports);
            arrival.time = jshp.get('input[name="arrival_time"]')[0].value

            var payload = {airline: airline, departure: departure, arrival: arrival}
            jshp.ajaxPost({url: '/flights', data: payload}, function (response) {
                jshp.css(modal, 'display', 'none');
                data.push(response);
                updateTable(data, jshp.findChildren(jshp.get('.table')[0], '.table-body')[0]);
            }, errorHandler);
        })

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    function _getSelectedValue(name, data) {
        var element = jshp.get(name)[0]
        return data.filter(function (a) {
            return a.id === parseInt(element.options[element.selectedIndex].value, 10);
        })[0]
    }

    function insertOptions(name, options) {
        var selectElement = jshp.get('select[name=' + name + ']')[0];
        options.map(function(option) {
            var optionElement = jshp.create('option');
            jshp.attr(optionElement, 'value', option.id);
            jshp.text(optionElement, option.name);
            jshp.append(optionElement, selectElement);
        })
    }

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
        // reset element
        jshp.empty(element);
        po.select(0);
        // set list of all pages
        po.total(data.length);
        // draw footer with pagination
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
        updateTable: updateTable,
    }
}

function errorHandler(error) {
    console.error(error);
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
      to.updateTable(data, tableBody);
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
