/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr */

function l(data) {
  'use strict';
  console.log(data);
}

var
	winHeight = $(window).height(),
  headerHeight = $('#header').outerHeight(),
  slideMargin = parseInt( $('#header').css('padding-top'), 10 ),
  slideIndex;

jQuery(document).ready(function () {
  'use strict';
  l('Hola Globie');

  // SPLASH
  if ($('#splash').length) {
  	$('.splash-margin').css('margin-top', winHeight);
  	$('#main-container').removeClass('u-hidden');
  }

  // PACKERY
  if ( $('.js-masonry-container').length ) {
    $('.js-masonry-container').imagesLoaded( function() {
      $('.js-masonry-container').masonry({
        itemSelector: '.js-masonry-item',
        columnWidth: 1,
        gutter: 0,
        transitionDuration: '0s',
      }).css({
        'opacity': 1
      });
    });
  }

  //SLIDER
  var sliderHeight = winHeight - headerHeight - slideMargin;

  if ( $('.slider-content').length ) {
    $('.slider-img').css('max-height', sliderHeight );
  }

  $('.js-single-masonry-item').on({
    click: function() {
      if ($('.slider-content').hasClass('slider-hidden')) {
        var slideIndex = $(this).attr('data-index');
        $('.cycle-slideshow').cycle('goto', slideIndex);
        $('.masonry-content').animate({'opacity' : 0}, 300, function() {
          $('.masonry-content').css('display','none');
          $('.slider-content').animate({'opacity' : 1}, 300).removeClass('slider-hidden');
          $('#view-toggle').removeClass('u-hidden');
        });
      }
    }
  });

  $('#view-toggle').on({
    click: function() {
      $('.slider-content').animate({'opacity' : 0}, 300, function() {
        $('.masonry-content').css('display','block').animate({'opacity' : 1}, 300);
        $('.slider-content').addClass('slider-hidden');
        $('#view-toggle').addClass('u-hidden');
      });
    }
  });


  //RESIZE
  $(window).on('resize', function() {
  	winHeight = $(window).height();
    headerHeight = $('#header').outerHeight();
    slideMargin = parseInt( $('#header').css('padding-top'), 10 );

		if ($('#splash').length) {
	  	$('.splash-margin').css('margin-top', winHeight);
	  }

    if ( $('.slider-content').length ) {
      $('.slider-img').css('height', sliderHeight );
    }
  })
  
});