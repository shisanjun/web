/**
 * Created by shisanjun on 2017/10/18.
 */
/* 关闭头部广告位*/
$("#close_ads").click(
    function () {
        $(".pg-header-ads").addClass("hide");
    }
)

/* 导航大图广告位置选择*/
$(".fs2-big-ads .select_big_ads").on("mouseover", "span", function () {
    $(this).siblings().css("background-color", "white");
    $(this).css("background-color", "red");
    //获取索引
    var index = $(this).index()
    $(".fs2-big-ads .show_big_ads").addClass("hide");
    //根据索引获取图片$(".fs2-big-ads .show_big_ads").get(index)获取的是JS对象，不是jquery,所以要转换
    $($(".fs2-big-ads .show_big_ads").get(index)).removeClass("hide");
})

/*促销TAB页*/
$(".promotion .mod_tab_head_item_l").on("mouseover", "a", function () {
    $(this).parent().children("a").css("border-bottom-color", "white");
    $(this).css("border-bottom-color", "red");

    var index = $(this).index();
    $($(".promotion .mod_tab_head_content").addClass("hide").get(index)).removeClass("hide");
})

/*显示京东大二维码*/

$(".pg-header .head_search1").on("mouseover", ".qrcode",
    function () {
        $(".pg-header .qrcode_show").removeClass("hide");
    }
)
$(".pg-header .head_search1").on("mouseout", ".qrcode",
    function () {
        $(".pg-header .qrcode_show").addClass("hide");
    }
)

/*菜单显全部*/
$(".fs1 ul").on("mouseover", "li", function () {
    var index = $(this).index();
    $($(".fs1 .menu_show").addClass("hide").get(index)).removeClass("hide");
})

$(".fs1 ul").on("mouseout", "li", function () {
    $(".fs1 .menu_show").addClass("hide");
})

/*秒杀计时*/
function killtime() {
    var sec = $("#kill_sec").text();
    if (sec > 0) {
        var sec_tmp = sec - 1;
        $("#kill_sec").text(sec_tmp);
    } else {
        var min = $("#kill_min").text();
        if (min > 0) {
            var min_tmp = min - 1;
            $("#kill_min").text(min_tmp);
            $("#kill_sec").text(60);
        } else {
            var hour = $("#kill_hour").text();
            if (hour > 0) {
                var tmp_hour = hour - 1;
                $("#kill_hour").text(tmp_hour);
                $("#kill_min").text(60);
            }else{

                $("#kill_sec").text(0);
                $("#kill_min").text(0);
                $("#kill_hour").text(0);
                /*清除定时器*/
                clearInterval(obj);
            }

        }
    }
}
var obj=setInterval("killtime();",1000);

/*返回顶部*/
$("#go_top").click(
    function(){
        $(window).scrollTop(0);
    }
)