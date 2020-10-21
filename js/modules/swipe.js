
function swipe (element, trashold) {
    console.log('swipe', { element, trashold });
    const swipeElement = element;
    let xDown,  yDown;

    swipeElement.addEventListener('touchstart', function(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }, false);
    
    const handleTouchMove = (e) => {
        if ( !xDown || !yDown ) {
            return;
        }

        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;

        if ( Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > trashold) {
            if (xDiff > 0 ) {
                onLeft();
            } else {
                onRight();
            }
        }

        xDown = null;
        yDown = null;
    }

    let onLeft = (callback) => {
        onLeft = callback;
    }

    let onRight = (callback) => {
        onRight = callback;
    }

    const listenSwipe = () => {
        swipeElement.addEventListener('touchmove', handleTouchMove, false);
    }

    const muteSwipe = () => {
        swipeElement.removeEventListener('touchmove', handleTouchMove, false);
    }

    return { swipeElement, onLeft, onRight, listenSwipe, muteSwipe, trashold };
}