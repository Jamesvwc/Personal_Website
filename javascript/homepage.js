let slideIndex = 1;
showSlides(slideIndex);

function changeSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i = 0;
    let slides = document.getElementsByClassName("slideshow");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Functionality for buttons at the top page of the homepage -------------------------

window.onclick = function(event) {
    console.log(event.target.classList.contains("dropdown-name"));
    if (!event.target.classList.contains("dropdown-name")) {
        let collection = document.getElementsByClassName("dropdown-content");
        let i = 0;
        for (; i < collection.length; i++) {
            collection[i].classList.remove("show");
        }
    } 
    else if (event.target.classList.contains("projects-dropdown-button")) {
        document.getElementById("projects-dropdown-content").classList.toggle("show");
        document.getElementById("blog-dropdown-content").classList.remove("show");
    }
    else if (event.target.classList.contains("blog-dropdown-button")) {
        document.getElementById("blog-dropdown-content").classList.toggle("show");
        document.getElementById("projects-dropdown-content").classList.remove("show");
    }
}

// -----------------------------------------------------------------------------------