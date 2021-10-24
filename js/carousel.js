class Carousel {
	constructor(parameter) {

		const setting = { ...{ containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true, }, ...parameter };

		this.container = document.querySelector(setting.containerID);
		this.slides = this.container.querySelectorAll(setting.slideID);

		this.slidesContainer = document.querySelector('#slides-container');

		this.interval = setting.interval;
		this.isPlaying = setting.isPlaying;
	}

	_initProps() {
		this.currentSlide = 0;

		this.SLIDES_COUNTER = this.slides.length;
		this.CODE_LEFT_ARROW = 'ArrowLeft';
		this.CODE_RIGHT_ARROW = 'ArrowRight';
		this.CODE_SPACE = 'Space';
		this.PAUSE = '<i class="fas fa-pause-circle"></i>';
		this.PLAY = '<i class="fas fa-play-circle"></i>';
		this.PREVIOUS = '<i class="fas fa-angle-left"></i>';
		this.NEXT = '<i class="fas fa-angle-right"></i>';
	}

	_initControls() {
		const controls = document.createElement('div');

		const PAUSE = `<span class="control control-pause" id="pause">
							<span id="fa-pause-icon" class="add">${this.PAUSE}</span>
							<span id="fa-play-icon" class="add">${this.PLAY}</span>
						</span>`;
		const PREVIOUS = `<span class="control control-previous" id="previous">${this.PREVIOUS}</span>`;
		const NEXT = `<span class="control control-next" id="next">${this.NEXT}</span>`;

		controls.setAttribute('class', 'controls');

		controls.innerHTML = PAUSE + PREVIOUS + NEXT;

		this.slidesContainer.append(controls);

		this.pauseButton = this.container.querySelector('#pause');
		this.previousButton = this.container.querySelector('#previous');
		this.nextButton = this.container.querySelector('#next');

		this.pauseIcon = this.container.querySelector('#fa-pause-icon');
		this.playIcon = this.container.querySelector('#fa-play-icon');

		this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
	}

	_initIndicators() {
		const indicators = document.createElement('div');

		indicators.setAttribute('class', 'indicators');

		for (let i = 0, n = this.SLIDES_COUNTER; i < n; i++) {
			const indicator = document.createElement('div');

			indicator.setAttribute('class', 'indicator');

			indicator.dataset.slideTo = `${i}`;

			i === 0 && indicator.classList.add('active');

			indicators.append(indicator);
		}

		this.container.append(indicators);

		this.indContainer = this.container.querySelector('.indicators');
		this.indItems = this.container.querySelectorAll('.indicator');
	}

	_initListeners() {
		this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
		this.previousButton.addEventListener('click', this.previous.bind(this));
		this.nextButton.addEventListener('click', this.next.bind(this));
		this.indContainer.addEventListener('click', this._indicate.bind(this));
		document.addEventListener('keydown', this._pressKey.bind(this));
		this.container.addEventListener('mouseenter', this._pause.bind(this));
		this.container.addEventListener('mouseleave', this._play.bind(this));
	}

	_goToNth(n) {
		this.slides[this.currentSlide].classList.toggle('active');
		this.indItems[this.currentSlide].classList.toggle('active');
		this.currentSlide = (n + this.SLIDES_COUNTER) % this.SLIDES_COUNTER;
		this.slides[this.currentSlide].classList.toggle('active');
		this.indItems[this.currentSlide].classList.toggle('active');
	}

	_goToPrevious() {
		this._goToNth(this.currentSlide - 1);
	}

	_goToNext() {
		this._goToNth(this.currentSlide + 1);
	}

	_pause() {
		if (this.isPlaying) {
			this.pauseIcon.style.opacity = 0;
			this.playIcon.style.opacity = 1;
			this.isPlaying = false;
			clearInterval(this.timerID);
		}
	}

	_play() {
		if (!this.isPlaying) {
			this.pauseIcon.style.opacity = 1;
			this.playIcon.style.opacity = 0;
			this.isPlaying = true;
			this.timerID = setInterval(() => this._goToNext(), this.interval);
		}
	}

	pausePlay() {
		this.isPlaying ? this._pause() : this._play();
	}

	previous() {
		this._pause();
		this._goToPrevious();
	}

	next() {
		this._pause();
		this._goToNext();
	}

	_indicate(event) {
		const target = event.target;

		if (target && target.classList.contains('indicator')) {
			this._pause();
			this._goToNth(+target.dataset.slideTo);
		}
	}

	_pressKey(event) {
		if (event.code === this.CODE_LEFT_ARROW) this.previous();
		if (event.code === this.CODE_RIGHT_ARROW) this.next();
		if (event.code === this.CODE_SPACE) this.pausePlay();
	}

	init() {
		this._initProps();
		this._initControls();
		this._initIndicators();
		this._initListeners();
		if (this.isPlaying) this.timerID = setInterval(() => this._goToNext(), this.interval);
	}
}

export default Carousel;