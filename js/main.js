/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

//const slides = document.querySelectorAll('.slide');
//const pauseButton = document.querySelector('#pause');
//const previousButton = document.querySelector('#previous');
//const nextButton = document.querySelector('#next');

//const SLIDES_COUNTER = slides.length;

//let currentSlide = 0;
//let isPlaying = true;
//let timerID = null;
//let interval = 1000;

//function goToNth(n) {
//    slides[currentSlide].classList.toggle('active');
//    currentSlide = (n + SLIDES_COUNTER) % SLIDES_COUNTER;
//    slides[currentSlide].classList.toggle('active');
//}

//const goToPrevious = () => goToNth(currentSlide - 1);

//const goToNext = () => goToNth(currentSlide + 1);

//function pause() {
//    if (isPlaying) {
//        pauseButton.innerHTML = 'Play';
//        isPlaying = false;
//        clearInterval(timerID);
//    }
//}

//function play() {
//    pauseButton.innerHTML = 'Pause';
//    isPlaying = true;
//    timerID = setInterval(goToNext, interval);
//}

//const pausePlay = () => isPlaying ? pause() : play();

//function previous() {
//    pause();
//    goToPrevious();
//}

//function next() {
//    pause();
//    goToNext();
//}

//pauseButton.addEventListener('click', pausePlay);
//previousButton.addEventListener('click', previous);
//nextButton.addEventListener('click', next);

//timerID = setInterval(goToNext, interval);

/*=============================================
=            Section comment block            =
=============================================*/

let carousel = null;

function createCarousel(slidesCount) {
    carousel = document.querySelector('#carousel');
    slides(slidesCount);
    indicators(slidesCount);
    controls();
    style();
    eventEffect();
}

function slides(slidesCount) {
    let carouselElementUlSlides = document.createElement('ul');
    carouselElementUlSlides.setAttribute('class', 'slides');

    for (i = 0; i < slidesCount; i++) {
        let carouselElementItem = document.createElement('li');
        let carouselElementLink = document.createElement('a');

        carouselElementItem.setAttribute('class', i === 0 ? 'slides__item active' : 'slides__item');
        carouselElementLink.setAttribute('href', '#');

        carouselElementItem.appendChild(carouselElementLink);
        carouselElementUlSlides.appendChild(carouselElementItem);
    }

    carousel.appendChild(carouselElementUlSlides);
}

function indicators(slidesCount) {
    let carouselElementDivIndicators = document.createElement('div');
    carouselElementDivIndicators.setAttribute('class', 'indicators');

    for (i = 0; i < slidesCount; i++) {
        let carouselElementItem = document.createElement('span');

        carouselElementItem.setAttribute('class', i === 0 ? 'indicators__item active' : 'indicators__item');
        carouselElementItem.setAttribute('data-slide-to', i);

        carouselElementDivIndicators.appendChild(carouselElementItem);
    }

    carousel.appendChild(carouselElementDivIndicators);
}

function controls() {
    let carouselElementDivControls = document.createElement('div');
    carouselElementDivControls.setAttribute('class', 'controls');

    for (i = 0; i < 3; i++) {
        let carouselElementItem = document.createElement('div');
        let carouselElementIcon = document.createElement('i');

        if (i === 0) {
            carouselElementItem.setAttribute('class', 'controls__item controls__prev');
            carouselElementIcon.setAttribute('class', 'fas fa-chevron-left');
        } else if (i === 1) {
            carouselElementItem.setAttribute('class', 'controls__item controls__next');
            carouselElementIcon.setAttribute('class', 'fas fa-chevron-right');
        } else if (i === 2) {
            carouselElementItem.setAttribute('class', 'controls__item controls__pause');
            carouselElementIcon.setAttribute('class', 'fas fa-play');
        }

        carouselElementItem.appendChild(carouselElementIcon);
        carouselElementDivControls.appendChild(carouselElementItem);
    }

    carousel.appendChild(carouselElementDivControls);
}

function style() {
    let carouselStyle = document.createElement('style');
    let style = `
    .controls,
    .slides {
        position: relative;
    }
    .indicators {
        display: flex;
    }
    .indicators__item {
        display: block;
        width: 20px;
        height: 20px;
        background-color: black;
        margin: 5px;
        border-radius: 10px;
    }`;

    carouselStyle.innerHTML = style;
    carousel.appendChild(carouselStyle);
}

function eventEffect() {
    let carouselElementDivIndicators = document.querySelector('div.indicators');
    let indicator = null;

    carouselElementDivIndicators.addEventListener('click', (event) => {

        let target = event.target;

        if (target.classList.contains('indicators__item')) {

            target.style.backgroundColor = 'red';

            if (indicator !== null) indicator.removeAttribute('style');

            indicator = target;
        }

    });
}

createCarousel(10);

/*=====  End of Section comment block  ======*/

/*
<div class="carousel">
<ul class="slides">
<li class="slides__item active"><a href="#"></a></li>
<li class="slides__item"><a href="#"></a></li>
<li class="slides__item"><a href="#"></a></li>
<li class="slides__item"><a href="#"></a></li>
<li class="slides__item"><a href="#"></a></li>
</ul>
<div class="indicators">
<span class="indicators__item active" data-slide-to="0"></span>
<span class="indicators__item" data-slide-to="1"></span>
<span class="indicators__item" data-slide-to="2"></span>
<span class="indicators__item" data-slide-to="3"></span>
<span class="indicators__item" data-slide-to="4"></span>
</div>
<div class="controls">
<div class="controls__item controls__prev"><i class="fas fa-chevron-left"></i></div>
<div class="controls__item controls__next"><i class="fas fa-chevron-right"></i></div>
<div class="controls__item controls__pause"><i class="fas fa-play"></i></div>
</div>
</div>
*/