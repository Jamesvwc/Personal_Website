// let slideIndex = 1;
// showSlides(slideIndex);

// function changeSlides(n) {
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i = 0;
//     let slides = document.getElementsByClassName("slideshow");
//     let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;
//     }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
// }

// function dropdownToggle() {
//     document.getElementById("dropdown").classList.toggle("show");
// }

// window.onclick = function(event) {
//     if (!document.getElementById('dropdown-button-test').contains(event.target)) {
//         document.getElementById("dropdown").classList.remove("show");
//     }
// }

const projectsButton = document.getElementById('projects-button');
// let deltaX = 0,
//     deltaY = 0,
//     timeout = 0,
//     total = 0;

document.getElementById('projects-button').addEventListener("click", () => projectsPage());

function projectsPage() {
    window.open('Contact/contact.html')
}

//DO NOT USE

// function moveButton(elem) {
//     console.log(elem);
//     let transform = `translate(${deltaX}%, ${deltaY}%)`
//     elem.style.transform = transform;
//     if (total <= 30) {
//         total ++;
//         deltaX += 0.1;
//         deltaY -= 0.1;
//         console.log(deltaX);
//     } else {
//         return;
//     }
//     timeout = setTimeout(moveButton(elem), 100);
// }