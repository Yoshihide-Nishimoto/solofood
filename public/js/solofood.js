function button_restaurant(){
    window.location.href = "/restaurant";
}
function button_dish(){
    window.location.href = "/dish";
}
function button_notification(){
    window.location.href = "/notification/new";
}
function button_feature(){
    window.location.href = "/feature/new";
}
$(function(){
    $(".datepicker").datepicker({
        onSelect: function (selected_date) {
            $(this).val(selected_date);
        }
    });
    $('.restaurant_form').submit(function(event){
        event.preventDefault();
    });
    $('.dish_form').submit(function(event){
        event.preventDefault();
    });
    $('.restaurant_action_confirm').click(function(){
        $form = $(this).closest('form');
        $url = "/restaurant/action_confirm";
        $id = $form.find("input[type=hidden]").val();
        $data = {"id":$id};
        $.post($url,$data)
            .done(function(data){
                alert(data);
                $form.remove();
            }).fail(function(XHR,text,err){
                if(XHR.status=='400'){
                    $form.find('.restaurant_message').html("");
                    $form.find('.restaurant_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            });
    });
    $('.restaurant_action_change').click(function(){
        $button = $(this);
        $form = $button.closest('form');
        if($button.hasClass('onEdit')){
            $form = $(this).closest('form');
            $url = "/restaurant/action_change";
            $id = $form.find("input[type=hidden]").val();
            $restaurant_name = $form.find(".name").children('input').val();
            $restaurant_address = $form.find(".address").children('input').val();
            $restaurant_openinghours = $form.find(".openinghours").children('input').val();
            $restaurant_closingDay = $form.find(".closingDay").children('input').val();
            $restaurant_latitude = $form.find(".latitude").children('input').val();
            $restaurant_longitude = $form.find(".longitude").children('input').val();
            $data = {
                "id":$id,
                "restaurant_name":$restaurant_name,
                "restaurant_address":$restaurant_address,
                "restaurant_openinghours":$restaurant_openinghours,
                "restaurant_closingDay":$restaurant_closingDay,
                "restaurant_latitude":$restaurant_latitude,
                "restaurant_longitude":$restaurant_longitude
            };
            $.post($url,$data)
                .done(function(data){
                    alert(data);
                    $form.remove();
                }).fail(function(XHR,text,err){
                    if(XHR.status=='400'){
                        $form.find('.restaurant_message').html("");
                        $form.find('.restaurant_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                    }
                    alert(XHR.responseText);
                });
        }else{
            $button.addClass('onEdit');
            $button.addClass('btn-danger');
            $button.removeClass('btn-warning');
            $button.text("実行");
            $form.find('.edit_target').each(function(){
                var txt = $(this).text();
                $(this).html('<input type="text" value="' + txt + '"/>');
            });
        }
    });
    $('.priorityhigh').click(function(){
        $form = $(this).closest('form');
        $url = "/dish/setpriority";
        $id = $form.find("input[type=hidden]").val();
        $priority = 1;
        $data = {"id":$id,"priority":$priority};
        $.post($url,$data)
            .done(function(data){
                alert(data);
                $form.remove();
            }).fail(function(XHR,text,err){
                if(XHR.status=='400'){
                    $form.find('.dish_message').html("");
                    $form.find('.dish_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            });
    });
    $('.prioritynormal').click(function(){
        $form = $(this).closest('form');
        $url = "/dish/setpriority";
        $id = $form.find("input[type=hidden]").val();
        $priority = 0;
        $data = {"id":$id,"priority":$priority};
        $.post($url,$data)
            .done(function(data){
                alert(data);
                $form.remove();
            }).fail(function(XHR,text,err){
                if(XHR.status=='400'){
                    alert(XHR.responseText);
                    $form.find('.dish_message').html("");
                    $form.find('.dish_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            });
    });
    $('.priorityhide').click(function(){
        $form = $(this).closest('form');
        $url = "/dish/setpriority";
        $id = $form.find("input[type=hidden]").val();
        $priority = 9;
        $data = {"id":$id,"priority":$priority};
        $.post($url,$data)
            .done(function(data){
                alert(data);
                $form.remove();
            }).fail(function(XHR,text,err){
                if(XHR.status=='400'){
                    $form.find('.dish_message').html("");
                    $form.find('.dish_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            });
    });
    $('.createNewNotification').click(function(){
        $form = $(this).closest('form');
        $url = "/notification/confirm";
        $title = $form.find(".title").val();
        $text  = $form.find(".text").val();
        $period_from = $form.find(".period_from").val();
        $period_to = $form.find(".period_to").val();
        $priority = $form.find(".priority").val();
        $data = {
            "title":$title,
            "text":$text,
            "period_from":$period_from,
            "period_to":$period_to,
            "priority":$priority
        };
        $.post($url,$data)
            .done(function(data){
                if(window.confirm('登録しますか？')){
                    $url = "/notification";
                    $.post($url,$data)
                        .done(function(data){
                            alert(data);
                            $title = $form.find(".title").val("");
                            $text  = $form.find(".text").val("");
                            $period_from = $form.find(".period_from").val("");
                            $period_to = $form.find(".period_to").val("");
                            $priority = $form.find(".priority").val("");
                        }).fail(function(XHR,text,err){
                            if(XHR.status=='400'){
                                $form.find('.notification_message').html("");
                                $form.find('.notification_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                            }
                            alert(XHR.responseText);
                        });
                }else{
                    return false;        
                }
            }).fail(function(XHR,text,err){
                if(XHR.status=='400'){
                    $form.find('.notification_message').html("");
                    $form.find('.notification_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            });
    });
    $('.createNewfeature').click(function(){
        $url = "/feature/confirm";
        $form = $(this).closest('form').get()[0];
        $formData = new FormData($form);
        $.ajax({
            url: $url,
            data: $formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data) {
                if(window.confirm('登録しますか？')){
                    $url = "/feature";
                    $.ajax({
                        url: $url,
                        data: $formData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: function(data){
                            alert(data);
                            $title = $form.find(".title").val("");
                            $text  = $form.find(".text").val("");
                            $period_from = $form.find(".period_from").val("");
                            $period_to = $form.find(".period_to").val("");
                            $priority = $form.find(".priority").val("");
                        },
                        error: function(XHR,text,err){
                            if(XHR.status=='400'){
                                $form.find('.feature_message').html("");
                                $form.find('.feature_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                            }
                            alert(XHR.responseText);
                        }
                    });
                }else{
                    return false;        
                }
            },
            error: function(XHR,text,err){
                if(XHR.status=='400'){
                    $(this).closest('form').find('.feature_message').html("");
                    $(this).closest('form').find('.feature_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            }
        });
    });
    $('#feature_photo').change(function () {
        if (!this.files.length) {
            return;
        }
        var file = $(this).prop('files')[0];
        var fileRdr = new FileReader();
        fileRdr.onload = function() {
            $('.imgView').attr('src', fileRdr.result);
        }
        fileRdr.readAsDataURL(file);
    });
    $(document).on('click','.dishbox',function(){
        if($(this).hasClass('off')){
            if($('.on').length > 9){
                alert("選択できるのは10件までです");
            } else {
                $(this).find('.postid').val($(this).find('.id').val());
                $(this).removeClass('off');
                $(this).addClass('on');
            }
        }else{
            $(this).find('.postid').val("");
            $(this).addClass('off');
            $(this).removeClass('on');
        }
    });
    $('#shop_search_btn').click(function(){
        $url = "/feature/selectDish";
        $name = $('#shop_search_condition').val();
        $.ajax({
            url: $url,
            data: {name: $name},
            type: 'POST',
            success: function(dishes) {
                $BlobServiceEndpoint = $('#BlobServiceEndpoint').val();
                $('#searchresultul').html("");
                if(dishes['recordset'].length==0){
                    $('#nothingDish').css("display","block");
                } else {
                    $('#nothingDish').css("display","none");
                    for(var i=0; i < dishes['recordset'].length; i++){
                        $dishId = dishes['recordset'][i]['id'];
                        $dishName = dishes['recordset'][i]['name'];
                        $dishScore = dishes['recordset'][i]['score'];
                        $dishRName = dishes['recordset'][i]['rname'];
                        $dishCategory = dishes['recordset'][i]['category'];
                        $dishPrice = dishes['recordset'][i]['price'];

                        $imgbox = $('<li></li>');
                        $boxdiv = $('<div class="dishbox off">');

                        $input_hidden1 = $('<input type="hidden" value="" class="postid" name="dishid[]"/>');
                        $input_hidden2 = $('<input type="hidden" class="id" value=""/>');
                        $input_hidden2.val($dishId);

                        $boxdiv.append($input_hidden1);
                        $boxdiv.append($input_hidden2);

                        $div1 = $('<div class="thumb">');
                        $thumb = $('<img src=""></div>');
                        $thumb.attr('src',$BlobServiceEndpoint + "dish-images/" + dishes['recordset'][i]['id'] + ".png");
                        $div1.append($thumb);
                        $boxdiv.append($div1);

                        $div2 = $('<div class="score">');
                        $score1 = $('<img src="">');
                        if(dishes['recordset'][i]['score'] > 0){
                            $score1.attr('src',$BlobServiceEndpoint + "web/score_on.png");
                        } else {
                            $score1.attr('src',$BlobServiceEndpoint + "web/score_off.png");
                        }
                        $score2 = $('<img src="">');
                        if(dishes['recordset'][i]['score'] > 0){
                            $score2.attr('src',$BlobServiceEndpoint + "web/score_on.png");
                        } else {
                            $score2.attr('src',$BlobServiceEndpoint + "web/score_off.png");
                        }
                        $score3 = $('<img src="">');
                        if(dishes['recordset'][i]['score'] > 0){
                            $score3.attr('src',$BlobServiceEndpoint + "web/score_on.png");
                        } else {
                            $score3.attr('src',$BlobServiceEndpoint + "web/score_off.png");
                        }
                        $score4 = $('<img src="">');
                        if(dishes['recordset'][i]['score'] > 0){
                            $score4.attr('src',$BlobServiceEndpoint + "web/score_on.png");
                        } else {
                            $score4.attr('src',$BlobServiceEndpoint + "web/score_off.png");
                        }
                        $score5 = $('<img src="">');
                        if(dishes['recordset'][i]['score'] > 0){
                            $score5.attr('src',$BlobServiceEndpoint + "web/score_on.png");
                        } else {
                            $score5.attr('src',$BlobServiceEndpoint + "web/score_off.png");
                        }
                        $div2.append($score1);
                        $div2.append($score2);
                        $div2.append($score3);
                        $div2.append($score4);
                        $div2.append($score5);
                        $boxdiv.append($div2);

                        $p1 = $('<div class="name"></p>');
                        $p1.append($dishName);
                        $boxdiv.append($p1);

                        $p2 = $('<p class="rname"></p>');
                        $p2.append($dishRName);
                        $boxdiv.append($p2);

                        $p3 = $('<p class="category"></p>');
                        $p3.append($dishCategory);
                        $boxdiv.append($p3);

                        $p4 = $('<p class="price"></p>');
                        $p4.append($dishPrice);
                        $boxdiv.append($p4);

                        $imgbox.append($boxdiv);
                        $('#searchresultul').append($imgbox);
                    }
                }
            },
            error: function(XHR,text,err){
                if(XHR.status=='400'){
                    $('.feature_message').html("");
                    $('.feature_message').append("<p class='text-danger'>"+XHR.responseText+"</p>");
                }
                alert(XHR.responseText);
            }
        });
    });
});