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
