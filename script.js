// ==================== MENU MOBILE ====================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// ==================== FEATURES ANIMATION ====================
const features = document.querySelectorAll(".feature");

if (features.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    features.forEach(feature => observer.observe(feature));

    // Check imediat la load
    features.forEach(feature => {
        if (feature.getBoundingClientRect().top < window.innerHeight) {
            feature.classList.add("visible");
        }
    });
}

// ==================== CARD SLIDER ====================
const sliderInner = document.querySelector('.slider-inner');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
let index = 0;

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

window.addEventListener('resize', updateSlider);

// Swipe support for slider
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

    if (diff > 50 && index > 0) index--;
    else if (diff < -50 && index < maxIndex) index++;

    updateSlider();
});

// ==================== READ MORE ====================
document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        card.classList.toggle("expanded");

        btn.textContent = card.classList.contains("expanded")
            ? "Minimize"
            : "Read more";
    });
});

// ==================== GALLERY SLIDER + LIGHTBOX ====================
const track = document.querySelector(".gallery-track");
const allImages = Array.from(track.querySelectorAll("img"));
const leftGalleryArrow = document.querySelector(".gallery-arrow.left");
const rightGalleryArrow = document.querySelector(".gallery-arrow.right");

let currentIndexGallery = 0;
let pages = [];
let imagesPerPage = 8;

// Lightbox elements
let lightbox = null;
let lightboxImg = null;
let lightboxPrev = null;
let lightboxNext = null;
let currentLightboxIndex = 0;

// ==================== FUNCTIONS ====================
function getImagesPerPage() {
    return window.innerWidth < 991 ? 6 : 8; // 3x2 mobile, 4x2 desktop
}

function buildGalleryPages() {
    const scrollY = window.scrollY;
    track.innerHTML = "";
    pages = [];
    imagesPerPage = getImagesPerPage();

    for (let i = 0; i < allImages.length; i += imagesPerPage) {
        const page = document.createElement("div");
        page.classList.add("gallery-page");

        allImages.slice(i, i + imagesPerPage).forEach(img => {
            page.appendChild(img);

            // Click pe imagine pentru lightbox
            img.style.cursor = "pointer";
            img.onclick = () => openLightbox(allImages.indexOf(img));
        });

        track.appendChild(page);
        pages.push(page);
    }

    currentIndexGallery = 0;
    updateGallerySlider();
    window.scrollTo(0, scrollY);
}

function updateGallerySlider() {
    const offset = -currentIndexGallery * 100;
    track.style.transform = `translateX(${offset}%)`;
}

leftGalleryArrow.addEventListener("click", () => {
    if(currentIndexGallery > 0) currentIndexGallery--;
    updateGallerySlider();
});

rightGalleryArrow.addEventListener("click", () => {
    if(currentIndexGallery < pages.length - 1) currentIndexGallery++;
    updateGallerySlider();
});

// ==================== LIGHTBOX ====================
function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.cssText = `
        position: fixed;
        top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.85);
        display: flex; align-items:center; justify-content:center;
        z-index:9999;
    `;
    lightboxImg = document.createElement("img");
    lightboxImg.style.maxWidth = "90%";
    lightboxImg.style.maxHeight = "90%";
    lightbox.appendChild(lightboxImg);

    lightboxPrev = document.createElement("button");
    lightboxPrev.textContent = "❮";
    lightboxPrev.style.cssText = `
        position:absolute; top:50%; left:20px; transform:translateY(-50%);
        font-size:40px; background:none; border:none; color:white; cursor:pointer;
    `;
    lightbox.appendChild(lightboxPrev);

    lightboxNext = document.createElement("button");
    lightboxNext.textContent = "❯";
    lightboxNext.style.cssText = `
        position:absolute; top:50%; right:20px; transform:translateY(-50%);
        font-size:40px; background:none; border:none; color:white; cursor:pointer;
    `;
    lightbox.appendChild(lightboxNext);

    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener("click", prevLightbox);
    lightboxNext.addEventListener("click", nextLightbox);

    // Swipe for lightbox
    let startX = 0;
    lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    lightbox.addEventListener("touchend", e => {
        const diff = e.changedTouches[0].clientX - startX;
        if(diff > 50) prevLightbox();
        else if(diff < -50) nextLightbox();
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    if(!lightbox) createLightbox();
    lightboxImg.src = allImages[currentLightboxIndex].src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    if(lightbox) lightbox.style.display = "none";
}

function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % allImages.length;
    lightboxImg.src = allImages[currentLightboxIndex].src;
}

function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + allImages.length) % allImages.length;
    lightboxImg.src = allImages[currentLightboxIndex].src;
}

// ==================== INITIAL BUILD ====================
buildGalleryPages();

// Rebuild la resize
window.addEventListener("resize", () => {
    buildGalleryPages();
});

// ==================== SWIPE FOR GALLERY ====================
let galleryStartX = 0;
let isGalleryDragging = false;

track.addEventListener('touchstart', e => {
    galleryStartX = e.touches[0].clientX;
    isGalleryDragging = true;
});

track.addEventListener('touchend', e => {
    if (!isGalleryDragging) return;
    isGalleryDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - galleryStartX;

    if(diff > 50 && currentIndexGallery > 0) currentIndexGallery--;
    else if(diff < -50 && currentIndexGallery < pages.length - 1) currentIndexGallery++;

    updateGallerySlider();
});
