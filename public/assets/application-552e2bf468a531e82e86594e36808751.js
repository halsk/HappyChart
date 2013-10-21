/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
	// AMD. Register as anonymous module.
	define(['jquery'], factory);
    } else {
	// Browser globals.
	factory(jQuery);
    }
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
	    return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
	    return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
	    return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
	    if (s.indexOf('"') === 0) {
		// This is a quoted cookie as according to RFC2068, unescape...
		s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'); // ');
	    }
	    
	    try {
		// Replace server-side written pluses with spaces.
		// If we can't decode the cookie, ignore it, it's unusable.
		s = decodeURIComponent(s.replace(pluses, ' '));
	    } catch(e) {
		return;
	    }

	    try {
		// If we can't parse the cookie, ignore it, it's unusable.
		return config.json ? JSON.parse(s) : s;
	    } catch(e) {}
	}

	function read(s, converter) {
	    var value = config.raw ? s : parseCookieValue(s);
	    return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

	    // Write
	    if (value !== undefined && !$.isFunction(value)) {
		options = $.extend({}, config.defaults, options);

		if (typeof options.expires === 'number') {
		    var days = options.expires, t = options.expires = new Date();
		    t.setDate(t.getDate() + days);
		}

		return (document.cookie = [
					   encode(key), '=', stringifyCookieValue(value),
					   options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					   options.path    ? '; path=' + options.path : '',
					   options.domain  ? '; domain=' + options.domain : '',
					   options.secure  ? '; secure' : ''
					   ].join(''));
	    }

	    // Read

	    var result = key ? undefined : {};

	    // To prevent the for loop in the first place assign an empty array
	    // in case there are no cookies at all. Also prevents odd result when
	    // calling $.cookie().
	    var cookies = document.cookie ? document.cookie.split('; ') : [];

	    for (var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var name = decode(parts.shift());
		var cookie = parts.join('=');

		if (key && key === name) {
		    // If second argument (value) is a function it's a converter...
		    result = read(cookie, value);
		    break;
		}

		// Prevent storing a cookie that we couldn't decode.
		if (!key && (cookie = read(cookie)) !== undefined) {
		    result[name] = cookie;
		}
	    }

	    return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
	    if ($.cookie(key) === undefined) {
		return false;
	    }

	    // Must not alter options, thus extending a fresh object...
	    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
	    return !$.cookie(key);
	};

    }));

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
	title: {      text: '<span style="vertical-align: top;"><img src="./images/icon_town.png" alt="" width="20" height="22" style="margin-right: 4px" />島根県隠岐郡海士町の幸せ</span>', useHTML: true   },
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
	title: {      text: '<span style="vertical-align: top;"><img src="./images/icon_city.png" alt="" width="20" height="22" style="margin-right: 4px" />東京都の幸せ</span>', useHTML: true   },
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
(function() {


}).call(this);
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

;
