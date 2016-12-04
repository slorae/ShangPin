window.onload=function(){
	/*转换布局*/
	function switchLayout(dom){
		for(var i=0;i<dom.length;i++){
			dom[i].style.left=dom[i].offsetLeft+"px";
			dom[i].style.top=dom[i].offsetTop+"px";
		}
		for(var i=0;i<dom.length;i++){
			dom[i].style.position="absolute";
		}
	}
	/*悬浮时图片向左移动4px*/
	function moveDom(dom){
		for(var i=0;i<as.length;i++){
			dom[i].index=i;
			dom[i].originLeft=dom[i].offsetLeft;
			//console.log(dom[i].originLeft)
			dom[i].onmouseenter=function(){
				move(this,{left:parseInt(this.originLeft)-4});
				
			}
			dom[i].onmouseleave=function(){
				move(this,{left:parseInt(this.originLeft)});
			}
		}
	}
	/*热门潮流*/
	/*logo区*/
	var as=document.querySelectorAll(".logo_l a,.logo_r a");
	switchLayout(as);
	moveDom(as);
	/*商品区logo悬浮向左移动*/
	var dls=document.querySelectorAll(".market_product dl");
	var dds=document.querySelectorAll(".market_product dl dd");
	var dts=document.querySelectorAll(".market_product dl dt");
	for(var i=0;i<dls.length;i++){
			dls[i].index=i;
			dds[i].originLeft=dds[i].offsetLeft;
			dts[i].originLeft=dts[i].offsetLeft;
			//console.log(dom[i].originLeft)
			dls[i].onmouseenter=function(){
				var index=this.index;	
				move(dds[index],{left:parseInt(dds[index].originLeft)-4});
				move(dts[index],{left:parseInt(dts[index].originLeft)-4});
				
			}
			dls[i].onmouseleave=function(){
				var index=this.index;
				move(dds[index],{left:parseInt(dds[index].originLeft)});
				move(dts[index],{left:parseInt(dts[index].originLeft)});
			}
		}

}
$(function(){
	//$(".nc_img img").
	/*banner轮播图*/
	var $pics=$(".banner_b a");
	var index=0;
	function carouselBanner(){
		index++;
		if(index==$pics.length){
			index=0;
		}
		letsShow();
	}
	var timer=setInterval(carouselBanner,4000);
	function letsShow(){
		$pics.eq(index).fadeIn(500).siblings("a").fadeOut(500);
	}
	letsShow();
	$(".banner_b p").eq(0).click(function(){
		clearInterval(timer);
		index++;
		if(index==$pics.length){
			index=0;
		}
		letsShow();
		timer=setInterval(carouselBanner,2000);
	});
	$(".banner_b p").eq(1).click(function(){
		clearInterval(timer);
		index--;
		if(index==0){
			index=$pics.length;
		}
		letsShow();
		timer=setInterval(carouselBanner,2000);
	})
	$(".banner_b a").hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(carouselBanner,2000);
	})
	/*热门潮流的悬浮切换图片*/
	var $logos=$(".logo_l a,.logo_r a");
	$logos.mouseenter(function(){
			/*中间的展示图效果*/
			var src=$(this).children("img").attr("src");
			var imgName=src.match(/\D*(\d\-\d)\D*/)[1];
			$(".logo_show").html('<a href="javascript:;"><img src="images/'+imgName+'.jpg"/></a>');
			$(".logo_show a").animate({width:204,padding:0},300).children("img").animate({width:204},300);
	});
	
	/*商品logo轮播*/
	var $divs=$(".market_logo div");
	$divs.each(function(index){
		setInterval(function(){
			var $uls=$divs.eq(index).children("ul");
			var dLeft=$uls.eq(0).innerWidth()*($uls.size()-1);
			var currentLeft=parseInt($divs.eq(index).css("left"));
			//console.log(dLeft+" "+currentLeft);
			if(currentLeft>-dLeft){
				currentLeft-=140;
				$divs.eq(index).animate({left:currentLeft},500);
			}else{
				$divs.eq(index).animate({left:0},500);
			}
		},4000);
	})
	
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
		/*如果有商品，则创建列表，无则显示为空模块*/
		if(!totalNum){
			$("#cart_down_blank").css("display","block");
			$("#cart_down_content").css("display","none");
		}else{
			$("a#cart").html('<a id="cart">购物袋 ('+totalNum+') ▼</a>');
			$("#cart_down_blank").css("display","none");
			$("#cart_down_content").css("display","block");
			cartObj[goodId].num=proNum;
			/*创建总列表*/
			$('<div class="cart-down-content" id="cart_down_content">'+
					'<div class="cart-total clearfix">'+
						'<ul>'+
							'<li>数量共计：<span class="goodNum">'+totalNum+'</span>件</li>'+
							'<li>金额共计：<span class="totalPrice">￥'+
							totalprice+'</span></li>'+
						'</ul>'+
						'<a href="shoppingCart/shoppingCart.html" id="goCart" class="goTo">结算</a>'+
					'</div>'+
					'<div class="cart-good-list">'+
					'</div>'+
				'</div>').appendTo("#cart_down");
			//console.log(goodId)
			/*创建每个商品的列表，要放到最上面以便其他所有页面的调用*/
			for(var id in cartObj){
				createList(cartObj[id],id);
			}
		}
	}
	/*创建每个商品的列表*/
	function createList(info,id){
		//console.log(info.src.match(/(\w+\/\w+\/\w+\.\w+)/)[1])
		$('<div class="cart-good" data-good-id='+id+'>'+
			'<dl>'+
				'<dt>'+
					'<a href="javascript:;"><img src="'+info.src.match(/(\w+\/\w+\/\w+\.\w+)/)[1]+'" class="goodImg"/></a>'+
				'</dt>'+
				'<dd>'+
					'<a href="javascipt:;" class="goodName">'+info.brand+'</a>'+
					'<a href="javascipt:;" class="goodDesc">'+info.name+'</a>'+
					'<span class="goodPrice">￥'+info.price+'</span>'+
					'<p><a href="javascipt:;" class="delete">删除</a></p>'+
				'</dd>'+
			'</dl>'+
		'</div>').appendTo(".cart-good-list");
	}
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
