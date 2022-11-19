let currentImageIndex = 0; // Index des aktiven Bildes beim Laden der Seite
let offset = 100; // Offset in %, um die die Bilder in der Slideshow verschoben werden, wenn man durchklickt
let circleOffsetPx = 18 + 8; // Abstand von der Mitte eines kleinen Kreises zur Mitte des nächsten kleinen Kreises
let initialCircleOffset = null;
let maxImageIndex = null;

$(window).on("load", () => {
    setTimeout(() => {
        maxImageIndex = $(".backgroundImage").length - 1; // der Index des letzten Bildes in der Slideshow
        let circleAmount = $(".slideShowCircle").length; // Anzahl Kreise in Slideshowcontrol
        initialCircleOffset = (circleAmount / 2) * circleOffsetPx - (circleOffsetPx + 3) / 2; // Die Kreise sollten beim Laden der Seite nach rechts verschoben werden, damit der aktive Kreis(der beim laden der Seite immer der erste ist) mittig zwischen den 2 Pfeilen liegt. +3 deshalb, weil der aktive Kreis einen 3px größeren radius hat
        $(".slideShowCircle").css("transform", "translateX(" + initialCircleOffset + "px)"); // verschiebt die Kreise um das in der vorherigen Zeile berechnete offset, sodass der aktive Kreis mittig zwischen den 2 Pfeilen liegt
        $(".slideShowCircle").eq(currentImageIndex).addClass("activeCircle"); // fügt die Klasse "activeCircle" zum aktiven Kreis hinzu, sodass dieser hervorgehoben wird

        $(".slideShowCircle").each(function (i) {
            // arrowfunction funktioniert hier nicht, damit "this" auf den angeklickten Kreis zeigt
            $(this).click(() => setActiveImage(i));
        });
    }, 100);
});

function setActiveImage(imageIndex) {
    // verschiebt die Kreise um das passende Offset, sodass der aktive Kreis mittig zwischen den 2 Pfeilen liegt und gibt dem aktiven Kreis die Klasse "activeCircle" und verschiebt die Slideshowbilder

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
