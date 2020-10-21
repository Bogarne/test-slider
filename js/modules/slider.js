function slider({ slide, nextArrow, prevArrow, field }) {
  const durration = 500,
    slides = document.querySelectorAll(slide),
  
    prevButton = document.querySelector(prevArrow),
    nextButton = document.querySelector(nextArrow),
   
    slidesField = document.querySelector(field),
    animations = [
      "slide-in-left",
      "slide-out-left",
      "slide-in-right",
      "slide-out-right",
      "slide-in-bottom",
    ];
  let slideIndex = 1;
  let isAnimated = false;

  const goNext = () => {
    console.log("goNext", { ...slidesField.style });
    if (isAnimated) return;
    isAnimated = true;

    const prevIndex = slideIndex - 1;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    const prev = slides[prevIndex];
    const next = slides[slideIndex - 1];

    clearCssAnimations(prev);
    prev.classList.add("slide-out-left");

    clearCssAnimations(next);
    next.classList.add("slide-in-right");

    setTimeout(() => {
      isAnimated = false;
    }, durration + 10);
  };

  const goPrev = () => {
    console.log("goPrev", { ...slidesField.style });
    if (isAnimated) return;
    isAnimated = true;

    const prevIndex = slideIndex - 1;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    const prev = slides[prevIndex];
    const next = slides[slideIndex - 1];

    clearCssAnimations(prev);
    prev.classList.add("slide-out-right");

    clearCssAnimations(next);
    next.classList.add("slide-in-left");

    setTimeout(() => {
      isAnimated = false;
    }, durration + 10);
  };

  const clearCssAnimations = (slide) => {
    slide.style.opacity = 1;
    slide.classList.remove(...animations);
  };

  nextButton.addEventListener("click", goNext);
  prevButton.addEventListener("click", goPrev);

  ((firstSlide, ...hiddenSlides) => {
    firstSlide.classList.add("slide-in-bottom");
    hiddenSlides.forEach((hs) => {
      hs.style.opacity = 0;
      hs.classList.add("slide-out-right");
    });
  })(...slides);

  return { goNext, goPrev };
}
