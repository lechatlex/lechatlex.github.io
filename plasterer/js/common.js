$(function() {

	$('#my-menu').mmenu({
		extensions: [ 'widescreen', 'theme-black', 'effect-menu-slide', 'pagedim-black', 'border-none' ],
		navbar: {
			title: '<img src="img/logo_orange.svg" alt="Штукатурные работы">СтройСистем'
		},
		"slidingSubmenus": false,
  	onClick : {
	    close          : true,
	    preventDefault : false,
	  }
		// "autoHeight": true
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('open:start', function () {
		$('.hamburger').addClass('is-active');
	}).bind('close:finish', function () {
		$('.hamburger').removeClass('is-active');
	});

	$('.owl-carousel').owlCarousel({
		// loop: true,
		nav: true,
		smartSpeed: 700,
		// navText: ['<i class="fas fa-angle-left"></i>', 
		// 					'<i class="fas fa-angle-right"></i>'],
		navText: ["", ""],
		// navText: ['<img src="/img/list_left_orange.svg" alt="alt">', 
		// 					'<img src="/img/list_right_orange.svg" alt="alt">'],
		dots: false,
		margin: 3,
		autoHeight: true,
		lazyLoad: false,
		// autoWidth: true,
		responsiveClass: true,
		responsive: {
			0: { items: 1 },
			800: { items: 2 },
			1100: { items: 3 },
		},
	});

	// Прячем меню при прокрутке вниз и показываем при прокрутке вверх
	var mywindow = $(window);
	var mypos = mywindow.scrollTop();
	var up = false;
	var newscroll;
	mywindow.scroll(function () {
	    newscroll = mywindow.scrollTop();
	    if (newscroll > mypos && !up) {
	        $('.top-line').stop().fadeOut();
	        up = !up;
	        console.log(up);
	    } else if(newscroll < mypos && up) {
	        $('.top-line').stop().fadeIn();
	        up = !up;
	    }
	    mypos = newscroll;
	});
	
});
