// 
window.fbAsyncInit = function () {
    FB.init({
	appId : "439649252820957",
	cookie: true,
	oauth: true
    });
}
var chartURL= "http://chart.lisra.jp/cgi-bin/makesvg.cgi";
var mapURL= "http://chart.lisra.jp/cgi-bin/makemap.cgi";

function makeChartImage(callback){
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
// 	       filename: options.filename || 'chart',
//	       type: options.type,
//	       width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
//	       scale: options.scale || 1,
//	       async: true,
	       svg: svg
	   }
	   , callback);

}
var respG,xhrG;
function shareFB(resp,status,xhr){
    if (typeof resp != "string"){
	// something wrong...
	alert("大変申しわけありません。画像生成がうまく行きません。<br>おかしくなった状況を happychart@lisra.jp までご報告ください");
	return;
    }
    FB.ui({
	method: 'feed',
	name: 'Happy Chart',
	link: 'http://chart.lisra.jp/cgi-bin/showchart.cgi?'+resp ,
	caption: 'みんなで幸せをシェアしよう！',
	picture: 'http://chart.lisra.jp/'+resp,
	description: 'わたしのハッピーチャートをシェアします！みんなでそれぞれの幸せを再確認しよう。',
    }, function(response){
	if (response && response.post_id) {
	    //	    alert('Post was published.');
	} else {
	    //	    alert('Post was not published.');
	}
    });
}

function dofacebook(){
    makeChartImage(shareFB);
}


function shareMap(resp,status,xhr){
    if (typeof resp != "string"){
	// something wrong...
	alert("大変申しわけありません。画像生成がうまく行きません。<br>おかしくなった状況を happychart@lisra.jp までご報告ください");
	return;
    }
    FB.ui({
	method: 'feed',
	name: 'Happy Chart',
	link: 'http://chart.lisra.jp/cgi-bin/showmap.cgi?'+resp ,
	caption: 'みんなで幸せをシェアしよう！',
	picture: 'http://chart.lisra.jp/'+resp,
	description: '現在の登録状況です！あなたの地域はありますか？みんなでそれぞれの幸せを再確認しよう。',
    }, function(response){
	if (response && response.post_id) {
	    //	    alert('Post was published.');
	} else {
	    //	    alert('Post was not published.');
	}
    });
}

function makeJapanChartImage(callback){
    var xser = new XMLSerializer();
    var svgNode = $("#esvg")[0].getSVGDocument();
    var svg = xser.serializeToString(svgNode);

    $.post( 
	mapURL,
	{
	    svg: svg
	}
	, callback);

}

function fbPostJapan(){
    makeJapanChartImage(shareMap);
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

