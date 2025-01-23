const wrapElem = (elem) => {
    const wrapper = createWrapper();
    const { width, height } = elem.getBoundingClientRect();
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    elem.after(wrapper);
    wrapper.appendChild(elem); // Вставляем элемент внутрь обертки
    elem.style.position = "absolute"; // Скрываем элемент, но оставляем его в DOM
    elem.style.top = "-9999px"; // Перемещаем элемент за пределы экрана

    return wrapper;
};

const createWrapper = () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("reflex-wrapper");

    return wrapper;
};

class Reflex {
    constructor({ element, sliceSize, index }) {
        this.targetElement = element;
        this.sliceSize = sliceSize;
        this.index = index;

        this.removeEventListeners = () => { };
        this.create();
    }

    resetStyles() {
        this.content.classList.add("reflex");
        this.content.style.transform = `translateX(-${this.sliceSize * this.index}px)`;
        this.container.style.flex = `1`;
    }

    create() {
        this.container = document.createElement("div");
        this.content = this.targetElement.cloneNode(true);

        this.container.appendChild(this.content);
        this.container.classList.add("reflex-element");
        this.resetStyles();

        return this.container;
    }

    addEvents({ onMouseEnter, onMouseMove, onMouseLeave }) {
        this.container.addEventListener("mouseenter", onMouseEnter);
        this.container.addEventListener("mousemove", (e) => {
            onMouseMove(e);
        });

        // Мы добавляем событие mouseleave на сам контейнер
        this.container.addEventListener("mouseleave", onMouseLeave);

        this.removeEventListeners = () => {
            this.container.removeEventListener("mouseenter", onMouseEnter);
            this.container.removeEventListener("mousemove", onMouseMove);
            this.container.removeEventListener("mouseleave", onMouseLeave);
        };

        return this.removeEventListeners();
    }
}

class Reflector {
    constructor({
        element,
        skew = 0.015,
        count = 7,
        distance = 1,
        initialDistortion = 0,
        distortion = 0,
        hover = false,
        focusedIndex,
    }) {
        this.options = {
            skew,
            count,
            distance,
            initialDistortion,
            distortion,
            hover,
            focusedIndex: focusedIndex || Math.floor(count / 2),
        };
        this.reflexes = [];
        this.container = null;
        this.wrapper = null;
        this.count = count;

        this.targetElement = document.querySelector(element);

        if (this.targetElement.nodeName === "IMG") {
            this.targetElement.onload = () => this.init();
        } else {
            this.init();
        }
    }

    createWrappers() {
        this.container = wrapElem(this.targetElement);

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("reflex-container");

        // Отключаем pointer-events на время инициализации
        this.wrapper.style.pointerEvents = "none";
        setTimeout(() => {
            this.wrapper.style.pointerEvents = "auto"; // Включаем pointer-events обратно
        }, 0);
    }

    createReflexes() {
        for (let i = 0; i < this.options.count; i++) {
            const reflex = new Reflex({
                element: this.targetElement,
                sliceSize: this.sliceSize,
                index: i,
            });
            this.reflexes.push(reflex);
        }

        return this.reflexes;
    }

    init() {
        this.targetElementRect = this.targetElement.getBoundingClientRect();
        this.sliceSize =
            this.targetElementRect.width /
            (this.count + this.options.initialDistortion);

        this.createReflexes();
        this.createWrappers();

        this.reflexes.forEach((reflex, index) => {
            this.wrapper.appendChild(reflex.container);

            if (this.options.hover) {
                const handleMouseEnter = () => this.distort({ reflex });
                const handleMouseMove = ({ clientX: offset }) =>
                    this.distort({ reflex, offset });

                // Обрабатываем mouseleave
                const handleMouseLeave = () => {
                    reflex.content.style.transform = `translateX(-${this.sliceSize * index}px)`;
                    reflex.container.style.transform = `skew(0, 0) translateY(0)`;
                    reflex.container.style.flex = `1`;
                };

                reflex.addEvents({
                    onMouseEnter: handleMouseEnter,
                    onMouseMove: handleMouseMove,
                    onMouseLeave: handleMouseLeave, // Слушаем mouseleave
                });
            } else {
                this.distort({ reflex: this.reflexes[this.options.focusedIndex] });
            }
        });

        // Добавляем обработку события mouseleave на весь контейнер
        this.container.addEventListener("mouseleave", () => {
            this.reflexes.forEach((reflex, index) => {
                reflex.content.style.transform = `translateX(-${this.sliceSize * index}px)`;
                reflex.container.style.transform = `skew(0, 0) translateY(0)`;
                reflex.container.style.flex = `1`;
            });
        });

        this.container.appendChild(this.wrapper);
    }

    distort({ reflex, offset = 0 }) {
        const { distance, distortion, skew, focusedIndex } = this.options;

        const currentIndex = reflex.index;
        const centerPosition = -this.sliceSize * currentIndex;
        const displace = this.sliceSize * distance * distance;
        const count = this.reflexes.length;

        this.reflexes.forEach((ref, index) => {
            const relativePosition = currentIndex - index;
            const distortionModificator = distortion
                ? Math.random() * (distortion - 1) + 1
                : 1;

            const reflexDisplace = displace * relativePosition;

            const delta = offset / this.targetElementRect.width;
            const offsetPosition = -this.sliceSize * delta;

            const targetPosition = Math.floor(
                centerPosition + reflexDisplace + distortionModificator * offsetPosition
            );
            const skewRotate =
                -skew *
                Math.min(
                    Math.abs(
                        relativePosition + relativePosition * relativePosition * distortion
                    ) + 1,
                    40
                );
            const skewShift = -1 * (index - Math.round(count / 2));
            const isCenterBlock = index === (focusedIndex || Math.floor(count / 2));

            if (isCenterBlock) {
                ref.container.style.flex = 3;
                ref.content.style.transform = `translateX(${targetPosition + this.sliceSize}px)`;
                ref.container.style.transform = `skew(0, ${skewRotate / 3}rad) translateY(${skewShift}%)`;
            } else {
                ref.container.style.flex = 1;
                ref.content.style.transform = `translateX(${targetPosition}px)`;
                ref.container.style.transform = `skew(0, ${skewRotate}rad) translateY(${skewShift}%)`;
            }
        });
    }
}

const reflector = new Reflector({
    element: ".reflex-origin",
    count: 8,
    hover: true,
    distortion: 1,
});

const reflector2 = new Reflector({
    element: ".reflex-origin-text",
    count: 8,
    hover: true,
    distortion: 1,
    initialDistortion: 1,
    focusedIndex: 1,
    distance: 0.8,
});