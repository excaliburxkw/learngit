$(function(){
	function getAjax(gID,amount){
		$.getJSON(
			"http://datainfo.duapp.com/shopdata/updatecar.php",
			{userID:"xkw123456",
			goodsID:gID,
			number:amount},
			function(data){
				console.log(data)
			}
		)	
	}
	//getAjax(8,1)
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		dataType:"jsonp",
		data:{userID:"xkw123456"},
		success:function(data){
			console.log(data);
			var allnum = 0
				sub = 0;
			for(var index in data){
				var goodsName = data[index].goodsName,
					img = data[index].goodsListImg,
					price = data[index].price,
					num = data[index].number,
					cName = data[index].className,
					gsID = data[index].goodsID;
				allnum += parseInt(num);
				sub += parseFloat(num * price);
				$(".product").first().clone(true).appendTo(".wrap")
												 .attr("data-gsID",gsID)
												 .find("img").attr("src",img).parents(".product")
												 .find(".name").text(goodsName).parents(".product")
												 .find(".price").find("span").text(price).parents(".product")
												 .find(".number").val(num).parents(".product")
												 .show()
			}
			$(".tips span").text(allnum);
			$(".tips b").text(sub);
			
			$(".add").on("click",function(){
				var gI = $(this).parents(".product").attr("data-gsID");
				var amount = parseInt($(this).prev().val());
				getAjax(gI,amount+1);
				$(this).prev().val(amount+1);
				amountAndSub();
			})
			
			$(".munes").on("click",function(){
				var gI = $(this).parents(".product").attr("data-gsID");
				var amount = parseInt($(this).next().val());
				if(amount <= 1){
					return ;
				}
				getAjax(gI,amount-1);
				$(this).next().val(amount-1);
				amountAndSub();
			})
			
			$(".remove").on("click",function(){
				var gI = $(this).parents(".product").attr("data-gsID");
				getAjax(gI,0);
				$(this).parents(".product").remove();
				amountAndSub();
			})
			
			function amountAndSub(){
				var _num = 0;
				$(".number").each(function(){
					_num += parseInt($(this).val());  
				})
				var _sub = 0;
				$(".price").each(function(){
					_sub += parseInt($(this).find("span").text() * $(this).next().find(".number").val());
				})
				$(".tips span").text(_num);
				$(".tips b").text(_sub);
			}
		}
				
	});
	

})

