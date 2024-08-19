let startX;
let currentIndex = 0;

const carouselContainer = document.querySelector('.carousel-container');
const totalSlides = carouselContainer.children.length;

carouselContainer.addEventListener('touchstart', handleTouchStart, false);
carouselContainer.addEventListener('touchmove', handleTouchMove, false);
carouselContainer.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    const touch = event.touches[0];
    const moveX = touch.clientX - startX;

    carouselContainer.style.transition = 'none';
    carouselContainer.style.transform = `translateX(${moveX - currentIndex * carouselContainer.clientWidth}px)`;
}

function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX > 50) {
        slidePrev();
    } else if (diffX < -50) {
        slideNext();
    } else {
        resetPosition();
    }
}

function slideNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function slidePrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function jumpToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function updateCarousel() {
    carouselContainer.style.transition = 'transform 0.4s ease-in-out';
    carouselContainer.style.transform = `translateX(-${currentIndex * carouselContainer.clientWidth}px)`;
}

function resetPosition() {
    carouselContainer.style.transition = 'transform 0.4s ease-in-out';
    carouselContainer.style.transform = `translateX(-${currentIndex * carouselContainer.clientWidth}px)`;
}
