/**
 * makeChart
 * @target_id : target_id of div for displaying chart
 * @title : title of chart value
 * @series_name : name of series
 * @labels : array of labels
 * @values : array of values
 * @ccolor : color of chart
 */
function makeChart(target_id, title, series_name, labels, values, ccolor){

  $(target_id).highcharts({
    chart: {
      polar: true,
      type: 'area'
    },
    title: {
      text: title,
      useHTML: true
    },
    pane: {
      size: '80%'
    },
    xAxis: {
      categories: labels,
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      max: 500,
      min: 0
    },
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
    },
    legend: {
      enabled: false,
      align: 'right',
      verticalAlign: 'top',
      y: 70,
      layout: 'vertical'
    },
    series: [{
      name: series_name,
      data: values,
      color: ccolor,
      pointPlacement: 'on',
    }],
  credits: {
      enabled: false
  }


  });
}
