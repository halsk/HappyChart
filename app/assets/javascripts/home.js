$(document).ready(function(){
   console.log(window.innerWidth);
   if(window.innerWidth < 640){
   var fs = $("fieldset");
   for(i = 0 ; i < 9; i++){
       fs[i].attributes.removeNamedItem("data-type");
   }}
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
     $("#birthyear")[0].value = $.cookie("birthday").substr(6,4);
     if ($.cookie("location") != undefined){
       $("#location")[0].value = $.cookie("location");
     }
     $("#fbid").val($.cookie("fbid"));
     $("#fbname").val($.cookie("name"));
   }
   /*
  $.cookie("fbid",resp.id);
  $.cookie("username",resp.username);
  $.cookie("name",resp.name);
  $.cookie("birthday",resp.birthday);
  $.cookie("location",resp.location.name);
  $.cookie("hometown",resp.hometown.name);
  */
  });
