
$(function(){
	var myScroll = new IScroll('.list', { 
		mouseWheel: true, 
		click:true
	});
	
	var navScroll = new IScroll('.classify', { 
		mouseWheel: true, 
		scrollX:true,
		scrollY:false,
		click:true
	});
	var n = 0;
	getData();
	$.get(
		"http://datainfo.duapp.com/shopdata/getclass.php",
		"jsonp",
		function(data){
			data = JSON.parse(data);
			$.each(data,function(index){
				var icon = $("<i class='iconfont icon' data-id="+data[index].classID+">"+data[index].icon+"<span></span></i>"),
				 	classID = data[index].classID,
				 	className = data[index].className;
				$(".nav").append(icon);
				icon.on("click",function(){
					$(".wrap").html("");
					$(".title").text(className);
					getData(classID);
					icon.addClass("white").find("span").addClass("show").parent().siblings().removeClass("white").find("span").removeClass("show");
				})
			})
			
		}
	)
	
	
	function getData(cID,code){
		code = code?code:0;
		$.get(
			"http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
			{classID:cID,pageCode:code},
			function(data){
				for(var attr in data){
					var img = data[attr].goodsListImg,
						name = data[attr].goodsName,
						price = data[attr].price,
						gdID = data[attr].goodsID,
						relprice = parseInt(price / (data[attr].discount / 10)) ;
					if(data[attr].discount == 0){
						relprice = price;
					}
					$(".product").last().clone(true).appendTo(".wrap")
													 .attr("data-gdID",gdID)
													 .find("img").attr("src",img).parents("dt")
													 .next(".name").text(name)
													 .next(".price").find("span").text(price).parents(".price")
													 .next(".relprice").find("span").text(relprice).parents(".product")
													 .show();
				}
				myScroll.refresh();	
				$(".img").on("click",function(){
					var xixi = $(this).parents(".product").attr("data-gdID");
					location.href = "product.html?goodsID="+xixi;
				})
			}
		)	
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	$(document).on("touchend",function(){
		if(myScroll.y>80){
			location.reload();
		}else if(myScroll.y+80<myScroll.maxScrollY){
			n++;
			var num = $(".show").parent().attr("data-id");
			console.log(num);
			getData(num,n);
		}
	})
	$(".cart").on("click",function(){
		location.href = "cart.html";
	})
//	stopTouchendPropagationAfterScroll();
//	function stopTouchendPropagationAfterScroll(){
//	    var locked = false;
//	
//	    window.addEventListener('touchmove', function(ev){
//	        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
//	    }, true);
//	    function stopTouchendPropagation(ev){
//	        ev.stopPropagation();
//	        window.removeEventListener('touchend', stopTouchendPropagation, true);
//	        locked = false;
//	    }
//	}
})	


