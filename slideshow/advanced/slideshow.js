let currentImageIndex = 0; // Index of the active image when the page loads
let offset = 100; // Offset in %, the slideshow images are moved by this amount to get to the next image
let circleOffsetPx = 18 + 8; // Distance between the center of a small circle to the center of the next small circle
let initialCircleOffset = null;
let maxImageIndex = null;

$(window).on("load", () => {
    setTimeout(() => {
        maxImageIndex = $(".backgroundImage").length - 1; // index of the last image in the slideshow
        let circleAmount = $(".slideShowCircle").length; // number of circles in the slideshow control box
        initialCircleOffset = (circleAmount / 2) * circleOffsetPx - (circleOffsetPx + 3) / 2; // The circles need to be moved to the right when the page loads, so the active circle, which at the start is always the one on the far left, can be centered between the left and right buttons (+3 because the active circle has a radius of 3px more than a small circle)
        $(".slideShowCircle").css("transform", "translateX(" + initialCircleOffset + "px)"); // Moves the circles by the previously calculated offset, so the active circle is centered between the arrow buttons
        $(".slideShowCircle").eq(currentImageIndex).addClass("activeCircle"); // adds the "activeCircle" class to the active circle

        $(".slideShowCircle").each(function (i) {
            $(this).click(() => setActiveImage(i));
        });
    }, 100);
});

function setActiveImage(imageIndex) {
    // 1. Moves the circles by the needed offset to get the active circle centered between the two arrow buttons
    // 2. adds the "activeCircle" class to the active circle
    // 3. moves the images in the slideshow for only the active image to be visible

    $(".slideShowCircle").eq(currentImageIndex).removeClass("activeCircle");
    currentImageIndex = imageIndex;
    $(".backgroundImage").css("transform", "translateX(" + -(offset * currentImageIndex) + "%)");
    $(".slideShowCircle").css(
        "transform",
        "translateX(" + (initialCircleOffset - circleOffsetPx * currentImageIndex) + "px)"
    );
    $(".slideShowCircle").eq(currentImageIndex).addClass("activeCircle");
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

$("#slideshowRightArrow").click(nextImage);

$("#slideshowLeftArrow").click(prevImage);
