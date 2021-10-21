function SwipeCarousel() {
	Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);

SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype.swipeStart = function (event) {
	this.swipeStartX = event.changedTouches[0].pageX;
};

SwipeCarousel.prototype.swipeEnd = function (event) {
	this.swipeEndX = event.changedTouches[0].pageX;
	if (this.swipeStartX - this.swipeEndX < -100) this.previous();
	if (this.swipeStartX - this.swipeEndX > 100) this.next();
};

SwipeCarousel.prototype._initListeners = function () {
	Carousel.prototype._initListeners.apply(this);
	this.container.addEventListener('touchstart', this.swipeStart.bind(this));
	this.container.addEventListener('touchend', this.swipeEnd.bind(this));
};
