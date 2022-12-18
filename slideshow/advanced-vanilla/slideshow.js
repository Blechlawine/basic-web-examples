let currentImageIndex = 0; // Index of the active image when the page loads
let offset = 100; // Offset in %, the slideshow images are moved by this amount to get to the next image
let circleOffsetPx = 18 + 8; // Distance between the center of a small circle to the center of the next small circle
let initialCircleOffset = null;
let maxImageIndex = null;

window.addEventListener("load", () => {
    setTimeout(() => {
        maxImageIndex = document.getElementsByClassName("backgroundImage").length - 1; // index of the last image in the slideshow
        let circleAmount = document.getElementsByClassName("slideShowCircle").length; // number of circles in the slideshow control box
        initialCircleOffset = (circleAmount / 2) * circleOffsetPx - (circleOffsetPx + 3) / 2; // The circles need to be moved to the right when the page loads, so the active circle, which at the start is always the one on the far left, can be centered between the left and right buttons (+3 because the active circle has a radius of 3px more than a small circle)
        [...document.getElementsByClassName("slideShowCircle")].forEach((element) => {
            element.style.transform = "translateX(" + initialCircleOffset + "px)"; // Moves the circles by the previously calculated offset, so the active circle is centered between the arrow buttons
        });
        document.getElementsByClassName("slideShowCircle")[currentImageIndex].classList.add("activeCircle"); // adds the "activeCircle" class to the active circle

        [...document.getElementsByClassName("slideShowCircle")].forEach((element, index) => {
            element.addEventListener("click", () => setActiveImage(index));
        });
    }, 100); // TODO: why do we wait 100 ms here?
});

function setActiveImage(imageIndex) {
    // 1. Moves the circles by the needed offset to get the active circle centered between the two arrow buttons
    // 2. adds the "activeCircle" class to the active circle
    // 3. moves the images in the slideshow for only the active image to be visible

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
