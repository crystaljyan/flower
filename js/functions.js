$(function(){

	// select默认选中项颜色
	var unSelected = "#999";
	var selected = "#333";
	$("select").css("color", unSelected);
	$("option").css("color", selected);
	$("select").change(function () {
		var selItem = $(this).val();
		if (selItem == $(this).find('option:first').val()) {
			$(this).css("color", unSelected);
		} else {
			$(this).css("color", selected);
		}
	});

	$(".pollen-nav li").each(function(){
		var w = $(this).width();
		$(this).css({"height": w});
	});


	/*// 购物车物品数量
	$(document).on("click",".m-stock .plus",function() {
		$this = $(this);
		v = parseFloat($this.next().val());
		$this.next().val(v+1);
	});
	$(document).on("click",".m-stock .minus",function() {
		$this = $(this);
		v = parseInt($this.prev().val());
		if(v>1){
			$this.prev().val(v-1);
		}
	});*/


});
function words_deal(){
	// 字数限制
	var curLength=$("#textArea").val().length;
	if(curLength>100){
		var num=$("#textArea").val().substr(0,100);
		$("#textArea").val(num);
		alert("超过字数限制，多出的字将被截断！" );
	}
	else{
		$(".textNum em").text(0+$("#textArea").val().length);
	}
}
function imgHeight(){
	// 图片限定高度
	$(".item-pic").each(function(){
		var w = $(this).width();
		$(this).css({"height": w});
	});
}

//获取底部菜单中购物车数量
function getCartNum(url,type){
	$.ajax({
		url:url,
		dataType:"json",
		async:true,
		data:{},
		type:"POST",
		beforeSend:function(){
		},
		success:function(data){
			if(type==1){
				var cartHtml = "购物车<em>"+data.num+"</em>";
			}else{
				var cartHtml = "<em>"+data.num+"</em>";
			}

			if(data.num >0){
				$(".cart").html(cartHtml);
			}else{
				$(".cart").html();
			}
		},
		complete:function(){
		},
		error:function(){
		}
	})
}
function  pic_lazy_load(){
	$("img").lazyload({
		placeholder : "html/flower/images/loading.gif",
		effect      : "fadeIn",
		threshold : 200
	});
}
function  execute_ajax($url,$post_data,event){
	$.ajax({
		url:$url,
		data:$post_data,
		dataType:'json',
		type:'post',
		success:function(data){
			event(data);
		},
		error:function(){
			$.alert('网络错误，请重新尝试');
			click =false;
		}
	});
}


