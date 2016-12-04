$(function(){
	/*放大镜*/
	$("#small_box").hover(function(){
		$("#img_focus").css("display","block");
		$("#big_box").css("display","block");
		$(this).mousemove(function(e){
			//console.log($(this).offset().top)
			//设置小浮块的坐标
			var toLeft=e.pageX-$(this).offset().left-$("#img_focus").width()/2;
			var toTop=e.pageY-$(this).offset().top-$("#img_focus").height()/2; 
			/*水平限制*/
			var maxLeft=$(this).width()-$("#img_focus").width();
			if(toLeft>=maxLeft){
				toLeft=maxLeft;
			}else if(toLeft<=0){
				toLeft=0;
			}
			/*垂直限制*/
			var maxTop=$(this).height()-$("#img_focus").height();
			if(toTop>=maxTop){
				toTop=maxTop;
			}else if(toTop<=0){
				toTop=0;
			}
			$("#img_focus").css({left:toLeft,top:toTop});
			//根据算出来的倍数移动大图片
			var rate=($("#big_box img").width()-$("#big_box").width())/
			($(this).width()-$("#img_focus").width());
			//console.log(rate)
			$("#big_box img").css({left:-rate*toLeft,top:-rate*toTop});
		})
	},function(){
		$("#img_focus").css("display","none");
		$("#big_box").css("display","none");
	});
	
	/*tab切换*/
	//点击tab事件
	var tabIndex=0;
	var len=$("#listBox li").size();
	$("#listBox li").click(function(){
		tabIndex=$(this).index();
		adjustAll();
	})
	//点击左 右按钮事件：
	$("#cl_tabs a").eq(0).click(function(){
		tabIndex--;
		if(tabIndex<=0){
			tabIndex=0;
		}
		adjustAll();
	});
	$("#cl_tabs a").eq(1).click(function(){
		tabIndex++;
		if(tabIndex>=len-1){
			tabIndex=len-1;
		}
		adjustAll();
	});
	//调整所有的样式：改变tab样式，切换对应图片，移动tab到中央
	function adjustAll(){
		$("#listBox li").eq(tabIndex).addClass("active").siblings().removeClass("active");
		$("#small_box img,#big_box img").attr("src","images/clothes_show"+(tabIndex+1)+".jpg");//换图
		adjustPosition($("#listBox li").eq(tabIndex));
	}
	//调整tab的位置
	function adjustPosition($obj){
		var ind=tabIndex+1;
		console.log(len);
		if(ind==1||ind==2){
			$("#listBox").animate({left:0});
		}else if(ind==len||ind==len-1){
			$("#listBox").css("left",-(($obj.width()+10)*(len-5)+10));
		}else{
			$("#listBox").animate({left:-(($obj.width()+10)*(ind-3)+10)});
		}
	}
	
	/*下拉框*/
	var clickedTime=0;
	$(".choice a.select").click(function(){
		$(".choice div").slideDown();
		return false;
	})
	$(".choice div a").click(function(){
		$(".choice a.select b").text($(this).text());
	})
	$(document).click(function(){
		$(".choice div").css("display","none");
	})
	/*跟随小块*/
	//图片内的跟随小块
	$("#clothes_demo").hover(function(e){
		$("#hint").fadeIn().css({left:e.pageX-185,top:e.pageY});
		$("#hint").html($("#clothes_name").text().match(/^([\u4e00-\u9fa5]+)：([\u4e00-\u9fa5]+)$/)[2]);
	},function(){
		$("#hint").css({display:"none"})
	});
	//加入清单的跟随小块
	$("#addList").hover(function(e){
		$("#hint").fadeIn().css({left:e.pageX-190,top:e.pageY+10});
		$("#hint").html($(this).text());
	},function(){
		$("#hint").css({display:"none"})
	});
	//加入购物车悬浮事件
	$("#addCart").hover(function(e){
		$("#hint").fadeIn().css({left:e.pageX-190,top:e.pageY+10});
		$("#hint").html($(this).children("span").text());
	},function(){
		$("#hint").css({display:"none"})
	});
	
	/*尺码*/
	var sizeIndex=4;
	$(".size b").hover(function(){
		$(this).addClass("active").siblings().not($(".size b").eq(sizeIndex)).removeClass("active");//样式设置
		$("#hover"+($(this).index()+1)).fadeIn();//下拉详细码表
	},function(){
		$("#hover"+($(this).index()+1)).fadeOut();//下拉详细码表
		$(".size b").not($(".size b").eq(sizeIndex)).removeClass("active");//样式设置
	})
	/*尺码的点击事件*/
	var isClicked=false;//是否已经选择尺码的标记
	$(".size b").click(function(){
		isClicked=true;
		sizeIndex=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
	})
	/*商品详情区*/
	//滚动到一定距离导航条相对浏览器定位
	$(window).scroll(function(){
		if($(this).scrollTop()>=800){
			$(".infor_nav").addClass("fixed").children("#infor_nav5").fadeIn();
		}else{
			$(".infor_nav").removeClass("fixed").children("#infor_nav5").fadeOut();
		}
		//滚动页面时到对应模块改变导航样式
		//console.log($(this).scrollTop())
		if(!upkeepClicked){//如果当前点击的不是售后与服务
			if($(this).scrollTop()<=2355){
				$("#infor_nav1").addClass("active").removeClass("rn").siblings().removeClass("active").removeClass("rn");
				
			}else if($(this).scrollTop()<=2855){
				$("#infor_nav2").addClass("active").siblings().removeClass("active");
				$("#infor_nav1").addClass("rn").siblings().removeClass("rn");
			}else {
				$("#infor_nav3").addClass("active").siblings().removeClass("active");
				$("#infor_nav2").addClass("rn").siblings().removeClass("rn");
			}
		}
		
	})
	//切换导航栏的样式
	$(".infor_nav li").click(function(){
		$(this).addClass("active").siblings().removeClass("active").eq($(this).index()-1).addClass("rn").siblings().removeClass("rn");
		$(".upkeep-after").css("display","none").siblings("div").css("display","block");
		$(".review").css("display","block");
	})
	var upkeepClicked=false;//是否点击的是售后与服务
	//导航栏的定位
	$("#infor_nav1").click(function(){
		upkeepClicked=false;
		$("body,html").scrollTop(856);
	})
	$("#infor_nav2").click(function(){
		upkeepClicked=false;
		$("body,html").scrollTop(2381);
	})
	$("#infor_nav3").click(function(){
		upkeepClicked=false;
		$("body,html").scrollTop(2901);
	})
	$("#infor_nav5").click(function(){
		upkeepClicked=false;
		$("body,html").animate({scrollTop:0},1000);
	})
	
	
	

	//点击售后，其他详情及评论区均隐藏，显示售后模块
	$("#infor_nav4").click(function(){
		upkeepClicked=true;
		$(".upkeep-after").css("display","block").siblings("div").css("display","none");
		$(".review").css("display","none");
		$("body,html").scrollTop(800);
	})
	
	/*用户评论区*/
	//导航栏
	$(".review_nav li").click(function(){
		//切换导航栏的样式
		$(this).addClass("active").siblings().removeClass("active").eq($(this).index()-1).addClass("rn").siblings().removeClass("rn");
		$(".review_nav li").eq(2).removeClass("rn")
		$(".rb_content>div").eq($(this).index()).css("display","block").siblings("div").css("display","none");
		
	});
	//点击排序栏
	$("ul.sort li").click(function(){
		$(this).children("a").addClass("active");
		$(this).siblings().children("a").removeClass("active");
	})
	//全部评论区的有无评论的显隐
	//console.log($(".review_all").children(".user_words").size())
	if($(".review_all").children(".user_words").size()==0){
		$(".all_blank").css("display","block");
		$(".review_all .pagination").css("display","none");
	}else{
		$(".all_blank").css("display","none");
		$(".review_all .user_words").css("display","block");
		$(".review_all .pagination").css("display","block");
	}
	//图片评论区的有无评论的显隐
	if($(".review_img").children(".user_words").size()==0){
		$(".img_blank").css("display","block");
		$(".review_img .pagination").css("display","none");
	}else{
		$(".img_blank").css("display","none");
		$(".review_img .user_words").css("display","block");
		$(".review_img .pagination").css("display","block");
	}
	
	//其他评论的分页
	var filename="page1.json";
	function loadPage(){
		$.get("data/"+filename,null,function(data){
			$("#review_content").empty();
			for(var i=0;i<data.length;i++){
				$("#review_content").append('<div class="user_words clearfix">'+
											'<dl>'+
												'<dt><img src="'+data[i].userImg+' "/></dt>'+
												'<dd>'+
													'<p>'+data[i].user+'</p>'+
													'<span>'+data[i].vip+'</span>'+
												'</dd>'+
											'</dl>'+
											'<a href="javascript:;"><img src="'+data[i].goodImg+'"/></a>'+
											'<ul>'+
												'<li><b>综合：</b><span class="star"+ style="backgroundPosition:0 '+data[i].startLevel+'"></span></li>'+
												'<li><b>尺码：</b><span>'+data[i].size+'</span></li>'+
												'<li><b>评论：</b><span>'+data[i].review+'</span></li>'+
												'<p><span class="last">'+data[i].colorAndsize+'</span></p>'+
											'</ul>'+
											'<p>'+data[i].date+'</p>'+
										'</div>');
			}
		});
		//showOther();
	}
	loadPage();
	$("#other_pages a").click(function(){
		//$(this).addClass("active").siblings().removeClass("active");
		
		var className=$(this).attr("class");
		var fIndex = parseInt(filename.match(/^\D*(\d+)\D*$/)[1]);
		if(className=="previous"){
			console.log("shang")
			fIndex--;
			if(fIndex < 1){
				fIndex = 1;
			}
		}else if(className == "next"){
			console.log("xia")
			fIndex++;
			if(fIndex > 5){
				fIndex = 5;
			}
		}
		if(/^p(\d+)$/.test(className)){
			fIndex = parseInt(className.match(/^p(\d+)$/)[1]);
			console.log(fIndex)
		}
		filename = "page" + fIndex + ".json";
		
		loadPage();
	});
	//其他产品的有无评论的显隐
	//console.log($(".review_other").children(".user_words").size())
	/*function showOther(){
		if($(".review_other").find(".user_words").size()==0){
			$(".review_nav li").eq(2).css("display","none");
			$("#other_pages").css("display","none");
		}else{
			$(".review_nav li").eq(2).css("display","block");
			$("#other_pages").css("display","block");
		}
	}*/
	
	/*曾浏览的显隐*/
	if($(".browsed").children("dl").size()==0){
		$(".browsed").css("display","none");
	}else{
		$(".browsed").css("display","block");
	}
	
	//点击与用户有关的按钮的操作：若已登录直接操作，若没登录，跳转到登录页面
	$("#addList,#addCart,#enterStore,#concern").click((function(){
		var userStr=$.cookie("loginUsers");
		if(!userStr){
			window.location.href="../../usersManage/login.html";
		}
	}))
	/*购物袋的cookie更新*/
	/*购物袋的数据*/
	//页面加载完成后先获取原有的cookie
	loadCart();
	function loadCart(){
		var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
		var cartObj=JSON.parse(cartStr);
		var totalNum=0;//总商品数量
		var proNum=0;//各个商品数量
		var totalprice=0;//总价
		for(var goodId in cartObj){
			totalNum+=cartObj[goodId].num;
			proNum=cartObj[goodId].num;
			totalprice+=cartObj[goodId].num*cartObj[goodId].price;
		}
		/*创建总列表*/
		$('<div class="cart-down-content" id="cart_down_content">'+
			'<div class="cart-total clearfix">'+
				'<ul>'+
					'<li>数量共计：<span class="goodNum">'+totalNum+'</span>件</li>'+
					'<li>金额共计：<span class="totalPrice">￥'+
					totalprice+'</span></li>'+
				'</ul>'+
				'<a href="../shoppingCart/shoppingCart.html" id="goCart" class="goTo">结算</a>'+
			'</div>'+
			'<div class="cart-good-list">'+
			'</div>'+
		'</div>').appendTo("#cart_down");
		/*如果有商品，则创建列表，无则显示为空模块*/
		if(cartStr=="{}"){
			$("#cart_down_blank").css("display","block");
			$("#cart_down_content").css("display","none");
		}else{
			$("a#cart").html('<a id="cart">购物袋 ('+totalNum+') ▼</a>');
			$("#cart_down_blank").css("display","none");
			$("#cart_down_content").css("display","block");
			cartObj[goodId].num=proNum;
			
			//console.log(goodId)
			/*创建每个商品的列表*/
			for(var id in cartObj){
				createList(cartObj[id],id);
			}
		}
	}
	/*创建每个商品的列表*/
	function createList(info,id){
		$('<div class="cart-good" data-good-id='+id+'>'+
			'<dl>'+
				'<dt>'+
					'<a href="javascript:;"><img src="'+info.src+'" class="goodImg"/></a>'+
				'</dt>'+
				'<dd>'+
					'<a href="javascipt:;" class="goodName">'+info.brand+'</a>'+
					'<a href="javascipt:;" class="goodDesc">'+info.name+'</a>'+
					'<span class="goodPrice">￥'+info.price+'</span>'+
					'<p><a href="javascipt:;" class="delete">删除</a></p>'+
				'</dd>'+
			'</dl>'+
		'</div>').appendTo(".cart-good-list");
		//console.log($(".delete"))
		//console.log(info.agoprice);
	}
	
	$("#addCart").click(function(){
		/*辨别用户是否已经选择尺码*/
		if(!isClicked){
			$(".choice>span.cr_tip").css("display","inline-block");
		}
		else{
			$(".choice>span.cr_tip").css("display","none");
			//获取当前商品的相关信息
			var goodId=$(this).parents(".clothes").attr("data-good-id");
			var goodBrand=$(this).parents(".choice").siblings(".intro").children("a").html();
			var goodName=$(this).parents(".choice").siblings(".intro").children("h3").html();
			var goodColor=$(this).parent().siblings("#clothes_name").html();
			//var goodSrc=$(this).parents(".clothes").find("#big_box img").attr("src");
			var goodSrc="../common/images/cart_good1.jpg";
			var goodSize=$(this).parent().siblings("p.size").children("b.active").html();
			goodId=goodId+"-"+goodSize;
			var goodPrice=$(this).parents(".choice").siblings(".intro").find("i").text();
			goodPrice=goodPrice.match(/^￥(\d+\.*\d*)$/)[1];
			var goodAgoPrice=$(this).parents(".choice").siblings(".intro").find("del").text();
			//goodAgoPrice=goodPrice.match(/^￥(\d+\.*\d*)$/);
			
			var goodNum=$(this).parent().siblings("a.select").children("b").text();
			goodNum=parseInt(goodNum);
			//console.log(goodNum)
			//取出原有的cookie,若有直接数量+指定数量，若无，则创建一个新的
			var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
			var cartObj=JSON.parse(cartStr);
			if(goodId in cartObj){
				cartObj[goodId].num+=goodNum;
			}else{
				cartObj[goodId]={
					brand:goodBrand,
					name:goodName,
					color:goodColor,
					src:goodSrc,
					size:goodSize,
					price:goodPrice,
					agoprice:goodAgoPrice,
					num:goodNum,
					collect:"收藏"
				}
			}
			//更新页面上的购物车数据
			var totalNum=parseInt($("a#cart").html().match(/\D*(\d+)\D*/)[1]);
			totalNum+=goodNum;
			$("a#cart").html('<a id="cart">购物袋 ('+totalNum+') ▼</a>');
			$(".goodNum").text(totalNum);
			//console.log(totalNum)
			var totalPrice=parseInt($(".totalPrice").html().match(/\D*(\d+)/)[1]);
			totalPrice=totalPrice+goodNum*cartObj[goodId].price;
			$(".totalPrice").html('￥'+totalPrice)
			//更新cookie的数据
			cartStr=JSON.stringify(cartObj);
			$.cookie("cart",cartStr,{expires:7,path:"/"});
			
			createList(cartObj[goodId],goodId);
			window.location.reload();
		}
	});
	
	//购物袋删除按钮的点击事件
	$(".delete").click(function(){
		var goodId=$(this).parents(".cart-good").remove().attr("data-good-id");
		var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
		var cartObj=JSON.parse(cartStr);
		var goodNum=cartObj[goodId].num;
		//更新总计数量
		$(".goodNum").text(function(index,originText){
			return originText-goodNum;
		})
		//更新购物袋数量
		$("#cart").html(function(index,originHTML){
			var totalNum=parseInt($(this).html().match(/\D*(\d+)\D*/)[1]);
			return '<a id="cart">购物袋 ('+(totalNum-goodNum)+') ▼</a>';
		})
		//更新总价
		$(".totalPrice").html(function(index,originHTML){
			var totalPrice=parseInt($(this).html().match(/\D*(\d+)/)[1]);
			return '￥'+(totalPrice-goodNum*cartObj[goodId].price);
		})
		
		delete cartObj[goodId];
		cartStr=JSON.stringify(cartObj);
		$.cookie("cart",cartStr,{expires:7,path:"/"});
		if(cartStr=="{}"){
			$("#cart_down_blank").css("display","block");
			$("#cart_down_content").css("display","none");
		}
		
	})













})