// 
window.fbAsyncInit = function () {
    FB.init({
	appId : "439649252820957",
	cookie: true,
	oauth: true
    });
}
//var chartURL= "http://chart.lisra.jp/highcharts-export-web/";
//var chartURL= "http://export.highcharts.com/";
//var chartURL= "http://chart.lisra.jp/cgi-bin/makesvg.cgi";
var chartURL= "http://chart.lisra.jp/cgi-bin/doit.cgi";

function makeChartImage(){
    var chart = $('#container0').highcharts();
    var chartExportingOptions = chart.options.exporting;
    var svg = chart.getSVG(Highcharts.merge(
	{ chart: { borderRadius: 0 } },
	chartExportingOptions.chartOptions,
	null, 
	{
	    exporting: {
		sourceWidth:  320,
		sourceHeight:  320
	    }
	}
    ));
    // merge the options
    var options = Highcharts.merge(chart.options.exporting); //, {type: "image/jpeg"});
    
    // do the post

    svg = svg.substr(0,svg.length-6)+'<image xlink:href="http://hc.lisra.jp/mobile/images/chart.png" x="-15" y="-15" height="345px" width="345px" /></svg>';
//    console.log(svg);

    $.post( 
	chartURL,
//options.url, 
	   {
 	       filename: options.filename || 'chart',
	       type: options.type,
	       width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
	       scale: options.scale || 1,
	       async: true,
	       svg: svg
	   }
	   , function(resp,status,xhr){
	       // got 
	       alert(status+":"+resp);
//	       console.log("post is "+status+":"+resp.length);

	       FB.ui({
		   method: 'feed',
		   name: 'Happy Chart',
		   link: 'http://hc.lisra.jp/mobile/' ,
		   caption: 'Happy Chart',
		   picture: chartURL+resp,
		   description: 'わたしのハッピーチャートをシェアします！<br>みんなで自分の幸せを再確認しよう。',
	       }, function(response){
		   if (response && response.post_id) {
		       //	    alert('Post was published.');
		   } else {
		       //	    alert('Post was not published.');
		   }
	       });


	   });
	   
    // chart.exportChart(type:"image/jpeg"});

}


function dofacebook(){

// create image

    makeChartImage();


/*    FB.ui({
	method: 'feed',
	name: 'Happy Chart',
	link: 'http://hc.lisra.jp/mobile/' ,
	caption: 'Happy Chart',
//	image:
	description: 'わたしのハッピーチャートをシェアします！',
    }, function(response){
	if (response && response.post_id) {
	    alert('Post was published.');
	} else {
	    alert('Post was not published.');
	}
    });

    */

}



// JavaScript Facebook SDK load
$(function () {
    (function () {
	var e = document.createElement('script');
	e.src = document.location.protocol + '//connect.facebook.net/ja_JP/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
    } ());
});
