//投稿部分js
$(function() {
	var sWidth = $("#focus").width(); 
	var len = $("#focus ul li").length;
	var index = 0;
	var picTimer;
	$("#focus .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
	$("#focus .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
	
	
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},2500); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	
	$("#focus ul").css("width",sWidth * (len));
	function showPics(index) {
		var nowLeft = -index*sWidth;
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); 
	}
});
$(function() {
	var sWidth = $("#focus01").width(); 
	var len = $("#focus01 ul li").length;
	var index = 0;
	var picTimer;
	$("#focus01 .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
	$("#focus01 .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
	
	
	$("#focus01").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},2500); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	
	$("#focus01 ul").css("width",sWidth * (len));
	function showPics(index) {
		var nowLeft = -index*sWidth;
		$("#focus01 ul").stop(true,false).animate({"left":nowLeft},300); 
	}
});

//首页从下到上滑动效果
//$(document).ready(function(){
//	$(".xm").hover(function() {
//		$(this).find("div").animate({"top": "0"}, 300, "swing").end().find(".title").fadeOut(400);
//	},function() {
//		$(this).find("div").stop(true,false).animate({"top": "218px"}, 300, "swing").end().find(".title").fadeIn(400);
//	});
//	
//	});
$(document).ready(function(){
	$(".yszj_index_l .xm").hover(function() {
		$(this).find("div").animate({"top": "0"}, 400, "swing");
	},function() {
		$(this).find("div").stop(true,false).animate({"top": "100%"}, 300, "swing");
	});
	
	});
$(document).ready(function(){
	$(".list_result .xm").hover(function() {
		$(this).find("div").stop(true,false).animate({"top": "75"}, 300, "swing");
	},function() {
		$(this).find("div").stop(true,false).animate({"top": "222px"}, 300, "swing");
	});
	
	});
	
//$(document).ready(function(){
//	$(".zy").hover(function() {
//		$(this).find("div").animate({"top": "0"}, 300, "swing").siblings(".tips").css("display","none").end().siblings(".title").css("display","none");
//	},function() {
//		$(this).find("div").stop(true,false).animate({"top": "150px"}, 300, "swing").siblings(".tips").css("display","block").end().siblings(".title").css("display","block");
//	});
//	
//	});
	

	/*第一种形式 第二种形式 更换显示样式*/
	function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
	var menu=document.getElementById(name+i);
	var con=document.getElementById("con_"+name+"_"+i);
	menu.className=i==cursel?"hover":"";
	con.style.display=i==cursel?"block":"none";
	}
	}
