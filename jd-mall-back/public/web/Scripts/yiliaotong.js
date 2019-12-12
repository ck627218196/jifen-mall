function openJesongChat(c,tar){
	  	if("undefined" == typeof jesong){
	  		var p='';
			if( c == 'c'){
			p = 'n='+tar;
			}else if(c == 'g'&&tar!=null&&tar!='0'){
				p = 'g=' + tar;
			openNoJesongJsChat(p);
			}
	  	}else{
	  		jesong.win.openChat(c,tar);
	  	}
		return false;
  	}	
  	function openNoJesongJsChat(c){
				var url = "http://live.jswebcall.com/live/" +'chat.dll?c=2001';
				url = url +"&chatUrl="+window.encodeURIComponent(window.location.href);
				if(getCook("im_refer")){
					url = url +"&refer="+window.encodeURIComponent(getCook("im_refer"));
				}
				 if( typeof c == 'string' &&c.length !=0 ){
					url += '&'+c;
				}
				var p = "height=500,width=800,directories=no,location=no,menubar=no,resizeable=no,status=no,toolbar=no,top=100,left=200";
				try{
					var cw = window.open(url,'chat_'+1,p);cw.focus();
				}catch(e){
					if(c.force)window.location = url;				
				}
  	}