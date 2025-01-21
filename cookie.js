// cookie popup
document.addEventListener("DOMContentLoaded", () => {
    const cookieComponent = document.querySelector('[cookie="wrapper"]');
    const cookieButton = document.querySelector('[cookie="btn"]');
    const cookieKey = "cookieAccepted";

    if (localStorage.getItem(cookieKey) === "true") {
        cookieComponent.style.display = "none";
    } else {
        cookieComponent.style.display = "flex";
    }

    if (cookieButton) {
        cookieButton.addEventListener("click", () => {
            cookieComponent.style.display = "none";
            localStorage.setItem(cookieKey, "true");
        });
    }
});