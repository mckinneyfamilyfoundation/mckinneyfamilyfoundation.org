// Navigation

// const navToggle = document.querySelector(".nav-toggle")
// const nav = document.querySelector(".main-nav")
// const navClose = document.querySelector(".main-nav__close")

// If the toggle is clicked, toggle the mobile-menu-open class in the html element
// navToggle.addEventListener("click", function () {
//     nav.classList.add("nav-active")
//     navToggle.setAttribute("aria-expanded", "true")
// })

// navClose.addEventListener("click", function() {
//     nav.classList.remove("nav-active")
//     navToggle.setAttribute("aria-expanded", "false")
// })

// Smooth scroll links
const scrollLinks = document.querySelectorAll('.js-scroll');

scrollLinks.forEach(link => {
  console.log(link.hash);
  link.addEventListener('click', event => {
    // using the event keyword gives us access to a snapshot
    // of what happens when the link is clicked

    // this blocks the default browser behaviour of the link jumping
    event.preventDefault();

    // get where the link is pointing to
    const href = link.getAttribute('href');
    // get the matching section ID and scroll into view
    document.querySelector(href).scrollIntoView({behavior: 'smooth'});
  });
});

const animatedTags = document.querySelectorAll('.js-fade');
console.log(animatedTags);

// fade out on load
animatedTags.forEach(tag => {
  tag.style.opacity = 0;
});

const fadeIn = function () {
  // look through all the animated tags and see
  // with the getBoundingClientRect if it's in the window
  let delay = 0.25;

  animatedTags.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top;
    const tagBottom = tag.getBoundingClientRect().bottom;

/*     console.log(tagTop);
 */
    if (tagTop < window.innerHeight && tagBottom > 0) {
      tag.style.animation = `fadein 1s ${delay}s forwards`;
      delay = delay + 0.25;
    }
  });
};

// on load, run fadeIn
fadeIn();

// on scroll, run fadeIn
document.addEventListener('scroll', function () {
  fadeIn();
});

// on browser resize, run fadeIn
window.addEventListener('resize', function () {
  fadeIn();
});
