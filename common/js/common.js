$(function(){
	/*下拉购物袋的显隐设置*/
	$("#cart").hover(
		function(){
		$(this).addClass("active");
		$("#cart_down").css("display","block");
	},function(){
		$(this).removeClass("active");
		$("#cart_down").css("display","none");
	});
	$("#cart_down").hover(function(){
		$(this).css("display","block");
		$("#cart").addClass("active");
	},function(){
		$(this).css("display","none");
		$("#cart").removeClass("active");
	})
	
	/*下拉个人中心*/
	$("#logined>li").hover(
		function(){
		$(this).addClass("active");
		$("#logined ul").addClass("active");
	},function(){
		$(this).removeClass("active");
		$("#logined ul").removeClass("active");
	});
	$("#logined ul").hover(function(){
		$(this).addClass("active");
		$("#logined>li").addClass("active");
	},function(){
		$(this).removeClass("active");
		$("#logined>li").removeClass("active");
	})
	//跟随小块
	$("#logined ul li").hover(function(e){
		$("#hint").css({display:"block",left:e.clientX-190,top:e.clientY+12});
		//console.log(e.offsetX+" "+e.offsetY)
		$("#hint").html($(this).children("a").text().match(/^([\u4e00-\u9fa5]+).*$/)[1]);
	},function(){
		$("#hint").css({display:"none"})
	});
	/*搜索框*/
	$("#inp").focus(function(){
		if(inp.placeholder!=null){
			inp.placeholder="";
		}
	});
	$("#inp").blur(function(){
		if($(this).val()==""){
			inp.placeholder="2016年早秋新品";
		}
	})
	
	/*导航条的下拉菜单*/
	var timer;
	$(".nav ul li").slice("2","8").hover(
	/*移入出现下拉菜单：悬浮到导航出现对应的下拉菜单*/
	function(){
		var $currentNav=$(".nav-down").eq($(this).index()-2);//当前下拉菜单
		$currentNav.addClass("active");
		/*下拉菜单的变化图：自动轮播当前下拉菜单的图片*/
		var $ncImgs=$currentNav.find(".nc_img");//当前下拉菜单的轮播图片
		var i=$currentNav.index();
		//console.log(i);
		$ncImgs.each(function(index){
			clearInterval(timer);
			var $imgs=$ncImgs.eq(index).children("a");//每个下拉菜单的变化图的总数
			var ncIndex=0;
			timer=setInterval(function(){
				//console.log($imgs.size()-1+" "+ncIndex)
				if(ncIndex==$imgs.size()-1){
					ncIndex=0;
				}else{
					ncIndex++;
				}
				//
				$imgs.eq(ncIndex).addClass("active").siblings().removeClass("active");
				//console.log($imgs.eq(ncIndex).html())
			},2000);
		});
	},
	
	function(){
		var $currentNav=$(".nav-down").eq($(this).index()-2);//当前下拉菜单
		$currentNav.removeClass("active");
		clearInterval(timer);
	});
	/*移入移出下拉菜单事件：移入保持显示，移出消失*/
	$(".nav-down").hover(
		function(){
			$(this).addClass("active");
		},function(){
			$(".nav-down").removeClass("active");
		}
	)
	/*侧边栏*/
	//大侧边栏与小侧边栏的显隐
	$("#show").click(function(){
		$(".small-toolBar").css("display","none");
		$(".big-toolBar").css("display","block");
	});
	$("#hide").click(function(){
		$(".small-toolBar").css("display","block");
		$(".big-toolBar").css("display","none");
	});
	//回到顶部
	$("#toTop_small,#toTop_big").click(function(){
		$("body,html").animate({scrollTop:0},500);
	})
	/*登录的cookie操作*/
	var userStr=$.cookie("loginUsers");
	
	if(userStr){
		$("#nlogined").css("display","none");
		$("#logined").css("display","block");
		$("#user").html(userStr);
	}else{
		$("#nlogined").css("display","block");
		$("#logined").css("display","none");
	}
	
	$("#logout").click(function(){
		$.removeCookie("loginUsers",{path:"/"});
		$("#nlogined").css("display","block");
		$("#logined").css("display","none");
	})
	
})