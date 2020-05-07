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
</style>