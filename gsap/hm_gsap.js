//Анимируем видео в hero блоке
gsap.fromTo(
    document.querySelectorAll('[hm="hero-animatic"]'),
    { width: "20%" },
    {
        width: "100%",
        duration: 4,
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: ".section_hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 5
        }
    }
);

// Анимируем блок About
// let typeSplit = new SplitType('[textsplit]', {
//     types: 'lines, words, chars',
//     tagName: 'span'
// });

// gsap.timeline({
//     scrollTrigger: {
//         trigger: ".section_about",
//         start: "top center",
//         end: "top top",
//         scrub: 5,
//         toggleActions: "none none none none"
//     }
// })
//     .to(".hm-about_img-wrapper", { width: "auto", duration: 4, ease: "power3.inOut" })
//     .to(".hm-about_img", { scale: 1.2, duration: 4, ease: "power3.inOut" }, "<")
//     .from('[textsplit] .word', { opacity: 0.05, duration: 0.4, ease: 'power1.in', stagger: 0.1 }, "<")
//     .from('.hm-about_logo', {
//         autoAlpha: 0, y: '2rem', duration: 0.5, stagger: 0.1, ease: 'power3.out'
//     });