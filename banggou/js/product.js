$(function(){
	/**********************点击商品详情、评价、须知**********************/
	$(".sel_shop>li>a").on("click",function(){
		var idx = $(this).parent().index();
		$(this).addClass("col").parents("li").siblings().find("a").removeClass("col");
		$("#fix_nav>li").eq(idx).find("a").addClass("col").end().siblings().find("a").removeClass("col");
	})
	
	$("#fix_nav>li>a").on("click",function(){
		var idx = $(this).parent().index();
		if($(this).parent().index() != 4){
		$(this).addClass("col").parents("li").siblings().find("a").removeClass("col");
		$(".sel_shop>li").eq(idx - 1).find("a").addClass("col").end().siblings().find("a").removeClass("col");
		}
	})
	
	$(window).on("scroll",function(){
		var scTop = $(this).scrollTop();
		if(scTop > 842){
			$("#fix_nav").show();
		}else{
			$("#fix_nav").hide();
		}
	})
	/****************************放大镜*********************************/
	
	$(".middle").hover(function(){
		$(".pop").show();
		$(".big").show();
	},function(){
		$(".pop").hide();
		$(".big").hide();
	}).mousemove(function(event){
		$(".pop").offset({
			"left" : event.pageX - 120,
			"top" : event.pageY -120
		});
		
		var _left = $(".pop").position().left,
			_top = $(".pop").position().top;
		
		if(_left <= 0){
			_left = 0;
		}else if(_left >= 240){
			_left = 240;
		}
		if(_top <= 0){
			_top = 0;
		}else if(_top >= 240){
			_top = 240;
		}
		
		$(".pop").css({
			"left" : _left,
			"top" : _top
		});
		
		$(".big>img").css({
			"left" : -1 * _left * 2,
			"top" : -1 *  _top * 2
		});
	});
	
	$(".small>li").on("click",function(){
		var src = $(this).children("img").attr("src");
		$(".middle").children("img").attr("src",src.replace("90","500"));
		$(".big").children("img").attr("src",src.replace("90","1000"));
		$(this).addClass("curr").siblings().removeClass("curr");
	})
	
	$(".num_share").hover(function(){
		$(".share_pro").show();
	},function(){
		$(".share_pro").hide();
	})
	
	/**********************************加入购物车***********************************/
	//选择颜色
	$(".color>dd").click(function(){
		if($(this).attr("class") == "pro_col"){
			$(this).removeClass("pro_col");
			$(this).prev().find("span").text("请选择颜色");
		}else{
			$(this).addClass("pro_col");
			$(this).prev().find("span").text("漂白");
		}
	});
	
	//选择尺寸
	$(".size>dd>a").on("click",function(){
		if($(this).attr("class")){
			$(this).removeClass("sz_col");
			$(this).parent().prev().find("span").text("请选择尺码");
		}else{
		$(this).addClass("sz_col").siblings().removeClass("sz_col");
		var _size = $(this).text();
		$(this).parent().prev().find("span").text(_size)}
	})
	
	//购买数量
	$(".add").click(function(){
		var amount = parseInt($(this).prev().val());
		$(this).prev().val(amount + 1);
	});
	
	$(".minus").click(function(){
		var amount = parseInt($(this).next().val());
		if(amount <= 1){
			$(this).siblings("span").text("数量最少为1件!").show().delay(1000).fadeOut();
			return;
		}
		$(this).next().val(amount - 1);
	});
	
	$(".buyit").click(function(){
		if($(".color>dd").attr("class") && /\//.test($(".size>dt>span").text())){
			var products = $.cookie("products",products);
			if(products){
				products = JSON.parse(products);
			}else{
				products = [];
			}
			var product = null;
			var _name = $("#back>h3>span").text();
			var _size = $(".size").children("dt").text();
			var _amount = $(".buy").val();
			for(var i = 0;i < products.length;i++){
				if(products[i].name === _name && products[i].size === _size){
					product = products[i];
					break;
				}	
			}
			if(product){
				product.amount = parseInt(product.amount) + parseInt(_amount); 
				update();
			}else{
				var _number = $(".number").text();
				var _color = $(".color").children("dt").text();
				var _src = $(".color").children("dd").find("img").attr("src");
				var _delprice = $(".price del").text();
				var _price = $(".price>ul>li:first").children("b").text();
				
				product = {
					"name" : _name,
					"number" : _number,
					"color" : _color,
					"size" : _size,
					"src" : _src,
					"delprice" : _delprice,
					"price" : _price,
					"amount" : _amount
				}
				products.push(product);	
			}
			
			$.cookie("products",JSON.stringify(products),{"expires" : 7,"path" : "/"})
			eject();
			update();
		}else{
			alert("请选择颜色或尺寸！");
		}
	
	})
	
	/*******************************会员规则******************************/
	$(".viprule").hover(function(){
		$(".rule").stop(true).css("display","block").animate({"opacity" : 1,"top":"22px"});
	},function(){
		$(".rule").stop(true).fadeOut().css("display","none");
		$(".rule").css("top","50px");
	});
	
	
	
})

function eject(){
	$("#wrap_eject").show();
	$("#eject").stop(true).fadeIn();
	
	$(".continue,#eject p span").click(function(){
		$("#wrap_eject").hide();
		$("#eject").stop(true).fadeOut();
	});
}
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