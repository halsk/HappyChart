// for simple pretty printing 
function pp(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    return properties;
}

function jump_diff(){
    document.location="diff.html";
}

function renderMap(data){
    var stage = $("#japan_map");
    stage.appendChid(document.adoptNode(data));
}

// Nifty Initialize
NCMB.initialize("73b2578802b76e8f77c859075be4ecf681dfb4f9830f1fbad3ce3e06731b32cc", "f58c65a4d666960b25399a1f953257d3bd09fc164d15bee3055ce04a93387d83");

// hex
function hs(n){
    n="0"+(parseInt(n*255).toString(16));
    return n.substr(n.length-2);
}

// decimal
function ps(n){
    n="0"+(parseInt(n).toString());
    return n.substr(n.length-2);
}

// color
function hls(h, l, s) {
    var r, g, b; // 0..255
    while (h < 0)h += 360;
    h = h % 360;
    if (s == 0) return "#"+hs(l)+hs(l)+hs(l);

    var m2 = (l < 0.5) ? l * (1 + s) : l + s - l * s,   m1 = l * 2 - m2,  tmp;
    tmp = h + 120;
    if (tmp > 360) tmp = tmp - 360;
    if (tmp < 60) {
	r = (m1 + (m2 - m1) * tmp / 60);
    } else if (tmp < 180) {
	r = m2;
    } else if (tmp < 240) {
	r = m1 + (m2 - m1) * (240 - tmp) / 60;
    } else {
	r = m1;
    }
    tmp = h;
    if (tmp < 60) {
	g = m1 + (m2 - m1) * tmp / 60;
    } else if (tmp < 180) {
	g = m2;
    } else if (tmp < 240) {
	g = m1 + (m2 - m1) * (240 - tmp) / 60;
    } else {
	g = m1;
    }

    tmp = h - 120;  
    if (tmp < 0) {tmp = tmp + 360  }
    if (tmp < 60) {
	b = m1 + (m2 - m1) * tmp / 60;
    } else if (tmp < 180) {
	b = m2;
    } else if (tmp < 240) {
	b = m1 + (m2 - m1) * (240 - tmp) / 60;
    } else {
	b = m1;
    }
    return "#"+hs(r)+hs(g)+hs(b);
}


function makeArray(pd){
    var arp = new Array(8);
    for(i=0; i< 8; i++){
	arp[i]=pd.get(""+i);
    }
    return arp;
}

function mapclick(id){
    
}
var baseDoc;

    var pref = ["北海道","青森県","岩手県","宮城県","秋田県" ,
		"山形県","福島県","茨城県","栃木県","群馬県",  
		"埼玉県","千葉県","東京都","神奈川県", "新潟県",
		"富山県","石川県","福井県","山梨県","長野県",  
		"岐阜県","静岡県","愛知県","三重県","滋賀県" , 
		"京都府","大阪府","兵庫県","奈良県","和歌山県",
		"鳥取県","島根県","岡山県","広島県","山口県" ,
		"徳島県","香川県","愛媛県","高知県","福岡県",
		"佐賀県","長崎県","熊本県","大分県","宮崎県" ,
		"鹿児島県", "沖縄県" ];

    var ar = new Array(48);
    var ct = new Array(48);

function maphover(evt,obj){
/*    this.content= document.createElement('div');
    this.content.className = 'tooltip-content';
    whiile(this.content.hasChildNodes()){    
	this.content.removeChild(this.content.lastChild);
    }
    this.content.appendChild(document.createTextNode(pref[id]));
    this.shadow.style.left= evt.clientX;
    this.shadow.style.left= evt.clientY;


    document.body.appendChild(this.shadow)
    */
    console.log("evt["+pp(evt)+"]\n"+"obj["+pp(obj)+"]end\n"+obj.toString());
//    if(ct[1*id+1] == undefined) ct[1*id+1]=0;
//    console.log("ID:"+pref[1*id]+":"+ct[1*id+1]+"人");
//    $("#label")[0].innerHTML=pref[1*id]+":"+ct[1*id+1]+"人";
}

var  tooltip = $( '<div id="tooltip"></div>' );
function preftip(obj,evt){
    var cno = obj.correspondingElement.attributes[1].nodeValue.substr(1)*1;


//    console.log("x,y="+ox+","+oy+":sc"+x+","+y+":l:"+evt.clientX+","+evt.clientY);

    var n = ct[cno];if(n==undefined ) n = 0;
    tooltip.css( 'opacity', 1 )
	.html( pref[cno-1]+":"+ n+"人のハッピーさん")
	.appendTo( 'body' );
    selPref = cno-1;
    $.cookie("selpref",cno); // save to cookie.
    
    var init_tooltip = function()
    {
	var esvg = $("#esvg")[0];
	var oy = esvg.offsetTop;
	var ox = esvg.offsetLeft;
	var x = evt.clientX + ox;
	var y = evt.clientY + oy;
	if( $( window ).width() < tooltip.outerWidth() * 1.5 )
	    tooltip.css( 'max-width', $( window ).width() / 2 );
	else
	    tooltip.css( 'max-width', 340 );
	var pos_left = x- tooltip.outerWidth()/2+2, pos_top  = y - tooltip.outerHeight()-15 ;
	tooltip.css( { left: pos_left, top: pos_top});
	$('#explain').css({left: ox+190, top: oy+250, visibility: "visible"});
    };
	    
    init_tooltip();
    $( window ).resize( init_tooltip );
	/*    var remove_tooltip = function()
    {
	tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
			 {
			     $( this ).remove();
			 });
	// 
	jump_diff();
    };

    tooltip.bind( 'click', remove_tooltip );
    tooltip.bind( 'mousedown', remove_tooltip );*/
}
		

function mapit(){
    
    console.log("Mapit")

    var mfc2=function(evt){preftip(this,evt)};
    var mfc3=function(evt){};

    // safari do not load embed in "window load".. 
    // so we made delay function
    window.setTimeout(function(){
	var esvg = $("#esvg")[0];
	var oy = esvg.offsetTop;
	var ox = esvg.offsetLeft;
	$('#explain').css({left: ox+190, top: oy+250, visibility: "visible"});
//	$('#explain').bind('mousedown', jump_diff());

	$("#esvg")[0].getSVGDocument().documentElement.addEventListener("mousedown",mfc3);
	baseSVGPath = $("#esvg")[0].getSVGDocument().documentElement.childNodes[3].childNodes[1].childNodes[3];
	for(i = 0; i < 47; i++){
	    var sel =baseSVGPath.childNodes[i*2+1];
	    sel.addEventListener("mousedown",mfc2);
	    sel.addEventListener("mousemove",mfc2);
	}
	NCMB.AnonymousUtils.logIn({
            success: function(user){
		var PrefData = NCMB.Object.extend("PrefData");
		var query= new NCMB.Query(PrefData);
		//	    console.log("find "+query);

		query.each(function(result){
		    //		console.log("get"+JSON.stringify(result));
		    var pd = result;
		    var pid = pd.get("pref");
		    if(pid < 0) { // no pref info 
			console.log("Skip -1");
		    }else{
			ar[pid] = makeArray(pd);
			ct[pid] = pd.get("myct");
			var cn = parseInt(ct[pid]/5);
			if(cn >= col.length) cn = col.length-1;
//			console.log("add Style: "+cn +","+pid+":"+col[cn]);
			var path = baseSVGPath.childNodes[(pid-1)*2+1];
			path.style.setProperty("fill",col[cn] );
		    }});
// workaround for redrawing SVG
		var svgdoc = $("#esvg")[0].getSVGDocument()
		var child = svgdoc.childNodes[0];
		svgdoc.removeChild(child);
//		svgdoc.appendChild(child);
		window.setTimeout(function(){
		    svgdoc.appendChild(child);
		},500);
		
	    },
	    error: function(error){
		console.log("login error:"+error);
	    }
	});



    },600);

//    var col = [hls(0.4,0.9,0.6),hls(0.6,0.9,0.6),hls(0.8,0.9,0.6),hls(0.9,0.9,0.6),hls(1.0,0.9,0.6)];
    var col = ["#00FFCC", "#CCFF33", "#FF9900", "#FF6633", "#FF0033"];
    console.log("Working");


}

$(window).load(mapit);


