<template>
    <div>
        <!-- <h1>{{ msg }}</h1> -->
        <!-- <BitcoinAnimation /> -->
        <h1>Bitcoin Misconceptions</h1>
        <p>{{ subtext }}</p>
        <p class="categoryLinks">
            <a @click="showItemsInSelectedCategory()" data-category="All">All</a>
            <a v-for="category in categories" @click="showItemsInSelectedCategory(category)"
                :data-category="category.name" :key="category.name">{{ category.name }}
                ({{ category.numberOfItems }})</a>
        </p>


        <Search />

        <div class="grid">
            <!-- <transition name="fade"> -->
            <a v-for="item in categoryItemsContent" data-shorttext="" :data-id="item['id']" :key="item.prejudice"
                class="grid__item" href="#" @click="showCardIntro">
                <div class="box">
                    <div class="box__shadow"></div><img class="box__img"
                        src="@/assets/img/trivial-pursuit/TrivialPursuit2.png" alt="" />
                    <h3 class="box__title"><span class="box__title-inner" data-hover="">{{ item.category }}</span></h3>
                    <h4 class="box__text"><span class="box__text-inner">{{ item.prejudice }}</span></h4>
                </div>
            </a>
            <!-- </transition> -->
        </div>
        <NewsTicker />
    </div>
</template>

<script>
    import * as d3 from "d3-dsv";
    import axios from "axios";
    import NewsTicker from "@/components/NewsTicker.vue";
    import Search from "@/components/Search.vue";
    
    // import BitcoinAnimation from "@/components/BitcoinAnimation.vue";
    // import VueFuse from "vue-fuse";

    // import { bus } from '../main';
    export default {
        name: "Index",
        components: {
            Search
            ,NewsTicker
            // ,BitcoinAnimation
            // VueFuse
        },
        props: {
            msg: String
        },
        data() {
            return {
                subtext: "Help us get it right and send a card",
                // theJSON: "",
                categories: [],
                categoryItemsContent: [],
                results: [],
                fuseSearchKeys: ["Prejudice"]
            }
        },
        mounted: function () {
            this.fetchData();
            this.categories = this.$store.state.categories;
        },
        computed: {
            isJSONloaded() {
                return this.$store.state.isJSONloaded;
            }
        },
        // https://stackoverflow.com/a/44347195
        watch: {
            isJSONloaded: function() {
                // console.log("JSON ready");
                // console.log(this.$store.state.isJSONloaded);
            }
        },
        methods: {
            fetchData() {
                return axios.get("https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php")
                    .then(response => {
                        var responseData = d3.csvParse(response.data);

                        // cleaning
                        for (let i = 0; i < responseData.length; i++) {
                            for (var k in responseData[i]) {
                                if (responseData[i].hasOwnProperty(k)) {
                                    // console.log("Key is " + k + ", value is: " + dataLayer1[i][k]);
                                    // the csv source from google introduces \' so we remove the backslash:
                                    responseData[i][k] = responseData[i][k].replace(/\\'/g, "‘");
                                    //experimental:
                                    responseData[i][k] = responseData[i][k].replace(/'/g, "‘");
                                    // responseData[i][k] = responseData[i][k].replace(/(\n\n)/gm, "</p><p>");
                                }
                            }

                        }

                        // format quiz data
                        for (let i = 0; i < responseData.length; i++) {
                            responseData[i]["Quiz"] = this.prepareQuiz(responseData[i]["Quiz"]);
                        }
                        this.$store.commit("changeIsJSONloaded", true);
                        this.$store.state.theJSON = responseData;
                        this.createCategoryList(this.$store.state.theJSON);

                        //all items are generated if no argument is given
                        this.showItemsInSelectedCategory();

                        if (this.$route.params.card === undefined) {
                            return;

                            // if there is a specific url
                        } else if (this.$route.params.card !== "") {


                            // this works
                            // this.showCardIntroFromURL(this.$route.params.card);
                            
                            // this does not work
                            this.$store.commit("showCardIntroFromURL", this.$route.params.card);
                            
                            
                            // var currentPrejudice = this.$store.getters.getPrejudice(event.target.closest("a").dataset.id);
                        }

                        // return d3.csvParse(response.data);
                    });
            },

            createCategoryList(theJSON) {
                var categoryList = [];

                // make array with all categories
                // https://stackoverflow.com/a/14438954
                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }

                // create array with all categories (to create a menu with all categories):
                for (var i = 0; i < theJSON.length; i++) {
                    categoryList.push(theJSON[i].Cat);
                }

                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
                // remove duplicate entries
                categoryList = categoryList.filter(onlyUnique);
                for (let i = 0; i < categoryList.length; i++) {
                    var counter = 0;
                    for (let j = 0; j < theJSON.length; j++) {
                        if (theJSON[j].Cat === categoryList[i]) {
                            //TODO: number of items in category is sometimes wrong
                            counter++;
                        }
                        // categoryList.push(theJSON[i].Cat);
                    }

                    this.$store.state.categories.push({
                        "name": categoryList[i],
                        "numberOfItems": counter
                    });
                }

                // return categoryList.filter(onlyUnique);
            },
            showItemsInSelectedCategory(category) {
                this.setActiveMenuItem(category);

                //TODO: refactor so undefined check is not necesary. Instead the string “All” should be set on the fires <a>
                if (category === undefined) {
                    this.$store.state.activeCategory = "All";
                } else {
                    this.$store.state.activeCategory = category.name;
                }

                this.categoryItemsContent = [];

                //TODO: is this really necessary since we have the store?
                function makeArray(a, b) {
                    a.push({
                        "id": b["Unique URL"],
                        "prejudice": b.Prejudice,
                        "category": b.Cat,
                        "prejudiceElaborate": b["Prejudice Elaborate"]
                        // ,
                        // "numberOfItems": 
                    });
                }

                // category === undefined runs when function is called without argument, which happens on the ajax callback. Should be the first, and not after the "||"
                // here we create the info for the cards per category page
                if (category === undefined) {
                    for (var i = 0; i < this.$store.state.theJSON.length; i++) {
                        // console.log('this: ', this);
                        makeArray(this.categoryItemsContent, this.$store.state.theJSON[i]);
                    }
                } else {
                    for (var i = 0; i < this.$store.state.theJSON.length; i++) {
                        if (this.$store.state.theJSON[i].Cat === category.name) {
                            makeArray(this.categoryItemsContent, this.$store.state.theJSON[i]);
                        }
                    }
                }

                setTimeout(this.codrops, 1);
            },
            setActiveMenuItem(item) {
                // console.log('item: ', item);
                var allMenuItems = document.querySelectorAll(".categoryLinks a");

                // first remove class .active from all elements
                for (let i = 0; i < allMenuItems.length; i++) {
                    allMenuItems[i].classList.remove("active");
                }

                // console.log('allMenuItems: ', allMenuItems);
                // console.log('this.categories: ', this.categories);
                for (let i = 0; i < this.categories.length; i++) {
                    if (item === undefined) {
                        document.querySelector(".categoryLinks a[data-category='All']").classList.add("active");
                    } else
                    if (item.name === this.categories[i].name) {
                        document.querySelector(".categoryLinks a[data-category='" + this.categories[i].name + "']")
                            .classList.add(
                                "active");
                    }
                }
            },
            showCardIntro(event) {
                console.log('event: ', event.target);
                event.target.classList.add("visited");
                this.$store.commit("changeCardIntroState", "open");
                this.$store.commit("changeCardOverviewPageState", "overlay-fullscreen-open");

                // returns object with all entries of one prejudice
                var currentPrejudice = this.$store.getters.getPrejudice(event.target.closest("a").dataset.id);
                this.$store.commit("changePrejudice", currentPrejudice);

                // set URl to the item that was clicked
                // https://stackoverflow.com/a/58747480
                this.$router.push("/card/" + currentPrejudice["Unique URL"]).catch(err => {});
            },
            // showCardIntroFromURL(itemName) {
            //     this.$store.commit("changeCardIntroState", "open");
            //     this.$store.commit("changeCardOverviewPageState", "overlay-fullscreen-open");
            //     this.$store.commit("changePrejudice", this.$store.getters.getPrejudice(itemName));
                
                
            //     // console.log('itemName["Quiz"]: ', this.$store.getters.getPrejudice(itemName)["Quiz"]);

            //     // no need to set URL
            //     // this.$router.push(itemName["Unique URL"]);
            //     // this.$router.push(this.$route.params.card);
            //     // setTimeout(function () {
            //     //   textFit(document.getElementsByClassName("title-on-card"), {
            //     //     alignVert: true,
            //     //     multiLine: true
            //     //   });
            //     // }, 1000);

            // },
            prepareQuiz(quiz) {
                var temp = [];

                if (quiz !== "") {
                    // split quiz, make array
                    quiz = splitString(quiz, "|");
                    //put question in first item, first string item is always question
                    temp[0] = {
                        "question": quiz[0]
                    }

                    // put answers in second item
                    temp[1] = {
                        "answers": []
                    };
                    for (let i = 1; i < quiz.length - 1; i++) {
                        temp[1].answers.push(quiz[i]);
                    }
                    // put explanation in third item, last string item is always answer
                    temp[2] = {
                        "explanation": quiz[quiz.length - 1]
                    };

                    quiz = [];
                    quiz = temp;
                    return quiz;
                }
            },

            codrops() {

                /**
                 * demo.js
                 * http://www.codrops.com
                 *
                 * Licensed under the MIT license.
                 * http://www.opensource.org/licenses/mit-license.php
                 * 
                 * Copyright 2018, Codrops
                 * http://www.codrops.com
                 */

                {
                    const lineEq = (y2, y1, x2, x1, currentVal) => {
                        // y = mx + b 
                        var m = (y2 - y1) / (x2 - x1),
                            b = y1 - m * x1;
                        return m * currentVal + b;
                    };

                    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
                    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

                    const setRange = (obj) => {
                        for (let k in obj) {
                            if (obj[k] == undefined) {
                                obj[k] = [0, 0];
                            } else if (typeof obj[k] === 'number') {
                                obj[k] = [-1 * obj[k], obj[k]];
                            }
                        }
                    };

                    // from http://www.quirksmode.org/js/events_properties.html#position
                    const getMousePos = (e) => {
                        let posx = 0;
                        let posy = 0;
                        if (!e) e = window.event;
                        if (e.pageX || e.pageY) {
                            posx = e.pageX;
                            posy = e.pageY;
                        } else if (e.clientX || e.clientY) {
                            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                        }
                        return {
                            x: posx,
                            y: posy
                        }
                    };

                    class Item {
                        constructor(el, options) {
                            this.DOM = {
                                el: el
                            };

                            this.options = {
                                image: {
                                    translation: {
                                        x: -10,
                                        y: -10,
                                        z: 0
                                    },
                                    rotation: {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    }
                                },
                                title: {
                                    translation: {
                                        x: 20,
                                        y: 10,
                                        z: 0
                                    }
                                },
                                text: {
                                    translation: {
                                        x: 20,
                                        y: 50,
                                        z: 0
                                    },
                                    rotation: {
                                        x: 0,
                                        y: 0,
                                        z: -20
                                    }
                                },
                                deco: {
                                    translation: {
                                        x: -20,
                                        y: 0,
                                        z: 0
                                    },
                                    rotation: {
                                        x: 0,
                                        y: 0,
                                        z: 3
                                    }
                                },
                                shadow: {
                                    translation: {
                                        x: 30,
                                        y: 20,
                                        z: 0
                                    },
                                    rotation: {
                                        x: 0,
                                        y: 0,
                                        z: -2
                                    },
                                    reverseAnimation: {
                                        duration: 2,
                                        ease: 'Back.easeOut'
                                    }
                                },
                                content: {
                                    translation: {
                                        x: 5,
                                        y: 3,
                                        z: 0
                                    }
                                }
                            };
                            Object.assign(this.options, options);

                            this.DOM.animatable = {};
                            this.DOM.animatable.image = this.DOM.el.querySelector('.box__img');
                            this.DOM.animatable.title = this.DOM.el.querySelector('.box__title');
                            this.DOM.animatable.text = this.DOM.el.querySelector('.box__text');
                            this.DOM.animatable.deco = this.DOM.el.querySelector('.box__deco');
                            this.DOM.animatable.shadow = this.DOM.el.querySelector('.box__shadow');
                            this.DOM.animatable.content = this.DOM.el.querySelector('.box__content');

                            this.initEvents();
                        }
                        initEvents() {
                            let enter = false;
                            this.mouseenterFn = () => {
                                if (enter) {
                                    enter = false;
                                };
                                clearTimeout(this.mousetime);
                                this.mousetime = setTimeout(() => enter = true, 40);
                            };
                            this.mousemoveFn = ev => requestAnimationFrame(() => {
                                if (!enter) return;
                                this.tilt(ev);
                            });
                            this.mouseleaveFn = (ev) => requestAnimationFrame(() => {
                                if (!enter || !allowTilt) return;
                                enter = false;
                                clearTimeout(this.mousetime);

                                for (let key in this.DOM.animatable) {
                                    if (this.DOM.animatable[key] == undefined || this.options[key] ==
                                        undefined) {
                                        continue;
                                    }
                                    TweenMax.to(this.DOM.animatable[key],
                                        this.options[key].reverseAnimation != undefined ? this.options[
                                            key].reverseAnimation
                                        .duration || 0 : 1.5, {
                                            ease: this.options[key].reverseAnimation != undefined ? this
                                                .options[key].reverseAnimation
                                                .ease || 'Power2.easeOut' : 'Power2.easeOut',
                                            x: 0,
                                            y: 0,
                                            z: 0,
                                            rotationX: 0,
                                            rotationY: 0,
                                            rotationZ: 0
                                        });
                                }
                            });
                            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
                            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
                        }
                        tilt(ev) {
                            if (!allowTilt) return;
                            const mousepos = getMousePos(ev);
                            // Document scrolls.
                            const docScrolls = {
                                left: document.body.scrollLeft + document.documentElement.scrollLeft,
                                top: document.body.scrollTop + document.documentElement.scrollTop
                            };
                            const bounds = this.DOM.el.getBoundingClientRect();
                            // Mouse position relative to the main element (this.DOM.el).
                            const relmousepos = {
                                x: mousepos.x - bounds.left - docScrolls.left,
                                y: mousepos.y - bounds.top - docScrolls.top
                            };

                            // Movement settings for the animatable elements.
                            for (let key in this.DOM.animatable) {
                                if (this.DOM.animatable[key] == undefined || this.options[key] == undefined) {
                                    continue;
                                }

                                let t = this.options[key] != undefined ? this.options[key].translation || {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    } : {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    },
                                    r = this.options[key] != undefined ? this.options[key].rotation || {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    } : {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    };

                                setRange(t);
                                setRange(r);

                                const transforms = {
                                    translation: {
                                        x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                                        y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
                                        z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0],
                                    },
                                    rotation: {
                                        x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                                        y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
                                        z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
                                    }
                                };

                                TweenMax.to(this.DOM.animatable[key], 1.5, {
                                    ease: 'Power1.easeOut',
                                    x: transforms.translation.x,
                                    y: transforms.translation.y,
                                    z: transforms.translation.z,
                                    rotationX: transforms.rotation.x,
                                    rotationY: transforms.rotation.y,
                                    rotationZ: transforms.rotation.z
                                });
                            }
                        }
                    }

                    class Overlay {
                        constructor() {
                            this.DOM = {
                                el: document.querySelector('.overlay')
                            };
                            this.DOM.reveal = this.DOM.el.querySelector('.overlay__reveal');
                            this.DOM.items = this.DOM.el.querySelectorAll('.overlay__item');
                            this.DOM.close = this.DOM.el.querySelector('.overlay__close');
                        }
                        show(contentItem) {
                            this.contentItem = contentItem;
                            this.DOM.el.classList.add('overlay--open');
                            // show revealer
                            TweenMax.to(this.DOM.reveal, .5, {
                                ease: 'Power1.easeInOut',
                                x: '0%',
                                onComplete: () => {
                                    // hide scroll
                                    document.body.classList.add('preview-open');
                                    // show preview
                                    this.revealItem(contentItem);
                                    // hide revealer
                                    TweenMax.to(this.DOM.reveal, .5, {
                                        delay: 0.2,
                                        ease: 'Power3.easeOut',
                                        x: '-100%'
                                    });

                                    this.DOM.close.style.opacity = 1;
                                }
                            });
                        }
                        revealItem() {
                            this.contentItem.style.opacity = 1;

                            let itemElems = [];
                            itemElems.push(this.contentItem.querySelector('.box__shadow'));
                            itemElems.push(this.contentItem.querySelector('.box__img'));
                            itemElems.push(this.contentItem.querySelector('.box__title'));
                            itemElems.push(this.contentItem.querySelector('.box__text'));
                            itemElems.push(this.contentItem.querySelector('.box__deco'));
                            itemElems.push(this.contentItem.querySelector('.overlay__content'));

                            for (let el of itemElems) {
                                if (el == null) continue;
                                const bounds = el.getBoundingClientRect();
                                const win = {
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                };
                                TweenMax.to(el, lineEq(0.8, 1.2, win.width, 0, Math.abs(bounds.left + bounds.width -
                                    win.width)), {
                                    ease: 'Expo.easeOut',
                                    delay: 0.2,
                                    startAt: {
                                        x: `${lineEq(0, 800, win.width, 0, Math.abs(bounds.left+bounds.width - win.width))}`,
                                        y: `${lineEq(-100, 100, win.height, 0, Math.abs(bounds.top+bounds.height - win.height))}`,
                                        rotationZ: `${lineEq(5, 30, 0, win.width, Math.abs(bounds.left+bounds.width - win.width))}`
                                    },
                                    x: 0,
                                    y: 0,
                                    rotationZ: 0
                                });
                            }
                        }
                        hide() {
                            this.DOM.el.classList.remove('overlay--open');

                            // show revealer
                            TweenMax.to(this.DOM.reveal, .5, {
                                //delay: 0.15,
                                ease: 'Power3.easeOut',
                                x: '0%',
                                onComplete: () => {
                                    this.DOM.close.style.opacity = 0;
                                    // show scroll
                                    document.body.classList.remove('preview-open');
                                    // hide preview
                                    this.contentItem.style.opacity = 0;
                                    // hide revealer
                                    TweenMax.to(this.DOM.reveal, .5, {
                                        delay: 0,
                                        ease: 'Power3.easeOut',
                                        x: '100%'
                                    });
                                }
                            });
                        }
                    }

                    class Grid {
                        constructor(el) {
                            this.DOM = {
                                el: el
                            };
                            this.items = [];
                            Array.from(this.DOM.el.querySelectorAll('a.grid__item')).forEach((item) => {
                                const itemObj = new Item(item);
                                this.items.push(itemObj);
                                if (!item.classList.contains('grid__item--noclick')) {
                                    itemObj.DOM.el.addEventListener('click', (ev) => {
                                        ev.preventDefault();
                                        // this.openItem(document.querySelector(item.getAttribute('href')));
                                    });
                                }
                            });

                            // this.overlay = new Overlay();
                            // this.overlay.DOM.close.addEventListener('click', () => this.closeItem());
                        }
                        openItem(contentItem) {
                            if (this.isPreviewOpen) return;
                            this.isPreviewOpen = true;
                            allowTilt = false;
                            this.overlay.show(contentItem);
                            // "explode" grid..
                            for (let item of this.items) {
                                for (let key in item.DOM.animatable) {
                                    const el = item.DOM.animatable[key];
                                    if (el) {
                                        const bounds = el.getBoundingClientRect();

                                        let x;
                                        let y;
                                        const win = {
                                            width: window.innerWidth,
                                            height: window.innerHeight
                                        };

                                        if (bounds.top + bounds.height / 2 < win.height / 2 - win.height * .1) {
                                            //x = getRandomInt(-250,-50);
                                            //y = getRandomInt(20,100)*-1;
                                            x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds
                                                .width - win.width));
                                            y = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds
                                                .width - win.width));
                                        } else if (bounds.top + bounds.height / 2 > win.height / 2 + win.height *
                                            .1) {
                                            //x = getRandomInt(-250,-50);
                                            //y = getRandomInt(20,100);
                                            x = -1 * lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds
                                                .width - win.width));
                                            y = lineEq(20, 600, 0, win.width, Math.abs(bounds.left + bounds.width -
                                                win.width))
                                        } else {
                                            //x = getRandomInt(300,700)*-1;
                                            x = -1 * lineEq(10, 700, 0, win.width, Math.abs(bounds.left + bounds
                                                .width - win.width));
                                            y = getRandomInt(-25, 25);
                                        }

                                        TweenMax.to(el, 0.4, {
                                            ease: 'Power3.easeOut',
                                            delay: lineEq(0, 0.3, 0, win.width, Math.abs(bounds.left +
                                                bounds.width - win.width)),
                                            x: x,
                                            y: y,
                                            rotationZ: getRandomInt(-10, 10),
                                            opacity: 0
                                        });
                                    }
                                }
                            }
                        }
                        closeItem() {
                            if (!this.isPreviewOpen) return;
                            this.isPreviewOpen = false;
                            this.overlay.hide();

                            for (let item of this.items) {
                                for (let key in item.DOM.animatable) {
                                    const el = item.DOM.animatable[key];
                                    if (el) {
                                        const bounds = el.getBoundingClientRect();
                                        const win = {
                                            width: window.innerWidth
                                        };
                                        TweenMax.to(el, 0.6, {
                                            ease: 'Expo.easeOut',
                                            delay: .55 + lineEq(0, 0.2, 0, win.width, Math.abs(bounds.left +
                                                bounds.width - win.width)),
                                            x: 0,
                                            y: 0,
                                            rotationZ: 0,
                                            opacity: 1
                                        });
                                    }
                                }
                            }

                            allowTilt = true;
                        }
                    }

                    let allowTilt = true;
                    new Grid(document.querySelector('.grid'));

                    // Preload all the images in the page..
                    // imagesLoaded(document.querySelectorAll('.box__img'), () => document.body.classList.remove('loading'));
                }

            }

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">

</style>