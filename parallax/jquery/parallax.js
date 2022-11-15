const speed = 0.4;

$(window).scroll(function onScroll() {
    let scrollTop = $(window).scrollTop();
    $(".moving").each(function moveElement() {
        const layer = Number($(this).data("layer")) || 1;
        $(this).css("transform", `translateY(${(-scrollTop * layer) * speed}px)`);
    });
});
