$(document).on('pageinit', '#page', function(){
   console.log(window.innerWidth);
   $('#location').change(function(){
     if ($(this).val().match(/^[0-9-]+$/)){
       $("#zipcode").val($(this).val());
       areaFromZip($(this).val(), $(this), $('#ziperror'), $('#submit'));
     }else{
       $(this).toggleClass( "loading", false);
       $('#ziperror').text('　');
       $('#submit').button('enable')
     }
   });
   if ($.cookie('cookie_id')){
     $('#hashid').val($.cookie('cookie_id'));
   }
   if($.cookie("fbid")!= undefined){
     $("#fbname").html("<h2>"+$.cookie("name")+" さん: ようこそ Happy Chartへ</h2>");
     $("#fbid").val($.cookie("fbid"));
     if (!is_data){
       $("#birthyear")[0].value = $.cookie("birthday").substr(6,4);
       if ($.cookie("location") != undefined && prefCheck($.cookie('location'))){
         $("#location")[0].value = $.cookie("location");
       }
       $("#fbname").val($.cookie("name"));
     }
   }
   /*
  $.cookie("fbid",resp.id);
  $.cookie("username",resp.username);
  $.cookie("name",resp.name);
  $.cookie("birthday",resp.birthday);
  $.cookie("location",resp.location.name);
  $.cookie("hometown",resp.hometown.name);
  */
  $("#form").submit(function(e) {
    var self = this;
    if (validate()){
      return true;
    }else{
      e.preventDefault();
      return false;
    }
  });
});
var validate = function(){
  if (!prefCheck($('#location').val())){
    $('#ziperror').text('住所は都道府県から入力するか、正しい郵便番号を入れて下さい');
    return false;
  }
  return true;
}
