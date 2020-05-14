<template>
  <div class="twitter-realtime">
    <h1>This is Twitter Realtime.</h1>
  
  
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="masthead mb-auto">
    <div class="inner">
      <nav class="mb-1 mt-0 navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

        <!-- Set minimum number of followers -->
        <!-- <label id="followersset" for="followers">Min. followers: <span class="" title="Drag the slider.">?</span>
            <input style="width: 80%;" class="" name="followers" id="followers" type="range" value="750" min="0"
                max="100000" step="100" />
            <span style="display: block"></span>
        </label> -->

        <div class="alert alert-info mt-3" role="alert">
          All changes work immediately.
        </div>


        <label class="mt-3">
            <input type="radio" name="soundOnOf" id="soundOnOf1" value="on" checked="" /> Sound on
        </label>
        <label>
            <input type="radio" name="soundOnOf" id="soundOnOf2" value="of" /> Sound off
        </label>
        <hr>

        <div class="container p-0 ">
            <div class="row mt-4 mb-0 ml-0 mr-0 ">
            <p>Show tweets that contain “bitcoin” and…</p>
            </div>
            
            <div class="row mt-0 mb-4 ml-0 mr-0 no-gutters">
                <div class="col-sm p-0">
            
                    <label class="" for="followers" id="followersset">…the sender has </label>
                    <select name="followers" id="followers">
                        <option value="0">0</option>
                        <option value="500">500</option>
                        <option value="750" selected>750</option>
                        <option value="1000">1000</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000t">10,000</option>
                        <option value="100000">100,000</option>
                        <option value="1000000">1 million</option>
                    </select>
                    or more followers.
                </div>
                <div class="col-sm">
                    <label for="onlyVerifiedAccounts">Show only verified accounts</label>
                    <input type="checkbox" id="onlyVerifiedAccounts" name="onlyVerifiedAccounts">

                </div>
            </div>
        </div>


        <label for="keywords">Add or delete search strings separated by comma. Spaces matter. Empty means all bitcoins tweets are shown.</label>

        <textarea id="keywords" name="keywords" rows="5" cols="33" class="w-100 p-3">criminals,slow,laundering,energy,complicated,unfair,quantum,tax evaders,unsustainable,intrinsic value,shut down,scammers,roulette,only 21,not safe,black market,terrorists,tulip,greater fool,not scalable,anarchists,distribution unfair,hacked, anonymous,unsustainable,useless,ponzi,no backing,will die,forbidden,shut down,scammers,not gdpr,price down,terrorists,privacy breach,volatile,useless,deflation,chinese</textarea>
        <button id="restoreKeyWords" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyKeyWords" type="button" class="btn btn-light">Empty</button>

        <hr>
        <label for="tweetAccounts">The tweeps here will give an extra notification, visually and audibly <button id="testTweetAccountsSound" type="button" class="btn btn-light btn-sm mr-2">Listen</button> Add your favorite tweeps.</label>

        <textarea id="tweetAccounts" name="tweetAccounts" rows="5" cols="33" class="w-100 p-3">aantonop,saifedean,maxkeiser,jimmysong,lopp</textarea>
        <button id="restoreTweetAccounts" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyTweetAccounts" type="button" class="btn btn-light">Empty</button>
        <hr>









          <!-- <a class="navbar-brand" href="#">Hidden brand</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> -->
        </div>
      </nav>
    </div>
  </header>

  <main role="main" class="inner cover">
    <h1 class="cover-heading">Bitcoin Tweets Tracker</h1>


    <!-- <h1>Bitcoin Tweets Tracker</h1> -->
    <!-- <a><a href="notifications-old.php">Old version.</a></p> -->
    <div id="status" class="alert alert-secondary mt-2 ml-0 mr-0" role="alert"><span>App not active.</span></div>
    <button id="start" type="button" class="btn btn-light">Start</button>
    <button id="stop" type="button" class="btn btn-light">Stop</button>
    <!-- <p>Tweets from accounts with at least <span id="numberOfFollowers"></span> followers.</p> -->
    <!-- <p id="status"><span>App not active.</span></p> -->



    <div id="newVersionAvailable">
        <p>New version available. <a id="update" href="">Update</a></p>
    </div>


    <div id="tweets" class="row"></div>
    <audio id="alert" src="audio/330070__paulmorek__beep-05-single-2015-06-21.mp3"></audio>
    <audio id="alertSpecialAccount" src="audio/175893__toiletrolltube__110923-02-falling-metal-10.mp3"></audio>
  </main>

  <footer class="mastfoot mt-auto">
    <div class="inner">
      
    </div>
  </footer>
</div>


  
  
  
  
  
  
  
  
  
  
  
  
  
  </div>
</template>
