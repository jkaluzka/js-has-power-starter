function tableObject(element, config) {
    var data = [];

    function init() {
        jshp.empty(element);
        var tr = jshp.create('tr');
        config.map(function(column) {
            var th = jshp.create('th');
            jshp.text(th, column.title);
            jshp.append(th, tr);
        });
        jshp.append(tr, element);
    }

    init();

    function updateTable(data, element) {
        let items = [];
        jshp.empty(element)
        data.map(function (item) {
            var tr = jshp.create('tr');
            for (var prop in item) {
                var td = jshp.create('td')
                jshp.text(td, item[prop])//.addClass(i);
                jshp.append(td, tr);
            }
            jshp.append(tr, element);
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

jshp.ready(function () {
    let bounce = null;

    var tableBody = jshp.get('.table')[0];
    var tableConfig = [
        {
            title: '#',
            type: 'number',
            sortable: true
        }, {
            title: 'Departure city',
            type: 'object',
            target: 'departure.city',
        }, {
            title: 'Departure time',
            type: 'object',
            target: 'departure.time',
        }, {
            title: 'Arrival city',
            type: 'object',
            target: 'arrival.city',
        }, {
            title: 'Arrival time',
            type: 'object',
            target: 'arrival.time',
        }
    ];

    var to = tableObject(tableBody, tableConfig);

    jshp.ajax({
        method: 'GET',
        url: '//localhost:3000/flights'
    }, function (data) {
        to.updateTable(JSON.parse(data));
    }, function (error) {
        console.log(error);
    })

    // ajax

    // $.ajax({
    //     method: 'GET',
    //     url: '//localhost:3000/flights'
    // }).then(function(data) {
    //     console.log(data);
    //     tableData = data;
    //     updateTable(
    //         sortData(tableData, 'id')
    //     , $tableBody);
    // });

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
