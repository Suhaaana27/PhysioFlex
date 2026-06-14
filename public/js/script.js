const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide() {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(showSlide, 5000);