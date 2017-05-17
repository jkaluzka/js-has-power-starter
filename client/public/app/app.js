function tableObject(element, config) {
    var data = [];
    var cfg = null;

    function init() {
        cfg = config;
        jshp.empty(element);
        var tr = jshp.create('tr');
        cfg.map(function(column) {
            var th = jshp.create('th');
            jshp.text(th, column.title);
            jshp.append(th, tr);
        });
        jshp.append(tr, element);
    }

    init();

    function insertRow(item, element) {
        var tr = jshp.create('tr');
        for (var i=0; i<cfg.length; i++) {
            var td = jshp.create('td');
            jshp.text(td, _.get(item, cfg[i].target))
            if (cfg[i].className) {
              jshp.addClass(td, cfg[i].className)
            }
            for (var attr in cfg[i].attrs) {
                var attrValue = _.get(item, cfg[i].attrs[attr])
                jshp.setAttr(td, attr, attrValue);
            }
            jshp.append(td, tr);
        }
        jshp.append(tr, element);
    }

    function updateTable(data, element) {
        jshp.empty(element)
        data.map(function (item) {
            insertRow(item, element);
        });
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
