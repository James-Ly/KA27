$(document).ready(function(){

    $(".addimagelink").click(function(event){
        var imageholder = document.getElementById('imageholder');
        var a = document.createElement("div");
        a.style.marginBottom = "2.5%";
        var b = document.createElement("input");
        b.inputType = 'text';
        b.style.width = "60%";
        b.className = "imagelink";
        var c = document.createElement("button");
        c.innerHTML += "-";
        c.style.marginLeft = "2.5%";
        c.style.height = "5%";
        c.addEventListener("click",function(e){ 
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
        a.appendChild(b);
        a.appendChild(c);
        imageholder.appendChild(a);
    })

    var clothesSize = ['S','M','L','XL','XXL','XXXL'];
    var statusSize = ['Disabled','Enabled'];

    document.getElementById('gender').addEventListener('change',function(e){
        var genderholder = document.getElementById('gender').value;
        var sizeholder = document.getElementById('sizeholder');
        while(sizeholder.firstChild){
            sizeholder.removeChild(sizeholder.childNodes[0]);
        }

        if(genderholder.localeCompare('Nam') == 0 || genderholder.localeCompare('Nữ') == 0 || genderholder.localeCompare('Trẻ em') == 0){
            for (var i = 0 ; i<clothesSize.length ; i++){
                var sizetitle = document.createElement("Div");
                sizetitle.innerHTML = "size "+clothesSize[i];
                sizeholder.appendChild(sizetitle);
                var sizeselect = document.createElement("select");
                sizeselect.className = "sizelink";
                for(var j = 0 ; j< statusSize.length ; j++){
                    var statussize = document.createElement('option');
                    statussize.innerHTML += statusSize[j];
                    statussize.value = statusSize[j];
                    sizeselect.appendChild(statussize);
                }
                sizeholder.appendChild(sizeselect);
                
            }
            
            
        }
        
    })

    $(".addtags").click(function(event){
        var tagsholder = document.getElementById('tagsholder');
        var a = document.createElement("div");
        a.style.marginBottom = "2.5%";
        var b = document.createElement("input");
        b.inputType = 'text';
        b.style.width = "60%";
        b.className = "tagslink";
        var c = document.createElement("button");
        c.innerHTML += "-";
        c.style.marginLeft = "2.5%";
        c.style.height = "5%";
        c.addEventListener("click",function(e){ 
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
        a.appendChild(b);
        a.appendChild(c);
        tagsholder.appendChild(a);
    })

    $("#Submit").click(function(event){
        var Title = document.getElementById('title').value;
        var Name = xoa_dau(Title);
        var Gender = document.getElementById('gender').value;
        var Price = document.getElementById('price').value;
        var Productcode = document.getElementById('productcode').value;
        var Image = [];
        var imageholder = document.getElementsByClassName('imagelink');
        for(var i = 0; i <imageholder.length ; i++){
            Image.push(imageholder[i].value);
        }
        var Size = [];
        var sizeholder = document.getElementsByClassName('sizelink');
        for(var i = 0 ; i< sizeholder.length ; i++){
            Size.push(clothesSize[i]);
            Size.push(sizeholder[i].value);
        }
        var Tags = [];
        var tagsholder = document.getElementsByClassName('tagslink');
        for(var i = 0 ;i<tagsholder.length ; i++){
            Tags.push(tagsholder[i].value)
        }
        var params = {
            title:Title,
            name:Name,
            gender:Gender,
            price:Price,
            productcode:Productcode,
            image:Image,
            size:Size,
            tags:Tags
        };
        var jqxhr = $.get("/savenewproduct/",params)
        jqxhr.done(function(result){
            alert("Success")
        })
        jqxhr.fail(function(jqxhr){
            console.log(jqxhr.status);
        })
    })

    function xoa_dau(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }


})