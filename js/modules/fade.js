function fadeOutEffect(fadeTarget, durration, callback) {
	const fadePeriod = durration / 100;
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.01;
        } else {
			clearInterval(fadeEffect);
			callback(fadeTarget);
        }
    }, fadePeriod);
}

function fadeInEffect(fadeTarget, durration, callback) {
	const fadePeriod = durration / 100;
    var fadeEffect = setInterval(function () {
		const curVal = parseFloat(fadeTarget.style.opacity);
        if (curVal < 1) {
            fadeTarget.style.opacity = curVal + 0.01;
        } else {
			clearInterval(fadeEffect);
			callback(fadeTarget);
        }
    }, fadePeriod);
}
