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


var doit = function() {
  // URL checkURL
  var url = window.location.search;
  var attr = urlparse(url.substring(1));
  var averages100 = [];
  for (i = 0; i < values.length; i++){
    averages100.push(values[i] * 100);
  }

  // put values into chart
  //    console.log("cval="+cval);
  $.cookie("cookie_id", cookie_id, {
    expires: 30
  });
  var title = 'わたしのハッピー度 (' + shappy + '%)';
  makeChart("#container0", title, 'わたし', labels, averages100);


  NCMB.initialize("73b2578802b76e8f77c859075be4ecf681dfb4f9830f1fbad3ce3e06731b32cc", "f58c65a4d666960b25399a1f953257d3bd09fc164d15bee3055ce04a93387d83");

  console.log("NCMB Init");

  NCMB.AnonymousUtils.logIn({
    success: function(user) {
      console.log("success login");
      var UserData = NCMB.Object.extend("RailsUserData");
      var ud = new UserData();

    },
    error: function(error) {
      console.log("error on NCMB Anon");
      console.log(JSON.stringify(error));
    }
  });
};
