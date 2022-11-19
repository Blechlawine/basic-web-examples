let currentImageIndex = 0; // Index des aktiven Bildes beim Laden der Seite
let offset = 100; // Offset in %, um die die Bilder in der Slideshow verschoben werden, wenn man durchklickt
let circleOffsetPx = 18 + 8; // Abstand von der Mitte eines kleinen Kreises zur Mitte des nächsten kleinen Kreises
let initialCircleOffset = null;
let maxImageIndex = null;

window.addEventListener("load", () => {
    setTimeout(() => {
        maxImageIndex = document.getElementsByClassName("backgroundImage").length - 1; // der Index des letzten Bildes in der Slideshow
        let circleAmount = document.getElementsByClassName("slideShowCircle").length; // Anzahl Kreise in Slideshowcontrol
        initialCircleOffset = (circleAmount / 2) * circleOffsetPx - (circleOffsetPx + 3) / 2; // Die Kreise sollten beim Laden der Seite nach rechts verschoben werden, damit der aktive Kreis(der beim laden der Seite immer der erste ist) mittig zwischen den 2 Pfeilen liegt. +3 deshalb, weil der aktive Kreis einen 3px größeren radius hat
        [...document.getElementsByClassName("slideShowCircle")].forEach((element) => {
            element.style.transform = "translateX(" + initialCircleOffset + "px)"; // verschiebt die Kreise um das in der vorherigen Zeile berechnete offset, sodass der aktive Kreis mittig zwischen den 2 Pfeilen liegt
        });
        document.getElementsByClassName("slideShowCircle")[currentImageIndex].classList.add("activeCircle"); // fügt die Klasse "activeCircle" zum aktiven Kreis hinzu, sodass dieser hervorgehoben wird

        // Spread-syntax hier, sonst geth das .forEach nicht
        [...document.getElementsByClassName("slideShowCircle")].forEach((element, index) => {
            element.addEventListener("click", () => setActiveImage(index));
        });
    }, 100);
});

function setActiveImage(imageIndex) {
    // verschiebt die Kreise um das passende Offset, sodass der aktive Kreis mittig zwischen den 2 Pfeilen liegt und gibt dem aktiven Kreis die Klasse "activeCircle" und verschiebt die Slideshowbilder

    document.getElementsByClassName("slideShowCircle")[currentImageIndex].classList.remove("activeCircle");
    currentImageIndex = imageIndex;
    [...document.getElementsByClassName("backgroundImage")].forEach((element) => {
        element.style.transform = "translateX(" + -(offset * currentImageIndex) + "%)";
    });

    [...document.getElementsByClassName("slideShowCircle")].forEach((element) => {
        element.style.transform = "translateX(" + (initialCircleOffset - circleOffsetPx * currentImageIndex) + "px)";
    });
    document.getElementsByClassName("slideShowCircle")[currentImageIndex].classList.add("activeCircle");
}

function nextImage() {
    if (currentImageIndex == maxImageIndex) {
        setActiveImage(0);
    } else {
        setActiveImage(currentImageIndex + 1);
    }
}

function prevImage() {
    if (currentImageIndex == 0) {
        setActiveImage(maxImageIndex);
    } else {
        setActiveImage(currentImageIndex - 1);
    }
}

document.getElementById("slideshowRightArrow").addEventListener("click", nextImage);

document.getElementById("slideshowLeftArrow").addEventListener("click", prevImage);
