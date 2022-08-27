function throttle(fn, delay) {
    let shouldWait = false;
    let waitingArgs;
    let timeoutFunc = () => {
        if (waitingArgs) {
            fn(...waitingArgs)
            waitingArgs = null;
            setTimeout(timeoutFunc, delay)
        } else {
            shouldWait = false;
        }
    }
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        } else {
            fn(...args);
            shouldWait = true;
            setTimeout(timeoutFunc, delay)
        }
    }
}

function lazyLoadImage(offset = 0) {
    let lazyImages = document.querySelectorAll("img.lazy");
    lazyImages.forEach(img => {
        if (img.offsetTop < window.innerHeight + window.scrollY + offset) {
            img.setAttribute("src", img.getAttribute("data-src"));
            img.classList.remove('lazy')
        }
    })
}

const throttleLazyLoadImage = throttle(lazyLoadImage, 20)
window.addEventListener("scroll", () => {
    throttleLazyLoadImage(200)
}) 