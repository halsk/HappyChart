// dochart.js
//  make a chart from input data
// also create "Cookie" and NCMB info

function urlparse(d) {
  var p = d.replace(/([^&])&([^&])/g, '$1\n$2').replace(/&&/g, '&').split('\n');
  var pp = {};
  for (var i = 0; i < p.length; i++) {
    var tmp = p[i].split('=');
    pp[tmp[0]] = tmp[1];
  }
  return pp;
}

// アンケート結果から、100倍値の配列を返す

var MAX_VAL = 500;

function enqParse(enq) {
  ar = new Array(enq.length);
  for (i = 0; i < enq.length; i++) {
    ar[i] = enq.substr(i, 1) * 100;
  }
  return ar;
}

function addArray(a, b) {
  for (i = 0; i < a.length; i++) {
    a[i] = a[i] + b[i];
      if(a[i] > MAX_VAL) a[i]=MAX_VAL; // max
  }
  return a;
}

function divArray(a, b) {
  for (i = 0; i < a.length; i++) {
    a[i] = a[i] / b;
  }
  return a;
}

function multArray(a, b) {
  for (i = 0; i < a.length; i++) {
    a[i] = a[i] * b;
  }
  return a;
}


function aveArray(before, a, count) {
  for (i = 0; i < a.length; i++) {
      a[i] = (a[i] + before[i]*(count-1))/count;
      if(a[i] > MAX_VAL) a[i]=MAX_VAL; // max
  }
  return a;
}

function calcAverage(categories) {
  var averages = [];
  jQuery.each(categories, function(key){
      var sum = 0;
      var nums = this;
      for (i = 0; i < nums.length; i++ ){
        sum += nums[i];
      }
      averages.push(sum / nums.length);
    });
  return averages;
}

function calcTotal(averages) {
  var total = 0;
  for (i = 0; i < averages.length; i++ ){
      total +=  averages[i]
    }
  return total;
}

function joinTotal(averages) {
  var total = "";
  for (i = 0; i < averages.length; i++ ){
      total += "" + averages[i]
    }
  return total;
}

var doit = function() {
  // URL checkURL
  var url = window.location.search;
  var attr = urlparse(url.substring(1));
  var categories = {};
  jQuery.each(attr, function(key){
      if (key.substr(0,2) == "q-"){
        var catid = key.substr(2,1);
        if (categories[catid] === undefined){
          categories[catid] = [];
        }
        categories[catid].push(parseInt(this))
      }
  });
  var averages = calcAverage(categories);
  var cval = joinTotal(averages);
  var averages100 = [];
  for (i = 0; i < averages.length; i++){
    averages100.push(averages[i] * 100);
  }
  var shappy = (-8 + calcTotal(averages)) * 100 /32;

  // put values into chart
  //    console.log("cval="+cval);
  $.cookie("enq", cval, {
    expires: 30
  });
  //    console.log($.cookie("enq"));

  var sex = attr.sex;
  //    console.log("sex="+sex);
  $.cookie("sex", sex, {
    expires: 30
  });

  var fam = attr.fam_choice;
  //    console.log("fam="+fam);
  $.cookie("fam", fam, {
    expires: 30
  });

  var job = attr.job_choice;
  //    console.log("job="+job);
  $.cookie("job", job, {
    expires: 30
  });

  var alog = attr.location;
  $.cookie("loc", alog, {
    expires: 30
  });

  $('#container0').highcharts({
    chart: {
      polar: true,
      type: 'area'
    },
    title: {
      text: 'わたしのハッピー度 (' + shappy + '%)',
    },
    pane: {
      size: '80%'
    },
    xAxis: {
      categories: label,
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
    series: [{
      name: 'わたし',
      data: averages100,
      pointPlacement: 'on',
    }],
  credits: {
      enabled: false
  }


  });




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

  /* post code into pref conversion table
    by N.Kawaguchi
    [from, to, prefCode]
    from and to are top 2 digits of postal code.
*/
  var postcode = [
    [10, 20, 13],
    [21, 25, 14],
    [26, 29, 12],
    [30, 31, 08],
    [32, 32, 09],
    [33, 36, 11],
    [37, 37, 10],
    [38, 39, 20],
    [40, 40, 19],
    [41, 43, 22],
    [44, 49, 23],
    [50, 50, 21],
    [51, 51, 24],
    [52, 52, 25],
    [53, 59, 27],
    [60, 62, 26],
    [63, 63, 29],
    [64, 64, 30],
    [65, 67, 28],
    [68, 68, 31],
    [69, 69, 32],
    [70, 71, 33],
    [72, 73, 34],
    [74, 75, 35],
    [76, 76, 37],
    [77, 77, 36],
    [78, 78, 39],
    [79, 79, 38],
    [80, 83, 40],
    [84, 84, 41],
    [85, 85, 42],
    [86, 86, 43],
    [87, 87, 44],
    [88, 88, 45],
    [89, 89, 46],
    [90, 90, 47],
    [91, 91, 18],
    [92, 92, 17],
    [93, 93, 16],
    [94, 95, 15],
    [96, 97, 07],
    [98, 98, 04],
    [99, 99, 06],
    [01, 01, 05],
    [02, 02, 03],
    [03, 03, 02],
    [04, 09, 01],
    [00, 00, 01]
  ];


  // setdata into Nifty mBaaS.

  NCMB.initialize("73b2578802b76e8f77c859075be4ecf681dfb4f9830f1fbad3ce3e06731b32cc", "f58c65a4d666960b25399a1f953257d3bd09fc164d15bee3055ce04a93387d83");

  console.log("NCMB Init");

  NCMB.AnonymousUtils.logIn({
    success: function(user) {
      console.log("success login");
      var UserData = NCMB.Object.extend("UserData");
      var ud = new UserData();
      ud.set("enq", cval);
      ud.set("fam", fam);
      ud.set("sex", sex);
      ud.set("job", job);
      ud.set("name", $.cookie("name"));
      ud.set("username", $.cookie("username"));
      ud.set("fbid", $.cookie("fbid"));
      ud.set("birthday", $.cookie("birthday"));
      ud.set("location", $.cookie("location"));
      ud.set("hometown", $.cookie("hometown"));

      // どの県か判定すべし
      var pn = decodeURIComponent(alog).substr(0, 2);
//      console.log("PN=" + pn);

      var prefno = -1;
      if (0 * pn == 0) { // 郵便番号
        //         console.log("CheckNum");
        var post = 1 * pn;
        for (i = 0; i < postcode.length; i++) {
          if (post > postcode[i][0] && post < postcode[i][1]) {
            prefno = postcode[i][2];
            break;
          }
        }
      } else { // 県
        //         console.log("CheckPref");
        for (i = 0; i < 47; i++) {
          //       console.log(i+" "+pref[i] );
          if (pref[i].substr(0, 2) == pn) {
            prefno = i + 1;
            break;
          }
        }
      }
      if (prefno > 0) console.log("OK:" + pref[prefno - 1]);

      ud.save(null, {
        success: function(user) {
          console.log("success save");
          var PrefData = NCMB.Object.extend("PrefData");
          var query = new NCMB.Query(PrefData);
          query.equalTo("pref", prefno);
          query.find({
            success: function(results) {
              //      console.log("Now:Pref Count = "+results.length);
              var ar = enqParse(cval);
              if (results.length == 0) { // はじめてのデータ
                var pd = new PrefData();
                pd.set("pref", prefno);
                pd.set("myct", 1); // initial
                for (i = 0; i < ar.length; i++) {
                  pd.set("" + i, ar[i]);
                }
                pd.save(null, {
                  success: function(user) {
                    console.log("pref success save");
                  },
                  error: function(error) {}
                });

              } else {
                var pd = results[0];
                var arp = new Array(cval.length);
                for (i = 0; i < arp.length; i++) {
                  arp[i] = pd.get("" + i);
                }
                pd.increment("myct", 1);
                      var count = pd.get("myct")*1.0;
                console.log("Count is :" + count);

                    ar = aveArray(arp,ar, count);
                for (i = 0; i < arp.length; i++) {
                  pd.set("" + i, ar[i]);
                  console.log("" + ar[i] + "," + arp[i]);
                }
                pd.save(null, {
                  success: function(user) {
                    console.log("pref success inc save");
                  },
                  error: function(error) {}
                });
              }
            },
            error: function(error) {
              console.log("error" + error);
            }
          });
        },
        error: function(user) {
          console.log("fail save");
        }
      });
    },
    error: function(error) {
      console.log("error on NCMB Anon");
      console.log(JSON.stringify(error));
    }
  });
//  var user = NCMB.User.current();
//  console.log(JSON.stringify(user));

};
