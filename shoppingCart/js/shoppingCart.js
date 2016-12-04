$(function(){
	/*获取购物车的内容并显示到页面上*/
	var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
	if(cartStr=="{}"){
		$("#spCart-blank").css("display","block");
		$(".table-list").css("display","none");
	}else{
		$("#spCart-blank").css("display","none");
		$(".table-list").css("display","block");
		var cartObj=JSON.parse(cartStr);
		for(var id in cartObj){
			var info=cartObj[id];
			$('<ul class="table-goods"  data-good-id="'+id+'">'+
				'<li class="list-chk"><input type="checkbox"/></li>'+
				'<li class="list-item">'+
					'<dl>'+
						'<dt>'+
							'<a href="../detail/detail.html">'+
								'<img src="'+info.src+'"/>'+
							'</a>'+
						'</dt>'+
						'<dd>'+
							'<p><a href="../detail/detail.html">'+info.brand+'</a></p>'+
							'<p><a href="../detail/detail.html">'+info.name+'</a></p>'+
							'<p class="last"><a href="javascript:;">'+info.color+' 尺码:'+info.size+'</a></p>'+
						'</dd>'+
					'</dl>'+
					'<div class="table-tool">'+
						'<span></span>'+
						'<img src="'+info.src+'"/>'+
					'</div>'+
				'</li>'+
				'<li class="list-price">'+
					'<b>¥'+info.price+'</b>'+
					'<del>'+info.agoprice+'</del>'+
				'</li>'+
				'<li class="list-amount">'+
					'<a href="javascript:;" class="minus">－</a><input type="text" class="numInp"'+ 'value="'+info.num+'"/><a href="javascript:;" class="plus">＋</a>'+
				'</li>'+
				'<li class="list-sum">¥'+info.price*info.num+'</li>'+
				'<li class="list-handle">'+
					'<a href="javascript:;" class="collect">'+info.collect+'</a>'+
					'<a href="javascript:;" class="remove">删除</a>'+
					'<div class="remove_tool">'+
						'<i></i>'+
						'<span>确认要删除此商品吗?</span>'+
						'<p><a href="javascript:;" class="affirm">确认</a><a href="javascript:;" class="cancel">取消</a></p>'+
					'</div>'+
				'</li>'+
			'</ul>').prependTo(".table-list-content");
		}
	}
	/*悬浮到图片上出现放大的图片*/
	$(".list-item dl dt a").hover(function(){
		$(this).parents(".list-item dl").siblings(".table-tool").css("display","block");
	},function(){
		$(this).parents(".list-item dl").siblings(".table-tool").css("display","none");
	})
	/*调整小计*/
	function setSum($obj,num){
		var goodPrice=$obj.parent().siblings(".list-price").children("b").text().match(/^¥(\d+\.*\d*)$/)[1];
		goodPrice=parseFloat(goodPrice);
		//console.log(goodPrice)
		$obj.parent().siblings(".list-sum").html("¥"+num*goodPrice);
	}
	/*调整总价及总数目*/
	function setTotalPrice(){
		var sum=0;
		var totalNum=0;
		$(".list-sum").filter(function(index){
			var checked=$(this).parents(".table-goods").find(".list-chk input").prop("checked");
			if(checked){
				return true;
			}else{
				return false;
			}
		}).each(function(){
			var num=parseInt($(this).prev(".list-amount").children(".numInp").val());
			sum+=parseFloat($(this).html().match(/^¥(\d+\.*\d*)$/)[1]);
			totalNum+=num;
		})
		$(".totalNum").html("已选商品"+totalNum+"件");
		$("#settleAccounts").html("结算("+totalNum+")");
		$("#totalPrice").html("￥"+sum);
	}
	//更新cookie的数量
	function setCookieNum($obj,num){
		var goodId=$obj.parents(".table-goods").attr("data-good-id");//获取id
		var cartStr=$.cookie("cart");
		var cartObj=JSON.parse(cartStr);
		cartObj[goodId].num=num;
		cartStr=JSON.stringify(cartObj);
		$.cookie("cart",cartStr,{expires:7,path:"/"});
	}
	/*全选被选上时:全部选择框都被选中，有一个全选未选上则全部取消选中*/
	$(".allChecked").change(function(){
		var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
		if($(this).prop("checked")){
			$(".allChecked").not($(this)).prop("checked","true");
			$(".list-chk input").prop("checked","true");
			$(".table-goods").css("background","#F7F7F7");//当前商品背景
			if(cartStr!="{}"){
				$("#settleAccounts").css("background","#0701C5");//结算按钮
				$("#removeSelected").addClass("active");//删除所选按钮
			}
		}else{
			$("input[type=checkbox]").not($(this)).removeProp("checked");
			$(".table-goods").css("background","#fff");//当前商品背景
			$("#settleAccounts").css("background","#F0F0F0");//结算按钮
			$("#removeSelected").removeClass("active");//删除所选按钮
		}
		setTotalPrice();
	});
	/*当每个商品的选择框被改变时都要检测是否要全选,且选择的商品背景颜色变化,并改变结算按钮的颜色*/
	var isAllSelected;//全选是否被选中
	$(".list-chk input").change(function(){
		var selectedNum=0;//被选中的个数
		isAllSelected=true;
		$(".list-chk input").each(function(index){
			if(!$(this).prop("checked")){
				$(this).parents(".table-goods").css("background","#fff");
				isAllSelected=false;
				return;
			}else{
				selectedNum++;
				$(this).parents(".table-goods").css("background","#F7F7F7");
				
			}
		})
		//只要有被选中的就改变结算按钮的背景颜色和删除所选按钮的样式
		if(!selectedNum){
			$("#settleAccounts").css("background","#F0F0F0");//结算按钮
			$("#removeSelected").removeClass("active");//删除所选按钮
		}else{
			$("#settleAccounts").css("background","#0701C5");//结算按钮
			$("#removeSelected").addClass("active");//删除所选按钮
		}
		checkedAll();
		setTotalPrice();
	});
	/*检测是否要全选*/
	function checkedAll(){
		//console.log(isAllSelected);
		if(!isAllSelected){
			$(".allChecked").removeProp("checked");
		}else{
			$(".allChecked").prop("checked","true");
		}
	}
	/*数量改变的事件*/
	//加事件
	$(".plus").click(function(){
		//调整个数
		var num=parseInt($(this).prev().val());
		num++;
		$(this).prev().val(num);
		//调整小计
		setSum($(this),num);
		//更新cookie
		setCookieNum($(this),num);
		//勾选前面的复选框
		$(this).parents(".table-goods").find(".list-chk input").prop("checked","true");
		$(".list-chk input").change();
	})
	//减事件
	$(".minus").click(function(){
		//调整个数
		var num=parseInt($(this).next().val());
		num--;
		if(num<=1){
			num=1;
		}
		$(this).next().val(num);
		//调整小计
		setSum($(this),num);
		//更新cookie
		setCookieNum($(this),num);
		//勾选前面的复选框
		$(this).parents(".table-goods").find(".list-chk input").prop("checked","true");
		$(".list-chk input").change();
	})
	//输入框事件
	$(".numInp").change(function(){
		//调整个数
		var num=$(this).val();
		var reg_num=/^\d+$/;// 做一个用户输入的校验，如果输入的不是整数的话，直接改为1
		if(!reg_num.test(num)){
			num=1;
		}else{
			num=parseInt(num);
		}
		$(this).next().val(num);
		//调整小计
		setSum($(this),num);
		//更新cookie
		setCookieNum($(this),num);
		//勾选前面的复选框
		$(this).parents(".table-goods").find(".list-chk input").prop("checked","true");
		$(".list-chk input").change();
	});
	/*点击收藏事件*/
	$(".collect").click(function(){
		$(this).html("已收藏");
		var goodId=$(this).parents(".table-goods").attr("data-good-id");//获取id
		var cartStr=$.cookie("cart");
		var cartObj=JSON.parse(cartStr);
		cartObj[goodId].collect="已收藏";
		cartStr=JSON.stringify(cartObj);
		$.cookie("cart",cartStr,{expires:7,path:"/"});
	});
	/*删除事件*/
	//显隐:点击删除按钮出现提示框，点击除删除按钮及提示框之外的全页面，和取消按钮时隐藏提示框
	$(".remove").click(function(){
		$(this).next($(".remove_tool")).addClass("active").parents($(".table-goods")).siblings($(".table-goods")).find($(".remove_tool")).removeClass("active");
		return false;
	});
	$(document).click(function(){
		$(".remove_tool.active").removeClass("active");
	})
	$(".remove_tool").click(function(){
		$(this).addClass("active");
		return false;
	})
	$(".cancel").click(function(){
		$(this).parents(".remove_tool").removeClass("active");
		return false;
	});
	function removeGoods(goodId){
		var cartStr=$.cookie("cart") ? $.cookie("cart") :"{}";
		var cartObj=JSON.parse(cartStr);
		delete cartObj[goodId];
		cartStr=JSON.stringify(cartObj);
		$.cookie("cart",cartStr,{expires:7,path:"/"});
		if(cartStr=="{}"){
			$("#spCart-blank").css("display","block");
			$(".table-list").css("display","none");
		}
	}
	//点击确认按钮，删除当前商品
	$(".affirm").click(function(){
		var goodId=$(this).parents(".table-goods").remove().attr("data-good-id");
		removeGoods(goodId);
	});
	//删除所选
	//var checked=$(this).parents(".table-goods").find(".list-chk input").prop("checked");
	$("#removeSelected").click(function(){
		var $checked=$(".table-goods").filter(function(index){
			var checked=$(this).find(".list-chk input").prop("checked");
			if(checked){
				return true;
			}else{
				return false;
			}
		});
		var goodId=$checked.remove().attr("data-good-id");
		removeGoods(goodId);
		window.location.reload();
		//console.log(goodId)
	})
	/*结算按钮的功能：自己添加的*/
	//结算按钮:自定义的功能，若已有选择的商品，则弹出结算成功，若没有，则弹出请选择商品
	$("#settleAccounts").click(function(){
		var isClicked=false;
		$(".table-goods").each(function(index){
			if($(this).find(".list-chk input").prop("checked")){
				isClicked=true;
			}
		})
		if(isClicked){
			$('<img src="../common/images/shade.png" id="shade"/>').prependTo("body");
			$('<div class="popup">'+
				'<p>确定结算？</p>'+
				'<a href="javascript:;" id="sure">确定</a>'+
				'<a href="javascript:; "id="deny">取消</a>'+
			'</div>').prependTo("body");
		}else{
			alert("请选择商品！");
		}
		//按下弹窗的确定
		$("#sure").click(function(){
			$("#shade").fadeOut();
			$("div.popup").css("display","none");
			alert("结算成功！");
			//删除该结算的商品
			$("#removeSelected").click();
		})
		//按下弹窗的取消
		$("#deny").click(function(){
			$("#shade").fadeOut();
			$("div.popup").css("display","none");
		})
	});
	
})

