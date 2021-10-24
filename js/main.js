$(document).ready(function () {

	$('.header-menu__btn').on('click', function () {
		$(this).toggleClass('header-menu__btn--active');
		$('.header-menu__list').toggleClass('header-menu__list--active');
		$('.carousel').toggleClass('carousel--active');
	});

});

import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
	interval: 1000,
});

carousel.init();