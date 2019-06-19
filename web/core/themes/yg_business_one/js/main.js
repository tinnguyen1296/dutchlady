(function ($) {

	Drupal.behaviors.exampleModule = {
  	attach: function (context, settings) {

 	'use strict';

jQuery(document).ready(function( $ ) {
  $('.loop').owlCarousel({
    loop: true,
    margin: 10,
    responsive: {
      0:{
	        items:1
	    },
	    600:{
	        items:1
	    },
	    1000:{
	        items:1
	    }    
    }
  });
  new WOW().init();
});


 $(".nav-menu li:first-child").addClass("menu-active");
 
}}})(jQuery, Drupal);