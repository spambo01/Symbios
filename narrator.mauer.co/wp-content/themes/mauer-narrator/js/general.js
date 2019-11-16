(function ($) {

"use strict";


function adjustStickyFooter() {
	var footerHeight = $('.footer-wrapper').outerHeight();
	$('body').css('margin-bottom', footerHeight + 'px');
	$('#footer').css('height', footerHeight + 'px');
}


function adjustHtmlMinHeight() {
	if($('body').hasClass('admin-bar')) {
		$('html').css('min-height', $(window).height() - $('#wpadminbar').height() + 'px');
	}
}

function adjustAdminBarPositioning() {
	if ($(window).width() <= 600) {
		$('#wpadminbar').css('position','fixed');
	}
}

function searchPopupController() {
	$(".search-popup-opener").on("click", function(e) {
		e.preventDefault();
		$(".search-popup").addClass('shown');
		$('.section-menu-stripe, .section-logo-area, .section-main-content, .section-footer').addClass('mauer-narrator-blur-filter');
		setTimeout(function(){
			$(".search-popup #s").focus();
		}, 200); // needs to be greater than the animation duration
	});

	$(".search-popup-closer").on("click", function(e) {
		e.preventDefault();
		$(".search-popup").removeClass('shown');
		$('.section-menu-stripe, .section-logo-area, .section-main-content, .section-footer').removeClass('mauer-narrator-blur-filter');
	});

	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$(".search-popup").removeClass('shown');
			$('.section-menu-stripe, .section-logo-area, .section-main-content, .section-footer').removeClass('mauer-narrator-blur-filter');
		}
	});
}


function adjustSearchPopupOffset() {
	if($('body').hasClass('admin-bar')) {
		$('.search-popup').css('top', $('#wpadminbar').height() + 'px');
	}
}


function commentFormHighlightNextBorder() {

	$('.comment-respond p.comment-form-author input')
		.mouseenter(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (!urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.addClass(('mouse-in-the-preceding-input'));}
		})
		.mouseleave(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.removeClass(('mouse-in-the-preceding-input'));}
		})
		.focus(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (!urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.addClass(('focus-on-the-preceding-input'));}
		})
		.focusout(function() {
			var urlInput = $(this).closest('p.comment-form-author').next('p.comment-form-email').find('input');
			if (urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.removeClass(('focus-on-the-preceding-input'));}
		});

	$('.comment-respond p.comment-form-email input')
		.mouseenter(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (!urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.addClass(('mouse-in-the-preceding-input'));}
		})
		.mouseleave(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (urlInput.hasClass('mouse-in-the-preceding-input')) {urlInput.removeClass(('mouse-in-the-preceding-input'));}
		})
		.focus(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (!urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.addClass(('focus-on-the-preceding-input'));}
		})
		.focusout(function() {
			var urlInput = $(this).closest('p.comment-form-email').next('p.comment-form-url').find('input');
			if (urlInput.hasClass('focus-on-the-preceding-input')) {urlInput.removeClass(('focus-on-the-preceding-input'));}
		});

}


function mauerInstafeed() {
	if ($('#mauer-narrator-instafeed-settings').length) {
		var nuOfPics = 14; // use an even number
		var breakpoint = 991;

		var relativeWidth = (100 / nuOfPics) * 1;

		var token  = $('#mauer-narrator-instafeed-settings #accessToken').text();

		var feed = new Instafeed({
			get: 'user',
			userId: token.substr(0, token.indexOf('.')),
			accessToken: token,
			resolution: 'thumbnail',
			limit: nuOfPics,
			target: 'mauer-narrator-instafeed',
			template: '<a href="{{link}}" target="_blank" class="mauer-narrator-instafeed-thumb-link" style="width:' + relativeWidth + '%;"><div class="mauer-narrator-instafeed-thumb-container" style="background-image: url(\'{{image}}\'); background-size: cover; background-position: center;"></div><div class="instafeed-thumb-overlay"></div></a>',
			error: function(error) {
				var errorIntro = $($('#mauer-narrator-instafeed')).data('errorIntro');
				$('#mauer-narrator-instafeed').append(errorIntro + '"' + error + '"');
			},
			after: function() {
				$('#mauer-narrator-instafeed').append($('<div class="clearfix"></div>'));
				if ($(window).width() <= breakpoint) {$('#mauer-narrator-instafeed a').css('width',relativeWidth*2+'%');} // initial check
				$(window).resize(function(){
					if ($(window).width() <= breakpoint) {$('#mauer-narrator-instafeed a').css('width',relativeWidth*2+'%');}
					else {$('#mauer-narrator-instafeed a').css('width',relativeWidth+'%');}
				});
			},
		});
		feed.run();
	}
}


function adjustEmbeddediFrameDimensions() {
	// preserve aspect ratio of all iframes that have width and height attributes set.
	$("iframe").each(function(i){
		if ( $.isNumeric($(this).attr("width")) && $.isNumeric($(this).attr("height")) ) {
			var aspectRatio = $(this).attr("width") / $(this).attr("height");
			$(this).height( $(this).width() / aspectRatio );
		}
	});
}


function detectMenuStripeWrap(flexClass) { // the class of the parent flex element containing flex items

	if (flexClass === undefined) {
		flexClass = ".menu-stripe-wrapper";
	}

	var flexItems = $(flexClass).children();
	var childrenWidth = 0;
	var offsets = [];

	flexItems.each(function(i,el){
		el = $(el);
		var leftOffset = $(el).offset().left;
		if ($.inArray(leftOffset, offsets) != '-1') {
			$(flexClass).addClass('menu-stripe-flex-wrapped');
			return false; // this exits the each()
		} else {
			offsets.push(leftOffset);
			if (i + 1 == flexItems.length) {
				$(flexClass).removeClass('menu-stripe-flex-wrapped');
				return false; // this exits the each()
			}
		}
	});

}


function adjustGalleriesAndEmbedsWidth() {
	if ($('.gallery-width-reference').length) {
		$('.entry-full .mauer-narrator-pswp-gallery, .entry-full .mauer-narrator-wp-embed-wrapper').each(function(){

			var targetElement = $(this);

			if ($(this).hasClass('mauer-narrator-wp-embed-wrapper') && $(this).closest('.wp-block-embed').length) {
				targetElement = $(this).closest('.wp-block-embed'); // This means we're dealing with a Gutenberg embed
			}

			var sideMargin = (targetElement.width() - $('.gallery-width-reference').width()) / 4;
			targetElement.css('margin-left', sideMargin + 'px').css('margin-right', sideMargin + 'px');
		});
	}
}


function adjustSharedaddyButtons() {
	if ($('.entry-full .sharedaddy.sd-sharing-enabled ul li:not(.share-end)').length) {
		var sdIcons = $('.entry-full .sharedaddy.sd-sharing-enabled ul li:not(.share-end)');
		var widthToHave = 100 / sdIcons.length + '%';
		sdIcons.each(function(){
			$(this).css('width', widthToHave);
		});
	}
}


// Inspired by Justin Hileman's snippet, http://justinhileman.info/article/a-jquery-widont-snippet/
function adjustOrphans() {
	var run = function(selector) {
		$(selector).each(function() {
			$(this).html($(this).html().replace(/\s([^\s<]{0,14})\s*$/,'<span class="hide-below-500"> </span><span class="show-above-500">&nbsp;</span>$1'));
		});
	}
	// running these separately as intersecting selectors like 'h1, h1 a' would not work on a single run.
	run('h1, h2, h3, h4, h5, h6');
	run('.entry-title a');
}


$(document).ready(function() {
	adjustHtmlMinHeight();
	adjustSearchPopupOffset();
	searchPopupController();
	mauerInstafeed();
	setTimeout(adjustStickyFooter, 100);
	commentFormHighlightNextBorder();
	adjustAdminBarPositioning();
	adjustGalleriesAndEmbedsWidth();
	adjustSharedaddyButtons();
	autosize($('textarea'));
	adjustOrphans();
});


var lastRecordedWidth = $(window).width();

$(window).resize(function(){
	if ($(window).width()!=lastRecordedWidth) {
		detectMenuStripeWrap();
		adjustGalleriesAndEmbedsWidth();
		lastRecordedWidth = $(window).width();
	}
	adjustHtmlMinHeight();
	adjustEmbeddediFrameDimensions();
	setTimeout(adjustStickyFooter, 100);
	adjustSearchPopupOffset();
	adjustAdminBarPositioning();
});

$(window).load(function(){
	$(".mauer-narrator-preloader").addClass("mauer-narrator-preloader-hidden");
	adjustEmbeddediFrameDimensions();
	adjustStickyFooter();
	detectMenuStripeWrap();
});


})(jQuery);
