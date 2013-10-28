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

window.fbAsyncInit = function () {
    FB.init({
  appId : "439649252820957",
  cookie: true,
  oauth: true
    });
}

var gohome = function(){
    $.removeCookie("fbid");
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

var prefCheck = function(location){
  for (i = 0;i < PREF.length; i++){
    if (location.indexOf(PREF[i]) == 0){
      return true;
    }
  }
  return false;
}

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
