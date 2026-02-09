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

let startX = 0;
let isDragging = false;

sliderInner.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

sliderInner.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    const maxIndex = sliderInner.children.length - visibleCards();

    if (diff > 50) { // swipe dreapta → slide anterior
        if(index > 0) index--;
        updateSlider();
    } else if (diff < -50) { // swipe stanga → slide urmator
        if(index < maxIndex) index++;
        updateSlider();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".gallery-track");
    const allImages = Array.from(track.querySelectorAll("img"));
    track.innerHTML = ""; // golim track-ul

    let imagesPerPage;

    function getImagesPerPage() {
        if (window.innerWidth < 991) return 6;  // mobil: 3 coloane × 2 rânduri
        return 8; // desktop: 4 coloane × 2 rânduri
    }

    let currentIndex = 0;
    let pages = [];

    function buildPages() {
        track.innerHTML = "";
        pages = [];
        imagesPerPage = getImagesPerPage();

        for (let i = 0; i < allImages.length; i += imagesPerPage) {
            const page = document.createElement("div");
            page.classList.add("gallery-page");

            allImages.slice(i, i + imagesPerPage).forEach(img => {
                page.appendChild(img);
            });

            track.appendChild(page);
            pages.push(page);
        }

        currentIndex = 0;
        updateSlider();
    }

    function updateSlider() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }

    const leftArrow = document.querySelector(".gallery-arrow.left");
    const rightArrow = document.querySelector(".gallery-arrow.right");

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightArrow.addEventListener("click", () => {
        if (currentIndex < pages.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    buildPages();

    // Rebuild pages la resize
    window.addEventListener("resize", () => {
        buildPages();
    });
});
