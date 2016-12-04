$(function(){
	/*随机生成图片验证码*/
	createCode();
	var code=$("#code").attr("src").match(/\w\/([0-9A-z]{4})\.\w/)[1];//获取原始图形验证码
	function createCode(){
		var arr=["0V1H","4BX3","7RA5","FTNM","JAR5","KQ2T","N1T1","Q8E8","WGOS"];
		var ind=parseInt(Math.random()*arr.length);
		$("#code").attr("src","images/"+arr[ind]+".gif");
		code=arr[ind];
		//console.log(code);
	}
	$("#change").click(function(){
		createCode();
	})
	$("#code").click(function(){
		createCode();
	})
	
	/*点击文本框，隐藏默认提示*/
	$("input[type=text],input[type=password]").focus(function(){
		origin=$(this).attr("placeholder");//储存原本默认提示文字
		if($(this).attr("placeholder")){
			$(this).attr("placeholder","");
		}
		$(this).css({borderColor:"black",color:"black"});
	});
	var isFalse;//标记所有框的输入错误个数
	/*储存当前的tip的文本*/
	var origin;
	$("input[type=text],input[type=password]").parent().next("span").map(function(){
		this.origin=$(this).text();
		//console.log(this.origin);
	})
	
	/*文本框失焦：重新显示默认提示，若没有输入内容提示不能为空,若输入有误提示格式错误*/
	$("input[type=text],input[type=password]").blur(function(){
		isFalse=0;
		$(this).css({borderColor:"#B1ADAA",color:"#B1ADAA"});
		//点击默认提示消失，若没输入内容出现默认提示
		if(!$(this).attr("placeholder")){
			$(this).attr("placeholder",origin);
		}
		//判断是否正确
		var objId=$(this).prop("id");
		if(objId=="phone"){
			checkPhone($(this));
		}else if(objId=="password"){
			checkPwd($(this));
		}else if(objId=="imgCode"){
			checkImgCode($(this));
		}else if(objId=="phoneCode"){
			checkPhoneCode($(this));
		}
		return isFalse;
	});
	//验证是否为空
	function checkNull($obj){
		if(!$obj.val()){
			isFalse++;
			$obj.parent().next("span").css("display","block").text(function(index,originText){
				return this.origin+"不能为空";
			});
			return false;
		}
		return true;
	};
	//验证手机号
	function checkPhone($obj){
		if(checkNull($obj)){
			var phone=$("#phone").val();//手机号码
			var regPhone=/^[1-3]\d{10}$/;//验证手机号
			if(!regPhone.test(phone)&&phone){
				isError($("#phone"));
				isFalse++;
				return false;
			}else{
				isTrue($("#phone"));
			}
		}
		
	}
	//验证密码
	function checkPwd($obj){
		if(checkNull($obj)){
			var pwd=$("#password").val();//密码
			var regPwdLength=/^.{6,20}$/;//验证密码长度
			if(!regPwdLength.test(pwd)&&pwd){
				isError($("#password"));
				isFalse++;
				return false;
			}else if(regPwdLength.test(pwd)&&pwd){
				isTrue($("#password"));
			}
		}
	}
	//验证图形验证码
	function checkImgCode($obj){
		if(checkNull($obj)){
			var imgCode=$("#imgCode").val();//图形验证码
			var regImgCodeLength=/^[0-9A-z]{4}$/;//验证图形验证码
			if(!regImgCodeLength.test(imgCode)&&imgCode){
				isError($("#imgCode"));
				isFalse++;
				return false;
			}else if(regImgCodeLength.test(imgCode)&&imgCode){
				isTrue($("#imgCode"));
			}
		}
	}
	//验证手机验证码
	function checkPhoneCode($obj){
		if(checkNull($obj)){
			var phoneCode=$("#phoneCode").val();//手机验证码
			var regPhoneCodeLength=/^[0-9A-z]{6}$/;//验证手机验证码
			if(!regPhoneCodeLength.test(phoneCode)&&phoneCode){
				isError($("#phoneCode"));
				isFalse++;
				return false;
			}else if(regPhoneCodeLength.test(phoneCode)&&phoneCode){
				isTrue($("#phoneCode"));
			}
		}
	}
	/*验证错误*/
	function isError($obj){
		$obj.not("input[type=password]").parent().next("span").css("display","block")
		.text(function(index,originText){
			return this.origin+"格式错误";
		})
		$obj.filter("input[type=password]").parent().next("span").css("display","block")
		.text(function(index,originText){
			return this.origin+"长度为6-20位";
		})
	}
	/*验证正确*/
	function isTrue($obj){
		$obj.parent().next("span").css("display","none").text(this.origin);
	}
	/*文本框键盘弹起：全部有内容改变注册按钮样式*/
	$("input[type=text],input[type=password]").keyup(function(){
		if($("#phone").val()&&$("#password").val()&&$("#imgCode").val()&&$("#phoneCode").val()){
			$("#btn").addClass("active");
		}else{
			$("#btn").removeClass("active");
		}
	});
	/*输入密码时实时显示强度*/
	$("#password").keyup(function(){
		/*显示密码强度模块*/
		if($("#password").val()){
			$("#level span").css("display","inline-block");
		}else{
			$("#level span").css("display","none");
		}
		checkLevel($("#password").val());
	})
	/*当手机号码更换时去掉提示的背景色*/
	$("#phone").keyup(function(){
		$(this).css("background","#fff");
	})
	/*检测强度*/
	function checkLevel(value){
		var regNum=/\d/;//验证数字
		var regWord=/[a-zA-Z]/;//验证字母
		var regSymbol=/[^0-9a-zA-Z]/;//验证字符
		var pwdLevel=0;//安全等级
		
		if(regNum.test(value)){
			++pwdLevel;
		}
		if(regWord.test(value)){
			++pwdLevel;
		}
		if(regSymbol.test(value)){
			++pwdLevel;
		}
		if(pwdLevel==1){
			$("#level span").eq(0).css("opacity","1").siblings().css("opacity","0.5");
		}else if(pwdLevel==2){
			$("#level span").eq(1).css("opacity","1").next().css("opacity","0.5");
		}else if(pwdLevel==3){
			$("#level span").eq(2).css("opacity","1");
		}
	}
	
	/*注册按钮点击事件*/
	$("#btn").click(function(){
		/*校验是否已选择协议*/
		if(!$("#check").prop("checked")){
			$("#check").parent().next("span").css("display","block");
			isFalse++;
		}else{
			$("#check").parent().next("span").css("display","none");
		}
		$("input[type=text],input[type=password]").blur();
		
		/*校验图形验证码*/
		var imgCode=$("#imgCode").val();//图形验证码
		if(imgCode.toUpperCase()!=code.toUpperCase()&&imgCode){
			$("#imgCode").parent().next("span").css("display","block").text(function(index,originText){
				return this.origin+"错误,请重新输入";
			});
			isFalse++;
		}
		
		//console.log(isFalse)
		/*全部正确则设置cookie*/
		if(!isFalse){
			setCookie();
		}
	})
	/*cookie相关操作*/
	function setCookie(){
		var userStr=$.cookie("registerUsers") ? $.cookie("registerUsers")  :"{}";
		var userObj=JSON.parse(userStr);
		
		if($("#phone").val() in userObj){
			$("#phone").css("background","#FAFFBD").parent().next("span").css("display","block").text("该手机已被注册");
			return;
		}else{
			userObj[$("#phone").val()]=$("#password").val();
			userStr=JSON.stringify(userObj);
			$.cookie("registerUsers",userStr,{expires:90,path:"/"});
			window.location.href="login.html";
			//alert("成功");
		}
	}
	
})
