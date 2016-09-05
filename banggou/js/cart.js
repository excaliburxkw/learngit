$(function(){
	var products = $.cookie("products",products);
	if(!products){
		$(".buyshop").hide();
	}else{
		$(".buyshop").show();
		$(".noone").hide();
		
		products = JSON.parse(products);
		$.each(products,function(i,product){
			$(".product:last").clone(true)
							  .appendTo(".box_pro")
							  .find(".info_product dt img").attr("src",product.src).end()
							  .find(".info_product dd a").text(product.name).end()
							  .find(".info_product dd i").text(product.number).end()
							  .find(".color p:first").text(product.color).end()
							  .find(".color p:last").text(product.size).end()
							  .find(".price del").text(product.delprice).end()
							  .find(".price em").text(product.price).end()
							  .find(".buy").val(product.amount).end()
							  .find(".sub").text("￥" + /\d+/.exec(product.price) * product.amount).end()
							  .show()
							  .data("product",product);
							  
		})
		/******************************全选**********************/
		$("#ck_all").click(function(){
			$(".ck_product:not(last)").prop("checked",$("#ck_all").prop("checked"))
		})
		$("#ck_all,.ck_product").prop("checked","checked");
		
		calcTotal();
		/*****************************初始总价**********************/
		var all_sum = 0;
		$(".sub").each(function(){
			all_sum += parseInt(/\d+/.exec($(this).text()));
		})
		$(".total").text("￥" +  all_sum);
		$(".pro_total").text("￥" +  all_sum);
		/*****************************增加商品*************************/
		$(".add").click(function(){
			var amount = parseInt($(this).prev(".buy").val());
			amount += 1;
			$(this).parents(".product").data("product").amount = amount;
			$.cookie("products", JSON.stringify(products), {"expires" : 7,"path" : "/"});
			$(this).prev(".buy").val(amount);
			var sub = parseInt(/\d+/.exec($(this).parents(".product").find('.price>em').text())) * amount;
			$(this).parent().next().text("￥" + sub);
			calcTotal();
			pokeamount();
		})
		/******************************减少商品****************************/
		$(".minus").click(function(){
			var amount = parseInt($(this).next(".buy").val());
			if(amount <= 1){
				return;
			}
			amount -= 1;
			$(this).parents(".product").data("product").amount = amount;
			$.cookie("products", JSON.stringify(products), {"expires" : 7,"path" : "/"});
			$(this).next(".buy").val(amount);
			var sub = parseInt(/\d+/.exec($(this).parents(".product").find('.price>em').text())) * amount;
			$(this).parent().next().text("￥" + sub);
			calcTotal();
			pokeamount();
			
		});
		pokeamount();
		
		/**************************输入商品数**********************/
		$(".buy").keyup(function(){
			if($(this).val() === ""){
				$(this).val("1");
			}else{
				var amount = parseInt($(this).val());
				$(this).parents(".product").data("product").amount = amount;
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path" : "/"});
				var sub = parseInt(/\d+/.exec($(this).parents(".product").find('.price>em').text())) * amount;
				$(this).parent().next().text("￥" + sub);
				calcTotal();
				pokeamount();	
			}
			
		})
		/****************************购物袋数量***************************/
		function pokeamount(){
			var poke = 0;
			$(".box_pro .buy").each(function(){
				poke += parseInt($(this).val());
			})
			$(".poke>span").text("("+poke+")");
		}
		/**************************删除单行商品**************************/
		$(".do>a:nth-of-type(2)").click(function(){
			var product = $(this).parents(".product").data("product");
			var index = $.inArray(product,products);
			products.splice(index,1);
			$.cookie("products", JSON.stringify(products), {"expires" : 7,"path" : "/"});
			$(this).parents(".product").remove();
			calcTotal();
			pokeamount();
			all_del()
		})
		
		/************************删除多行******************************/
		$(".del_row").click(function(){
			var $ckbox = $(".ck_product:checked");
			var product = null;
			$ckbox.each(function(){
				product = $(this).parents(".product").data("product");
				var index = $.inArray(product,products);
				products.splice(index,1);
				$.cookie("products", JSON.stringify(products), {"expires" : 7,"path" : "/"});
				$(this).parents(".product").remove();
			})
			
			calcTotal();
			pokeamount();
			all_del()
		});
		function all_del(){
			if($(".box_pro>div").length == 0){
				$.removeCookie("products",{"path" : "/"});
				location.reload();
			}
		}
		/**************************点击合计***************************/
		function calcTotal() {	
				var sum = 0;
				$(".ck_product:checked").parents(".product").find(".sub").each(function(){
					sum += parseInt(/\d+/.exec($(this).text()));
				});
				var _sum = 0;
				$(".ck_product:checked").parents(".product").find(".buy").each(function(){
					_sum += parseInt($(this).val());
				});
				$(".total").text("￥" + sum);
				$(".pro_total").text("￥" + sum);
				$(".how").text(_sum)
			}
		
		$(".ck_product:not(:last),#ck_all").click(function() {
			calcTotal();
			
		/****************************结算****************************/
			if($(".how").text() == 0){
				$(".op_right>a").addClass("gery");
			}else{
				$(".op_right>a").removeClass("gery");
			}
		});
	
		$(".op_right a").click(function(){
			var success = $.cookie("success",success)
			if(!success){
				$("#wrap_popwd").show();
				$("#nologin").show();
			}else if(!$(this).attr("class")){
				var goods = [];
				$(".ck_product:not(:last):checked").each(function(i,product){
					product = $(this).parents(".product").data("product");
					goods.push(product);
				})
				$.cookie("goods",JSON.stringify(goods),{"path" : "/"})
				window.location = "order.html";
			}else{
				$("#wrap_popwd").show();
				$("#popwd").show();
			}
			
		})
		
		$(".pop_btn,#popwd span,#nologin span").click(function(){
			$("#wrap_popwd").hide();
			$("#popwd").hide();
			$("#nologin").hide();
		});
		
		$(".login_btn").click(function(){
			$("#wrap_popwd").hide();
			$("#popwd").hide();
			window.location = "login.html";
		})
		
	}
	
	/***************************其他******************************/
	$(".more>ul>li").click(function(){
		$(this).addClass("col").siblings().removeClass("col");
	})
	
	
});
