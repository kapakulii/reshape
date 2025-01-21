document.querySelectorAll('[faq="description"]').forEach(description => {
    gsap.set(description, { height: 0, display: "none" });
});

document.querySelectorAll('[faq="topic"]').forEach(topic => {
    topic.addEventListener("click", () => {
        const animationSettings = { duration: 0.3, ease: "power2.out" };
        const item = topic.closest('[faq="item"]');
        const icon = item.querySelector('[faq="icon"]');
        const description = item.querySelector('[faq="description"]');
        const isExpanded = description.style.display === "block";

        if (isExpanded) {
            gsap.to(description, {
                height: 0,
                ...animationSettings,
                onComplete: () => gsap.set(description, { display: "none" })
            });
            gsap.to(icon, { rotate: 0, ...animationSettings });
        } else {
            gsap.set(description, { display: "block", height: "auto" });
            const fullHeight = description.scrollHeight; // Рассчитываем высоту
            gsap.set(description, { height: 0 }); // Возвращаем в 0 перед анимацией
            gsap.to(description, {
                height: fullHeight,
                ...animationSettings,
                onComplete: () => gsap.set(description, { height: "auto" }) // Устанавливаем auto для гибкости
            });
            gsap.to(icon, { rotate: 45, ...animationSettings });
        }
    });
});