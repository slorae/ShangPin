/*
	 封装多物体多属性运动
	 参数：dom:指定物体
	 	target:属性名及属性值，对象类型{属性名:属性值,属性名:属性值,属性名:属性值...}
 		fn:链式运动所需要的回调函数
 	无返回值
 	具体思路及解释详见10.11及10.12的知识点整理
 * */
function move(dom, target, fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function (){
		var needStop = true; //定义一个是否需要停止定时器的标记， 默认true(所有的属性均运动到位,需要停止)
		for(var property in target){ //target为传入的对象，property为属性值
			/* 调用getStyle方法去获取物体的当前样式属性值*/
			if(property == "opacity"){//透明度
				var current = parseInt(parseFloat(getStyle(dom, property)) * 100);
			} else {//px系列
				var current = parseInt(getStyle(dom, property));
			}
			
			/*根据当前值和目标值计算缓冲运动的速度值*/
			var speed = (target[property] - current) / 12;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			// 判断当前属性是否运动到位
			if(target[property] != current){ 
				needStop = false; // 没有运动到位，就不能停止定时器
			}else{
				continue;//运动到位，跳出本次循环
			}
			
			/* 判断是否是透明度运动，采取不同方式更新属性值*/
			if(property == 'opacity'){
				dom.style[property] = (current + speed)/ 100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			} else {
				dom.style[property] = current + speed + "px";
			}
		}
		/*for循环结束之后，检测needStop的值*/
		if(needStop){
			clearInterval(dom.timer);
			fn && fn();
			return;
		}
	}, 20);
}
/*获取任意对象的任意属性值*/
function getStyle(dom, property){
	if(dom.currentStyle){
		return dom.currentStyle[property];//IE
	} else {
		return window.getComputedStyle(dom)[property];//标准
	}
}