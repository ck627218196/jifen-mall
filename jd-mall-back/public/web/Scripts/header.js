function qr_show(obj){
	jQuery(obj).find('.app-box').show();
}
function qr_hide(obj){
	jQuery(obj).find('.app-box').hide();
}
function alogin(){
	var url = jQuery('#retUrl').val();
	if(!url){
		url=window.location.href;
	}
	jQuery.get('/ajaxLogin.php?url='+url, function(html){
		art.dialog({
			id:'viewOnlyDiv',
			lock:true,
			fixed:true,
			content: html
			//title:'登录'
		});
	})
	
}
//关闭登录窗口
function lbox_close(){
	art.dialog({id:'viewOnlyDiv'}).close();
}
function checkAll(){
	var ret = true;
	if(jQuery('#username').val() == ''){
		jQuery('#err_username').html('请输入用户名');
		jQuery('#err_username').show();
		ret = false;
	}else{
		jQuery('#err_username').hide();
	}
	
	if(jQuery('#pwd').val() == ''){
		jQuery('#err_pwd').html('请输入密码');
		jQuery('#err_pwd').show();
		ret = false;
	}else{
		jQuery('#err_pwd').hide();
	}
	var ver = jQuery.trim(jQuery('#ver').val()).toLowerCase();
	var verifCode = getCookie('_LoginRegOtherCode');
	if(ver == ''){
		jQuery('#err_ver').html('请输入验证码');
		jQuery('#err_ver').show();
		ret = false;
	}else if(ver != verifCode){
		jQuery('#err_ver').html('请输入正确的验证码');
		jQuery('#err_ver').show();
		ret = false;
	}else{
		jQuery('#err_ver').hide();
	}
	return ret;
}
function doLogin(){
	if(checkAll()){
		var username = jQuery('#username').val();
		var pwd = jQuery('#pwd').val();
		var ver = jQuery('#ver').val();
		var ReturnUrl = jQuery('#ReturnUrl').val();
		var data ="LoginForm[username]="+username+"&LoginForm[password]="+pwd +"&cardID="+ver;
		jQuery.ajax({
			type: 'get',
			url: 'http://account.chinaxueqian.com/user/alogin',
			dataType: 'jsonp',  
			data: data+'&callback=?',  
			jsonp: 'callback',
			success:function(result) {
				if (result.code==1)	//OK
				{
					//路径处理
					if (ReturnUrl != '')
					{
						window.location.href=ReturnUrl;
					}else{	//当前页面
						window.location.reload();
					}
					art.dialog({id:'viewOnlyDiv'}).close();	//关闭					
				}else{//登录失败
					jQuery('#err_username').html('用户名或密码错误');
					jQuery('#err_username').show();
					//alert('登录失败');
					//window.location.reload();
				}
								
			},  
			timeout:3000
		});	 
		
	}
}
function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
	}
	return '';
}

/*
* @param theUrl		"验证地址"
* @param urlPath	"最终跳转地址"
* @param viewTitle	"标题"
* @param followId	"定位ID"
* @param loadFun	"要加载的方法体(当前页)"
* @param loadFunParam	"方法体参数"
*/
function layerApplyControl(theUrl,urlPath,viewTitle,followId,loadFun,loadFunParam)
{
	if (!loadFun)
	{
		var loadFun = '';
		var loadFunParam = '';
	}
	//start------ add by guojie 2015/6/25
	if(!urlPath){
		urlPath = jQuery('#ReturnUrl').val();
		if(!urlPath){
			urlPath=window.location.href;
		}
	}
	//end--------add by guojie 2015/6/25
	var setTheUrl = theUrl;
	var setData = "setUrl=" + urlPath + '&loadFun=' + loadFun + '&loadFunParam=' + loadFunParam;
	if (followId == '')
	{
		jQuery.ajax({
			type: "GET",
			url: setTheUrl,
			data:setData,
			success: function(msg){	//start
				if (!isNaN(msg))//是否为数字
				{
					$('#x_isLogin').html('');
					if (msg == '100')//有权限
					{
						if (loadFun != '')
						{
							//eval(loadFun+"();");
							eval(loadFun+"('" + loadFunParam + "');");
						}else{
							window.location.href=urlPath;
							//window.open(urlPath);
						}

					}else{//无权限，刷新当前页获取最新的处理
						alert('无权限访问');
						window.location.reload();
					}					
				}else{
					$('#x_isLogin').html('');
					art.dialog({
							id:'viewOnlyDiv',
							lock:true,
							fixed:true,
							content: msg,
							title:viewTitle
							});
				}
			}//end
		});
	}else{
		jQuery.ajax({
			type: "GET",
			url: setTheUrl,
			data:setData,
			success: function(msg){ //start
				if (msg == '1')
				{
					if (loadFun != '')
					{
						//eval(loadFun+"();");
						eval(loadFun+"('" + loadFunParam + "');");
					}else{
						window.location.href=urlPath;
						//window.open(urlPath);
					}
				}else{
					art.dialog({
							id:'viewOnlyDiv',
							lock:true,
							fixed:true,
							//follow: document.getElementById(followId),
							content: msg,
							title:viewTitle
							});
				}
			}	//end
		});
	}
}

//是否登录
function authLogin()
{
	var xLogin = document.cookie.indexOf("CookieUserLog");
	if (xLogin == -1)
	{
		//alert('您需要登录后才能再看!');
		window.location.href ="http://www.chinaxueqian.com/html/system/ziyuan.shtml";
		//window.open("http://www.chinaxueqian.com/html/system/ziyuan.shtml");
	}else{
		window.location.href ="http://ziyuan.chinaxueqian.com/";
		//window.open("http://ziyuan.chinaxueqian.com/");
	}
	//alert(xLogin);
}