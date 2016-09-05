$(function(){
	/********************************新地址******************************/
	$("#new").click(function(){
		$(".addaddress").show();
	})
	
	
	
	//添加新地址
	$(".a_btn").click(function(){
		if($(".t_peo").text() == "可以使用！" &&
		   $(".t_pho").text() == "可以使用！" &&
		   $(".t_mail").text() == "可以使用！" &&
		   $(".t_post").text() == "可以使用！"){
			var addresses = $.cookie("addresses");
			if(addresses){
				addresses = JSON.parse(addresses);
			}else{
				addresses = []
			}
			var _people = $(".people").val(),
				_province = $(".province").children("option:selected").html(),
				_city = $(".city").children("option:selected").html(),
				_dis = $(".district").children("option:selected").html(),
				_phone = $(".cellphone").val(),
				_more = $(".more_a").val(),
				address = null;
			
			address = {
				"people" : _people,
				"province" : _province,
				"city" : _city,
				"dis" : _dis,
				"phone" : _phone,
				"more" : _more
			}
			
			addresses.push(address);
			$.cookie("addresses",JSON.stringify(addresses),{"expires" : 7,"path" : "/"});
			
			$(".addaddress").hide();
			$("#new").prop("checked",false)
			location.reload();	
		}else{
			alert("填入信息有误！");
		}
		
	})
	/***************************显示新地址*************************/
	if($.cookie("addresses")){
		var addresses = $.cookie("addresses");
		addresses = JSON.parse(addresses);
		$.each(addresses,function(i,address){
			$(".new_address>li:first").clone(true)
									 .appendTo(".new_address")
									 .html("<input type='radio' class='newone' name='newadd'> " +address.people+" "+address.province+address.city+address.dis+address.more+" "+address.phone +" <a href='javascript:;' style='color:red' class='del_a'>删除</a>")
									 .data("address",address)
									 .show()
			
		})
		
	}
	
	//删除地址
	$(".del_a").click(function(){
		var address = $(this).parent().data("address");
		var index = $.inArray(address,addresses);
		addresses.splice(index,1);
		$.cookie("addresses", JSON.stringify(addresses), {"expires" : 7,"path" : "/"});
		$(this).parent().remove();
	})
	
	/*******************************显示商品******************************/
//	var products = $.cookie("products",products);
//	products = JSON.parse(products);
//	
//	$.each(products,function(i,product){
//		$(".pro_info:last").clone(true)
//						   .appendTo(".wrap_info")
//						   .find(".name>dt>img").attr("src",product.src).end()
//						   .find(".name>dd>a").text(product.name).end()
//						   .find(".name>dd span").text(product.number).end()
//						   .find(".size>span:first").text(product.color).end()
//						   .find(".size>span:last").text(product.size).end()
//						   .find(".amount>span:first").text(product.amount).end()
//						   .find(".price>span:first>del").text(product.delprice).end()
//						   .find(".price>span:last").text(product.price).end()
//						   .find(".sub b").text("￥" + /\d+/.exec(product.price) * product.amount).end()
//						   .show()
//	})
	var goods = $.cookie("goods",goods);
	goods = JSON.parse(goods);
	
	$.each(goods,function(i,good){
		$(".pro_info:last").clone(true)
						   .appendTo(".wrap_info")
						   .find(".name>dt>img").attr("src",good.src).end()
						   .find(".name>dd>a").text(good.name).end()
						   .find(".name>dd span").text(good.number).end()
						   .find(".size>span:first").text(good.color).end()
						   .find(".size>span:last").text(good.size).end()
						   .find(".amount>span:first").text(good.amount).end()
						   .find(".price>span:first>del").text(good.delprice).end()
						   .find(".price>span:last").text(good.price).end()
						   .find(".sub b").text("￥" + /\d+/.exec(good.price) * good.amount).end()
						   .show()
	})
	
	/*****************************总价********************************/
	var all_sum = 0;
	$(".sub").each(function(){
		all_sum += parseInt(/\d+/.exec($(this).text()));
	})
	$(".addmoney b:first").text("￥" +  all_sum.toFixed(2));
	$(".money span").text(all_sum.toFixed(2));
	
	/****************************选择地址*******************************/
	function initProvince(){
		$.getJSON(
			"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?",
			function(data){
				var list = data.list;
				for(var attr in list){
					var obj = list[attr];
					var diming = obj.diming,
						daima = obj.daima;
					$("<option value='"+daima+"'>"+diming+"</option>").appendTo(".province");
				}
			//	initCity();
			}
		)
	}
	
	function initCity(){
		var provinceId = $(".province").val();
		$.getJSON(
			"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?&id=" + provinceId,
			function(data){
				var list = data.list,
					html = "";
				for(var attr in list){
					var obj = list[attr];
					var diming = obj.diming,
						daima = obj.daima;
					html += "<option value='"+daima+"'>"+diming+"</option>";
				}
				$(".city").empty().append("<option>--请选择--</option>");
				$(".city").append(html);
			}
		)
	}
	
	function initDis(){
		var cityId = $(".city").val();
		$.getJSON(
			"http://api.2011522.com/apidiqu2/api.asp?format=json&callback=?&id=" + cityId,
			function(data){
				var list = data.list,
					html = "";
				for(var attr in list){
					html += "<option value='"+list[attr].daima+"'>"+list[attr].diming+"</option>"
				}
				$(".district").empty().append("<option>--请选择--</option>");
				$(".district").append(html);
			}
		)
	}
	
	initProvince();
	$(".province").on("change",initCity);
	$(".city").on("change",initDis);
});
