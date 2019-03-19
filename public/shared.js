$(document).ready(function(){
	
	$('.footer-nav__subitemanchor').click(function(){
		var Gender = $(this).text();
		var Page = 1;
		var params = {
				gender:Gender,
				page:Page
		};
		post('/fashion/',params,"get");
})

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

$('.searchform').on('submit',function(event){
	var searchbox = document.getElementById('myInput');
	var params = {
		query: xoa_dau(searchbox.value)
	};
	post('/fashionsearch/', params ,"get");
	return false;
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

/*SEARCHBOX */

	function autocomplete(inp){
		var currentFocus;
		inp.addEventListener("input",function(e){
			var a,b,i,val = this.value;
			closeAllLists();
			if(!val){
				return false;
			}
			currentFocus = -1;
			var parameters = {query : xoa_dau(val)};
			var jqxhr = $.get("/searchfashion/",parameters)
			jqxhr.done(function(result){
				closeAllLists();
				var myfashion = result;
				a = document.getElementById("myInput__autocomplete-list");
				a.style.position = "absolute";
				a.style.width = '19.5%';
				a.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
				for(var i =0; i < myfashion.length ;i++){
					b=document.createElement("A");
					b.setAttribute('title',myfashion[i].productcode);
					b.innerHTML += myfashion[i].title;	

					b.className = "myInput__autocomplete-item";
					b.style.display='block';
					b.style.background = 'white';
					b.style.cursor = 'pointer';
					b.style.padding = '2.5% .5%';
					b.addEventListener("mouseover",function(e){
						this.style.background = 'rgb(245,245,250)';
					})
					b.addEventListener("mouseout",function(e){
						this.style.background = 'white';
					})

					b.addEventListener("click",function(e){
						post('/productdetail/',{id: this.getAttribute('title')},"get");
					});
					a.appendChild(b);
			}
			});
			jqxhr.fail(function(jqxhr){
				console.log(jqxhr.status);
			});
			
		});

		function addActive(x){
			if(!x){
				return false;
			}
			removeActive(x);
			if(currentFocus >= x.length){
				currentFocus = 0;
			}
			if (currentFocus < 0){
				currentFocus = (x.length - 1);
			}
			x[currentFocus].classLists.add("autocomplete-active");
		}

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

		function removeActive(x){
			for(var i = 0 ; i < x.length ; i++){
				x[i].classList.remove("autocomplete-active");
			}
		}
		function closeAllLists(){
			var x = document.getElementById("myInput__autocomplete-list");
			var fc = x.firstChild;
			while(fc){
				x.removeChild(x.firstChild);
				fc = x.firstChild;
			}
		}
		document.addEventListener("click",function(e){
			closeAllLists(e.target);
		})
	}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"));


	
	
})