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
	
	/*储存当前的tip的文本*/
	var origin;
	$("input[type=text],input[type=password]").parent().next("span").map(function(){
		this.origin=$(this).text();
		//console.log(this.origin);
	})
	/*点击文本框，隐藏默认提示*/
	$("input[type=text],input[type=password]").focus(function(){
		origin=$(this).attr("placeholder");//储存原本默认提示文字
		if($(this).attr("placeholder")){
			$(this).attr("placeholder","");
		}
		$(this).css({borderColor:"black",color:"black"});
	});
	
	/*正则验证*/
	
	
	
	/*文本框失焦：重新显示默认提示，若没有输入内容提示不能为空,若输入有误提示格式错误*/
	$("input").blur(function(){
		isFalse=0;
		$(this).css({borderColor:"#B1ADAA",color:"#B1ADAA"});
		if(!$(this).attr("placeholder")){
			$(this).attr("placeholder",origin);
		}
		//判断是否正确
		var objId=$(this).prop("id");
		if(objId=="phone"){
			checkPhoneOrEmail($(this));
		}else if(objId=="password"){
			checkPwd($(this));
		}else if(objId=="imgCode"){
			checkImgCode($(this));
		}
	return isFalse;
	});
	//检验是否为空
	function checkNull($obj){
		if(!$obj.val()){
			isFalse++;
			$obj.parent().next("span").css("display","block").text(function(index,originText){
				return this.origin+"不能为空";
			});
			return false;
		}
		return true;
	}
	//验证手机号或邮箱
	function checkPhoneOrEmail($obj){
		if(checkNull($obj)){
			var regPhone=/^[1-3]\d{10}$/;//验证手机号
			var regEmail=/^\w+@\w+(\.\w+)+$/;//验证邮箱
			if(!regPhone.test($("#phone").val())&&$("#phone").val()){
				isError($("#phone"));
				isFalse++;
				return false;
				
			}else if(regPhone.test($("#phone").val())&&$("#phone").val()){
				isTrue($("#phone"));
			}
		}
	}
	//验证密码
	function checkPwd($obj){
		if(checkNull($obj)){
			var regPwdLength=/^.{6,20}$/;//验证密码长度
			if(!regPwdLength.test($("#password").val())&&$("#password").val()){
				isError($("#password"));
				isFalse++;
				return false;
				
			}else if(regPwdLength.test($("#password").val())&&$("#password").val()){
				isTrue($("#password"));
			}
		}
	}
	//验证图片验证码
	function checkImgCode($obj){
		if(checkNull($obj)){
			var regImgCodeLength=/^[0-9A-z]{4}$/;//验证图形验证码
			if(!regImgCodeLength.test($("#imgCode").val())&&$("#imgCode").val()){
				isError($("#imgCode"));
				isFalse++;
				return false;
				
			}else if(regImgCodeLength.test($("#imgCode").val())&&$("#imgCode").val()){
				isTrue($("#imgCode"));
			}
		}
	}
	/*验证错误*/
	function isError($obj){
		$obj.filter("#phone").parent().next("span").css("display","block")
		.text("请输入正确的邮箱地址或手机号码");
		$obj.filter("#password").parent().next("span").css("display","block")
		.text(function(index,originText){
			return this.origin+"长度为6-20位";
		})
		$obj.filter("#imgCode").parent().next("span").css("display","block")
		.text(function(index,originText){
			return this.origin+"格式错误";
		})
		//console.log(1)
	}
	/*验证正确*/
	function isTrue($obj){
		$obj.parent().next("span").css("display","none").text(this.origin);
		//console.log(2)
	}
	
	/*文本框键盘弹起：全部有内容改变注册按钮样式*/
	$("input").keyup(function(){
		if($("#phone").val()&&$("#password").val()&&$("#imgCode").val()){
			$("#btn").addClass("active");
		}else{
			$("#btn").removeClass("active");
		}
	});
	
	/*登录按钮点击事件*/
	$("#btn").click(function(){
		$("input").blur();
		
		/*校验图形验证码*/
		if($("#imgCode").val().toUpperCase()!=code.toUpperCase()&&imgCode){
			$("#imgCode").parent().next("span").css("display","block").text(function(index,originText){
				return this.origin+"错误,请重新输入";
			});
			isFalse++;
		}
		
		/*全部正确则设置cookie*/
		if(!isFalse){
			setCookie();
		}
	});
	
	/*cookie事件*/
	function setCookie(){
		var phone=$("#phone").val();
		var pwd=$("#password").val();
		
		var userStr=$.cookie("registerUsers") ? $.cookie("registerUsers"):"{}";
		var userObj=JSON.parse(userStr);

		/*if(userObj[$("#phone").val()]==$("#password").val()){
			//window.location.href=""
			$.cookie("registerUsers",userStr,{expires:90,path:"/"});
			alert("成功");
		}else{
			//
			
		}*/
		var isOk=false;//用户是否登录成功的标识
		//如果在cookie里有该手机号
		if(phone in userObj){
			if(userObj[phone]==pwd){
				isOk=true;
			}else{
				$("#password").parent().next("span").css("display","block").text("密码错误");
			}
		}else{
			$("#phone").parent().next("span").css("display","block").text("账号不存在或者有误");
		}
		if(isOk){
			$.cookie("loginUsers",phone,{expires:7,path:"/"});
			//alert("成功");
			window.location.href="../index.html";
		}
	}
})