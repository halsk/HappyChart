window.fbAsyncInit = function () {
    FB.init({
  appId : "439649252820957",
  cookie: true,
  oauth: true
    });
}

var gohome = function(){
    $.removeCookie("fbid");
    $.removeCookie("username");
    $.removeCookie("name");
    $.removeCookie("birthday");
    $.removeCookie("location");
    $.removeCookie("hometown");
    document.location="home.html";
}

var fblogin = function(){
    FB.getLoginStatus(function (resp) {
  if(resp.status =='connected'){
      getdata(resp);
  } else {
      FB.login(function (resp) {
    if ( resp.status == 'connected') { // fully connected
        getdata(resp);
    }else{
        if(resp.authResponse){
      getdata(resp);
        }else{
      getdata(resp);
      //             alert("User cancelled the Facebook login or did"+JSON.stringify(resp));
        }
    }
    　　　} , {scope: 'user_birthday,user_hometown,user_location'} );  // user_about_me,user_birthday,
  }});
};//fblogin

var getdata = function (bb){
    //     console.log("getdata"+JSON.stringify(bb));
    //     alert("resp:"+JSON.stringify(bb));
    FB.api('/me?locale=ja_JP', function (resp) {
  //        console.log("resp:"+JSON.stringify(resp));
  $.cookie("fbid",resp.id);
  $.cookie("username",resp.username);
  $.cookie("name",resp.name);
  $.cookie("birthday",resp.birthday);
  $.cookie("location",resp.location.name);
  $.cookie("hometown",resp.hometown.name);
  //       console.log("cookie:"+JSON.stringify($.cookie()));
  document.location="home.html";
    });
};


$(window).load(function () {

    $('#container0').highcharts({
  chart: { polar: true, type: 'area' },
  title: {      text: '<span style="vertical-align: top;" class="town">島根県隠岐郡海士町の幸せ</span>', useHTML: true   },
  pane: {size: '80%'  },
  xAxis: {
      categories: ['教育・学力', 'コミュニティ<br>(仲間)', '生活環境', '安心安全な社会',
       '自然環境', '仕事','所得','自由な時間'],
      tickmarkPlacement: 'on',
      lineWidth: 0,
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
  series: [ {
      name: '海士町',
      data: [200, 490, 420, 500, 440, 400,300,500],
      color: '#66cc00',
      pointPlacement: 'on',
  }]

    });

    $('#container1').highcharts({
  chart: { polar: true, type: 'area' },
  title: {      text: '<span style="vertical-align: top;" class="city">東京都の幸せ</span>', useHTML: true   },
  pane: {size: '80%'  },
  xAxis: {
      categories: ['教育・学力', 'コミュニティ<br>(仲間)', '生活環境', '安心安全な社会',
       '自然環境', '仕事','所得','自由な時間'],
      tickmarkPlacement: 'on',
      lineWidth: 0,
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

  series: [ {
      name: '東京都',
      data: [500, 190, 500, 150, 200, 400,500,200],
      pointPlacement: 'off'
  }],


    });


});

// JavaScript Facebook SDK load
$(function () {
    (function () {
  var e = document.createElement('script');
  e.src = document.location.protocol + '//connect.facebook.net/ja_JP/all.js';
  e.async = true;
  document.getElementById('fb-root').appendChild(e);
    } ());
});
