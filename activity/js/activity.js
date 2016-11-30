$(function(){
/*筛选区的所有事件*/
	/*鼠标点击在筛选区的下拉显隐*/
	$(".filter>ul>li").click(function(){
		$(".filter ul li ul").eq($(this).index(".filter>ul>li")).slideDown(function(){
			$(".filter ul li ul").not($(this)).slideUp();
		});
		return false;
	})
	/*鼠标点击在页面下拉菜单收上去*/
	$(document).click(function(){
		$(".filter ul li ul").css("display","none");
	})
	/*鼠标点击下拉筛选条件事件*/
	//存储原本的类别名(span的内容)
	var arrSpanContent=[];//定义一个数组存储
	$(".filter>ul>li span").each(function(index){
		var orgSpanContent=$(this).text();
		arrSpanContent.push(orgSpanContent);
	})
	//console.log(arrSpanContent)
	//点击筛选的类型
	$(".filter>ul>li li").each(function(index){
		$(this).click(function(){
			var currentIndex=$(this).parents(".filter>ul>li").index(".filter>ul>li");
			console.log(currentIndex)
			var currentSpan=$(this).parents(".filter>ul>li").children("span");//当前span
			//console.log($(this).parent("ul").children("li:first-of-type").html())
			$(this).parents(".filter>ul>li").children("span").text($(this).html());//改变类别名内容
			/*如果是当前的筛选类别是原本的类别名，则把原本类别名放入下拉菜单中*/
			if(currentSpan.text()!=arrSpanContent[currentIndex]){
				$(this).parent("ul").children("li:first-of-type").css("display","block");
			}else{
				$(this).parent("ul").children("li:first-of-type").css("display","none");
			}
			$(this).parents(".filter>ul>li ul").css("display","none");
			/*如果点击的类别是原本的类别名，则删除在下拉菜单里的位置*/
			if($(this).html()==arrSpanContent[currentIndex]){
				//currentSpan.text($(this).html())
				$(this).parent("ul").children("li:first-of-type").css("display","none");
			}
			return false;
		})
	})
	/*清除所有事件:点击清除，所有筛选类型变回原来的类别名*/
	$(".clear_select").click(function(){
		$(".filter>ul>li span").each(function(){
			var index=$(this).parent("li").index(".filter>ul>li");
			$(this).text(arrSpanContent[index]);
		})
	})
	/*滚动到一定距离筛选区固定在浏览器顶部*/
	$(window).scroll(function(){
		if($(this).scrollTop()>=420){
			$(".filter").addClass("fixed");
		}else{
			$(".filter").removeClass("fixed");
		}
	})
	/*获取JSON里的数据*/
	function loadGoods(){
		$.get("data/activity.json",null,function(data){
			for(var key in data){
				var good=data[key];
				//console.log(good.sign)
				
				$('<div class="act-goods" data-actGood-id="'+key+'">'+
					'<dl>'+
						'<dt>'+
							'<a href="javascript:;"><img src="'+good.src+'" /></a>'+
						'</dt>'+
						'<p class="shade">尺码：'+good.size+'</p>'+
						'<dd>'+
							'<p>'+good.sign+'</p>'+
							'<a href="javascript:;" class="brand">KENZO</a>'+
							'<a href="javascript:;" class="name">'+good.name+'</a>'+
							'<span>'+good.salePrice+'</span>  <del>'+good.originalPrice+'</del>'+
						'</dd>'+
					'</dl>'+
				'</div>').appendTo(".act-goodsList");
				if(!good.sign){
					$(".act-goods dl dd p").eq(key.match(/^good(\d+)$/)[1]-1).css("border","none");
				}
			}
			changeImg();
		})
	}
	loadGoods();
	
	/*鼠标悬浮到商品区，商品换展示图片：这个demo没有获取所有的图片，只用一张图片代表*/
	function changeImg(){
		var originalSrc;
		$(".act-goods dl").hover(function(){
			originalSrc=$(this).find("dt a img").attr("src");
			$(this).find("dt a img").attr("src","images/manswear_1_.jpg");
		},function(){
			$(this).find("dt a img").attr("src",originalSrc);
		})
	}
	
})