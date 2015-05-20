/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr */

function l(data) {
  'use strict';
  console.log(data);
}

var
	winHeight = $(window).height(),
  animSpeed = 300,
  slideMargin = parseInt( $('#header').css('padding-top'), 10 ),
  slideIndex,
  headerTop = $('#header').offset().top;

jQuery(document).ready(function () {
  'use strict';
  l('Hola Globie');

  // SPLASH
  if ($('#splash').length) {
  	$('.splash-margin').css('margin-top', winHeight);
  	$('#main-container').removeClass('u-hidden');
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $('#main-container').offset().top && $('#splash').length) {
        $('#splash').remove();
        $('.splash-margin').css('margin-top', 0);
        $(window).scrollTop(0)
      }
    });
  }

  $('#splash').on('click', function() {
    $('html, body').animate({ scrollTop: $('#main-container').offset().top }, ( animSpeed * 2 ));
  });

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
  var headerHeight = $('#header').outerHeight();
  var sliderHeight = winHeight - headerHeight - slideMargin;

  if ( $('.slider-content').length ) {
    $('.slider-img').css('max-height', sliderHeight );
  }

  $('.js-single-masonry-item').on({
    click: function() {
      if ($('.slider-content').hasClass('slider-hidden')) {
        var slideIndex = $(this).attr('data-index');
        $('.cycle-slideshow').cycle('goto', slideIndex);
        $('.masonry-content').animate({'opacity' : 0}, animSpeed, function() {
          $('.masonry-content').css('display','none');
          $('.slider-content').animate({'opacity' : 1}, animSpeed).removeClass('slider-hidden');
          $('#view-toggle').removeClass('u-hidden');
        });
      }
    }
  });

  $('#view-toggle').on({
    click: function() {
      $('.slider-content').animate({'opacity' : 0}, animSpeed, function() {
        $('.masonry-content').css('display','block')
        $('.js-masonry-container').masonry();
        $('.masonry-content').animate({'opacity' : 1}, animSpeed);
        $('.slider-content').addClass('slider-hidden');
        $('#view-toggle').addClass('u-hidden');
      });
    }
  });


  //STICK HEADER
  var $headerSpacer = $('.js-header-spacer');

  if ($headerSpacer.length) {
    console.log(headerHeight);
    $headerSpacer.css('height', headerHeight);

    $(window).on('scroll', function() {

      if ($('#splash').length) {
        headerTop = $('#header').offset().top;
      } else {
        headerTop = ( headerHeight * 2 );
      }

      if ($('#header').hasClass('u-fixed')) {
        if ($(window).scrollTop() < headerTop) {
          $('#header').removeClass('u-fixed');
          $headerSpacer.addClass('u-hidden');
        }
      } else {
        if ($(window).scrollTop() > headerTop) {
          $('#header').addClass('u-fixed');
          $headerSpacer.removeClass('u-hidden');
        }
      }

    });
  }


  //RESIZE
  $(window).on('resize', function() {
  	winHeight = $(window).height();
    headerHeight = $('#header').outerHeight();
    slideMargin = parseInt( $('#header').css('padding-top'), 10 );
    sliderHeight = winHeight - headerHeight - slideMargin;

		if ($('#splash').length) {
	  	$('.splash-margin').css('margin-top', winHeight);
	  }

    if ( $('.slider-content').length ) {
      $('.slider-img').css('height', sliderHeight );
    }
  })
  
});