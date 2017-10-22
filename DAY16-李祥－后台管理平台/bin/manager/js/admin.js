/**
 * Created by shisanjun on 2017/10/7.
 */

//框架加载完就自执行
$(document).ready(function () {
    //菜单栏功能效果
    $(".menu-header").click(function () {
        //给父级标签增加属性height
        $(this).parent().css("height", "400px");
        //去除父级标签的兄弟标签的heitht属性
        $(this).parent().siblings().css("height", "");
        //去除兄弟标签hide类，显示内容
        $(this).siblings().removeClass("hide");
        ////父级的兄弟标签下menu-content类，增加hide类，隐藏内容
        $(this).parent().siblings().find(".menu-content").addClass("hide");
    })

    //增加数据编辑框显示
    $("#add").click(
        function () {
            $(".shadow").removeClass("hide");
            $(".editDiv").removeClass("hide");
        }
    )
    //全选功能
    $("#selectAll").on("click",
        function () {
            $("#host_data").children().each(
                function () {
                    tr_selected(this);
                }
            )
        })

    //取消功能
    $("#cancelAll").click(function () {
        $("#host_data").children().each(
            function () {
                tr_unselected(this);
            }
        )
    })

    //反选功能
    $("#reseverAll").click(
        function () {
            //循环获取checked状态
            $("#host_data").children().each(
                function () {
                    //三元表达式
                    if ($(this).find('[type="checkbox"]').prop("checked")) {
                        tr_unselected(this);
                    } else {
                        tr_selected(this);
                    }
                })
        })

    //手点选中或者取消
    $("#host_data input:checkbox").click(
        function () {
            var tr = $(this).parent().parent();
            if ($(tr).hasClass("select")) {
                tr_unselected(tr);
            } else {
                tr_selected(tr);
            }
        }
    )

    //表格行选择功能
    function tr_selected(self) {
        //判断tr是否可以编辑
        if ($(self).hasClass("editing")) {
            //把td内容变为输入框
            $(self).children("[target]").each(
                function () {
                    //获取target和值
                    var target = $(this).attr("target");
                    var value = $(this).text();
                    //创建输入框，替换td中的内容为input
                    var input = document.createElement("input");
                    $(input).attr("target", target);
                    $(input).css("width", "150px");
                    $(input).val(value);
                    //替换td中的内容为input
                    $(this).html(input);
                })
            var a = '<a class="tb_save">保存</a>|<a class="tb_del">删除</a>'
            $(self).children(".edit_td").html(a)
        }
        $(self).children().find('[type="checkbox"]').prop("checked", true);
        $(self).addClass("select");
    }

    //行选择取消
    function tr_unselected(self) {
        //判断tr是否可以编辑
        if ($(self).hasClass("editing")) {
            //把td内容变为输入框
            $(self).find("input[target]").each(
                function () {
                    //获取target和值
                    var target = $(this).attr("target");
                    var value = $(this).val();
                    $(this).parent().text(value);

                })
            var a = '<a class="tb_edit">编辑</a>|<a class="tb_del">删除</a>';
            $(self).children(".edit_td").html(a)
        }
        $(self).children().find('[type="checkbox"]').prop("checked", false);
        $(self).removeClass("select");
    }


    //editDiv编辑框里取消
    $("#add_cancel").click(
        function () {
            //隐藏shadow和editDiv层
            $(".shadow").addClass("hide");
            $(".editDiv").addClass("hide");

            //清空输入框内容
            $(".add_host_data input").val("");
        }
    )
    //增加数据

    $(".add_host_button").delegate("#add_submit", "click",
        function () {

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            //创建选择框
            var checkbox = document.createElement("input");
            $(checkbox).attr("type", "checkbox");
            $(td).append(checkbox);

            $(tr).append(td);
            //获取输入框内容，并加入到tr中
            $('.add_host_data input').each(
                function () {
                    //获取标识
                    var target = $(this).attr("id");
                    //获取输入值
                    var value = $(this).val();
                    //加入表格后清空内容
                    $(this).val("");

                    var td = document.createElement("td");
                    $(td).text(value);
                    $(td).attr("target", target);
                    $(tr).append(td);

                })
            //创建遍编辑和删除功能
            var a = '<td class="edit_td"><a class="tb_edit">编辑</a>|<a class="tb_del">删除</a></td>'
            $(tr).append($(a));
            //加入表格
            $("#host_data").append(tr)
            //加入表格后清空内容
        }
    )

    //表格tr中编辑数据
    $("#host_data").delegate(".tb_edit", "click",
        function () {

            //获取tr中td数据
            $(this).parent().prevAll("[target]").each(
                function () {
                    //获取target和值
                    var target = $(this).attr("target");
                    var value = $(this).text();
                    //创建输入框，替换td中的内容为input
                    var input = document.createElement("input");
                    $(input).attr("target", target);
                    $(input).css("width", "150px");

                    $(input).val(value);
                    //替换td中的内容为input
                    $(this).html(input);

                })
            var a = '<a class="tb_save">保存</a>|<a class="tb_del">删除</a>'
            $(this).parent().html(a)

        }
    )

    //表格tr中编辑后保存数据
    $("#host_data").delegate(".tb_save", "click",
        function () {
            $(this).parent().prevAll("[target]").each(
                function () {
                    var value = $(this).children("input").val();
                    console.log(value);
                    $(this).text(value);
                })
            //修改回原编辑功能
            var a = '<a class="tb_edit">编辑</a>|<a class="tb_del">删除</a>';
            $(this).parent().html(a)
        }
    )

    //表格tr中删除数据
    $("#host_data").delegate(".tb_del", "click",
        function () {
            $(this).parent().parent().remove();
        }
    )

    //批量删除数据
    $("#delSelect").click(
        function () {
            $("td input:checkbox").each(
                function () {
                    if ($(this).parent().parent().hasClass("editing")) {
                        $(this).prop("checked") ? $(this).parent().parent().remove() : 1;
                    }
                }
            )
        }
    )

    //进入编辑模式
    $("#edit_mode").click(
        function () {
            $("#host_data").children().each(
                function () {
                    $(this).addClass("editing");
                    $(this).last().find(".zhezhao").addClass("hide");
                    if ($(this).hasClass("select")) {
                        $(this).find("[target]").each(
                            function () {
                                //获取target和值
                                var target = $(this).attr("target");
                                var value = $(this).text();
                                //创建输入框，替换td中的内容为input
                                var input = document.createElement("input");
                                $(input).attr("target", target);
                                $(input).css("width", "150px");

                                $(input).val(value);
                                //替换td中的内容为input
                                $(this).html(input);
                            }
                        )
                        var a = '<a class="tb_save">保存</a>|<a class="tb_del">删除</a>'
                        $(this).children().last().html(a)
                    }
                }
            )
            //更新编辑模式为保存模式
            $(this).addClass("hide");
            $("#save_mode").removeClass("hide").css("background-color", "#ddffaa")

        }
    )

    //保存模式保存数据
    $("#operation").on("click", "#save_mode",
        function () {
            $("#host_data").children().each(
                function () {
                    if ($(this).hasClass("editing")) {
                        console.log(1);
                        //把输入框内容变为td
                        $(this).find("input[target]").each(
                            function () {
                                //获取target和值
                                var target = $(this).attr("target");
                                var value = $(this).val();
                                $(this).parent().text(value);

                            })
                        var a = '<a class="tb_edit">编辑</a>|<a class="tb_del">删除</a><div class="zhezhao"></div>';
                        $(this).children(".edit_td").html(a)
                        $(this).children().find('[type="checkbox"]').prop("checked", false);
                        $(this).removeClass("select");
                    }
                $(this).removeClass("editing");
                }
            )

            $(this).addClass("hide");
            $("#edit_mode").removeClass("hide")

        }
    )

    /*头像功能*/
    $("#user_icon").on("mouseover", function () {
        $(".user").removeClass("hide");
    })
    $("#user_icon").on("mouseout", function () {
        $(".user").addClass("hide");
    })

    /*鼠标经过表格行变色*/
    $("#host_data").on("mouseover", "tr", function () {
        $(this).css("background-color", "green");
    })
    /*鼠标经过表格行变色*/
    $("#host_data").on("mouseout", "tr", function () {
        $(this).css("background-color", "white");
    })
})