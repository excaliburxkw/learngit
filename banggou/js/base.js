/***************************header***********************/
$(function(){
	$(".header_wrap li").eq(0).hover(function(){
		$(".onload").show().prev().addClass("libord");
	},function(){
		$(".onload").hide().prev().removeClass("libord");
	});
	
	$(".header_wrap li").eq(2).hover(function(){
		$(".mybg").show().prev().addClass("libord");
	},function(){
		$(".mybg").hide().prev().removeClass("libord");
	});
	
	$(".header_wrap li").eq(4).hover(function(){
		$(".dload").show().prev().addClass("libord");
	},function(){
		$(".dload").hide().prev().removeClass("libord");
	});
	
	$(".header_wrap li").eq(6).hover(function(){
		$(".vx").show().prev().addClass("bord");
	},function(){
		$(".vx").hide().prev().removeClass("bord");
	});
	
	$(".menu>dl").each(function(index,element){
		$(this).hover(function(){
			$(this).find(".arrow").hide().next().show().parents("dl").find(".menu_list").show();
		},function(){
			$(this).find(".arrow").show().next().hide().parents("dl").find(".menu_list").hide();
		})
	});
	
	
	/*************************************top*********************************/
	$(window).on("scroll",function(){
		var scTop = $(this).scrollTop();
		if(scTop > 910){
			$(".top").show();
		}else{
			$(".top").hide();
		}
	})
	
	$(".top").click(function(){
		$("html,body").animate({"scrollTop" : 0})	
	});
	
	

	/***********************************登录*************************************/
	$(".login li").on("click",function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		if($(this).index() === 1){
			$(".logmiddle span").eq(0).text("手机号：");
			$(".logmiddle span").eq(2).text("登录密码：");
		}else if($(this).index() === 0){
			$(".logmiddle span").eq(0).text("用户名：");
			$(".logmiddle span").eq(2).text("登录密码：");
		}else if($(this).index() === 2){
			$(".logmiddle span").eq(0).text("　卡号：");
			$(".logmiddle span").eq(2).text("　卡密码：");
		}
	})
	
	/*******************************显示登录************************************/
	var success = $.cookie("success",success);
	if(success){
		$("#header ul li:nth-of-type(1)").hide();
		$("#header ul li:nth-of-type(2) a").css({"float":"left","paddingLeft":"0","paddingRight":"0"}).text("习习蛤蛤").clone(true).appendTo($("#header ul li:nth-of-type(2)")).text(" [退出]");
		$("#header ul li:nth-of-type(2) a:last").attr("href", "javascript:;")
	}
	$("#header ul li:nth-of-type(2) a:last").click(function(){
		$.removeCookie("success",{"path":"/"});
		location.reload();
	})
	
	
	/************************************倒计时*************************************/
	
	
	var timer = setInterval(function(){
	 	time_run(2016,8,5,22,46,1);
	 	if($(".container>.box:nth-of-type(1)>.box_left span").eq(3).find("b").eq(3).text() <= 0 &&
	 	   $(".container>.box:nth-of-type(1)>.box_left span").eq(3).find("b").eq(2).text() <= 0 &&
	 	   $(".container>.box:nth-of-type(1)>.box_left span").eq(3).find("b").eq(1).text() <= 0 &&
	 	   $(".container>.box:nth-of-type(1)>.box_left span").eq(3).find("b").eq(0).text() <= 0
	 	){
	 		clearInterval(timer);
	 		$(".container>.box:nth-of-type(1)>.box_left span").eq(3).text("活动已结束！")
		}
	},1000);
	
	var timer1 = setInterval(function(){
	 	time_run(2016,8,12,2,4,2);
	 	if($(".container>.box:nth-of-type(2)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(2)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(2)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(2)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer1);
	 		$(".container>.box:nth-of-type(2)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	var timer2 = setInterval(function(){
	 	time_run(2016,8,14,7,8,3);
	 	if($(".container>.box:nth-of-type(3)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(3)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(3)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(3)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer2);
	 		$(".container>.box:nth-of-type(3)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	var timer3 = setInterval(function(){
	 	time_run(2016,8,15,12,14,4);
	 	if($(".container>.box:nth-of-type(4)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(4)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(4)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(4)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer3);
	 		$(".container>.box:nth-of-type(4)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	var timer4 = setInterval(function(){
	 	time_run(2016,8,16,3,25,5);
	 	if($(".container>.box:nth-of-type(5)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(5)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(5)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(5)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer4);
	 		$(".container>.box:nth-of-type(5)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	var timer5 = setInterval(function(){
	 	time_run(2016,8,17,6,10,6);
	 	if($(".container>.box:nth-of-type(6)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(6)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(6)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(6)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer5);
	 		$(".container>.box:nth-of-type(6)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	var timer6 = setInterval(function(){
	 	time_run(2016,8,15,16,10,7);
	 	if($(".container>.box:nth-of-type(7)>.box_left span").eq(3).find("b").eq(3).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(7)>.box_left span").eq(3).find("b").eq(2).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(7)>.box_left span").eq(3).find("b").eq(1).html() <= 0 &&
	 	   $(".container>.box:nth-of-type(7)>.box_left span").eq(3).find("b").eq(0).html() <= 0
	 	){
	 		clearInterval(timer6);
	 		$(".container>.box:nth-of-type(7)>.box_left span").eq(3).html("活动已结束！")
		}
	},1000);
	
	/*******************************购物车商品数量***********************/
	function update(){
		var products = $.cookie("products",products);
		var amount = 0;
		
		
		if(!products){
			$(".con_wrap>p>a>b").text("0");
			
		}else{
			products = JSON.parse(products);
			$.each(products,function(i,product){
				amount += parseInt(product.amount);
			});
			
			$(".con_wrap>p>a>b").text(amount);
			
		}	
	}
	update();
	
	
})


function time_run(year,month,day,hour,minute,index){
	var target = new Date(year,month,day,hour,minute),
		now = new Date(),
		iTime = Math.floor((target - now) / 1000),
		d = Math.floor(iTime / 86400),
		h = Math.floor(iTime % 86400 / 60 / 60),
		m = Math.floor(iTime % 86400 / 60 % 60),
		s = Math.floor(iTime % 60);
		s = s < 10 && s > 0? "0" + s : s;
		m = m < 10 && m > 0? "0" + m : m;
		h = h < 10 && h > 0? "0" + h : h;
		d = d < 10 && d > 0? "0" + d : d;
	$(".container>.box:nth-of-type("+index+")>.box_left span").eq(3).find("b").eq(3).html(s);
	$(".container>.box:nth-of-type("+index+")>.box_left span").eq(3).find("b").eq(2).html(m);
	$(".container>.box:nth-of-type("+index+")>.box_left span").eq(3).find("b").eq(1).html(h);
	$(".container>.box:nth-of-type("+index+")>.box_left span").eq(3).find("b").eq(0).html(d);
	
//	if($(".box_left span").eq(3).find("b").eq(3).html() <= 0 &&
//	 	   $(".box_left span").eq(3).find("b").eq(2).html() <= 0 &&
//	 	   $(".box_left span").eq(3).find("b").eq(1).html() <= 0 &&
//	 	   $(".box_left span").eq(3).find("b").eq(0).html() <= 0
//	 	){
//	 		clearInterval(timer);
//	 		$(".box_left span").eq(3).html("活动已结束！")
//		}
}
