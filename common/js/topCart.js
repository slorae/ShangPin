$(function(){
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
						'<a href="javascript:;" id="goCart" class="goTo">结算</a>'+
					'</div>'+
					'<div class="cart-good-list">'+
					'</div>'+
				'</div>').prependTo("#cart_down");
			//console.log(goodId)
			/*创建每个商品的列表，要放到最上面以便其他所有页面的调用*/
			for(var id in cartObj){
				createList(cartObj[id],id);
			}
		}
	}
	/*创建每个商品的列表*/
	function createList(info,id){
		//console.log(info.src)
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