//资源分类导航
$(document).ready(function()
{
	$('#modify').hover(function()
	{
		$('#modify .sidebar').show();
		$(this).find('em:first').css('background-position','0 -10px')	
	}, function()
	{
		$('#modify .sidebar').hide();
		$(this).find('em:first').css('background-position','0 0px')	
	})	
});
$(document).ready(function()
{
	$('#modify .list_li').mouseenter(function()
	{
		//var n=$(this).index();
		$(this).find('div.list_l').css('border','none')	
		$(this).find('.list_r').show();
		//$(this).css('background','red')
		
		$(this).siblings().find('.list_r').hide();
		
	})
	$('#modify .list_li').mouseleave(function()
	{
		//var n=$(this).index();	
		$(this).find('.list_r').hide();
		$(this).find('div.list_l').css('border-bottom','1px solid #2d4767')	
	})

	$('.banner_page .btn_list li').click(function()
	{
		 $(this).addClass('on').siblings('li').removeClass('on')
		 $('.banner_page .banner_box li').eq(n).show().siblings().hide();	
	})

	$('.banner_pagex .btn_list li').click(function()
	{
		 var n=$(this).index();
		 $(this).addClass('on').siblings('li').removeClass('on')
		 $('.banner_pagex .banner_box li').eq(n).show().siblings().hide();	
	})

	$('.live_con_pic').hover(function(){
		$(this).children('.live_con_top').stop(true,true).delay(100).animate({'height':225,opacity:0.9},300);
	},function(){
		$(this).children('.live_con_top').stop(true,true).animate({'height':125,opacity:1},200);
	});
	
});


//导航的js
$(document).ready(function()
{
//	$('.sidebar ul li').each(function(i)
//	{
//		$(this).find('.list_r li').last().css('border','none')	
//	})
	$('#modify .sidebar .list_li').last().css({'height':'108px','border-bottom':'1px solid #dadada'})
		
	$('#index .sidebar').show();
	$('#index #modify').hover(function()
	{
		$('#modify .sidebar').show();
		$(this).find('em:first').css('background-position','0 -10px')	
	}, function()
	{
		$('#index #modify .sidebar').show();
		$(this).find('em:first').css('background-position','0 -10px')
	})	

})




