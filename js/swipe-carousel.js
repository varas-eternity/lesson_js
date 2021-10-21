import Carousel from "./carousel";

class SwipeCarousel extends Carousel {
	_initListeners() {
		super._initListeners();
		this.container.addEventListener('touchstart', this.swipeStart.bind(this));
		this.container.addEventListener('touchend', this.swipeEnd.bind(this));
	}

	swipeStart(event) {
		this.swipeStartX = event.changedTouches[0].pageX;
	}

	swipeEnd(event) {
		this.swipeEndX = event.changedTouches[0].pageX;
		if (this.swipeStartX - this.swipeEndX < -100) this.previous();
		if (this.swipeStartX - this.swipeEndX > 100) this.next();
	}
}

export default SwipeCarousel;