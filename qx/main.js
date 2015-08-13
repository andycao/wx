/**
 * Created by andy on 2015/8/13.
 */
var $grid = $('#show').imagesLoaded(function () {
	$grid.masonry({
		// options
		itemSelector: '.item',
		percentPosition: true
	});
});