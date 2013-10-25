function areaFromZip(zipcode, target, error){
  $.ajax({
    url: "http://zipcloud.ibsnet.co.jp/api/search?zipcode=" + zipcode ,
    dataType : "jsonp",
    jsonp: 'callback',
    context : target,
    beforeSend : function(){
      target.toggleClass( "loading", true);
      error.text('　');
    },
    success : function(data) {
      if (data.results && data.results.length > 0){
        rec = data.results[0];
        target.val(rec.address1 + rec.address2)
        target.toggleClass( "loading", false);
      }else{
        error.text('存在しない郵便番号です');
      }
    },
    error : function(){
      error.text('郵便番号から住所を取得するのに失敗しました');
    }
  });
}
