$(document).ready(function(){

    $('.paginationnumber').click(function(){
        var Page = $(this).text();
        var Query = $('.categorylist-nav').attr('title');
        if(Page.localeCompare("<<") == 0){
            Page = 1;
        }
        else if (Page.localeCompare(">>") == 0) {
            Page = $(this).attr('title');
        }
        var params = {
            query:Query,
            page:Page
        };
        post('/fashionsearch/',params,"get");
    })

    

    $('.categorylist-nav__itemanchor').click(function(){
        var Gender = $('.categorylist-nav__header').attr('title');
        var Page = $('.active').text();
        var Tags = $(this).text();
        var params = {
            gender:Gender,
            page:Page,
            tags:Tags
        };
        post('/fashion/',params,"get");

    })

    $('.categorylist-nav__header').click(function(){
        var Gender = $('.categorylist-nav__header').attr('title');
        var Page = $('.active').text();
        var params = {
            gender:Gender,
            page:Page
        };
        post('/fashion/',params,"get");
    })

    document.getElementById('Sortby').addEventListener('change',function(e){
        var Sortby = this.value;
        var Page = $('.active').text();
        var Query = $('.categorylist-nav').attr('title');
        var params = {
            query:Query,
            page:Page,
            sortby:Sortby
        };
        post('/fashionsearch/',params,"get");
    })


    function post(path, params, method) {
        method = method || "get"; // Set method to post by default if not specified.
    
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
    
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
    
                form.appendChild(hiddenField);
            }
        }
    
        document.body.appendChild(form);
        form.submit();
    }

})