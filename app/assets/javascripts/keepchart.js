
var doit =  function () {
    // URL checkURL
    var enq = $.cookie("enq");
    var val = new Array(enq.length);
    var happy = -8;
    for(i = 0 ; i < val.length  ; i++){
	val[i]=enq.substr(i,1);
        happy = happy +val[i]*1;
    }
    happy = parseInt(happy * 1000/32)/10;

    $('#container0').highcharts({
	    chart: { polar: true, type: 'area' },
	    title: {      text: 'わたしのハッピー度 ('+happy+'%)',    },
	    pane: {size: '80%'  },
	    xAxis: {
	        categories: ['教育・学力', 'コミュニティ', '生活環境', '安心安全な社会', 
	                '自然環境', '仕事','所得','自由な時間'],
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
		 series: [ {
		            name: 'わたし',
			data: [val[0]*100, val[1]*100, val[2]*100, val[3]*100,
                               val[4]*100, val[5]*100, val[6]*100, val[7]*100],
		            pointPlacement: 'on',
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

		      
};

