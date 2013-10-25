/**
 * makeChart
 * @target_id : target_id of div for displaying chart
 * @shappy : shappy value
 * @labels : array of labels
 * @values : array of values
 */

function makeChart(target_id, shappy, labels, values){

  $(target_id).highcharts({
    chart: {
      polar: true,
      type: 'area'
    },
    title: {
      text: 'わたしのハッピー度 (' + shappy + '%)',
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
      name: 'わたし',
      data: values,
      pointPlacement: 'on',
    }],
  credits: {
      enabled: false
  }


  });
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

//
;
