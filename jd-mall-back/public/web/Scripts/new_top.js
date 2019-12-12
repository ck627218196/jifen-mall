jQuery(document).ready(function(){
  jQuery('.toolsublit').hover(
	  function () {
		  var $th = jQuery(this);
		  $th.find(".toolbox-simple").attr('style','background:#fff;');
		  $th.find("a:first").attr('style','color:#434343');
		  if($th.find("em").length != 0 ){
			  $th.find("em").addClass("subicon-drop");
		  }
		  $th.find('.sublist-box').slideDown('fast');
	  },
	  function () {
		  var $th = jQuery(this);
		  $th.find(".toolbox-simple").attr('style','');
		  $th.find("a:first").attr('style','');
		  if($th.find("em").length != 0 ){
			  $th.find("em").removeClass("subicon-drop");
		  }
		 $th.find('.sublist-box').slideUp(100);
	}
  );

});

//专题页top效果

jQuery(document).ready(function(){
  jQuery('.logo_top').hover(
	  function () {
		  var $th = jQuery(this);
		  if($th.find("em").length != 0 ){
			  $th.find("em").addClass("subicon-drop");
		  }
		  $th.find('.sub_list').slideDown('fast');
	  },
	  function () {
		  var $th = jQuery(this);
		  if($th.find("em").length != 0 ){
			  $th.find("em").removeClass("subicon-drop");
		  }
		 $th.find('.sub_list').slideUp(100);
	}
  );

});


function submobile()
{

	var mobile = jQuery("#mobile_id").val();
	var phone = jQuery.trim(jQuery("#mobile_id").val());	
		var reg = /^0?1[358]\d{9}$/;
		if(!reg.test(phone)){
			jQuery('#mobile_id').addClass(' input-err');
			//alert("请输入正确的手机号！");
			jQuery("#my_phone_error").show();
			jQuery("#my_phone_error").html("请输入正确的手机号！");
			
		}else{
			jQuery('#mobile_id').removeClass('input-err');
			jQuery.ajax({
					type: "GET",
					url: "http://www.chinaxueqian.com/Home/mobile.php",
					data: "mobile="+mobile+"&callback=?",
					dataType : "jsonp",
					jsonp:'callback',  
					success: function(data){
					
						if(data == 1){
							
							jQuery('#lock_phone_node').removeClass('prompt-wapper');
							jQuery('#my_info_phone_node').hide();
							alert("成功！");
						}
						
						if(data == "-1"){
							// $("#web-headbar").colorbox.close();
							jQuery('#mobile_id').addClass('input-err');
							jQuery("#my_phone_error").show();
							jQuery("#my_phone_error").html("手机号添加失败！");
						}
						
						if(data == "-2"){
							// $("#web-headbar").colorbox.close();
							jQuery('#mobile_id').addClass('input-err');
							jQuery("#my_phone_error").show();
							jQuery("#my_phone_error").html("请输入正确的手机号！");
						}
						
						if(data == "-3"){
							// $("#web-headbar").colorbox.close();
							jQuery('#mobile_id').addClass('input-err');
							jQuery("#my_phone_error").show();
							jQuery("#my_phone_error").html("请先登录后在设置手机号！");
							
						}
					}
			});
		}

}

//关闭层
function moblieClose()
{
	jQuery('#lock_phone_node').removeClass('prompt-wapper');
	jQuery('#my_info_phone_node').hide();
}

//关闭电话提示层
function close_tel_show()
{
	jQuery('#tel_show_view').hide();
	jQuery('#web-headbar').css('height','32px');	
}

//得到焦点加载
function focus_msg_view(that)
{
	if (that.value =='请输入您的手机号'){that.value ='';that.style.color="#666"};
	
	
}

//移开焦点加载
function blur_msg_view(that)
{
	if (that.value ==''){that.value='请输入您的手机号';};
}