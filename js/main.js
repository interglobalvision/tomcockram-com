/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr */

function l(data) {
  'use strict';
  console.log(data);
}

var
  windowHeight = $(window).height(),
  animationSpeed = 300,
  slideMargin = parseInt( $('#header').css('padding-top'), 10 ),
  headerTop = $('#header').offset().top,
  headerHeight = $('#header').outerHeight(),
  sliderHeight = windowHeight - headerHeight - slideMargin,
  $headerSpacer = $('.js-header-spacer');

jQuery(document).ready(function () {
  'use strict';
  l('Hola Globie');

  // SPLASH
  if ($('#splash').length) {

    $('#splash').height(windowHeight);

    $('#main-container').removeClass('u-hidden').css('min-height', windowHeight);
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $('#main-container').offset().top && $('#splash').length) {
        $('#splash').remove();
        $('.splash-margin').css('margin-top', 0);
        $(window).scrollTop(0);
      }
    });

    $('#splash').on('click', function() {
      $('html, body').animate({scrollTop: $('#main-container').offset().top, }, ( animationSpeed * 2 ));
    });
  }

  // MASONRY
  if ( $('.js-masonry-container').length ) {
    $('.js-masonry-container').imagesLoaded( function() {
      $('.js-masonry-container').masonry({
        itemSelector: '.js-masonry-item',
        columnWidth: 1,
        gutter: 0,
        transitionDuration: '0s',
      }).css({
        'opacity': 1,
      });
      if ( $('.feed-item-title').length ) {
        $('.feed-item-title').css('visibility', 'visible');
      }
    });
  }

  //SLIDER
  if ( $('.slider-content').length ) {
    // >>> this isnt actually working until a window resize. on load this doesnt fire/set the correct value
    $('.slider-img').css('max-height', sliderHeight );
  }

  $('.js-single-masonry-item').on({
    click: function() {
      if ($('.slider-content').hasClass('slider-hidden')) {
        var slideIndex = $(this).attr('data-index');

        $('.cycle-slideshow').cycle('goto', slideIndex);
        $('.masonry-content').animate({'opacity' : 0,}, animationSpeed, function() {
          $('.masonry-content').css('display', 'none');
          $('.slider-content').animate({'opacity' : 1,}, animationSpeed).removeClass('slider-hidden');
          $('#close-slider').removeClass('u-hidden');
        });
      }
    },
  });

  $('#close-slider').on({
    click: function() {
      $('.slider-content').animate({'opacity' : 0,}, animationSpeed, function() {
        $('.masonry-content').css('display', 'block');
        $('.js-masonry-container').masonry();
        $('.masonry-content').animate({'opacity' : 1,}, animationSpeed);
        $('.slider-content').addClass('slider-hidden');
        $('#close-slider').addClass('u-hidden');
      });
    },
  });

  // STICK HEADER
  if ($headerSpacer.length) {
    console.log(headerHeight);
    $headerSpacer.css('height', headerHeight);

    $(window).on('scroll', function() {

      if ($('#splash').length) {
        headerTop = $('#header').offset().top;
      } else {
        headerTop = ( headerHeight * 2 );
      }

      if ($('#header').hasClass('u-fixed') && $(window).scrollTop() < headerTop) {
        $('#header').removeClass('u-fixed');
        $headerSpacer.addClass('u-hidden');
      } else if ($(window).scrollTop() > headerTop) {
        $('#header').addClass('u-fixed');
        $headerSpacer.removeClass('u-hidden');
      }

    });
  }

  // RESIZE
  $(window).on('resize', function() {
    windowHeight = $(window).height();
    headerHeight = $('#header').outerHeight();
    slideMargin = parseInt( $('#header').css('padding-top'), 10 );
    sliderHeight = windowHeight - headerHeight - slideMargin;

    $('#main-container').css('min-height', windowHeight);

    if ($('#splash').length) {
      $('#splash').height(windowHeight);
    }

    if ( $('.slider-content').length ) {
      $('.slider-img').css('height', sliderHeight );
    }
  });

});