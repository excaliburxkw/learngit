$(function(){
	/**************************轮播图****************************/
	var index = 1;
	var timer = setInterval(function(){
		move();
	},2000)
	
	$(".pages li").on("click",function(){
		var idx = $(this).index();
		if(!$(".change_box>li").is(":animated")){
			$(this).each(function(){
				$(".change_box>li").eq(idx).show().siblings().hide();
				$(".pages li").eq(idx).addClass("change").siblings().removeClass("change");
				index = idx;
				move();
			})
		}
	})
	
	$(".next").click(function(){
		if(!$(".change_box>li").is(":animated")){
			move();
		}
	});
	
	$(".prev").click(function(){
		if(!$(".change_box>li").is(":animated")){
			if(index === 0){
				index = 5;
			}
			$(".change_box>li").eq(index - 2).stop(true).fadeIn().siblings().stop(true).fadeOut();
			$(".pages li").eq(index - 2).addClass("change").siblings().removeClass("change");
			index--;
		}
	});
	
	$(".bannerpic").hover(function(){
		clearInterval(timer);
		$(".prev").show();
		$(".next").show();
	},function(){
		timer = setInterval(function(){
			move();
		},2000)
		$(".prev").hide();
		$(".next").hide();
	});
	
	function move(){
		if(index < 5){
			$(".change_box>li").eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
		
		}
		
		$(".pages li").eq(index).addClass("change").siblings().removeClass("change");
		index++;
		if(index === 5){
			index = 0;
		}
	}
	
	/*****************************************hot***********************************/
	$(".hotpro li").hover(function(){
		var src = $(this).find("img").attr("src");
		$(this).find("img").attr("src",src.replace(".jpg","11.jpg"));
	},function(){
		var src = $(this).find("img").attr("src");
		$(this).find("img").attr("src",src.replace("11.jpg",".jpg"));
	});
	
	$(".h_next").click(function(){
		$(".hotpro>ul").stop(true).animate({"left" : -1195})
	});
	$(".h_prev").click(function(){
		$(".hotpro>ul").stop(true).animate({"left" : 0})
	});
	
	
});
