var _t;
function Slideshow(nums)
{
	if (!nums && (nums != '0'))
	{
		//alert('dd');
		var nums = $('#nextImgNums').val();	
		//alert(nums);
	}
	var nums = parseInt(nums);
	
	var nextNums = nums + 1;
	if (nextNums == 4) { nextNums = 0; }
	$('#nextImgNums').val(nextNums);	//一个要显示的图ID

	//if (nums === 6) { nums = 0; }

	var _con = $('#gg');
	var _box = _con.find('#ggBox');
	var _btns = _con.find('#ggBtns');
	
	//优化设置不同的样式 start
	for(x=0;x<5;x++)
	{
		_btns.find('a:eq(' + x + ')').removeClass('ggOn_'+x);
	}
	_btns.find('a:eq(' + nums + ')').addClass('ggOn_'+nums);
	$('#ggb').removeClass();
	$('#ggb').addClass('ggb_'+nums);
	//优化设置不同的样式 start
    
	//_btns.find('a:eq(' + nums + ')').addClass('ggOn').siblings().removeClass('ggOn');

    var curr = _box.find('a:eq(' + nums + ')'), prev = curr.siblings();
    prev.css('z-index', 2);
    curr.css('z-index', 3).animate({
		'opacity': 1
     }, 150, function () {
         prev.css({
          'z-index': 1, 'opacity': 0.1
       });
    });
	window.clearTimeout(_t);
	_t = window.setTimeout("Slideshow()", 6000);
}

$('#nextImgNums').val(1);	//防涮页面不归整
$(function () {
	_t = window.setTimeout("Slideshow()", 6000);
});
var __con = $('#gg');
__con.hover(function () {window.clearTimeout(_t);}, function (){
	Slideshow();
});


function sleep(millis)
{
    var njf1 = njen(this,arguments,millis);
    nj:
    while(1) 
    {
        try
        {
            switch(njf1.cp)
            {
                case 0:
                    njf1._notifier=NjsRuntime.createNotifier();
                    setTimeout(njf1._notifier,njf1._millis);
                    njf1.cp = 1;
                    njf1._notifier.wait(njf1);
                    return;
                case 1:
                    break nj;
            }
        }
        catch(ex)
        {
            if(!njf1.except(ex,1))
            return;
        }
    }
    njf1.pf();
}
/*
function changeImg(nums)
{		
	//var _loop = setInterval(Slideshow, 5000);
	//clearInterval(_loop);
	//window.clearInterval(item);
	//var item = null;
	//item = setInterval(Slideshow, 5000);
	//_auto_type('clear');
	window.clearTimeout(_t);
	Slideshow(nums);
}
*/