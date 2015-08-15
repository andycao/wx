/**
 * Created by andy on 2015/8/13.
 */

var openApi = function (objPrm, successCallback, errorCallback, completeCallback) {
	$.ajax({
		type: 'get',
		url: 'http://cusflo.com/api/base/api_open.php',
		data: objPrm,
		dataType: 'jsonp',
		jsonp: "callback",
		success: function (data) {
			if (successCallback) {
				successCallback(data);
			}
		},
		error: function (data) {
			if (errorCallback) {
				errorCallback(data);
			}
		},
		complete: function (data) {
			if (completeCallback) {
				completeCallback(data);
			}
		}
	});
};

function apiError(json){
	console.error('api error:');
	console.error(json);
}
function apiComplete(json){

	//$('#show').masonry({
	//	// options
	//	itemSelector: '.item',
	//	//columnWidth: '.sizer',
	//	percentPosition:true
	//});

	var $grid = $('#show').imagesLoaded(function () {
		$grid.masonry({
			// options
			itemSelector: '.item',
			percentPosition: true
		});

		$grid.animate({
			opacity:1
		},600);
	});
}


function addItem(list){
  var html = '';
  list.forEach(function(entry, index){
    html +=
        '<div id="' + entry.id + '" class="item">';
    if(entry.imgurl) {
      html += '<img class="mainImg" src="' + entry.imgurl + '" alt=""/>';
    }
    html += '<p class="desc">' + entry.desc + '</p>'+
    '</div>';
  });

  $("#show").append(html);
}

(function($){

	openApi({
		api : "311"
	},function(json){

		addItem(json.data);

    $(".mainImg").unbind('click').click(function(){
      var src = this.src;
      window.location.href = "showOne.html?imgUrl=" + encodeURI(src);
    });

	},apiError,apiComplete);

  var btn = document.querySelector('#hiddenCopy');
  btn.addEventListener('click', function(event) {
    window.prompt("请长按以复制",window.location.href);

  });


})(jQuery);