$(function() {

	$('#my-menu').mmenu({
		extensions: ['widescreen', 'effect-menu-slide', 'pagedim-black', 'border-none', 'position-right'],
		navbar: {
			title: '<a href="tel:+375 33 000 00 00">+375 33 000 00 00</a>'
		},
		"slidingSubmenus": false,
		onClick: {
			close: true,
			preventDefault: false,
		}
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('open:start', function() {
		$('.hamburger').addClass('is-active');
	}).bind('close:finish', function() {
		$('.hamburger').removeClass('is-active');
	});
});