$(document).ready(() => {

    let position = 0; // position in px, that shows how far we are from the start
    const slidesToScroll = 1;
    const track = $('.slider-track');
    const slide = $('.slider-item');

    const nextBtn = $('.btn-next');

    const amountOfSlides = $(".slider-track").children().length;
    const slideWidth = slide.outerWidth();

    // start
    setInterval(moveNext, 5000);

    function checkPos() {
        if(position >= amountOfSlides * slideWidth) {
            // if we want to not move slides in this direction anymore:
            // position = amountOfSlides * slideWidth - slideWidth;
            // if we want to loop it:
            position = 0;
        }
    }

    function moveNext() {
        position = position + slideWidth;
        checkPos();
        track.css({
            transform: `translateX(-${position}px)`,
        });
    }
 });