export function lazyloadImages() {
    // https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/ -> https://codepen.io/mishunov/pen/qpmWYP
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        const images = document.querySelectorAll('[data-src]');
        const config = {
            rootMargin: '0px 0px 50px 0px',
            threshold: 0
        };
        let loaded = 0;

        let observer = new IntersectionObserver(function (entries, self) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // console.log(`Image ${entry.target.src} is in the viewport!`);
                    preloadImage(entry.target);
                    // Stop watching and load the image
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });

        function preloadImage(img) {
            const src = img.getAttribute('data-src');
            if (!src) {
                return;
            }
            img.src = src;
        }
    } else {
        // https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
}