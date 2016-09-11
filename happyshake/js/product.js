$(function(){
	var gdID = location.href.match(/=.+/)[0].substr(1);
	$.get(
		"http://datainfo.duapp.com/shopdata/getGoods.php",
		{goodsID:gdID},
		function(data){
			var imgs = JSON.parse(data[0].imgsUrl),
				price = data[0].price,
				relprice = parseInt(price / (data[0].discount / 10)),
				buynumber = data[0].buynumber,
				detail = data[0].detail,
				goodsName = data[0].goodsName,
				goodsBenUrl = JSON.parse(data[0].goodsBenUrl),
				pic = "",
				infopic = "";
			if(data[0].discount == 0){
				relprice = price;
			}
			$(".name").text(goodsName);
			$(".price").text(price);
			$(".relprice").text(relprice);
			$(".buynumber").text(buynumber);
			$(".detail").text(detail);
			for(var index in imgs){
				pic = " <div class='swiper-slide'><img src="+imgs[index]+" style='width:6.4rem'></div>"
				$(".swiper-wrapper").append(pic)
			}
			var mySwiper = new Swiper ('.swiper-container', {
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
		   	}) 
		   	for(var index in goodsBenUrl){
				infopic = "<img src="+imgs[index]+" style='width:100%;overflow-y:auto'>"
				$(".infopic").append(infopic)
			}
		   //	for(var i = 0;i <)
			console.log(detail)
		},
		"jsonp"
	)
	$(".back").on("click",function(){
		window.history.back();
	})
	$(".cart").on("click",function(){
		location.href = "cart.html";
	})
	$("#check").on("click",function(){
		location.href = "info.html?goodsID="+ gdID;
	})
	$(".buy").on("click",function(){
		$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		dataType:"jsonp",
		data:{userID:"xkw123456"},
		success:function(data){
			var number = 0;
			for(var index in data){
				if(data[index].goodsID == gdID){
					number = parseInt(data[index].number);
					getNum(gdID,number+1);
					return false;
				}	
				
			}
			getNum(gdID,1)
		}
	})
		function getNum(goodID,amount){
			$.getJSON(
				"http://datainfo.duapp.com/shopdata/updatecar.php",
				{userID:"xkw123456",
				goodsID:goodID,
				number:amount},
				function(data){
					if(data == 1){
						alert("已加入购物车")
					}else{
						alert("操作有误")
					}
				}
			)	
		}
			
	})
	
	
})
