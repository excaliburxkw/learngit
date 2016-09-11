$(function(){
	$(".btn_load").on("touchend",function(){
		$.ajax({
			url : "http://datainfo.duapp.com/shopdata/userinfo.php",
			type : "get",
			data : {
				status : "login",
				userID : $(".txt").val() , 
				password : $(".psd").val()
			},
			dataType : "json",
			success : function(data){
				if(data == 0){
					alert("用户不存在");
				}else if(data == 2){
					alert("用户名密码不符");
				}else{
					alert("登录成功")
				}
				console.log(data)
			}
		})
	})
	
	
	$(".btn_reg").on("touchend",function(){
		window.location = "reg.html";
	})
})
