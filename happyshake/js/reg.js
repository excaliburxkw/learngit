$(function(){
	$(".btn").on("touchend",function(){
		if($(".psd").val() == $(".rep").val()){
			$(".tips").text("");
			$.ajax({
				url : "http://datainfo.duapp.com/shopdata/userinfo.php",
				type : "get",
				data : {
					status : "register",
					userID : $(".txt").val() , 
					password : $(".psd").val()
				},
				dataType : "json",
				success : function(data){
					if(data == 0){
						alert("用户已注册");
					}else if(data == 1){
						alert("注册成功");
					}else if(data == 2){
						alert("数据库报错")
					}
					console.log(data);
					location.reload();
				}
			})		
		}else{
			$(".tips").show().text("密码不一致");
		}
		
	})
	
	$(".back").on("touchend",function(){
		window.location = "load.html";
	})
})
