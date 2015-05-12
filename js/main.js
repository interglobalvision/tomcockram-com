/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr */

function l(data) {
  'use strict';
  console.log(data);
}

var
	winHeight = $(window).height();

jQuery(document).ready(function () {
  'use strict';
  l('Hola Globie');

  // SPLASH
  if ($('#splash').length) {
  	$('.splash-margin').css('margin-top', winHeight);
  	$('#main-container').removeClass('u-hidden');
  }

  //RESIZE
  $(window).on('resize', function() {
  	winHeight = $(window).height();

		if ($('#splash').length) {
	  	$('.splash-margin').css('margin-top', winHeight);
	  }
  })
  
});