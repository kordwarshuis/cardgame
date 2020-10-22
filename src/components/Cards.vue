<template>
<div class="cards">
    <!-- <transition name="fade"> -->
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <BitcoinAnimation /> -->
    <!-- <h1>Bitcoin Misconceptions</h1> -->

    <div class="row">
        <!-- NAME -->
        <div class="col-md-8">
            <h1 class="mb-0">
                <ICountUp :delay="ICountUpDelay" :endVal="$store.state.numberofCards" :options="ICountUpOptions" />
                <span class="game-title-1">
                    {{this.$store.state.gameTitle}}
                </span>
                <span class="game-title-2">
                    {{this.$store.state.gameTitle2}}
                </span>
            </h1>
            <p class="mt-0">{{this.$store.state.gameSubTitle}}</p>

        </div>

        <div class="col-md-4">
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle button-categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter By
                </button>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-categories">
                    <ul class="nav nav-pills pt-0 mx-auto justify-content-center">
                        <!-- All = All categories at once -->
                        <li class="nav-item ">
                            <a class="nav-link p-1 All" @click="$store.commit('showItemsInSelectedCategory')" data-category="All">All</a>
                        </li>

                        <!-- Every category in a menu item -->
                        <li class="nav-item" :class="category.name" v-for="category in $store.state.categories" :key="category.name">
                            <a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category.name)" :data-category="category.name">
                                {{ category.name }}
                                ({{ category.numberOfItems }})
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    <!-- <div class="alert alert-info ml-1 mr-1 ml-md-5 mr-md-5 mt-0" role="alert">
            1: Select a tweet – 2: Select and Copy a card – 3: Paste card in reply to tweet
    </div> -->
    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->

    <!-- THE CARDS -->
    <div class="masonry-with-columns ml-1 mr-1 ml-md-5 mr-md-5 mt-2">
        <div v-for="item in $store.state.allCardsInChosenCategory" :key="item.prejudice" class="mb-4">
            <a :data-id="item['id']" :key="item.prejudice" href="#" @click="showCardIntro" class="p-2">
                <h2 class=""><span class="quote">“</span>{{ item.prejudice }}<span class="quote">”</span></h2>
            </a>
            <div class="card-footer" style="background: #1D2448; text-align: left;">
                <h3 @click="$store.commit('showItemsInSelectedCategory',item.category)" class="category" :class="item.category" style="text-align: left;display: inline-block;font-size: 0.7em; padding: 0.5em">{{ item.category }}</h3>
            </div>
        </div>
    </div>

    <!-- <NewsTicker /> -->
    <!-- <SoundToggle /> -->
    <!-- </transition> -->

</div>
</template>

<script>
// import NewsTicker from "@/components/NewsTicker.vue";
// import Search from "@/components/Search.vue";
import SoundToggle from "@/components/SoundToggle.vue";
import ICountUp from 'vue-countup-v2';
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";

export default {
    name: "Index",
    components: {
        // Search,
        // NewsTicker,
        SoundToggle,
        ICountUp
        // ,BitcoinAnimation
        // VueFuse
    },
    props: {
        msg: String,
        categories: Array
    },
    data() {
        return {
            ICountUpDelay: 2000, //msec
            ICountUpOptions: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                duration: 4 //sec
            }
        }
    },
    mounted() {
        this.addVisitedToCards();
    },
    methods: {
        addVisitedToCards() {
            //TODO: duplicate code, see addVisitedToCards()
            setTimeout(function () {
                var allCards = document.querySelectorAll(".grid__item");
                // loop all cards and add .visited if in localStorage visited
                for (let i = 0; i < allCards.length; i++) {
                    if (localStorage.getItem("visited") && localStorage.getItem("visited").indexOf(allCards[i].dataset.id) > -1) {
                        allCards[i].classList.add("visited");
                    }
                }
            }, 1000);
        },
        startElectricitySound(e) {
            if (e.target.closest("a").classList.contains("visited")) {
                if (localStorage.getItem("soundOn") === "true") {
                    electricity.play();
                    setTimeout(function () {
                        electricity.stop()
                    }, 1000);
                }
            }
        },
        // stopElectricitySound(e) {
        //     if (e.target.closest("a").classList.contains("visited")) {
        //         if (localStorage.getItem("soundOn") === "true") electricity.stop();
        //     }
        // },
        showCardIntro(event) {
            // console.log('this.$store.state.currentCard["Youtube Video Id"]: ', this.$store.state.currentCard["Youtube Video Id"]);
            // event.target.closest("a").classList.add("visited");

            // https://stackoverflow.com/a/7680123
            // localStorage can only be string
            function appendToLocalStorage(name, data) {
                var old = localStorage.getItem(name);

                // create if not existing
                if (old === null) old = "";

                // only add if it is not already in the string
                if (old.indexOf(data) === -1) localStorage.setItem(name, old + data + " ");
            }

            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one prejudice
            var currentCard = this.$store.getters.getCard(event.target.closest("a").dataset.id);

            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            // catch error: https://stackoverflow.com/a/58747480
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            this.$router.push("/card/" + currentCard["Unique URL"]);

            if (localStorage.getItem("soundOn") === "true") whoosh2.play();

            // add current card url to visited in localStorage
            appendToLocalStorage("visited", this.$store.state.currentCard["Unique URL"]);

            this.addVisitedToCards();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.cards {
    padding-top: 30px;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .cards {
        padding-top: 50px;
    }
}

// https://css-tricks.com/how-do-you-do-max-font-size-in-css/
h1 {
    font-size: 20px;
}

h1 {
    font-weight: normal;
}

.game-title-1 {
    font-family: poppinsbold;
}

.game-title-2 {
    font-family: poppinsregular;
}

// .nav-link {
//     color: #eee;
//     cursor: pointer;
// }

.button-categories {
    background: #5965F9;
    border: none;
}

.dropdown-menu-categories {
    background: #5965FA;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 1);
    padding: 0.2em;
    font-size: 0.9em;
}

.dropdown-menu-categories a {
    font-family: poppinsbold;
    border: 1px solid #333;
    margin: 0.3em;
    cursor: pointer;
}

.dropdown-menu-categories a:hover {
    background: #323A66;
    color: #eee;
}

@media screen and (min-width: 320px) {
    h1 {
        font-size: calc(20px + 6 * ((100vw - 320px) / 680));
    }
}

@media screen and (min-width: 1000px) {
    h1 {
        font-size: 40px;
    }
}

// https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
.masonry-with-columns {
    // columns: 5 200px;
    column-count: 5;
    column-width: 200px;
    column-gap: 1rem;
    // column-rule: 1px dotted #ddd;

    >div {
        cursor: pointer;
        background-image: url(../assets/img/icons/flat/bitcoin.svg), linear-gradient(#272f52, #3a4275);
        background-repeat: repeat, no-repeat;
        background-size: 25px 25px, 100% 100%;
        background-position: center center, center center;
        text-align: center;
        font-variant: small-caps;
        border-radius: 10px;
        color: $_text1;
        display: inline-block;
        width: 100%;

        h2,
        h3 {
            color: $_text1;
            font-size: 1.1em;
            margin: 0.5em;
        }

        .card-footer {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 0 0.5em 0 0.5em;

        }
    }

    .category {
        border-radius: 4px;
        background: #1D807D;
        margin: 0.8em;
    }

}


.nav-item a {
    color: #eee;
}
.nav-item a.All {
    background: #eee;
    color: #111;
}

.category.Architecture,
.nav-item.Architecture a {
    background: #148868;
}

.category.Crime,
.nav-item.Crime a {
    background: #7C2929;
}

.category.Use,
.nav-item.Use a {
    background: #3E2D2D;
}

.category.Environment,
.nav-item.Environment a {
    background: #7B610E;
}

.category.Media,
.nav-item.Media a {
    background: #5D3D50;
}

.category.Beliefs,
.nav-item.Beliefs a {
    background: #6C297C;
}

.category.Skills,
.nav-item.Skills a {
    background: #535353;
}

.category.Control,
.nav-item.Control a {
    background: #294F7C;
}

.category.Existential,
.nav-item.Existential a {
    background: #1B7B76;
}

.category.Legal,
.nav-item.Legal a {
    background: #40672C;
}

.category.Price,
.nav-item.Price a {
    background: #3D515D;
}

.category.Society,
.nav-item.Society a {
    background: #061545;
}

.category.Supply,
.nav-item.Supply a {
    background: #063333;
}
</style>
