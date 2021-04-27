export const disableBodyScrollMixin = {
    methods: {
        // https://stackoverflow.com/a/41601290
        // DONT FORGET: -webkit-overflow-scrolling: touch; to the #overlay element.
        disableBodyScroll(target) {
            var _overlay = document.querySelector(target);
            var _clientY = null; // remember Y position on touch start

            _overlay.addEventListener('touchstart', function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    _clientY = event.targetTouches[0].clientY;
                }
            }, {passive: true});

            _overlay.addEventListener('touchmove', function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    disableRubberBand(event);
                }
            }, {passive: true});

            function disableRubberBand(event) {
                var clientY = event.targetTouches[0].clientY - _clientY;

                if (_overlay.scrollTop === 0 && clientY > 0) {
                    // element is at the top of its scroll
                    event.preventDefault();
                }

                if (isOverlayTotallyScrolled() && clientY < 0) {
                    //element is at the top of its scroll
                    event.preventDefault();
                }
            }

            function isOverlayTotallyScrolled() {
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
                return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
            }
        }
    }
}