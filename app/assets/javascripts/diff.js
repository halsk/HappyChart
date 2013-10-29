//
//
//  diff.js show two area
//
function urlparse(d) {
  var p = d.replace(/([^&])&([^&])/g, '$1\n$2').replace(/&&/g, '&').split('\n');
  var pp = {};
  for (var i = 0; i < p.length; i++) {
    var tmp = p[i].split('=');
    pp[tmp[0]] = tmp[1];
  }
  return pp;
}

function gojapan(){
    document.location="japan.html"
}

NCMB.initialize("73b2578802b76e8f77c859075be4ecf681dfb4f9830f1fbad3ce3e06731b32cc", "f58c65a4d666960b25399a1f953257d3bd09fc164d15bee3055ce04a93387d83");

function queryPref(){
  var url = window.location.search;
  var params = urlparse(url.substring(1))
  var selpref = params["pref"]
  //  check selected pref
  console.log("pref is "+selpref);
  if(selpref.length ==0 ){
    console.log("no pref");
    selpref=23;// default aichi
  }
  makeChart('#container0', 'わたしの幸せ','わたし', labels, values1, '#66cc00');
  makeChart('#container1', PREF[selpref -1] + 'の幸せ','みんな', labels, values2, '#0066cc');
}

$(window).load(
  function(){
    console.log("Loading..");
    queryPref();
  }); // window load


