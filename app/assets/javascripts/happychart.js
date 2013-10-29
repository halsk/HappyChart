var PREF = ["北海道","青森県","岩手県","宮城県","秋田県" ,
    "山形県","福島県","茨城県","栃木県","群馬県",
    "埼玉県","千葉県","東京都","神奈川県", "新潟県",
    "富山県","石川県","福井県","山梨県","長野県",
    "岐阜県","静岡県","愛知県","三重県","滋賀県" ,
    "京都府","大阪府","兵庫県","奈良県","和歌山県",
    "鳥取県","島根県","岡山県","広島県","山口県" ,
    "徳島県","香川県","愛媛県","高知県","福岡県",
    "佐賀県","長崎県","熊本県","大分県","宮崎県" ,
    "鹿児島県", "沖縄県" ];

var prefCheck = function(location){
  for (i = 0;i < PREF.length; i++){
    if (location.indexOf(PREF[i]) == 0){
      return true;
    }
  }
  return false;
}


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
      pointPlacement: 'on'
    }],
  credits: {
      enabled: false
  },
  exporting:{
    buttons:{
      contextButton:{
        enabled: false
      }
    }
  }

  });
}
