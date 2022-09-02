(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        tableau.log("Hello WDC!");
        let cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "active",
            alias: "active cases",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "date",
            dataType: tableau.dataTypeEnum.date
        }];

        var tableSchema = {
            id: "adasdad132",
            alias: "Covid 19 API Data",
            columns: cols
        };

        schemaCallback([tableSchema]);

    };

    myConnector.getData = async function (table, doneCallback) {
        try {
            let res = await fetch("https://api.covid19api.com/country/canada");
            let data = await res.json();
            // let tableData = data
            let tableData = [];
            data.forEach(el => {
                tableData.push({
                    "id": el.ID,
                    "country": el.Country,
                    "active": el.Active,
                    "date": el.Date
                })
            });
            tableau.log(data);
            
            table.appendRows(tableData);
            doneCallback();

        } catch (error) {
            console.log(error)
        }

    };

    tableau.registerConnector(myConnector);
    
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Covid API";
            tableau.submit();
        });
    });
})();