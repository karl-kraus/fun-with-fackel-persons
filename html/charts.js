
const dataUrl = "data.json"
function isGood(value) {
    return value[1] > 0
}

d3.json(dataUrl, function (data) {
    let genderData = data["gender"]
    let myData = Object.keys(genderData).map((key) => { return { "name": key, "y": genderData[key] } })

    let jobs = Object.keys(data["jobs"]).map((key) => { return { "name": key, "data": [data["jobs"][key]] } })
    console.log(jobs);

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

    let birthYears = Object.keys(data["birth_year"]).map((key) => {
        return [
            Number(key.padStart(4, '0')), data["birth_year"][key]
        ]
    });

    let deathYears = Object.keys(data["death_year"]).map((key) => {
        return [
            Number(key.padStart(4, '0')), data["death_year"][key]
        ]
    });

    let bYears = birthYears.filter(isGood)
    let dYears = deathYears.filter(isGood)

    Highcharts.chart('gender', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
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
    Highcharts.chart('birthDeathYears', {
        chart: {
            zoomType: 'x'
        },
        yAxis: {
            title: {
                text: 'Personen'
            },
            min: 10
        },
    
        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

        series: [
            {
                name: 'Geburtsjahre',
                data: bYears
            },
            {
                name: 'Todesjahre',
                data: dYears
            }
        ]
    });
    
    // Highcharts.chart('jobs', {
    //     chart: {
    //         type: 'bar',
    //         zoomType: 'y'
    //     },
    //     title: {
    //         text: '',
    //     },
    //     series: jobs
    // });
    
    
})