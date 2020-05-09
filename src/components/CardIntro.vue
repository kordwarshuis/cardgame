<template>
	<!-- open/close -->
	<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cardIntroState">
		<button type="button" class="overlay-fullscreen-close">Close</button>
		<!-- <nav>
			<ul>
				<li><a href="#">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Work</a></li>
				<li><a href="#">Clients</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</nav> -->
		<h2>{{ this.$store.state.currentPrejudice.Prejudice }}</h2>
		<p>{{ this.$store.state.currentPrejudice["Prejudice Elaborate"] }}</p>
		<p>{{ this.$store.state.currentPrejudice["long answer+facts"] }}</p>
		<!-- <button @click="showModal">More</button> -->
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
<style lang="scss">

</style>