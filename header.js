let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav_component");
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        gsap.to(nav, { yPercent: -100, duration: 0.75, ease: "power3.out" });
    } else if (lastScrollTop - currentScrollTop >= 5) {
        gsap.to(nav, { yPercent: 0, duration: 0.75, ease: "power3.out" });
    }

    lastScrollTop = currentScrollTop;
});