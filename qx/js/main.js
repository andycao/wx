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
    html += '<p class="desc">' + entry.desc + '</p>';
    html += '<p class="last"><span class="likes">' + entry.like + '</span><i class="button fa fa-thumbs-o-up"></i></p>' +
    '</div>';
  });

  $("#show").append(html);
}

(function($){

	openApi({
		api : "311"
	},function(json){
    console.log(json);

		addItem(json.data);

    $(".mainImg").unbind('click').click(function(){
      var src = this.src;
      window.location.href = "showOne.html?imgUrl=" + encodeURI(src);
    });

    $("#show .last").unbind('click').click(function(event){
      event.stopPropagation();
      var id = $(this).parent().attr('id');
      var likes = $(this).children('.likes');

      if(id){
        openApi({
          api : "312",
          id : id
        },function(json){
          var newLike = parseInt(json.data);
          if( !Number.isNaN(newLike)){

            //改变like数量
            likes.text(newLike);

          } else {
            alert('您已经赞过了^_^');
          }

        }, apiError,function(){

          //改变拇指形状
          likes.next().removeClass("fa-thumbs-o-up").addClass("fa-thumbs-up");
        });
      }
    });

    //这个apiComplete 只在初始化时调用
	},apiError,apiComplete);

  var btn = document.querySelector('#hiddenCopy');
  btn.addEventListener('click', function(event) {
    window.prompt("请长按以复制",window.location.href);

  });


})(jQuery);