function fadeImagePlugin({ container, imgClass, onClass, offClass }) {
  console.log("fadeImagePlugin", { container, imgClass, onClass, offClass });

  const items = [
	...container.getElementsByClassName(imgClass),
	...container.getElementsByClassName(onClass),
	...container.getElementsByClassName(offClass),
  ];

  const slides = {};
  const slidesArray = [];
  let currentSlide;

  const hiddenClassName = "hidden";
  const fadeHiddenClassName = "fade-hidden";
  // const fadeAnimatedClass = 'fade-animated';

  items.forEach((node, index) => {
	const { dataset, classList } = node;
	if (!dataset.id) return;

	if (!slides[dataset.id]) {
	  slides[dataset.id] = { id: dataset.id };
	  slidesArray.push(slides[dataset.id]);
	}

	if (!slides[dataset.id].image && classList.contains(imgClass)) {
	  slides[dataset.id].image = node;
	}

	if (!slides[dataset.id].iconOn && classList.contains(onClass)) {
	  slides[dataset.id].iconOn = node;
	}

	if (!slides[dataset.id].iconOff && classList.contains(offClass)) {
	  slides[dataset.id].iconOff = node;
	}
  });

  const goToSlide = (next) => {
	currentSlide = next;

	const switchVisible = (item, shown) => {
	  item.image.classList.toggle(fadeHiddenClassName, !shown);
	  item.iconOn.classList.toggle(hiddenClassName, !shown);
	  item.iconOff.classList.toggle(hiddenClassName, shown);
	};

	slidesArray.forEach((item) => {
	  if (item.id !== next.id) {
		switchVisible(item, false);
	  }
	});

	switchVisible(next, true);
  };

  const prepareItems = () => {
	slidesArray.forEach((item) => {
	  const slide = item;
	  // slide.image.classList.add(fadeHiddenClassName, fadeAnimatedClass);
	  slide.iconOn.classList.add(hiddenClassName);
	  slide.iconOff.classList.add(hiddenClassName);

	  slide.iconOff.addEventListener("click", () => {
		goToSlide(slide);
	  });
	});
  };

  prepareItems();
  goToSlide(slidesArray[0]);
}
