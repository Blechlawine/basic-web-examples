const speed = 0.4;

$(window).scroll(function onScroll() {
    let scrollTop = $(window).scrollTop();
    $(".moving").each(function moveElement() {
        const layer = Number($(this).data("layer")) || 1;
        const direction = $(this).data("direction")?.uppercase() || "Y";
        $(this).css("transform", `translate${direction}(${(-scrollTop * layer) * speed}px)`);
    });
});
