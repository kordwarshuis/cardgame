<template>
	<!-- open/close -->
	<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cardIntroState">
		<button type="button" class="overlay-fullscreen-close">Close</button>

		<!-- <p>{{ this.$store.state.currentPrejudice["long answer+facts"] }}</p> -->


		<div class="title-on-card">
			<h2>{{ this.$store.state.currentPrejudice.Prejudice }}</h2>
		</div>
		<h3>Answer</h3>
		<p>{{ this.$store.state.currentPrejudice["Prejudice Elaborate"] }}</p>


		<button class="closeCardIntro" @click="showModal">More</button>
		<button class="copyURLtoClipboard copyURLtoClipboard3">Copy Link</button>
	</div>
</template>

<script>
	export default {
		name: "CardIntro",
		data: function () {
			return {
				title: this.$store.state.currentTitle
			}
		},
		mounted: function () {
			this.handleCardIntro();
		},
		methods: {
			hideCardIntro() {
				//TODO: is this the way to change a store value? Seems not.
				// this.$store.state.cardIntroState = "";
				// trying this:
				this.$store.commit("changeCardIntroState", "");
			},
			handleCardIntro() {
				var that = this;
				var container = document.querySelector('div.container'),
					triggerBttn = document.getElementById('trigger-overlay-fullscreen'),
					overlayFullscreen = document.querySelector('div.overlay-fullscreen'),
					closeBttn = overlayFullscreen.querySelector('button.overlay-fullscreen-close'),
					transEndEventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition': 'transitionend',
						'OTransition': 'oTransitionEnd',
						'msTransition': 'MSTransitionEnd',
						'transition': 'transitionend'
					},
					transEndEventName = transEndEventNames[ModernizrForCardIntro.prefixed('transition')],
					support = {
						transitions: ModernizrForCardIntro.csstransitions
					};

				function toggleOverlayFullscreen() {
					if (overlayFullscreen.classList.contains('open')) {
						// overlayFullscreen.classList.remove('open');
						// container.classList.remove('overlay-fullscreen-open');
						overlayFullscreen.classList.add('close');

						that.$store.commit("changeCardIntroState", "");
						that.$store.commit("changeCardOverviewPageState", "");

						var onEndTransitionFn = function (ev) {
							if (support.transitions) {
								if (ev.propertyName !== 'visibility') return;
								this.removeEventListener(transEndEventName, onEndTransitionFn);
							}
							overlayFullscreen.classList.remove('close');
						};
						if (support.transitions) {
							overlayFullscreen.addEventListener(transEndEventName, onEndTransitionFn);
						} else {
							onEndTransitionFn();
						}
					} else if (!overlayFullscreen.classList.contains('close')) {
						overlayFullscreen.classList.add('open');
						container.classList.add('overlay-fullscreen-open');
					}
				}

				// triggerBttn.addEventListener('click', toggleOverlayFullscreen);
				closeBttn.addEventListener('click', toggleOverlayFullscreen);
			},
			showModal(event) {
				// console.log('e: ', event.target.closest("a").dataset.id);
				// this.$store.state.currentTitle = event.target.closest("a").dataset.id;

				//TODO: why is this working, should mutations be used?
				this.$store.state.modalState = " md-show";

				// the data-id of the element set that is clicked is used
				// this.$store.commit("changeTitle", event.target.closest("a").dataset.id);

				// returns object with all entries of one prejudice
				var currentPrejudice = this.$store.getters.getPrejudice(event.target.closest("a").dataset.id);
				// 
				this.$store.commit("changePrejudice", currentPrejudice);

			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	// https://tympanus.net/Development/FullscreenOverlayStyles/index7.html#
	/* Overlay style */
	.overlay-fullscreen {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: $overlayItemBackground2;
		padding: 3em;
	}

	/* Overlay closing cross */
	.overlay-fullscreen .overlay-fullscreen-close {
		cursor: pointer;
		width: 80px;
		height: 80px;
		position: absolute;
		right: 20px;
		top: 20px;
		overflow: hidden;
		border: none;
		background: url(../assets/img/icons/ui/cross.png) no-repeat center center;
		text-indent: 200%;
		color: transparent;
		outline: none;
		z-index: 100;
	}


	/* Effects */
	// html,
	// body {
	//   overflow-x: hidden;
	// }

	.container {
		overflow-x: hidden;
		-webkit-transition: -webkit-transform 0.5s;
		transition: transform 0.5s;
	}

	.container.overlay-fullscreen-open {
		-webkit-transform: translateX(50%);
		transform: translateX(50%);
	}

	.container::after {
		content: '';
		opacity: 0;
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		-webkit-transition: opacity 0.5s, visibility 0s 0.5s;
		transition: opacity 0.5s, visibility 0s 0.5s;
	}

	.container.overlay-fullscreen-open::after {
		visibility: visible;
		opacity: 1;
		-webkit-transition: opacity 0.5s;
		transition: opacity 0.5s;
	}

	.overlay-fullscreen-contentpush {
		background: $overlayItemBackground2;
		visibility: hidden;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%);
		-webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
		transition: transform 0.5s, visibility 0s 0.5s;
	}

	.overlay-fullscreen-contentpush.open {
		visibility: visible;
		-webkit-transform: translateX(0%);
		transform: translateX(0%);
		-webkit-transition: -webkit-transform 0.5s;
		transition: transform 0.5s;
	}




	.title-on-card {
		margin: 0;
		padding: 2em;
		background: transparent url(../assets/img/TrivialPursuit2.png) no-repeat top center !important;
		background-size: 100% auto;
		// border: 10px solid #999;
		height: 71% !important;
		max-width: 600px;
		width: 100% !important;
		float: left;
		// padding: 0;
	}

	.closeCardIntro {
		background: transparent url(../assets/img/TrivialPursuit2-stack.png) no-repeat center;
		background-size: contain;
		padding: 3em 1.2em 3em 2em;
		z-index: auto;
		transition: transform 0.3s;
	}

	.closeCardIntro:hover,
	.copyURLtoClipboard:hover {
		transform: rotate(360deg);
		transition: transform 0.3s;
	}
</style>