/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

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
  sliderHeight = windowHeight - headerHeight - slideMargin;

var singleProject = {
  openSlideshow: function() {
    if ($('.slider-content').hasClass('slider-hidden')) {
        var delay;
        var slideIndex = $(this).attr('data-index');

        $('.cycle-slideshow').cycle('goto', slideIndex);

        $('.masonry-content').addClass('masonry-hidden');
        $('#single-vimeo-embed').addClass('vimeo-hidden');

        delay = setTimeout(function() {
          $('.masonry-content').hide();
          $('.slider-content').removeClass('slider-hidden');
          $('#close-slider').removeClass('u-hidden');
          $('#close-single').addClass('u-hidden');
        }, animationSpeed);
      }
  },

  closeSlideshow: function() {
    var delay;

    $('.slider-content').addClass('slider-hidden');

    delay = setTimeout(function() {
      $('.masonry-content').show();
      $('.js-masonry-container').masonry();
      $('#single-vimeo-embed').removeClass('vimeo-hidden');
      $('.masonry-content').removeClass('masonry-hidden');
      $('.slider-content').addClass('slider-hidden');
      $('#close-slider').addClass('u-hidden');
      $('#close-single').removeClass('u-hidden');
    }, animationSpeed);
  },
};

// HOME HASH
if(window.location.hash === "#home") {
  $('html, body').animate({scrollTop: $('#main-container').offset().top,}, ( animationSpeed ));
  window.location.hash = "";
}


jQuery(document).ready(function () {
  'use strict';

  // SPLASH
  if ($('#splash').length) {

    $('#splash').height(windowHeight);

    $('#main-container').removeClass('u-hidden').css('min-height', windowHeight);

    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $('#main-container').offset().top && $('#splash').length) {
        hideSplash();
      }
    });

    $('#splash').on('click', function() {
      $('html, body').animate({scrollTop: $('#main-container').offset().top,}, ( animationSpeed * 2 ));
    });

    var hideSplash = function() {
      $('#splash').remove();
      $('.splash-margin').css('margin-top', 0);
      $(window).scrollTop(0);
    };
  }

  // MENU FILTERS

  $('.js-menu-filter').on({
    click: function(e) {
      e.preventDefault();
      var target = $(this).data('target').toLowerCase();

      if (target === 'all') {
        $('.post').show();
        $('.js-masonry-container').masonry();
      } else {
        $('.post').hide();
        $('.category-' + target).show();
        $('.js-masonry-container').masonry();
      }

    },
  });

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
    $('.slider-item').css('height', sliderHeight );

    $(document).keydown( function(e) {
      switch(e.which) {
        case 37: { // left
          $('.cycle-slideshow').cycle('prev');
          break;
        }

        case 39: { // right
          $('.cycle-slideshow').cycle('next');
          break;
        }

        case 27: {// escape
          singleProject.closeSlideshow();
          break;
        }

        default: {
          return; // exit this handler for other keys
        }
      }

    });
  }

  $('.js-single-masonry-item').on({
    click: function() {
      singleProject.openSlideshow();
    },
  });

  $('#close-slider').on({
    click: function() {
      singleProject.closeSlideshow();
    },
  });

  // STICK HEADER
  $('#main-container').css('padding-top', headerHeight);

  if ($('#splash').length) {
    $(window).bind('scroll', function() {

      if ($(window).scrollTop() > 0) {
        $('#splash-title').fadeOut(animationSpeed);
      }

      if ($('#splash').length) {
        headerTop = $('#header').offset().top;
      } else {
        headerTop = 0;
      }

      if (!$('#header').hasClass('u-fixed') && $(window).scrollTop() > headerTop) {
        $('#header').addClass('u-fixed');
        $(window).unbind('scroll');
      }
    });
  } else {
    $('#header').addClass('u-fixed');
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
      $('.slider-item').css('height', sliderHeight );
    }
  });

});
