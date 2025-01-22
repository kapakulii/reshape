let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav_component");
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
        gsap.to(nav, { yPercent: -100, duration: 0.75, ease: "power3.out" });
    } else if (lastScrollTop - currentScrollTop >= 10) {
        gsap.to(nav, { yPercent: 0, duration: 0.75, ease: "power3.out" });
    }

    lastScrollTop = currentScrollTop;
});