<template>
  <div id="menu-and-buttons-wrapper">
    <div class="menu-wrap">
      <nav class="menu">
        <label class="mt-3">
          <input type="radio" name="soundOnOf" id="soundOnOf1" value="on" /> Sound on
        </label>
        <label>
          <input type="radio" name="soundOnOf" id="soundOnOf2" value="of" checked="" /> Sound off
        </label>
        <hr>

        <h2>General</h2>
        <ul>
          <li>
            <a target="_blank" rel="noopener" href="https://github.com/blockchainbird/cards_prejudice/wiki">How to</a>
          </li>
          <li>
            <a target="_blank" rel="noopener" href="/about-bird/">About Bird</a>
          </li>
          <li>
            <a target="_blank" rel="noopener" href="https://twitter.com/bc1bird">Bird on Twitter</a>
          </li>

        </ul>
        <hr>
        <h2>References</h2>
        <ul>
          <li><a href="https://en.bitcoin.it/wiki/Myths" target="_blank">Bitcoin Myths</a></li>
          <li><a href="https://elaineou.com/" target="_blank" rel="noopener">Elaine Ou</a>, <a
              href="https://twitter.com/eiaine" target="_blank" rel="noopener">@eiaine</a></li>
          <li><a href="https://github.com/libbitcoin/libbitcoin-system/wiki" target="_blank" rel="noopener">Eric
              Voskuil</a>, <a href="https://twitter.com/evoskuil" target="_blank" rel="noopener">@evoskuil</a></li>
          <li><a href="https://bitcoinmagazine.com/authors/aaron-van-wirdum" target="_blank" rel="noopener">Aaron van
              Wirdum</a>, <a href="https://twitter.com/AaronvanW" target="_blank" rel="noopener">@AaronvanW</a></li>
          <li><a href="https://www.youtube.com/user/aantonop/featured" target="_blank" rel="noopener">Andreas
              Antonopoulos</a>, <a href="https://twitter.com/aantonop" target="_blank" rel="noopener">@aantonop</a></li>
          <li><a href="https://www.unchained-capital.com/blog" target="_blank" rel="noopener">Parker Lewis</a>, <a
              href="https://twitter.com/parkeralewis" target="_blank" rel="noopener">@parkeralewis</a></li>
          <li>Christopher Allan, <a href="https://twitter.com/ChristopherA" target="_blank"
              rel="noopener">@ChristopherA</a></li>
        </ul>

        <hr>
        <h2>Card sets</h2>
        <ul>
          <li>
            <a href="../btc/">Bitcoin Prejudice</a>
          </li>
          <li>
            <a href="../bcb/">Blockchain Prejudice</a>
          </li>
        </ul>
        <hr>
        <h2>Who</h2>
        <ul>
          <li>
            Idea: <a href="https://twitter.com/henkvancann" target="_blank" rel="noopener">@henkvancann</a>
          </li>
          <li>
            Tool: <a href="https://twitter.com/kordwarshuis" target="_blank" rel="noopener">@kordwarshuis</a>
          </li>
        </ul>

      </nav>
    </div>
    <button class="close-button" id="close-button">Close Menu</button>
    <button class="menu-button" id="open-button">Open Menu</button>
  </div>
</template>

<script>
  export default {
    name: "Menu"
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #menu-and-buttons-wrapper {
    margin: 0;
    padding: 0;
}

a[target="_blank"] {
  background: none;
}


/* 
SOURCE: CODROPS
https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ 
*/
* {
	color: #eee;
}
.menu p {
	padding: 0 !important;
	margin: 0 !important;
}
.menu a {
	padding: 0.1em 1.2em 0 0 !important;
	/* display: inline !important; */
}

.menu a:hover,
.menu a:focus {
	color: #ddd;
}

.content-wrap {
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}

/* .content {
	position: relative;
	background: #b4bad2;
} */

.content::before {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 4;
	width: 100%;
	height: 100%;
	/* background: rgba(0,0,0,0.3); */
	background: #0087c554;
	content: '';
	opacity: 0;
	-webkit-transform: translate3d(100%,0,0);
	transform: translate3d(100%,0,0);
	-webkit-transition: opacity 0.4s, -webkit-transform 0s 0.4s;
	transition: opacity 0.4s, transform 0s 0.4s;
	-webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

/* Menu Button */
.menu-button {
	position: fixed;
	left: 0;
	z-index: 5;
	/* margin: 1em; */
	margin: 0;
	padding: 0;
	width: 2.5em;
	height: 2.25em;
	border: none;
	text-indent: 2.5em;
	color: transparent;
	background: transparent;
}

.menu-button::before {
	position: absolute;
	top: 0.5em;
	right: 0.5em;
	bottom: 0.5em;
	left: 0.5em;
	background: linear-gradient(#373a47 20%, transparent 20%, transparent 40%, #373a47 40%, #373a47 60%, transparent 60%, transparent 80%, #373a47 80%);
	content: '';
}

.menu-button:hover {
	opacity: 0.6;
}

/* Close Button */
.close-button {
	width: 1em;
	height: 1em;
	position: absolute;
	right: 1em;
	top: 1em;
	overflow: hidden;
	text-indent: 1em;
	font-size: 0.75em;
	border: none;
	background: transparent;
	color: transparent;
}

.close-button::before,
.close-button::after {
	content: '';
	position: absolute;
	width: 3px;
	height: 100%;
	top: 0;
	left: 50%;
	background: #bdc3c7;
}

.close-button::before {
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
}

.close-button::after {
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
}

/* Menu */
.menu-wrap {
	/* position: absolute; */
	position: fixed;
	z-index: 5;
	width: 300px;
	height: 100%;
	text-align: left;
	/* background: #373a47; */
	background: #0087c5;
	padding: 2.5em 1.5em 0;
	-webkit-transform: translate3d(-320px,0,0);
	transform: translate3d(-320px,0,0);
	-webkit-transition: -webkit-transform 0.4s;
	transition: transform 0.4s;
	-webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}
* {
	text-align: left;
}


.menu, 
.icon-list {
	height: 100%;
}



/* Shown menu */
.show-menu .menu-wrap {
	-webkit-transform: translate3d(0,0,0);
	transform: translate3d(0,0,0);
	-webkit-transition: -webkit-transform 0.8s;
	transition: transform 0.8s;
	-webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}



.show-menu .content::before {
	opacity: 1;
	-webkit-transition: opacity 0.8s;
	transition: opacity 0.8s;
	-webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	-webkit-transform: translate3d(0,0,0);
	transform: translate3d(0,0,0);
}

nav.menu {
	overflow: scroll;
}
</style>