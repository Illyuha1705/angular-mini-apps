import { Options } from 'highcharts';

export const areaChartOptions = (): Options => ({
  chart: {
    height: '400',
    width: '1075',
  },

  xAxis: {
    labels: {
      step: 0,
    },
  },

  yAxis: {
    labels: {
      step: 1,
    },
    max: 60,
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
    name: 'stuffiness',
    data: [],
    type: 'line',
    color: '#6f2205',
    marker: {
      symbol: 'circle',
      width: 5,
      height: 5,
    },
  }],
});
