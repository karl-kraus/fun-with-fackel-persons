
const dataUrl = "data.json"
function isGood(value) {
    return value[1] > 0
}

const limit = 100

d3.json(dataUrl, function (data) {
    let genderData = data["gender"]
    let myData = Object.keys(genderData).map((key) => { return { "name": key, "y": genderData[key] } })

    let jobCat = data["jobs"].map((item) => { return item[0]})
    let jobVal = data["jobs"].map((item) => { return item[1]})

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
    console.log(bYears)

    Highcharts.chart('gender', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ""
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
            type: 'pie'
        },
        title: {
            text: ""
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
        title: {
            text: ""
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
    
    Highcharts.chart('jobs', {
        chart: {
            type: 'bar',
            zoomType: 'x',
            height: 800
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: jobCat.slice(0, limit)
        },
        legend: {
            enabled: false
        },
        series: [
            {
                name: "Berufe",
                data: jobVal.slice(0, limit)
            }
        ]
    });
    
    
})