$(document).ready(function(){

    $('.main-thumblist__thumbnails').hover(function(){
        var image =  $(this).attr('src');
        $('.main-thumblist__thumbnails').removeClass("active")
        $(this).addClass('active')
        $('.main-productdetails__imgresponsive').attr('src',image);
    })

})