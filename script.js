// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const features = document.querySelectorAll(".feature");

if (features.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // animăm o singură dată
            }
        });
    }, {
        threshold: 0.1
    });

    features.forEach(feature => {
        observer.observe(feature);

        // 🔥 CHECK IMEDIAT LA LOAD
        if (feature.getBoundingClientRect().top < window.innerHeight) {
            feature.classList.add("visible");
        }
    });
}


const sliderInner = document.querySelector('.slider-inner');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

let index = 0;

// functie pentru a calcula cate carduri sunt vizibile
function visibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function updateSlider() {
    const cardWidth = sliderInner.querySelector('.card').offsetWidth + 20; // gap=20
    sliderInner.style.transform = `translateX(-${index * cardWidth}px)`;
}

rightArrow.addEventListener('click', () => {
    const maxIndex = sliderInner.children.length - visibleCards();
    if(index < maxIndex) index++;
    updateSlider();
});

leftArrow.addEventListener('click', () => {
    if(index > 0) index--;
    updateSlider();
});

// update la resize
window.addEventListener('resize', updateSlider);
