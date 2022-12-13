const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__btn--right');
const prevBtn = document.querySelector('.carousel__btn--left');
const indicatorDots = document.querySelector('.img-indicators');
const dots = Array.from(indicatorDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to each other
const setSlidePos = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePos);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('carousel__slide--current');
    targetSlide.classList.add('carousel__slide--current');
};

const changeDot = (currentDot, targetDot) => {
    currentDot.classList.remove('indicator-dot--current');
    targetDot.classList.add('indicator-dot--current');
};

const hideBtn = (slides, prevBtn, nextBtn, index) => {
    if (index === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
    else if (index === slides.length - 1) {
        nextBtn.classList.add('is-hidden');
        prevBtn.classList.remove('is-hidden');
    }
    else {
        nextBtn.classList.remove('is-hidden');
        prevBtn.classList.remove('is-hidden');
    }
};

hideBtn(slides, prevBtn, nextBtn, 0);

// when clicking left button, carousel slides left, indicator dot changes
prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.carousel__slide--current');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = indicatorDots.querySelector('.indicator-dot--current');
    const prevDot = currentDot.previousElementSibling;
    const index = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(track, currentSlide, prevSlide);

    changeDot(currentDot, prevDot);

    hideBtn(slides, prevBtn, nextBtn, index);
})

// when clicking right button, carousel slides right, indicator dot changes
nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.carousel__slide--current');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = indicatorDots.querySelector('.indicator-dot--current');
    const nextDot = currentDot.nextElementSibling;
    const index = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);

    changeDot(currentDot, nextDot);

    hideBtn(slides, prevBtn, nextBtn, index);
});


// when clicking indicator dots, move to that image within array
indicatorDots.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.carousel__slide--current');
    const index = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[index];
    const currentDot = indicatorDots.querySelector('.indicator-dot--current');

    changeDot(currentDot, targetDot);

    moveToSlide(track, currentSlide, targetSlide);

    hideBtn(slides, prevBtn, nextBtn, index);
});