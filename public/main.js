$(document).ready(function(){

    $('.fashion-nav__itemanchor').click(function(){
        var Gender = $(this).text();
        var Page = 1;
        var params = {
            gender:Gender,
            page: Page
        }
        
        post('/fashion/',params,"get");
    })

    $('.fashion-nav__subitemanchor').click(function(){
        var Gender = $(this).attr('title');
        var Page = 1;
        var Tags = $(this).text();
        var params = {
            gender:Gender,
            page: Page,
            tags: Tags
        }
        post('/fashion/',params,"get");
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