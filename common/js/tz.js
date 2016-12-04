/*
封装工具：对象拖拽工具
	参数：dom 对象
	返回：
*/
function drag(dom){
	/*鼠标按下时*/
	dom.onmousedown = function(e1){
		var _e1 = window.event||e1;
		var l = _e1.offsetX;//获取鼠标到盒子的左边距离
		var t = _e1.offsetY;//获取鼠标到盒子的上边的距离
		/*在页面拖拽时的效果*/
		document.onmousemove = function(e2){
			var _e2 = window.event||e2;
			var x = _e2.clientX - l;//盒子的横坐标为鼠标到浏览器的横坐标-到盒子的距离
			var y = _e2.clientY - t;//盒子的竖坐标为鼠标到浏览器的竖坐标-到盒子的距离
			dom.style.left = x + "px";//把盒子的横坐标赋给盒子到浏览器的左边距离
			dom.style.top = y + "px";//把盒子的竖坐标赋给盒子到浏览器的上边距离
		}
		/*鼠标弹起*/
		document.onmouseup = function(){
			document.onmousemove = null;//取消拖拽效果
			document.onmouseup = null;//避免影响页面里其他弹起的效果
		}
		return false;//防止出现选中并拖动文本时出现禁止标志
	}
	
}