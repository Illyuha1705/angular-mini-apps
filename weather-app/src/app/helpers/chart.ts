import { Options } from 'highcharts';

export const areaChartOptions = (hours: string[], temperatures: number[]): Options => ({
    chart: {
        height: '300',
        width: '1075',
    },

    xAxis: {
        categories: hours,
    },

    yAxis: {
        labels: {
            step: 1,
        },
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false,
            },
            pointStart: 0,
        },
    },

    series: [{
        name: '',
        data: temperatures,
        type: 'line',
        color: 'orange',
        marker: {
            symbol: 'circle',
            width: 5,
            height: 5,
        },
    }]
});
