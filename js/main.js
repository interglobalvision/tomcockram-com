/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

function l(data) {
  'use strict';
  console.log(data);
}

var
  siteInit,
  Ajaxy,
  windowHeight = $(window).height(),
  windowWidth = $(window).width(),
  animationSpeed = 700,
  slideMargin = parseInt( $('#header').css('padding-top'), 10 ),
  headerTop = $('#header').offset().top,
  headerHeight = $('#header').outerHeight(),
  sliderHeight = windowHeight - headerHeight - slideMargin,
  $older = null,
  loadingNext = false;

/*
 * siteInit()
 *
 * This function wraps everything that needs to run on each load; onload or after ajax load
 */
siteInit = function() {

  // AJAXY
  Ajaxy.init();

  $('.cycle-slideshow').cycle();
  var singleProject = {
    openSlideshow: function(slide) {
      var _this = this;

      if ($('.slider-content').hasClass('slider-hidden')) {
        var delay;

        $('.cycle-slideshow').cycle('goto', slide);
        $('.masonry-content').addClass('masonry-hidden');
        $('#single-vimeo-embed').addClass('vimeo-hidden');
        _this.lazyloadSlideshow();

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

    lazyloadSlideshow: function() {
      $('.cycle-slideshow').imagesLoaded( function() {
        $('.js-lazyload-slideshow').each(function() {
          var $this = $(this),
            src = $this.data('src');

          $this.attr('src', src);
        });
      });
    },
  };

  jQuery(document).ready(function () {
    'use strict';

    // SPLASH
    if ($('#splash').length) {

      var splashTimeout = setTimeout(function() {
        $('html, body').animate({
            scrollTop: $('#main-container').offset().top,
        }, animationSpeed);
      }, 3000);

      $('#splash').height(windowHeight);

      $('#main-container').removeClass('u-hidden').css('min-height', windowHeight);

      $(window).on('scroll', function() {
        if ($(window).scrollTop() >= $('#main-container').offset().top && $('#splash').length) {
          hideSplash();
        }
      });

      $('#splash').on('click', function() {
        $(window).disablescroll({
          handleScrollbar: false,
        });
        setTimeout(function() {
          $(window).disablescroll('undo');
        }, animationSpeed);

        $('html, body').animate({scrollTop: $('#main-container').offset().top,}, animationSpeed);
      });

      var hideSplash = function() {
        $('#splash').remove();
        $('.splash-margin').css('margin-top', 0);
        $(window).scrollTop(0);
        clearTimeout(splashTimeout);
      };
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

    if ($('video').length) {
      $('video').on({
        'mouseenter': function() {
          this.play();
        },

        'mouseleave': function() {
          this.pause();
        },
      });
    }

    //SLIDER
    if ( $('.slider-content').length ) {
      $('.slider-item').css('height', sliderHeight );
      $('.slider-img').css('max-height', sliderHeight );

      $(document).keydown( function(e) {
        console.log('keydown:', e.which);
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

      $('.slider-wrapper').swipe({
        swipeLeft: function() {
          $('.cycle-slideshow').cycle('next');
        },
        swipeRight: function() {
          $('.cycle-slideshow').cycle('prev');
        },
      });
    }

    $('.js-single-masonry-item').on({
      click: function() {
        if (windowWidth > 468) {
          var index = $(this).data('index');

          singleProject.openSlideshow(index);
        }
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
      $(window).bind('scroll.stickyHeader', function() {

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
          $(window).unbind('.stickyHeader');
        }
      });
    } else {
      $('#header').addClass('u-fixed');
    }

    // INFINITE SCROLL
    $older = $('#pagination a:contains("Older")');
    if( $('body').hasClass('home') || $('body').hasClass('archive') ) {

      $(window).on('scroll', function() {

        // If reach bottom of document
        if ($(window).scrollTop() === ($(document).height() - $(window).height() ) && loadingNext === false) {

         // If 'Older' pagination exist
          if( $older.length !== 0 ) {

            var url = $older.attr('href');

            $.ajax(url, {
              beforeSend: function() {
                // Hide pagination
                $('#pagination').fadeOut('50');

                // Show loading
                $('.loading-more').fadeIn('100');

              },

              dataType: 'html',
              error: function(jqXHR, textStatus) {
                loadingNext = false;
                console.error(textStatus);
              },

              success: function(data) {

                // Convert data into proper html to be able to fully parse thru jQuery
                var respHtml = document.createElement('html');

                respHtml.innerHTML = data;

                // Get changes: body classes, page title, main content, header
                var $bodyClasses = $('body', respHtml).attr('class');
                var $items = $('.feed-item', respHtml);
                var $pagination = $('#pagination', respHtml);

                // Update with new content and classes
                $('body').removeAttr('class').addClass($bodyClasses);

                // Set new item's opacity to 0
                $items.css({opacity: 0,});

                // Append new items
                $('#feed-container').append($items);

                // Run masonry after all images have loaded
                var itemsCount = 0;

                $('#feed-container img').load(function() {
                  itemsCount++;
                  if( itemsCount === $items.length ) {
                    $items.css({opacity: 1,});
                    $('#feed-container').masonry('appended', $items);
                  }
                });

                // Update pagination
                if( $('#pagination a:contains("Older")', respHtml).length ) {
                  $('#pagination').replaceWith($pagination);
                } else {
                  // Hide pagination on last paage
                  $('#pagination').html('');
                }

                $older = $('#pagination a:contains("Older")');
                loadingNext = false;
              },

              complete: function() {
                // Hide pagination
                $('#pagination').fadeIn('100');

                // Show loading
                $('.loading-more').fadeOut('50');
              },
            });
            loadingNext = true;
          }
        }
      });
    }

    // RESIZE
    $(window).on('resize', function() {
      windowHeight = $(window).height();
      windowWidth = $(window).width();
      headerHeight = $('#header').outerHeight();
      slideMargin = parseInt( $('#header').css('padding-top'), 10 );
      sliderHeight = windowHeight - headerHeight - slideMargin;

      $('#main-container').css('min-height', windowHeight);

      if ($('#splash').length) {
        $('#splash').height(windowHeight);
      }

      if ( $('.slider-content').length ) {
        $('.slider-item').css('height', sliderHeight );
        $('.slider-img').css('max-height', sliderHeight );
      }
    });

  });
};

// AJAX
Ajaxy = {
  init: function() {
    var _this = this;
    var ajaxyLinks = 'a.ajax-link';

    if( $('body').hasClass('page') || $('body').hasClass('blog') || $('body').hasClass('category') ) {
      ajaxyLinks += ', .js-menu-filter, #pagination a';
    }

    // Find all ajaxy links and bind ajax event
    $(ajaxyLinks).click( function(event) {
      event.preventDefault();

      var url = event.currentTarget.href;

      $('#loading').addClass('on');
      $('#main-content').addClass('main-content-hidden');
      $('#header').addClass('header-hidden');
      $("html, body").animate({scrollTop: 0,}, animationSpeed);
      _this.ajaxLoad(url);

    });

    // For back button
    window.onpopstate = function() {
      _this.ajaxLoad(document.location.origin + document.location.pathname);
    };
  },

  ajaxLoad: function(url) {
    var _this = this;

    $.ajax(url, {
      beforeSend: function() {
        _this.ajaxBefore();
      },

      dataType: 'html',
      error: function(jqXHR, textStatus) {
        _this.ajaxErrorHandler(jqXHR, textStatus);
      },

      success: function(data) {
        _this.ajaxSuccess(data, url);
        setTimeout( function() {
          $('#main-content').removeClass('main-content-hidden');
          $('#header').removeClass('header-hidden');
          $('#loading').removeClass('on');
        }, animationSpeed);
      },
    });
  },

  ajaxBefore: function() {
  },

  ajaxErrorHandler: function(jqXHR, textStatus) {
    alert(textStatus);
    l(jqXHR);
  },

  ajaxSuccess: function(data,url) {

    // Convert data into proper html to be able to fully parse thru jQuery
    var respHtml = document.createElement('html');

    respHtml.innerHTML = data;

    // Unbind events
    $(window).unbind('resize');
    $(window).unbind('scroll');
    $(document).unbind('keydown');
    $('#splash').unbind('click');

    // Get changes: body classes, page title, main content, header
    var $bodyClasses = $('body', respHtml).attr('class');
    var $title = $('title', respHtml).text();
    var $header = $('#header', data);
    var $content = $('#main-content', respHtml);

    // Push new history state and update title
    history.pushState(null, $title, url);
    document.title = $title;

    // Update with new content and classes
    $('body').removeAttr('class').addClass($bodyClasses);
    $('#main-content').html($content.html());
    $('#header').html($header.html());

    // Rebind initial JS
    siteInit();
  },
};

siteInit();
