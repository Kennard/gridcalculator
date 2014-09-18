/* Javascript for responsive nav */ 

$(document).ready(function(){

	var navtop = $('.menu');
		navslide = $('#toggleMenu');
		
	$(navslide).click(function() {
		$(navtop).slideToggle("slow");
		});

	$(window).resize(function(){
		var w = $(window).width();
		if( w > 767 && navtop.is(':hidden')) {
			navtop.removeAttr('style');
		}

	});


});