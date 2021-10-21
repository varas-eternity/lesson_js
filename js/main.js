function Carousel(containerID = '#carousel') {
	this.container = document.querySelector(containerID);
	this.slides = this.container.querySelectorAll('.slide');
	this.indicatorsContainer = this.container.querySelector('#indicators-container');
	this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
	this.pauseButton = this.container.querySelector('#pause');
	this.previousButton = this.container.querySelector('#previous');
	this.nextButton = this.container.querySelector('#next');

	this.SLIDES_COUNTER = this.slides.length;
	this.CODE_LEFT_ARROW = 'ArrowLeft';
	this.CODE_RIGHT_ARROW = 'ArrowRight';
	this.CODE_SPACE = 'Space';
	this.PAUSE = '<i class="fas fa-pause-circle"></i>';
	this.PLAY = '<i class="fas fa-play-circle"></i>';

	this.currentSlide = 0;
	this.isPlaying = true;
	this.timerID = null;
	this.interval = 1000;
	this.swipeStartX = null;
	this.swipeEndX = null;
}

Carousel.prototype = {
	_initListeners() {
		this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
		this.previousButton.addEventListener('click', this.previous.bind(this));
		this.nextButton.addEventListener('click', this.next.bind(this));
		this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
		document.addEventListener('keydown', this._pressKey.bind(this));
	},

	_goToNth(n) {
		this.slides[this.currentSlide].classList.toggle('active');
		this.indicators[this.currentSlide].classList.toggle('active');
		this.currentSlide = (n + this.SLIDES_COUNTER) % this.SLIDES_COUNTER;
		this.slides[this.currentSlide].classList.toggle('active');
		this.indicators[this.currentSlide].classList.toggle('active');
	},

	_goToPrevious() {
		this._goToNth(this.currentSlide - 1);
	},

	_goToNext() {
		this._goToNth(this.currentSlide + 1);
	},

	_pause() {
		if (this.isPlaying) {
			this.pauseButton.innerHTML = this.PLAY;
			this.isPlaying = false;
			clearInterval(this.timerID);
		}
	},

	_play() {
		this.pauseButton.innerHTML = this.PAUSE;
		this.isPlaying = true;
		this.timerID = setInterval(() => this._goToNext(), this.interval);
	},

	pausePlay() {
		this.isPlaying ? this._pause() : this._play();
	},

	previous() {
		this._pause();
		this._goToPrevious();
	},

	next() {
		this._pause();
		this._goToNext();
	},

	_indicate(event) {
		const target = event.target;

		if (target && target.classList.contains('indicator')) {
			this._pause();
			this._goToNth(+target.dataset.slideTo);
		}
	},

	_pressKey(event) {
		if (event.code === this.CODE_LEFT_ARROW) this.previous();
		if (event.code === this.CODE_RIGHT_ARROW) this.next();
		if (event.code === this.CODE_SPACE) this.pausePlay();
	},

	init() {
		this._initListeners();
		this.timerID = setInterval(() => this._goToNext(), this.interval);
	}
}

Carousel.prototype.constructor = Carousel;

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

const carousel = new SwipeCarousel('#test');

carousel.init();