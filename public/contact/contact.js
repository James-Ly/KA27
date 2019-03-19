$(document).ready(function(){
    var from,to,subject,text;
    $(".Sendbutton").click(function(){      
        from=$("#Sender").val();
        to ="long.lythien@gmail.com";
        subject="Liên hệ từ "+from;
        text="Số điện thoại: "+$('#Phone').val()+"\n"+"Email: "+$('#Email').val()+"\n"+"Nội dung: "+$("#Content").val();
        $("#message").text("Email của bạn đang được gửi ... vui lòng chờ trong giây lát");
        $.get("http://localhost:3000/sendemail",{to:to,subject:subject,text:text},function(data){
            if(data=="sent")
            {
                $("#message").empty().html("Email của bạn đã được gửi đi");
                $("#message").delay(3000).fadeOut(2000,function(){
                    $(this).empty()
                });
            }
            else{
                $("#message").empty().html("Có lỗi xảy ra trong quá trình gửi email này, vui lòng gửi email trực tiếp đến long.lythien@gmail.com");
                $("#message").delay(3000).fadeOut(2000,function(){
                    $(this).empty()
                });
            }   
        });
        
    });
    
})