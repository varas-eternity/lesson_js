(function () {
	const container = document.querySelector('#carousel');
	const slides = container.querySelectorAll('.slide');
	const indicatorsContainer = container.querySelector('#indicators-container');
	const indicators = indicatorsContainer.querySelectorAll('.indicator');
	const pauseButton = container.querySelector('#pause');
	const previousButton = container.querySelector('#previous');
	const nextButton = container.querySelector('#next');

	const SLIDES_COUNTER = slides.length;
	const CODE_LEFT_ARROW = 'ArrowLeft';
	const CODE_RIGHT_ARROW = 'ArrowRight';
	const CODE_SPACE = 'Space';
	const PAUSE = '<i class="fas fa-pause-circle"></i>';
	const PLAY = '<i class="fas fa-play-circle"></i>';

	let currentSlide = 0;
	let isPlaying = true;
	let timerID = null;
	let interval = 1000;
	let swipeStartX = null;
	let swipeEndX = null;

	function goToNth(n) {
		slides[currentSlide].classList.toggle('active');
		indicators[currentSlide].classList.toggle('active');
		currentSlide = (n + SLIDES_COUNTER) % SLIDES_COUNTER;
		slides[currentSlide].classList.toggle('active');
		indicators[currentSlide].classList.toggle('active');
	}

	const goToPrevious = () => goToNth(currentSlide - 1);

	const goToNext = () => goToNth(currentSlide + 1);

	function pause() {
		if (isPlaying) {
			pauseButton.innerHTML = PLAY;
			isPlaying = false;
			clearInterval(timerID);
		}
	}

	function play() {
		pauseButton.innerHTML = PAUSE;
		isPlaying = true;
		timerID = setInterval(goToNext, interval);
	}

	const pausePlay = () => isPlaying ? pause() : play();

	function previous() {
		pause();
		goToPrevious();
	}

	function next() {
		pause();
		goToNext();
	}

	function indicate(event) {
		const target = event.target;

		if (target && target.classList.contains('indicator')) {
			pause();
			goToNth(+target.dataset.slideTo);
		}
	}

	function pressKey(event) {
		if (event.code === CODE_LEFT_ARROW) previous();
		if (event.code === CODE_RIGHT_ARROW) next();
		if (event.code === CODE_SPACE) pausePlay();
	}

	function swipeStart(event) {
		swipeStartX = event.changedTouches[0].pageX;
	}

	function swipeEnd(event) {
		swipeEndX = event.changedTouches[0].pageX;
		if (swipeStartX - swipeEndX < -100) previous();
		if (swipeStartX - swipeEndX > 100) next();
	}

	function initListeners() {
		pauseButton.addEventListener('click', pausePlay);
		previousButton.addEventListener('click', previous);
		nextButton.addEventListener('click', next);
		indicatorsContainer.addEventListener('click', indicate);
		container.addEventListener('touchstart', swipeStart);
		container.addEventListener('touchend', swipeEnd);
		document.addEventListener('keydown', pressKey);
	}

	function init() {
		initListeners();
		timerID = setInterval(goToNext, interval);
	}

	init();
}())