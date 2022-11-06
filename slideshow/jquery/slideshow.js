$(".slideshow").each(function () {
  let currentSlide = 0;
  const images = $(this).children();
  setInterval(function () {
    currentSlide = changeSlide(currentSlide, images);
  }, 5000);
  currentSlide = changeSlide(currentSlide, images);
});

function changeSlide(currentSlide, images) {
  images.eq(currentSlide).removeClass("active");
  currentSlide++;
  if (currentSlide >= images.length) {
    currentSlide = 0;
  }
  images.eq(currentSlide).addClass("active");
  return currentSlide;
}
