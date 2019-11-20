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
	adjustAdminBarPositioning();
});

$(window).load(function(){
	$(".mauer-narrator-preloader").addClass("mauer-narrator-preloader-hidden");
	adjustEmbeddediFrameDimensions();
	adjustStickyFooter();
	detectMenuStripeWrap();
});


})(jQuery);
