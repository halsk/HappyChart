
function pp(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    return properties;
}



function shareTW(resp,status,xhr){
    $(".twitter-share-button")[0].setAttribute("data-text","私のハッピーをシェアします "+'http://chart.lisra.jp/'+resp);
    window.setTimeout(loadWidget,100);
}



function loadWidget(){
    !function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
	    js=d.createElement(s);js.id=id;
	    js.src=p+'://platform.twitter.com/widgets.js';
	    fjs.parentNode.insertBefore(js,fjs);
	}
    }(document, 'script', 'twitter-wjs');
}

function graphtweet(){
    makeChartImage(shareTW);
}

