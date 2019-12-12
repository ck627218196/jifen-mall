
/* 
功能：保存cookies函数  
参数：name，cookie名字；value，值 
*/ 
  function SetCookie(name,value){  
    var Days = 30*12;   //cookie 将被保存一年  
    var exp  = new Date();  //获得当前时间  
  //  exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒 
 exp.setTime(exp.getTime() + 60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";domain=.chinaxueqian.com;path=/" ;
} 



 //SetCookie("wwwtype","");

/* 
功能：获取cookies函数  
参数：name，cookie名字 
*/
/*  
function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
     return unescape(arr[2]);   
    }else{  
     return null;  
    }  
} 
var wwwtype = getCookie("wwwtype");

if(wwwtype=="hubei"){
	$("#wwwgps").hide();
	$("#hubei_gps").show();
}else{
   $("#hubei_gps").hide();
	$("#wwwgps").show();
	
	
}
*/

/* 
功能：删除cookies函数  
参数：name，cookie名字 
*/  
  
function delCookie(name){  
    var exp = new Date();  //当前时间  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";domain=.chinaxueqian.com;path=/";  
}

delCookie("wwwtype"); 
