
const dataUrl = "data.json"

d3.json(dataUrl, function (data) {
    let genderData = data["gender"]
    let myData = Object.keys(genderData).map((key) => {return { "name": key, "y": genderData[key] }})

    let normdata = [
        {
            "name": "GND",
            "y": data["gnds"]
        },
        {
            "name": "WikiData",
            "y": data["wikidatas"]
        }
    ]

    console.log(myData)

    Highcharts.chart('gender', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{point.y} Personen'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Gender',
            colorByPoint: true,
            data: myData
        }]
    });
    Highcharts.chart('normdata', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{point.y} Personen'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Normdaten',
            colorByPoint: true,
            data: normdata
        }]
    });
})