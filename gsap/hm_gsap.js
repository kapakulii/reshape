// Анимация в Hero блоке
gsap.set(".section_hero", {
    opacity: 1,
});

gsap.timeline()
    .from("[hm-hero='fade']", {
        autoAlpha: 0,
        y: "4rem",
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out"
    }, 0)
    .fromTo(".hm-hero_logo", {
        autoAlpha: 0,
        y: "-1rem"
    }, {
        autoAlpha: 0.5,
        y: "0rem",
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out"
    }, 0.5);

//Анимируем видео в hero блоке
gsap.fromTo(
    document.querySelectorAll('[hm="hero-animatic"]'),
    { width: "20%" },
    {
        width: "100%",
        duration: 5,
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: ".section_hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 5
        }
    }
);


// Анимация блока Expertize
gsap.from('.hm-exp_card', {
    scrollTrigger: {
        trigger: ".hm-exp_card",
        start: "top bottom", // Начало анимации, когда элемент входит в область
    },
    y: '10rem', // Смещение по оси Y
    duration: 2, // Длительность анимации каждой карточки
    ease: 'power3.inOut', // Плавность
    stagger: {
        amount: 0.75, // Общее время распределения
    }
});

// Анимируем блок About
let typeSplit = new SplitType('[textsplit]', {
    types: 'lines, words, chars',
    tagName: 'span'
});

gsap.from('[textsplit] .word', {
    scrollTrigger: {
        trigger: ".section_about",
        start: "top center",
        end: "top top",
        scrub: 1,
    },
    opacity: 0.05,
    duration: 0.1,
    ease: 'power3.in',
    stagger: 0.05
})

gsap.to('[team-img]', {
    scrollTrigger: {
        trigger: "[team-img]",
        start: "top bottom",
        end: "bottom top",
        scrub: 3
    },
    y: '-30%'
})

gsap.from('.tag-wrapper', {
    scrollTrigger: {
        trigger: ".about_team-wrapper",
        start: "top center"
    },
    y: '-25%',
    autoAlpha: 0,
    stagger: 0.25,
    duration: 0.5
})

// Анимация блока Case
document.querySelectorAll('[case=item]').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const countElements = item.querySelectorAll('[case=count]');

        countElements.forEach(el => {
            const originalText = el.textContent;
            const characters = [...originalText];

            let animation = setInterval(() => {
                el.textContent = characters
                    .map((char, index) => {
                        // Если символов 3 или меньше, анимируем все и используем только цифры
                        if (characters.length <= 2) {
                            return char === ' ' ? ' ' : Math.floor(Math.random() * 10); // Только цифры
                        }

                        // Если символов больше 3, анимируем случайные символы
                        if (Math.random() < 0.25) {
                            return char === ' ' ? ' ' : Math.floor(Math.random() * 10); // Только цифры
                        }
                        return char; // Иначе оставляем символ как есть
                    })
                    .join('');
            }, 30);

            setTimeout(() => {
                clearInterval(animation);
                el.textContent = originalText;
            }, 300);
        });
    });
});

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