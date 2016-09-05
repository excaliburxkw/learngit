window.onload = function(){
	var inp = document.getElementById('inputCode');
    var code = document.getElementById('code');


    var c = new KinerCode({
        len: 4,//需要产生的验证码长度
//        chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
        chars: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],//经典模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
        question:false,//若给定词典为算数题，则此项必须选择true,程序将自动计算出结果进行校验【若选择此项，则可不配置len属性】,若选择经典模式，必须选择false
        copy: false,//是否允许复制产生的验证码
        bgColor:"",//背景颜色[与背景图任选其一设置]
        bgImg:"../img/white.gif",//若选择背景图片，则背景颜色失效
        randomBg : false,//若选true则采用随机背景颜色，此时设置的bgImg和bgColor将失效
        inputArea: inp,//输入验证码的input对象绑定【 HTMLInputElement 】
        codeArea: code,//验证码放置的区域【HTMLDivElement 】
        click2refresh:true,//是否点击验证码刷新验证码
        false2refresh:false,//在填错验证码后是否刷新验证码
        validateEven : "blur",//触发验证的方法名，如click，blur等
        validateFn : function(result,code){//验证回调函数
            if(result){
                $("#logmain .login_wrap .login span:nth-of-type(7),#main .content .con_left b").removeClass("bg").text("");
            }else{

                if(this.opt.question){
                    $("#logmain .login_wrap .login span:nth-of-type(7),#main .content .con_left b").text("验证码错误");
                }else{
                    $("#logmain .login_wrap .login span:nth-of-type(7),#main .content .con_left b").addClass("bg").text("验证码错误");
                }
            }
        }
    });

}

$(function(){
	/**************************登录提示**********************************/
	$(".logmiddle input:nth-of-type(1)").focus(function(){
		$(".logmiddle .write_a").text("请输入账户或邮箱地址");
	}).blur(function(){
		$(".logmiddle .write_a").text("");
	});
	
	$(".logmiddle input:nth-of-type(2)").focus(function(){
		$(".logmiddle .write_p").text("请输入密码");
	}).blur(function(){
		$(".logmiddle .write_p").text("");
	});
	/**********************************登录******************************/
	$("#logmain .btn").click(function(){
		
		$.get(
			"test.json",
			function(data){
				if($(".logmiddle input:nth-of-type(1)").val() === data.username && 
				   $(".logmiddle input:nth-of-type(2)").val() === data.password){
					if($("#logmain .login_wrap .login span:nth-of-type(7)").text() === ""
					   && $(".logmiddle input:nth-of-type(3)").val() != ""){
						alert("登录成功");
						var success = data;
						$.cookie("success",JSON.stringify(success),{"expires" : 7,"path" : "/"});
						window.location.href = "product.html";
					   }else{
						alert("验证码错误！");
					}
				}else{
					alert("账号密码错误！");
				}
			}
		)
		if($("#rem").is(":checked")){
			var user = $(".logmiddle input:nth-of-type(1)").val();
			$.cookie("user",user,{"expires" : 7, "path" : "/"});
		}else{
			$.removeCookie("user",{"path":"/"})
		}
	});
	/*************************************记住账号**************************/
	
	if($.cookie("user")){
		var user = $.cookie("user");
		$(".logmiddle input:nth-of-type(1)").val(user);	
		$("#rem").prop("checked","checked")
	}
				
	
		/*if($("#rem").is(":checked")){
			var user = $(".logmiddle input:nth-of-type(1)").val();
			$.cookie("user",user,{"expires" : 7, "path" : "/"});
		}else{
			$.removeCookie("user",{"path":"/"})
		}*/
	
	
	
	
	/******************************注册验证***********************************/
	$(".con_left input:nth-of-type(1)").blur(function(){
		if(/^[^\s]{4,20}$/.test($(this).val())){
			$(".con_left .warn_a").css({"color" : "green"}).text("账号可以使用！");
		}else if($(this).val() === ""){
			$(".con_left .warn_a").css({"color" : "#666"}).text("4-20个字符，推荐使用中文会会员名字。一旦注册成功会员名将不能修改。");
		}else{
			$(".con_left .warn_a").css("color" , "red").text("账号格式有误，请重新输入！");
		}
	})
	
	
	$(".con_left input:nth-of-type(2)").blur(function(){
		if(/^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/.test($(this).val())){
			$(".con_left .warn_p").css({"color" : "green"}).text("手机号可以使用！");
		}else if($(this).val() === ""){
			$(".con_left .warn_p").css({"color" : "#666"}).text("请输入您的手机号码。");
		}else{
			$(".con_left .warn_p").css("color" , "red").text("手机号有误，请重新输入！");
		}
	})
	
	/*******************************收货地址验证***********************************/
	$(".people").blur(function(){
		if(/^[\u4E00-\u9FFF]{2,}$/.test($(this).val())){
			$(".t_peo").css({"color" : "green"}).text("可以使用！");
		}else if($(this).val() === ""){
			$(".t_peo").text("");
		}else{
			$(".t_peo").css("color" , "red").text("输入有误，请重新输入！");
		}
	})
	
	$(".cellphone").blur(function(){
		if(/^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/.test($(this).val())){
			$(".t_pho").css({"color" : "green"}).text("可以使用！");
		}else if($(this).val() === ""){
			$(".t_pho").text("");
		}else{
			$(".t_pho").css("color" , "red").text("输入有误，请重新输入！");
		}
	})
	
	$(".mail").blur(function(){
		if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($(this).val())){
			$(".t_mail").css({"color" : "green"}).text("可以使用！");
		}else if($(this).val() === ""){
			$(".t_mail").css({"color" : "#000"}).text("用来接收订单提醒邮件，便于您及时了解订单状态");
		}else{
			$(".t_mail").css("color" , "red").text("输入有误，请重新输入！");
		}
	})
	
	$(".postcode").blur(function(){
		if(/^[1-9]\d{5}(?!\d)$/.test($(this).val())){
			$(".t_post").css({"color" : "green"}).text("可以使用！");
		}else if($(this).val() === ""){
			$(".t_post").text("");
		}else{
			$(".t_post").css("color" , "red").text("输入有误，请重新输入！");
		}
	})
	
	$(".btn_reg").click(function(){
		window.location = "reg.html"
	})
	
	
	
	$(".send_btn").click(function(){
		if($(".con_left .warn_a").text() === "账号可以使用！"){
			if($(".con_left .warn_p").text() === "手机号可以使用！"){
				if($("#main .content .con_left b").text() === "" &&
					 $(".con_left input:nth-of-type(3)").val() != ""){
					alert("激活码已发送")
					location.href = "login.html"
				}else{
					alert("验证码错误！")
				}
			}else{
				alert("手机号有误！");
			}
		}else{
			alert("账号格式有误！");
		}
	})
});


