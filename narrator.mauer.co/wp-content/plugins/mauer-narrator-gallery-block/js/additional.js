(function ($) {

"use strict";

window.adjustImagesInGalleries = function() {
	$('.mauer-narrator-pswp-gallery').each(function(){

		$(this).find('.mauer-narrator-pswp-gallery-img-1-and-only').each(function(){
			$(this).closest('figure').width('100%');
			$(this).height('auto');
		});

		$(this).find('.mauer-narrator-pswp-gallery-img-1-of-2').each(function(){
			var firstImageInPair = $(this);
			var secondImageInPair = $(this).closest('figure').next().find('img');
			var combinedAspectRatio = parseFloat(firstImageInPair.attr('data-aspect-ratio')) + parseFloat(secondImageInPair.attr('data-aspect-ratio'));
			var firstImageRelWidth = firstImageInPair.attr('data-aspect-ratio') / combinedAspectRatio;
			var secondImageRelWidth = secondImageInPair.attr('data-aspect-ratio') / combinedAspectRatio;

			firstImageInPair.height('auto').closest('figure').width( firstImageRelWidth * 100 + '%' );
			secondImageInPair.height('auto').closest('figure').width( secondImageRelWidth * 100 + '%' );

			var galleryWidth = $(this).closest('.mauer-narrator-pswp-gallery').width();
			var firstImageCalculatedHeight = (galleryWidth * firstImageRelWidth ) / parseFloat(firstImageInPair.attr('data-aspect-ratio'));
			var secondImageCalculatedHeight = (galleryWidth * secondImageRelWidth ) / parseFloat(secondImageInPair.attr('data-aspect-ratio'));
			var lowestHeight = Math.min(firstImageCalculatedHeight, secondImageCalculatedHeight);
			firstImageInPair.add(secondImageInPair).outerHeight(lowestHeight + 2); // + 2 comes from the borders
		});

		$(this).find('.mauer-narrator-pswp-gallery-img-1-of-3').each(function(){
			var firstImageInTriad = $(this);
			var secondImageInTriad = $(this).closest('figure').next().find('img');
			var thirdImageInTriad = $(this).closest('figure').next().next().find('img');
			var combinedAspectRatio = parseFloat(firstImageInTriad.attr('data-aspect-ratio')) + parseFloat(secondImageInTriad.attr('data-aspect-ratio')) + parseFloat(thirdImageInTriad.attr('data-aspect-ratio'));

			var firstImageRelWidth = firstImageInTriad.attr('data-aspect-ratio') / combinedAspectRatio;
			var secondImageRelWidth = secondImageInTriad.attr('data-aspect-ratio') / combinedAspectRatio;
			var thirdImageRelWidth = thirdImageInTriad.attr('data-aspect-ratio') / combinedAspectRatio;

			firstImageInTriad.height('auto').closest('figure').width( firstImageRelWidth * 100 + '%' );
			secondImageInTriad.height('auto').closest('figure').width( secondImageRelWidth * 100 + '%' );
			thirdImageInTriad.height('auto').closest('figure').width( thirdImageRelWidth * 100 + '%' );

			var galleryWidth = $(this).closest('.mauer-narrator-pswp-gallery').width();
			var firstImageCalculatedHeight = (galleryWidth * firstImageRelWidth ) / parseFloat(firstImageInTriad.attr('data-aspect-ratio'));
			var secondImageCalculatedHeight = (galleryWidth * secondImageRelWidth ) / parseFloat(secondImageInTriad.attr('data-aspect-ratio'));
			var thirdImageCalculatedHeight = (galleryWidth * thirdImageRelWidth ) / parseFloat(thirdImageInTriad.attr('data-aspect-ratio'));
			var lowestHeight = Math.min(firstImageCalculatedHeight, secondImageCalculatedHeight, thirdImageCalculatedHeight);
			firstImageInTriad.add(secondImageInTriad).add(thirdImageInTriad).outerHeight(lowestHeight + 2); // + 2 comes from the borders
		});

	});
}

$(window).resize(function(){
	adjustImagesInGalleries();
});

$(window).load(function(){
	adjustImagesInGalleries();
});


})(jQuery);