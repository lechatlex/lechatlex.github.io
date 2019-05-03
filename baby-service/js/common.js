$(function() {

	// $(window).resize(function() {
	// 	$('header').height(window.innerHeight + 'px');
	// 	$('.header_app').height(window.innerHeight + 1 + 'px');

	// 	// Вычисляем высоту блока при загрузке страницы и делаем резиновый отступ
	// 	header_height = $("header").outerHeight();
	// 	header_right_block_height = header_height / 100 * 84;
	// 	header_menu_height = header_height / 100 * 86;
	// 	// alert("contentTopPosition "+ header_right_block_height + 'px');
	// 	$(".header_right_block").css({ top: header_right_block_height});
	// 	$(".header_menu").css({ top: header_menu_height});
	// })

	// var windowWidth = window.innerWidth;
	// $("header").css({ width: windowWidth});
	// alert('viewport width is: '+ windowWidth + ' and viewport height is:' + windowHeight);

	// Вычисляем высоту блока при загрузке страницы и оставляем её постоянной
	// (устраняет дёргание блока при прокрутке страницы)
	$('header').height(window.innerHeight + 'px');
	$('.header_app').height(window.innerHeight + 1 + 'px');

	// Вычисляем высоту блока при загрузке страницы и делаем резиновый отступ
	header_height = $("header").outerHeight();
	header_right_block_height = header_height / 100 * 84;
	header_menu_height = header_height / 100 * 86;
	// alert("contentTopPosition "+ header_right_block_height + 'px');
	$(".header_right_block").css({ top: header_right_block_height});
	$(".header_menu").css({ top: header_menu_height});



	(function(cb) {
		// browser event has already occurred.
		if (document.readyState === "complete") {
			return setTimeout(cb);
		}
		// Mozilla, Opera and webkit style
		if (window.addEventListener) {
			return window.addEventListener("load", cb, false);
		}
		// If IE event model is used
		if (window.attachEvent) {
			return window.attachEvent("onload", cb);
		}
	})

	(function() {
		document.querySelectorAll('.nav-btn').forEach(function(el) {
			el.addEventListener('click', function() {
				var nav = this.parentElement.parentElement,
					_class = 'open';
				nav.classList.contains(_class) ?
					nav.classList.remove(_class) :
					nav.classList.add(_class)
			});
		});
	});
});