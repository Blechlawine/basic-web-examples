const speed = 0.4;

document.addEventListener("scroll", function onScroll() {
    let scrollTop = window.scrollY;
    const elements = document.getElementsByClassName("moving");
    for (let element of elements) {
        const layer = Number(element.dataset.layer) || 1;
        element.style.transform = `translateY(${-scrollTop * layer * speed}px)`;
    }
});
