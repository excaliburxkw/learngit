$(function(){
	/**************************************二级菜单*********************************/
	
	$("#nav>.nav_wrap>h2").hover(function(){
		$(".menu").stop(true).show();
	},function(){
		$(".menu").hide();	
	})
})
