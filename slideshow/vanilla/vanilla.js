const slideshows = document.getElementsByClassName("slideshow");
for (let slideshow of slideshows) {
  let currentSlide = 0;
  const images = slideshow.children;
  setInterval(function () {
    currentSlide = changeSlide(currentSlide, images);
  }, 5000);
  currentSlide = changeSlide(currentSlide, images);
}

function changeSlide(currentSlide, images) {
  images[currentSlide].classList.remove("active");
  currentSlide++;
  if (currentSlide >= images.length) {
    currentSlide = 0;
  }
  images[currentSlide].classList.add("active");
  return currentSlide;
}
