
window.fbAsyncInit = function () {
    FB.init({
  appId : "439649252820957",
  cookie: true,
  oauth: true
    });
}

var gohome = function(){
    $.removeCookie("fbid");
    $.removeCookie("location");
    document.location="/welcome/home";
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
  if (prefCheck(resp.location.name)){
    $.cookie("location",resp.location.name);
  }
  if (prefCheck(resp.hometown.name)){
    $.cookie("hometown",resp.hometown.name);
  }
  //       console.log("cookie:"+JSON.stringify($.cookie()));
  document.location="/welcome/home";
    });
};


$(window).load(function () {
    var labels = ['教育・学力', 'コミュニティ<br>(仲間)', '生活環境', '安心安全な社会',
       '自然環境', '仕事','所得','自由な時間'];
    var avalues = [200, 490, 420, 500, 440, 400,300,500];
    var tvalues = [500, 190, 500, 150, 200, 400,500,200];
    makeChart('#container0', '<span style="vertical-align: top;" class="town">島根県隠岐郡海士町の幸せ</span>','海士町', labels, avalues, '#66cc00');

     makeChart('#container1', '<span style="vertical-align: top;" class="city">東京都の幸せ</span>', '東京都', labels, tvalues);
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
