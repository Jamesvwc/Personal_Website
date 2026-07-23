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


const projectsNavButton = document.getElementById('nav-projects-button');
const blogNavButton = document.getElementById('nav-blog-button');

projectsNavButton.addEventListener("click", () => displayNavDropdown(projectsNavButton));
blogNavButton.addEventListener("click", () => displayNavDropdown(blogNavButton));

function displayNavDropdown(dropdown) {
    console.log(dropdown);
    switch (dropdown.id) {
        case 'nav-projects-button':
            document.getElementById('projects-dropdown-content').classList.toggle("show");
            document.getElementById('blog-dropdown-content').classList.remove("show");
            break;
        case 'nav-blog-button':
            document.getElementById('blog-dropdown-content').classList.toggle("show");
            document.getElementById('projects-dropdown-content').classList.remove("show");
            break;
    }
}

window.onclick = function(event) {
    if (!event.target.classList.contains("dropdown-name")) {
        console.log(event.target.classList);
        document.getElementById('blog-dropdown-content').classList.remove("show");
        document.getElementById('projects-dropdown-content').classList.remove("show");
    }
}


// Functionality for the content buttons in the middle of the page ---------------------------


const projectsButton = document.getElementById('projects-button');
const blogButton = document.getElementById('blog-button');
const contactMeButton = document.getElementById('contact-me-button');

projectsButton.addEventListener("click", () => pageNavigation(projectsButton));
blogButton.addEventListener("click", () => pageNavigation(blogButton));
contactMeButton.addEventListener("click", () => pageNavigation(contactMeButton));

function pageNavigation(button) {
    switch (button.id) {
        case "projects-button":
            window.open('Contact/contact.html');
            break;
        case "blog-button":
            window.open('Contact/contact.html');
            break;
        case "contact-me-button":
            window.open('Contact/contact.html');
            break;
    } 
}