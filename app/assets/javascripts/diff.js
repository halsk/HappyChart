// 
//
//  diff.js show two area
//

function enqParse(enq) {
	ar = new Array(enq.length);
	for (i = 0; i < enq.length; i++) {
		ar[i] = enq.substr(i, 1) * 100;
	}
	return ar;
}

function gojapan(){
    document.location="japan.html"
}

var pref = ["北海道", "青森県", "岩手県", "宮城県", "秋田県",
	"山形県", "福島県", "茨城県", "栃木県", "群馬県",
	"埼玉県", "千葉県", "東京都", "神奈川県", "新潟県",
	"富山県", "石川県", "福井県", "山梨県", "長野県",
	"岐阜県", "静岡県", "愛知県", "三重県", "滋賀県",
	"京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
	"鳥取県", "島根県", "岡山県", "広島県", "山口県",
	"徳島県", "香川県", "愛媛県", "高知県", "福岡県",
	"佐賀県", "長崎県", "熊本県", "大分県", "宮崎県",
	"鹿児島県", "沖縄県"
];

NCMB.initialize("73b2578802b76e8f77c859075be4ecf681dfb4f9830f1fbad3ce3e06731b32cc", "f58c65a4d666960b25399a1f953257d3bd09fc164d15bee3055ce04a93387d83");

var NUM_ENQ = 8;

function drawChart(selector, caption, array, gcolor) {
	$(selector).highcharts({
		chart: {
			polar: true,
			type: 'area'
		},
		title: {
			text: '<span style="vertical - align: top;">' + caption + 'の幸せ</span>',
			useHTML: true
		},
		pane: {
			size: '80%'
		},
		xAxis: {
			categories: ['教育・学力', 'コミュニティ<br>(仲間)', '生活環境', '安心安全な社会',
				'自然環境', '仕事', '所得', '自由な時間'
			],
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
		series: [{
			name: caption,
			data: array,
			color: gcolor,
			pointPlacement: 'on',
		}],
	    credits: {
		enabled: false
	    }

	});
}

function queryPref(){
	var selpref = $.cookie("selpref");
	//  check selected pref
	console.log("pref is "+selpref);
	if(selpref.length ==0 ){
	    console.log("no pref");
		selpref=23;// default aichi
	}
	var arp = new Array(NUM_ENQ);
	var cval = $.cookie("enq");
	var ar = enqParse(cval);
    drawChart('#container0', 'わたし', ar , '#66cc00');

	var PrefData = NCMB.Object.extend("PrefData");
	var query = new NCMB.Query(PrefData);
	// find pref info
    query.equalTo("pref", 1*selpref);

	query.find({
		// if there is a data for the pref.
		success: function(results) {
			//	     console.log("Now: Pref Count = "+results.length);
			if (results.length == 0) { // no data for the pref
			    // currently its not collect to use ar.
			    drawChart('#container1', 'みんな', ar, '#0066cc' );
			} else {
				var pd = results[0];
			    var str = "";
				for (i = 0; i < arp.length; i++) {
					arp[i] = pd.get("" + i);
				    str = str + arp[i]+",";
				}
//				console.log("got info" +str);
			    drawChart('#container1', pref[selpref-1], arp, '#0066cc' );
			}
		},
		error: function(error) {
			console.log("error " + error);
		}
	});
}

$(window).load(
	function(){
		console.log("Loading..");
		NCMB.AnonymousUtils.logIn({
			success: function(user) {
				queryPref();
			},
			error: function(error) {
				console.log("login error" + error);
			}
		});
	}); // window load


