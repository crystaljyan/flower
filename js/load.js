/**
 * Created by 水目 on 2018/1/27 0027.
 */
jQuery(document).ready( function($){
    $(document).ajaxStart(function() {
        $.showLoading();
    });
    $(document).ajaxComplete(function() {
        $.hideLoading();
    });
    $(window).bind('scroll', function() {
        check_load($ajax_url,$ajax_params,$load_template,$load_element); //ajax 下拉加载更多内容
    });
});
function  check_load($url,$param,$template,$element){
    if ($(window).scrollTop() + $(window).height()+1 >= $(document).height()) {
        $("#loading").show();
        load_list($url,$param,function(list){
            show_data(list,$template,$element,function(){
                check_load($url,$param,$template,$element);
            });
        });
    }
}
var $ajax_url;
var $ajax_params;
var $load_template;
var $load_element;
var n =1;
var ispost = temp = true;
function  init_load(){
     n =1;
    ispost = temp = true;
    $('.nothing').hide();
    $("#loading").hide();
    $("#full").hide();
}
/**
 *
 * @param $url  链接
 * @param $param 参数 array
 * @param event
 */
function  load_list($url,$param,event){
    $ajax_url =$url;
    $ajax_params = $param;
    $param['n'] =n;
    if (ispost && temp) {
        temp = false;
        $.ajax({
            url: $url,
            type: 'post',
            dataType: 'json',
            data: $param,
            timeout: 9999,
            success: function(data) {
                n++;
                temp = true;
                if(data.status){
                    if(data.list == ''){
                        temp = false;
                        if(n<=2){
                            $("#loading").hide();
                            $(".nothing").show();
                        }else{
                            $("#full").show();
                        }
                    }else{
                        event(data.list);
                    }
                }else{
                    temp = false;
                    $("#loading").hide();
                    $(".nothing").show();
                }
                $(".img").lazyload({  //图片延迟加载
                    placeholder : "html/images/loading.gif",
                    effect      : "fadeIn",
                    threshold : 200
                });
            }
        });
    }else if(!ispost){
        $("#full").show();
    }
}

function  show_data(list,$template,$element,event){
    $load_template =$template;
    $load_element =$element;
    if(list.length>0){
        $("#loading").hide();
        var tmpl = $($template).html();
        var compiledTemplate = $.Template7.compile(tmpl);
        context = {
            list:list
        };
        var topic_html = compiledTemplate(context);
        $($element).append(topic_html);
        imgHeight();
        temp =true;
        imglazyload();
        event();
    }
}