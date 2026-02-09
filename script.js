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

document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        card.classList.toggle("expanded");

        btn.textContent = card.classList.contains("expanded")
            ? "Minimize"
            : "Read more";
    });
});


const galleryTrack = document.querySelector(".gallery-track");
const galleryPages = document.querySelectorAll(".gallery-page");
const galleryPrev = document.querySelector(".gallery-arrow.left");
const galleryNext = document.querySelector(".gallery-arrow.right");

let galleryIndex = 0;

function updateGallery() {
    galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
}

// buton dreapta
galleryNext.addEventListener("click", () => {
    if (galleryIndex < galleryPages.length - 1) {
        galleryIndex++;
        updateGallery();
    }
});

// buton stanga
galleryPrev.addEventListener("click", () => {
    if (galleryIndex > 0) {
        galleryIndex--;
        updateGallery();
    }
});