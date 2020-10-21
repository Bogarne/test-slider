function renderSlider(data) {
  console.log({ data });
  let sliderHtml = "";

  const renderSlide = (slide) => {
    let content = "";
    let icons = "";
    let price = "";

    slide.variations.forEach((item, index) => {
      content += `<img src="${item.image}" class="slider-image fade-animated fade-hidden" data-id="${index}" />`;
      icons += `<div class="slider-icon-container-item">
				<img src="${item.iconOn}" class="slider-icon-on" data-id="${index}" />
				<img src="${item.iconOff}" class="slider-icon-off" data-id="${index}" />
			 </div>`;
    });

    return `
		<div class="slider-slide">
			
			<div class="slider-image-container">
				<div class="slider-image-wrapper">
					${content}
				</div>
			</div>
			
      <div class="slider-icon-container">
        ${icons}<div class="slider-shadow">
        <img src="image/P_shadow.png" />
      </div></div>
      ${slide.title ? `<img class="slider-title" src="${slide.title}" />` : ""}
      ${
        slide.price
          ? `<div class="slider-price"><img src="${slide.price}" /></div>`
          : ""
      }
		</div>`;
  };

  data.forEach((slide) => {
    sliderHtml += renderSlide(slide);
  });

  return sliderHtml;
}
