<template>
<div class="container-sm" style="max-width: 540px;">
    <div v-html="content"></div>

    <hr>
    <!-- Delen en Bronnen-->
    <section class="coda">
        <div class="tekst p-3">
            <p>End of questions</p>
            <h2>Share your results</h2>
            <h2 class="nummering2"><span>
                    A
                </span></h2>
            <!-- Target -->
            <textarea style="color: #111;" id="socialMediaTekst">You have not answered any question yet.</textarea>

            <!-- Trigger -->
            <button class="btn kopieertekst" data-clipboard-target="#socialMediaTekst">
                Copy Text
            </button>

            <h2 class="nummering2"><span>B</span></h2>
            <p>Go to your Facebook, Twitter, email, etc. and paste and share this text.</p>
            <!-- <SocialMedia /> -->

            <div>

                <h2 class="nummering2"><span>C</span></h2>
                <p>Thank you for taking the quiz!</p>
            </div>
        </div>
    </section>

    <div style="position: fixed; top: 0; left: 0;">
        <p class="score"></p>
        <p class="scoreDezeVraag"></p>

    </div>

    <button id="toonNotificatie"></button>

</div>
<!-- container -->
</template>

<script>
import axios from "axios";
import store from "../store/store";
import {
    languageEn
} from "@/assets/js/quiz.language.en.js";
// import interact from 'interactjs';

export default {
    name: "Quiz",
    components: {},
    data() {
        return {
            content: ""
        }
    },
    mounted: function () {
        this.getContent();
    },
    methods: {
        getContent() {
            var that = this;
            return axios.get(process.env.VUE_APP_QUIZ_PAGE_SOURCE)
                .then(response => {
                    this.content = response.data;
                })
                .then(function () {
                    that.quiz();
                })
                .catch(function (error) {
                    console.log("We have a problem: " + error);
                });
        },
        quiz() {
            var main = (function () {
                "use strict";
                // https://stackoverflow.com/a/14947838                        
                var qS = document.querySelector.bind(document);
                var qSA = document.querySelectorAll.bind(document);

                // custom events
                var korStartGame = new CustomEvent("startGame");
                var korGestartMetResize = new CustomEvent("gestartMetResize");
                var korGestoptMetResize = new CustomEvent("gestoptMetResize");
                // var korEindeSpel = new CustomEvent("eindeSpel");

                // als er een score berekend wordt
                var customEventScore0 = new CustomEvent("customEventScore0");
                var customEventScore1 = new CustomEvent("customEventScore1");
                var customEventScore2 = new CustomEvent("customEventScore2");
                var customEventScore3 = new CustomEvent("customEventScore3");
                var customEventScore4 = new CustomEvent("customEventScore4");
                var customEventScore5 = new CustomEvent("customEventScore5");
                var customEventScore6 = new CustomEvent("customEventScore6");
                var customEventScore7 = new CustomEvent("customEventScore7");
                var customEventScore8 = new CustomEvent("customEventScore8");
                var customEventScore9 = new CustomEvent("customEventScore9");
                var customEventScore10 = new CustomEvent("customEventScore10");

                // de audio elementen met de waardering van de score
                // deze audios heb ik allemaal in de html gedefinieerd in tegenstelling tot de videos
                var scoreAudio = {
                    domScore0: qS("#score0"),
                    domScore1: qS("#score1"),
                    domScore2: qS("#score2"),
                    domScore3: qS("#score3"),
                    domScore4: qS("#score4"),
                    domScore5: qS("#score5"),
                    domScore6: qS("#score6"),
                    domScore7: qS("#score7"),
                    domScore8: qS("#score8"),
                    domScore9: qS("#score9"),
                    domScore10: qS("#score10")
                };

                // DOM
                var allSections = qSA("section");
                var domGeluidStaatAan = qSA(".geluidStaatAan");
                var domGeluidPlop = qS("#plop");
                var domGeluidSlepen = qS("#geluidSlepen");
                var domGeluidSlepenEind = qS("#geluidSlepenEind");
                var domGeluidCorrecteWaarde = qS("#geluidCorrecteWaarde");
                var domTotaalAantalInschattingsVragen = qSA(".container-inschattingsvraag").length;
                var domTotaalAantalMultipleChoicevragen = qSA(".maxiquiz").length;
                var domMenuBottom = qS(".cbp-spmenu");
                var domButtonShowExtraInfo = document.getElementById("buttonShowExtraInfo");
                // var domChartRight = qS(".chartright"); // dit zal alleen de eerste selecteren en die heb ik precies nodig
                var domStartGame = qS("#startGame");
                var domAanwijspijl = qS(".aanwijspijl");
                // var domAlleScoreborden = qSA(".score");
                var domAchtergrondScore = qS(".achtergrond-score");
                var domScoreVideoHolderHolder = qS(".scoreVideoHolderHolder");
                var domScoreVideo = qS(".scoreVideoHolderHolder video");
                var domScoreVideoTekst = qS(".scoreVideoHolderHolder p");
                var domSocialMediaTekst = qS("#socialMediaTekst");
                var domToonNotificatie = qS("#toonNotificatie");
                var domEindeSpel = qS("#eindeSpel");
                var domNummering = qSA(".nummering");
                var domAlleVideoEnAudioInVragen = qSA("section .toelichting video, section .toelichting audio");

                var GELUID_AAN_UIT_HOLDER = document.querySelectorAll(".soundonoff-list");

                // op ios werkt de geluiden aan uit knop niet, dus verbergen
                var iOS = /iPad|iPhone|iPod/.test(navigator.platform);

                // var domVolledigInBeeldMelding = qS("#vollediginbeeld");
                var vragenVideoOfAudioIsHelemaalInBeeldGeweest = [];
                // array alvast vullen
                for (var k = 0; k < domAlleVideoEnAudioInVragen.length; k++) {
                    vragenVideoOfAudioIsHelemaalInBeeldGeweest[k] = "false";
                }

                // https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
                var isVolledigInViewport = function (elem) {
                    var bounding = elem.getBoundingClientRect();
                    return (
                        bounding.top >= 0 &&
                        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                };
                var isGedeeltelijkInViewport = function (elem) {
                    var bounding = elem.getBoundingClientRect();
                    return (
                        (bounding.top >= 0 && bounding.top < (window.innerHeight || document.documentElement.clientHeight) &&
                            bounding.bottom > (window.innerHeight || document.documentElement.clientHeight))
                    );
                };
                var isVolledigBuitenViewport = function (elem) {
                    var bounding = elem.getBoundingClientRect();
                    return (
                        (bounding.top >= (window.innerHeight || document.documentElement.clientHeight) ||
                            bounding.bottom <= 0)
                    );
                };

                // custom events polyfill
                // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
                // ---> https://gomakethings.com/custom-events-with-vanilla-javascript/ 
                (function () {
                    if (typeof window.CustomEvent === "function") {
                        return false;
                    }

                    function CustomEvent(event, params) {
                        params = params || {
                            bubbles: false,
                            cancelable: false,
                            detail: undefined
                        };
                        var evt = document.createEvent("CustomEvent");
                        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                        return evt;
                    }

                    CustomEvent.prototype = window.Event.prototype;

                    window.CustomEvent = CustomEvent;
                })();

                // create unique id
                // https://codepen.io/Santoshah/pen/JVMqwb?editors=1010
                function IDGenerator() {
                    this.length = 16;
                    this.timestamp = +new Date;

                    var _getRandomInt = function (min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    this.generate = function () {
                        var ts = this.timestamp.toString();
                        var parts = ts.split("").reverse();
                        var id = "";

                        for (var i = 0; i < this.length; ++i) {
                            var index = _getRandomInt(0, parts.length - 1);
                            id += parts[index];
                        }

                        return id;
                    }
                }

                var generator = new IDGenerator();

                var uniqueID = generator.generate();

                /*
                 de dimensies van viewport via JS
                 http://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
                 beetje aangepast door Kor Dwarshuis
                 */
                var getViewport = function () {
                    var viewPortWidth;
                    var viewPortHeight;

                    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
                    if (typeof window.innerWidth !== "undefined") {
                        viewPortWidth = window.innerWidth;
                        viewPortHeight = window.innerHeight;
                    }
                    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
                    else if (typeof document.documentElement !== "undefined" && typeof document.documentElement.clientWidth !==
                        "undefined" && document.documentElement.clientWidth !== 0) {
                        viewPortWidth = document.documentElement.clientWidth;
                        viewPortHeight = document.documentElement.clientHeight;
                    }
                    // older versions of IE
                    else {
                        viewPortWidth = document.getElementsByTagName("body")[0].clientWidth;
                        viewPortHeight = document.getElementsByTagName("body")[0].clientHeight;
                    }
                    return {
                        width: viewPortWidth,
                        height: viewPortHeight
                    };
                };

                // BEGIN RANDOM UIT ARRAY
                var randomValueFromArray = function (myArray) {
                    return myArray[Math.floor(Math.random() * myArray.length)];
                };
                // EIND RANDOM UIT ARRAY

                // BEGIN THROTTLING
                // https://remysharp.com/2010/07/21/throttling-function-calls
                function throttle(fn, threshhold, scope) {
                    threshhold || (threshhold = 250);
                    var last,
                        deferTimer;
                    return function () {
                        var context = scope || this;

                        var now = +new Date,
                            args = arguments;
                        if (last && now < last + threshhold) {
                            // hold on to it
                            clearTimeout(deferTimer);
                            deferTimer = setTimeout(function () {
                                last = now;
                                fn.apply(context, args);
                            }, threshhold);
                        } else {
                            last = now;
                            fn.apply(context, args);
                        }
                    };
                }
                // STOP THROTTLING

                // BEGIN AFRONDEN
                var afronden = function (input, cijfersAchterKomma) {
                    return parseFloat(Math.round(input * 100) / 100).toFixed(cijfersAchterKomma);
                };
                // EIND AFRONDEN

                // speelt een bepaalde video op de achtergrond, gehele viewport
                var speelScoreVideo = function (vertraging, lengte) {
                    var vertraging = 0 || vertraging;
                    // weergeven van de score video
                    setTimeout(function () {
                        domScoreVideoHolderHolder.classList.add("scoreVideoHolderHolderZichtbaar");
                        if (domScoreVideo) {
                            domScoreVideo.pause();
                            domScoreVideo.currentTime = 0;
                            domScoreVideo.play();
                        }
                        setTimeout(function () {
                            if (domScoreVideo) {
                                domScoreVideo.pause();
                            }
                            domScoreVideoHolderHolder.classList.remove("scoreVideoHolderHolderZichtbaar");
                        }, lengte);
                    }, vertraging);
                };

                var speelScoreAudio = function (domGeluid, vertraging) {
                    var vertraging = 0 || vertraging;

                    setTimeout(function () {
                        if (localStorage.getItem("soundOn") === "true") domGeluid.play();
                    }, vertraging);
                };

                // berekening score
                var totaleBalkBreedtePx;
                var totaleBalkHoogtePx;
                var totaalScoreTotNuToe = 0;
                var scorePercentage = 0;
                var totaalAantalVragen = domTotaalAantalInschattingsVragen + domTotaalAantalMultipleChoicevragen;
                var totaalAantalVragenBeantwoord = 0;
                // divers
                var aanwijspijlReedsGetoond = false;

                function speelEindeMuziek() {
                    setTimeout(function () {
                        domEindeSpel.pause();
                        domEindeSpel.currentTime = 0;
                        domEindeSpel.play();
                    }, vertragingSpeelEindeMuziek);
                }

                function zijnAlleVragenBeantwoord() {
                    if (totaalAantalVragen === totaalAantalVragenBeantwoord) {
                        speelEindeMuziek();

                        // moet hier gedefinieerd worden, want dan krijgt scorePercentage de juiste waarde
                        var customEventAlleVragenBeantwoord = new CustomEvent("customEventAlleVragenBeantwoord", {
                            detail: {
                                scorePercentage: scorePercentage
                            }
                        });
                        document.dispatchEvent(customEventAlleVragenBeantwoord);
                    }
                }

                var geefScoreWeer = function (vertragingNotificatieScore) {
                    var vertragingNotificatieScore = 0 || vertragingNotificatieScore;
                    // var scoreVideoSource;

                    // de conditional (ternary) operator is om te voorkomen dat je in eerste instantie als je op score klikt een NaN waarde krijgt
                    scorePercentage = (totaalAantalVragenBeantwoord === 0) ? 0 : (totaalScoreTotNuToe / totaalAantalVragenBeantwoord) * 100;

                    // weergeven van de notification rechts boven

                    if (totaalAantalVragen < 2) {
                        setTimeout(function () {
                            store.commit("showToast", statusTekst.bijEenVraag[0] + " " + afronden(scorePercentage, 0) + " " + statusTekst.bijEenVraag[1]);
                        }, vertragingNotificatieScore);

                        // domSocialMediaTekst.innerHTML = document.head.querySelector("[name~=description][content]").content + " " + socialMediaTekst.bijEenVraag[0] + afronden(scorePercentage, 0) + socialMediaTekst.bijEenVraag[0] + " " + window.location.href;

                        domSocialMediaTekst.innerHTML = document.head.querySelector("[name~=description][content]").content + " " + socialMediaTekst.bijEenVraag[0] + afronden(scorePercentage, 0) + socialMediaTekst.bijEenVraag[0] + " " + window.location.href;
                    } else {
                        setTimeout(function () {
                            store.commit("showToast", statusTekst.bijMeerdereVragen[0] + " " + totaalAantalVragenBeantwoord + " " + statusTekst.bijMeerdereVragen[1] + " " + totaalAantalVragen + " " + statusTekst.bijMeerdereVragen[2] + " " + statusTekst.bijMeerdereVragen[3] + " " + afronden(scorePercentage, 0) + statusTekst.bijMeerdereVragen[4]);

                        }, vertragingNotificatieScore);
                        // domSocialMediaTekst.innerHTML = socialMediaTekst.bijMeerdereVragen;

                        domSocialMediaTekst.innerHTML = document.head.querySelector("[name~=description][content]").content + " " + socialMediaTekst.bijMeerdereVragen[0] + " " + totaalAantalVragenBeantwoord + " " + socialMediaTekst.bijMeerdereVragen[1] + " " + totaalAantalVragen + " " + socialMediaTekst.bijMeerdereVragen[2] + " " + socialMediaTekst.bijMeerdereVragen[3] + afronden(scorePercentage, 0) + socialMediaTekst.bijMeerdereVragen[4] + " " + window.location.href;
                    }

                    if (localStorage.getItem("soundOn") === "true") quizPlop.play();

                    // op de achtergrond zodat je tussen de blokken tekst en diagrammen door de score ziet
                    if (domAchtergrondScore) {
                        domAchtergrondScore.innerHTML = achtergrondScoreTekst + afronden(scorePercentage, 0) + "%";
                    }

                    // poging om de score in background weer te geven via een gradient
                    // qS("body").style.background = "linear-gradient(90deg, rgba(85,27,161,1) 0%, rgba(85,27,161,1) " + " " + (scorePercentage - 2) + "%, rgba(9,13,124,1) " + " " + (scorePercentage - 1) + "%, rgba(9,14,125,1) " + " " + (scorePercentage + 1) + "%, rgba(85,27,161,1) " + " " + (scorePercentage + 2) + "%, rgba(85,27,161,1) 100%)";

                    //         var test = "linear-gradient(90deg, rgba(85,27,161,1) 0%, rgba(85,27,161,1) " + " " + scorePercentage -2 + "%, rgba(9,13,124,1) " + " " + scorePercentage -1 + "%, rgba(9,14,125,1) " + " " + scorePercentage +1 + "%, rgba(85,27,161,1) " + " " + scorePercentage +2 + "%, rgba(85,27,161,1) 100%)"; 

                    // for (var i = 0; i < alleScoreborden.length; i++) {
                    // alleScoreborden[i].innerHTML = "Je scorepercentage tot nu toe is " + scorePercentage * 100 + "%";
                    // alleScoreborden[i].innerHTML = "Je hebt " + totaalAantalVragenBeantwoord + " vragen beantwoord. Je totale scorepercentage tot nu toe is " + afronden(scorePercentage, 0);
                    // }

                };

                domToonNotificatie.innerHTML = languageEn.showScore;

                domToonNotificatie.addEventListener("click", function () {
                    geefScoreWeer();
                    domGeluidPlop.pause();
                    domGeluidPlop.currentTime = 0;
                    domGeluidPlop.play();
                }, false);

                // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
                if (!Element.prototype.matches) {
                    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                        Element.prototype.webkitMatchesSelector;
                }

                if (!Element.prototype.closest) {
                    Element.prototype.closest = function (s) {
                        var el = this;
                        if (!document.documentElement.contains(el)) {
                            return null;
                        }
                        do {
                            if (el.matches(s)) {
                                return el;
                            }
                            el = el.parentElement || el.parentNode;
                        } while (el !== null && el.nodeType === 1);
                        return null;
                    };
                }

                function toelichtingTonen(wadde) {
                    if (wadde !== null) {
                        // de toelichting laten zien
                        setTimeout(
                            function () {
                                if (localStorage.getItem("soundOn") === "true") quizPlop.play();
                                // wadde.classList.add("zichtbaar");
                                // TODO: de functie almostvisible moet herschreven worden zodat ik het hier kan aanroepen

                                wadde.classList.remove("displayNone");

                                // wadde.style.display = "block";
                                // wadde.style.padding = "23px";
                            }, vertragingToelichtingTonen
                        );

                        // dit zorgt voor het laten zien van de toelichting
                        setTimeout(
                            function () {
                                wadde.classList.remove("almost-visible");
                                wadde.classList.add("almost-visible2");
                                wadde.classList.add("frutsel");
                            }, vertragingToelichtingTonen + 100
                        );

                        if (wadde.querySelector("video") && isVolledigInViewport(wadde.querySelector("video"))) {
                            setTimeout(function () {
                                wadde.querySelector("video").play();
                            }, vertragingMediaInToelichtingStarten);
                        }
                        if (wadde.querySelector("audio") && isVolledigInViewport(wadde.querySelector("audio"))) {
                            setTimeout(function () {
                                wadde.querySelector("audio").play();
                            }, vertragingMediaInToelichtingStarten);
                        }
                    }
                }

                // domStartGame.addEventListener("click", function startGame() {
                //     document.dispatchEvent(korStartGame);
                //     domStartGame.innerHTML = tekstGameIsGestart;
                //     domStartGame.disabled = true;
                //     domStartGame.classList.add("disabled-and-loaded");
                //     domStartGame.classList.add("animatedSlow");
                //     domStartGame.classList.add("infinite");
                //     domStartGame.classList.add("pulse");

                //     domToonNotificatie.style.display = "block";

                //     for (var i = 0; i < allSections.length; i++) {
                //         allSections[i].style.display = "block";
                //     }
                // }, true);

                // dit blokje is hier naar toe verplaatst. Voorheen werd het onload gerund, en dan kon ik de secties niet op display: none zetten omdat dat offsetWidth en offsetHeight nul worden en dan krijg je een infinity bij een deling
                if (qS(".horizontaal .schaalhouder")) {
                    totaleBalkBreedtePx = qS(".horizontaal .schaalhouder").offsetWidth;
                } else {
                    totaleBalkBreedtePx = 0;
                }
                if (qS(".vertikaal .schaalhouder")) {
                    totaleBalkHoogtePx = qS(".vertikaal .schaalhouder").offsetHeight;
                } else {
                    totaleBalkHoogtePx = 0;
                }

                /**
                 * BEGIN INSTELBARE STAAFDIAGRAMMEN
                 */
                var quizInstelbareStaafdiagrammen = (function () {
                    // zie onder andere https://css-tricks.com/making-a-bar-chart-with-css-grid/
                    // als iOS dan is het true
                    // var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
                    // de breedte in px van de balk die het totaal aangeeft. Hier wordt de eerste genomen, want ze zijn allemaal hetzelfde
                    // var totaleBalkBreedtePx = qS(".horizontaal .schaalhouder").offsetWidth;
                    // var totaleBalkHoogtePx = qS(".vertikaal .schaalhouder").offsetHeight;

                    // var totaleAardgasBaten = 400000000000;
                    // var infobar = qS(".infobar");

                    // deVraag ziet er zo uit: ".winstCVW"
                    var doe = function (deVraag, correcteWaardePerc) {
                        if (document.querySelector(deVraag) === null) {
                            console.log(deVraag + " does not exist");
                        }

                        var domInstelbareBalk = qS(deVraag + " .instelbareBalk");

                        // moet de sleepbare bar horizontaal of vertikaal zijn? Dit wordt afgeleid uit of de vertikaal of horizontaal class is geplaatst

                        // voor de multiple choice vragen is domInstelbareBalk === null, dus dan niet runnen
                        if (domInstelbareBalk) {
                            var orientatie = (qS(deVraag).classList.contains("vertikaal") === true) ?
                                "vertikaal" : "horizontaal";
                            // moet de sleepbare bar horizontaal of vertikaal zijn? Dit wordt afgeleid uit of de vertikaal of horizontaal class is geplaatst
                            var vertikaalRichting = (qS(deVraag).classList.contains("vanbovennaarbeneden") === true) ?
                                "vanBovenNaarBeneden" : "vanBenedenNaarBoven";

                        }

                        var welkeKantenSleepbaar = {};

                        if (orientatie === "vertikaal") {
                            if (vertikaalRichting === "vanBovenNaarBeneden") {
                                welkeKantenSleepbaar = {
                                    left: false,
                                    right: false,
                                    bottom: true,
                                    top: false
                                };
                            } else {
                                welkeKantenSleepbaar = {
                                    left: false,
                                    right: false,
                                    bottom: false,
                                    top: true
                                };
                            }
                        } else {
                            welkeKantenSleepbaar = {
                                left: false,
                                right: true,
                                bottom: false,
                                top: false
                            };
                        }

                        function handleResizeStart(event) {
                            if (localStorage.getItem("soundOn") === "true") dragging.play();

                            document.dispatchEvent(korGestartMetResize);

                            // de sleepkant heeft een donker gedeelte om aan te geven waar je kan slepen maar zodra je dat doet, verdwijnt dit om verwarring te voorkomen, want je moet een breedte of lengte aangeven die een waarde voorstelt
                            domInstelbareBalk.style.border = "none";

                        }

                        function handleResizeMove(event) {
                            if (aanwijspijlReedsGetoond) {
                                domAanwijspijl.style.display = "none";
                            }

                            var target = event.target,
                                x = (parseFloat(target.getAttribute("data-x")) || 0),
                                y = (parseFloat(target.getAttribute("data-y")) || 0);

                            // update the element"s style
                            target.style.width = event.rect.width + "px";
                            target.style.height = event.rect.height + "px";

                            // translate when resizing from top or left edges
                            x += event.deltaRect.left;

                            // hier mee spelen ivm of de bar omhoog gaat of naar beneden
                            y += event.deltaRect.top;
                            // y += event.deltaRect.bottom;

                            //BEGIN CHROME DETECTION
                            //TODO: FIND SOMETHING BETTER
                            // https://stackoverflow.com/a/13348618
                            // please note, 
                            // that IE11 now returns undefined again for window.chrome
                            // and new Opera 30 outputs true for window.chrome
                            // but needs to check if window.opr is not undefined
                            // and new IE Edge outputs to true now for window.chrome
                            // and if not iOS Chrome check
                            // so use the below updated condition
                            var isChromium = window.chrome;
                            var winNav = window.navigator;
                            var vendorName = winNav.vendor;
                            var isOpera = typeof window.opr !== "undefined";
                            var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
                            var isIOSChrome = winNav.userAgent.match("CriOS");

                            // if (isIOSChrome) {
                            //     // is Google Chrome on IOS
                            // } else if (
                            //     isChromium !== null &&
                            //     typeof isChromium !== "undefined" &&
                            //     vendorName === "Google Inc." &&
                            //     isOpera === false &&
                            //     isIEedge === false
                            // ) {
                            //     // is Google Chrome
                            //     // target.style.webkitTransform = "translate(0px,0px)";
                            //     target.style.transform = "translate(0px,0px)";
                            // } else {
                            //     // not Google Chrome 
                            //     target.style.transform = "translate(" + x + "px," + y + "px)";
                            // }
                            //END CHROME DETECTION

                            target.style.transform = "translate(" + x + "px," + y + "px)";

                            target.setAttribute("data-x", x);
                            target.setAttribute("data-y", y);
                            // target.textContent = Math.round(event.rect.width) + "\u00D7" + Math.round(event.rect.height);
                            // target.textContent = "";

                            // infobar.innerHTML =
                            //     accounting.formatMoney(
                            //         parseFloat(
                            //             Math.round(event.rect.width / totaleBalkBreedte * totaleAardgasBaten)
                            //             .toFixed(0)),
                            //         "€ ", 2, ".", ",");

                        }

                        function handleResizeEnd(event) {
                            totaalAantalVragenBeantwoord++;

                            document.dispatchEvent(korGestoptMetResize);

                            // toggleBottomMenu();
                            var domEindresultaatBalk = domInstelbareBalk.cloneNode(false);

                            var watJeKoosPerc;

                            var berekenStaafdiagrammenScore = function () {
                                var deBalkDieJeInstelde = qS(deVraag + " .instelbareBalk");
                                var watJeKoosPx;
                                var totaalPx;
                                var verschilPerc;
                                var verschilDeel;

                                if (orientatie === "vertikaal") {
                                    watJeKoosPx = deBalkDieJeInstelde.offsetHeight;
                                    totaalPx = totaleBalkHoogtePx;
                                } else {
                                    watJeKoosPx = deBalkDieJeInstelde.offsetWidth;
                                    totaalPx = totaleBalkBreedtePx;
                                }
                                //TODO: de scoreberekning aanpassen. Als je 

                                watJeKoosPerc = (watJeKoosPx / totaalPx) * 100;

                                verschilPerc = (watJeKoosPerc - correcteWaardePerc);

                                // maak getal positief
                                verschilPerc = -verschilPerc > 0 ? -verschilPerc : verschilPerc;
                                verschilDeel = verschilPerc / 100;

                                totaalScoreTotNuToe = totaalScoreTotNuToe + (1 - verschilDeel);

                                // LET OP hoe kleiner het verschil hoe beter
                                if (verschilPerc < 100 && verschilPerc >= 90) {
                                    document.dispatchEvent(customEventScore0);
                                } else
                                if (verschilPerc < 90 && verschilPerc >= 80) {
                                    document.dispatchEvent(customEventScore1);
                                } else
                                if (verschilPerc < 80 && verschilPerc >= 70) {
                                    document.dispatchEvent(customEventScore2);
                                } else
                                if (verschilPerc < 70 && verschilPerc >= 60) {
                                    document.dispatchEvent(customEventScore3);
                                } else
                                if (verschilPerc < 60 && verschilPerc >= 50) {
                                    document.dispatchEvent(customEventScore4);
                                } else
                                if (verschilPerc < 50 && verschilPerc >= 40) {
                                    document.dispatchEvent(customEventScore5);
                                } else
                                if (verschilPerc < 40 && verschilPerc >= 30) {
                                    document.dispatchEvent(customEventScore6);
                                } else
                                if (verschilPerc < 30 && verschilPerc >= 20) {
                                    document.dispatchEvent(customEventScore7);
                                } else
                                if (verschilPerc < 20 && verschilPerc >= 10) {
                                    document.dispatchEvent(customEventScore8);
                                } else
                                if (verschilPerc < 10 && verschilPerc >= 2) {
                                    document.dispatchEvent(customEventScore9);
                                } else {
                                    document.dispatchEvent(customEventScore10);
                                }

                                // setTimeout(function(){

                                // }, 1000);

                                // watJeKoosInPercentage = (watJeKoos / totaal) * 100;

                            };
                            var domSpecifiekeToelichting = qS(deVraag + " .toelichting");

                            function teHoogOfTeLaag() {
                                if (watJeKoosPerc < correcteWaardePerc) {
                                    return "telaag";
                                } else {
                                    return "tehoog";
                                }
                            }

                            berekenStaafdiagrammenScore();
                            geefScoreWeer(vertragingNotificatieScore);

                            // speel de score-achtergrondvideo nadat je de balk ingesteld hebt
                            // if (speelScoreVideoOpAchtergrond) {
                            //     speelScoreVideo(vertragingScoreVideo, lengteScoreVideo);
                            // }

                            teHoogOfTeLaag();
                            toelichtingTonen(domSpecifiekeToelichting);

                            // maakEventToelichtingMetVideoGetoond(deVraag, domSpecifiekeToelichting);

                            // geluiden
                            if (localStorage.getItem("soundOn") === "true") dragging.pause();
                            // domGeluidSlepen.currentTime = 0;

                            if (localStorage.getItem("soundOn") === "true") draggingEnd.play();

                            setTimeout(function () {
                                if (localStorage.getItem("soundOn") === "true") quizCorrectDragging.play();

                            }, vertragingStaafJuisteAntwoordTonen);

                            domEindresultaatBalk.style.removeProperty("transform");
                            domEindresultaatBalk.className = "";
                            domEindresultaatBalk.classList.add(deVraag.substr(1) + "eindresultaatBalk");
                            domEindresultaatBalk.classList.add("eindresultaatBalk");
                            // domEindresultaatBalk.innerHTML = "<span></span>";
                            var span = document.createElement("span");
                            span.setAttribute("class", "deJuisteKeuzeTekst");
                            span.innerHTML = hetJuisteAntwoord;
                            domEindresultaatBalk.appendChild(span);

                            if (teHoogOfTeLaag() === "telaag") {
                                domInstelbareBalk.parentNode.insertBefore(domEindresultaatBalk, domInstelbareBalk);
                            } else {
                                domInstelbareBalk.parentNode.insertBefore(domEindresultaatBalk, domInstelbareBalk.nextSibling);
                            }

                            // let op: hier wordt de oude eindresultaatBalk waarde vervangen door een nieuwe verwijzing naar dom element
                            // domEindresultaatBalk = qS(deVraag + "eindresultaatBalk");

                            // domEindresultaatBalk.style.bottom = domInstelbareBalk.getBoundingClientRect().bottom + "px";
                            if (orientatie === "vertikaal") {
                                domEindresultaatBalk.style.left = domInstelbareBalk.offsetLeft + "px";
                                domEindresultaatBalk.style.height = "0";
                                setTimeout(function () {
                                    domEindresultaatBalk.style.height = (correcteWaardePerc / 100) * 100 + "%";
                                }, vertragingStaafJuisteAntwoordTonen);
                            } else {
                                domEindresultaatBalk.style.width = "0";
                                setTimeout(function () {
                                    domEindresultaatBalk.style.width = (correcteWaardePerc / 100) * 100 + "%";
                                }, vertragingStaafJuisteAntwoordTonen);
                            }

                            // nadat je versleept hebt, wil je niet dat ze weer kunnen verslepen, hiermee zet je dat uit
                            // interact(deVraag + " .instelbareBalk").resizable(false);
                            zijnAlleVragenBeantwoord();
                        }

                        // interact(deVraag + " .instelbareBalk")
                        //     .resizable({
                        //         // https://github.com/taye/interact.js/issues/207
                        //         margin: 30,

                        //         // resize from all edges and corners
                        //         edges: {
                        //             left: welkeKantenSleepbaar.left,
                        //             right: welkeKantenSleepbaar.right,
                        //             bottom: welkeKantenSleepbaar.bottom,
                        //             top: welkeKantenSleepbaar.top
                        //         },

                        //         // keep the edges inside the parent
                        //         restrictEdges: {
                        //             outer: "parent",
                        //             endOnly: true,
                        //         },

                        //         // minimum size
                        //         restrictSize: {
                        //             min: {
                        //                 width: 0,
                        //                 height: 0
                        //             },
                        //         },
                        //         inertia: true,
                        //     }).
                        // on("resizemove", handleResizeMove).
                        // on("resizeend", handleResizeEnd).
                        // on("resizestart", handleResizeStart);
                    };

                    return {
                        doe: doe
                    };
                }());
                /**
                 * EIND INSTELBARE STAAFDIAGRAMMEN
                 */

                /**
                 * BEGIN MINIQUIZ
                 */
                var quizMultipleChoice = (function () {
                    var inputs = qSA("input.maxiQuizVraag");
                    var inputsLength = inputs.length;

                    function doe() {
                        var ischecked = this.checked;
                        var value = this.value;
                        var chosenAnswer = this.closest("label").innerText;
                        var questionNumber = this.closest("section").querySelector(".nummering span").innerText;
                        var antwGoed = qS("#geluidAntwGoed");
                        var antwFout = qS("#geluidAntwFout");
                        var goedeInput;
                        var deSectieId = this.closest("section").id;
                        var deSectie = this.closest("section .tekst");

                        var deToelichting = qS("#" + deSectieId + " .toelichting");

                        var wasMultipleChoiceAntwoordGoed = function (uitslag) {
                            if (uitslag === true) {
                                totaalScoreTotNuToe++;
                            }
                        };

                        // https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
                        function postAjax(url, data, success) {
                            var params = typeof data === "string" ? data : Object.keys(data).map(
                                function (k) {
                                    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                                }).join("&");

                            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                            xhr.open("POST", url);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState > 3 && xhr.status === 200) {
                                    success(xhr.responseText);
                                }
                            };
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.send(params);
                            return xhr;
                        }

                        // if resultsfile is set (in index.php then post results to it)
                        if (typeof writeResultsTo !== "undefined") {
                            // remove newlines created through .innerText
                            chosenAnswer = chosenAnswer.replace(/(\n)/gm, "");
                            postAjax(writeResultsTo, {
                                p0: Math.floor(Date.now() / 1000),
                                p1: uniqueID,
                                p2: questionNumber,
                                p3: chosenAnswer,
                                p4: value
                            }, function (data) {
                                // console.log(data);
                            });
                        }

                        totaalAantalVragenBeantwoord++;
                        // goede antwoord gekozen
                        if (ischecked === true && value === "goud") {
                            // GA Google Analytics, track XMLHttpRequest
                            //http://stackoverflow.com/a/15011353
                            if (typeof (_gaq) !== "undefined") {
                                _gaq.push(["_trackPageview", GAquizName + window.location.hash + this.parentNode.innerHTML.split("<")[0].trim()]); //haalt eerste stukje tekst uit label, de < is het begin van de input
                            }
                            // class toevoegen na innerHTML gaat niet blijkbaar omdat de node door innerHTLM veranderd wordt?
                            this.parentNode.classList.add("ditIsHetJuisteAntwoord");
                            this.parentNode.innerHTML += "<span class='antw antw-vinkje'>√</span>";

                            if (localStorage.getItem("soundOn") === "true") quizCorrectAnswer.play();
                            wasMultipleChoiceAntwoordGoed(true);
                            geefScoreWeer(vertragingNotificatieScore);

                            document.dispatchEvent(customEventScore10);
                        } else

                        // foute antwoord gekozen
                        {
                            // GA Google Analytics, track XMLHttpRequest
                            //http://stackoverflow.com/a/15011353
                            if (typeof (_gaq) !== "undefined") {
                                _gaq.push(["_trackPageview", GAquizName + window.location.hash + this.parentNode.innerHTML.split("<")[0].trim()]);
                            }

                            // stel je hebt meerdere "goud", zoals bij een maxiquiz waarin je vraagt om een beoordeling, dan kom je hier, in deze "else"  niet terecht, dus hoef ik verder niks te regelen
                            goedeInput = this.parentNode.parentNode.querySelector("input[value='goud']").parentNode;

                            setTimeout(
                                function () {
                                    goedeInput.innerHTML += "<span class='antw antw-vinkje'>√</span>";
                                    goedeInput.classList.add("ditIsHetJuisteAntwoord");
                                },
                                800);

                            //this.parentNode.parentNode.querySelector("input[value='goud']").parentNode.innerHTML += "<span class='antw antw-vinkje'>√</span>";

                            this.parentNode.innerHTML += "<span class='antw antw-kruis'>×</span>";

                            if (localStorage.getItem("soundOn") === "true") quizWrongAnswer.play();
                            wasMultipleChoiceAntwoordGoed(false);
                            geefScoreWeer(vertragingNotificatieScore);

                            document.dispatchEvent(customEventScore0);
                        }

                        toelichtingTonen(deToelichting);

                        // maakEventToelichtingMetVideoGetoond("#" + deSectieId, deToelichting);

                        // om te voorkomen dat je twee keer op een vraag kan klikken, pointer events, zie css
                        deSectie.classList.add("avoid-clicks");

                        zijnAlleVragenBeantwoord();
                    }
                    while (inputsLength--) {
                        inputs[inputsLength].addEventListener("change", doe, false);
                    }
                }());

                (function welOfNietInBeeld() {
                    // MELDING ALS EEN DIAGRAM NIET HELEMAAL IN BEELD IS

                    var schaalhouderMelding = (function () {
                        var domAlleSchaalhouders = qSA(".speciaalvoorvertikaal .schaalhouder");

                        for (var j = 0; j < domAlleSchaalhouders.length; j++) {
                            domAlleSchaalhouders[j].innerHTML += "<p class='schaalhouderMelding'>" + tekstDiagramNietHelemaalInBeeld + "</p>";

                        }
                        var domAlleSchaalhoudersMeldingen = qSA(".schaalhouderMelding");

                        function meldingAan() {
                            for (var j = 0; j < domAlleSchaalhouders.length; j++) {
                                // domAlleSchaalhouders[j].classList.add("nietVolledigInBeeldNl1");  
                                domAlleSchaalhoudersMeldingen[j].classList.add("schaalhouderMeldingZichtbaar");
                            }
                        }

                        function meldingUit() {
                            for (var j = 0; j < domAlleSchaalhouders.length; j++) {
                                // domAlleSchaalhouders[j].classList.remove("nietVolledigInBeeldNl1");   
                                domAlleSchaalhoudersMeldingen[j].classList.remove("schaalhouderMeldingZichtbaar");
                            }
                        }

                        return {
                            aan: meldingAan,
                            uit: meldingUit
                        };
                    }());

                    var alleSchaalhouders = qSA(".schaalhouder");
                    var isEenSchaalhouderVolledigInViewport = false;
                    var isEenSchaalhouderGedeeltelijkInViewport = false;
                    var isErGeenEnkeleSchaalhouderOokMaarEnigszinsInViewport = true;

                    // https://www.sitepoint.com/throttle-scroll-events/ @@@@
                    // window.addEventListener("scroll", _.throttle(function () {
                    // zie eigen throttle function van Remy Sharp
                    window.addEventListener("scroll", throttle(function () {
                        isEenSchaalhouderVolledigInViewport = false;
                        isEenSchaalhouderGedeeltelijkInViewport = false;
                        isErGeenEnkeleSchaalhouderOokMaarEnigszinsInViewport = true;
                        // domVolledigInBeeldMelding.style.display = "none";

                        for (var i = 0; i < alleSchaalhouders.length; i++) {
                            if (isGedeeltelijkInViewport(alleSchaalhouders[i]) === true) {
                                // isErEentjeVolledigInViewport = false;
                                // isErGeenEnkeleOokMaarEnigszinsInViewport = false;
                                isEenSchaalhouderGedeeltelijkInViewport = true;
                                // domVolledigInBeeldMelding.style.display = "block";
                            }
                            if (isVolledigInViewport(alleSchaalhouders[i]) === true) {
                                // isErEentjeGedeeltelijkInViewport = false;
                                // isErGeenEnkeleOokMaarEnigszinsInViewport = false;
                                isEenSchaalhouderVolledigInViewport = true;
                                // domVolledigInBeeldMelding.style.display = "none";
                                if (aanwijspijlReedsGetoond === false) {
                                    domAanwijspijl.style.display = "block";
                                    aanwijspijlReedsGetoond = true;
                                }
                            }
                            if (isVolledigBuitenViewport(alleSchaalhouders[i]) === false) {
                                isErGeenEnkeleSchaalhouderOokMaarEnigszinsInViewport = false;

                            }
                        } // einde van scroll actie

                        if (isEenSchaalhouderGedeeltelijkInViewport) {
                            schaalhouderMelding.aan();

                        }
                        if (isEenSchaalhouderVolledigInViewport) {
                            schaalhouderMelding.uit();
                        }
                        if (isErGeenEnkeleSchaalhouderOokMaarEnigszinsInViewport) {
                            schaalhouderMelding.uit();
                        }

                        // video's en audio's in vragen die moeten stoppen als ze uit beeld verdwijnen ALS ZE TENMINSTE EEN KEER IN BEELD GEWEEST ZIJN, dit gaat dus niet goed als de videos initieel in beeld zijn, daarom bij functie die toelichting toont regelen dat de video daar start als ie in beeld is
                        for (var l = 0; l < domAlleVideoEnAudioInVragen.length; l++) {
                            if (isGedeeltelijkInViewport(domAlleVideoEnAudioInVragen[l]) === true) {
                                vragenVideoOfAudioIsHelemaalInBeeldGeweest[l] = true;
                            }
                        }

                        for (var j = 0; j < domAlleVideoEnAudioInVragen.length; j++) {
                            if (isVolledigBuitenViewport(domAlleVideoEnAudioInVragen[j]) === true && vragenVideoOfAudioIsHelemaalInBeeldGeweest[j] === true) {
                                domAlleVideoEnAudioInVragen[j].pause();
                            }
                            if (isVolledigInViewport(domAlleVideoEnAudioInVragen[j]) === true && vragenVideoOfAudioIsHelemaalInBeeldGeweest[j] === true) {
                                domAlleVideoEnAudioInVragen[j].play();
                            }
                        }

                    }, 300));

                }());

                function returnScoreWaarden() {
                    return {
                        totaalAantalVragen: totaalAantalVragen,
                        totaalAantalVragenBeantwoord: totaalAantalVragenBeantwoord,
                        scorePercentage: scorePercentage
                    };
                }

                // alle vragen een oplopende nummer geven
                (function () {
                    for (var i = 0; i < domNummering.length; i++) {
                        domNummering[i].innerHTML = "<span>" + (i + 1) + "</span>" + languageEn.statusText.bijMeerdereVragen[1] + " " + domNummering.length + " " + languageEn.statusText.bijMeerdereVragen[2];
                    }
                }());

                //weergave aantal vragen
                (function () {
                    var weergaveAantalVragen = qSA(".weergaveaantalvragen");
                    if (weergaveAantalVragen) {
                        for (var i = 0; i < weergaveAantalVragen.length; i++) {
                            weergaveAantalVragen[i].innerHTML = domNummering.length;
                        }
                    }
                }());

                return {
                    afronden: afronden,
                    scoreWaarden: returnScoreWaarden,
                    // totaalAantalVragenBeantwoord: totaalAantalVragenBeantwoord,
                    // totaalAantalVragen: totaalAantalVragen,
                    getViewport: getViewport,
                    quizInstelbareStaafdiagrammen: quizInstelbareStaafdiagrammen,
                    randomValueFromArray: randomValueFromArray,
                    domScoreVideo: domScoreVideo,
                    domScoreVideoTekst: domScoreVideoTekst,
                    videootje: videootje,
                    speelScoreVideo: speelScoreVideo,
                    speelScoreAudio: speelScoreAudio,
                    scoreAudio: scoreAudio
                };
            }());

            // var writeResultsTo = "/data-receive/quiz.php";
            // var SHOW_SCORE = language.showScore;
            // de videos heb ik eentje gedefinieerd en dan verander ik het src attribuut, dit is zo gegroeid, had misschien beter alles in de html kunnnen definieren net als audio
            // TODO: language file
            var videootje = {
                score0: ["/video/korQuiz/3/score0.mp4", "een 0, –––"],
                score1: ["/video/korQuiz/3/score1.mp4", "een 1, ai"],
                score2: ["/video/korQuiz/3/score2.mp4", "een 2, beroerd"],
                score3: ["/video/korQuiz/3/score3.mp4", "een 3, das slecht"],
                score4: ["/video/korQuiz/3/score4.mp4", "een 4, niet zo goed"],
                score5: ["/video/korQuiz/3/score5.mp4", "een 5, doet pijn"],
                score6: ["/video/korQuiz/3/score6.mp4", "een 6, net voldoende ja"],
                score7: ["/video/korQuiz/3/score7.mp4", "een 7, niet slecht"],
                score8: ["/video/korQuiz/3/score8.mp4", "een 8, toe maar"],
                score9: ["/video/korQuiz/3/score9.mp4", "een 9, zo hee"],
                score10: ["/video/korQuiz/3/score10.mp4", "een 10, wow"]
            };
            var lengteAchtergrondMuziek = 60000;
            var tekstDiagramNietHelemaalInBeeld = languageEn.makeSureDiagramIsVisible;

            // BEGIN CONFIGURATIE
            // var socialMediaTekst = {
            //     bijEenVraag: "Hey Ik scoorde " + main.afronden(main.scorePercentage, 0) + "% op deze vraag! En jij?",
            //     bijMeerdereVragen: "Ik heb " + main.totaalAantalVragenBeantwoord + " vragen van de " + main.totaalAantalVragen + " vragen beantwoord. Mijn totale scorepercentage tot nu toe is " + main.afronden(main.scorePercentage, 0) + "%"
            // };

            // document.addEventListener("DOMContentLoaded", function() { 
            //     main();
            //   });

            var GELUID_IS_UIT_TEXT = languageEn.soundIsTurnedNowOff;
            var GELUID_IS_AAN_TEXT = languageEn.soundIsTurnedNowOn;
            var LET_OP_GELUID_STAAT_AAN = languageEn.soundIsOn;

            var speelScoreVideoOpAchtergrond = true;
            var lengteScoreVideo = 10000;
            var vertragingScoreVideo = 0;
            var vertragingClippy = 1000;
            var vertragingNotificatieScore = 3000;
            var vertragingRapportCijfer = 2000;
            var vertragingStaafJuisteAntwoordTonen = 1000;
            var vertragingToelichtingTonen = 0;
            var vertragingCommentaarNaKeuze = 200;

            // TODO: dit moet nu op nul staan (of 1 of zo) vanwege detectie of het in viewport is of niet, die code moet aangepast worden, nu kan het zijn dat als je te snel naar antwoord scrollt, het niet werkt
            var vertragingMediaInToelichtingStarten = 1;
            var vertragingSpeelEindeMuziek = 2000;
            var tekstGameIsGestart = languageEn.gameStarted;
            var youAnsweredAllQuestions = languageEn.youAnsweredAllQuestions;
            var achtergrondScoreTekst = languageEn.backgroundScoreText;
            var hetJuisteAntwoord = languageEn.theRightAnswer;
            var hetGekozenAntwoord = languageEn.theChosenAnswer;
            var tekstPerScore = languageEn.textForEveryScore;
            document.addEventListener("gestoptMetResize", function () {
                "use strict";
                // GA Google Analytics, track XMLHttpRequest
                //http://stackoverflow.com/a/15011353
                if (typeof (_gaq) !== "undefined") {
                    _gaq.push(["_trackPageview", GAquizName + window.location.hash +
                        "-staafdiagram-ingesteld"
                    ]);
                }
            }, false);

            // speel de score-achtergrondvideo nadat je keuze hebt gemaakt
            if (speelScoreVideoOpAchtergrond) {
                // wat te doen bij een bepaalde score, via een custom event
                document.addEventListener("customEventScore0", function () {
                    "use strict";
                    main.speelScoreAudio(whawhaTrumpet, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s0);
                    }, vertragingRapportCijfer);

                }, false);

                document.addEventListener("customEventScore1", function () {
                    "use strict";
                    main.speelScoreAudio(whawhaTrumpet, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s1);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore2", function () {
                    "use strict";
                    main.speelScoreAudio(laughManiacal, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s2);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore3", function () {
                    "use strict";
                    main.speelScoreAudio(cannedLaughter, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s3);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore4", function () {
                    "use strict";

                    main.speelScoreAudio(blur, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s4);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore5", function () {
                    "use strict";
                    main.speelScoreAudio(bouncing3, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s5);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore6", function () {
                    "use strict";
                    main.speelScoreAudio(gasp, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s6);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore7", function () {
                    "use strict";
                    main.speelScoreAudio(drumCrash1, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s7);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore8", function () {
                    "use strict";
                    main.speelScoreAudio(surprisedGasp, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s8);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore9", function () {
                    "use strict";
                    main.speelScoreAudio(fanfare, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s9);
                    }, vertragingRapportCijfer);
                }, false);

                document.addEventListener("customEventScore10", function () {
                    "use strict";
                    if (main.domScoreVideo) {
                        // main.domScoreVideo.src = main.videootje.score10[0];
                        main.domScoreVideoTekst.innerHTML = main.videootje.score10[1];
                    }

                    main.speelScoreAudio(epiphany, vertragingCommentaarNaKeuze);

                    setTimeout(function () {
                        store.commit("showToast", languageEn.yourScore.s10);
                    }, vertragingRapportCijfer);
                }, false);

            }

            // CLIPPY    
            function clippyLinksActies(agent) {
                "use strict";
                // agent.show();
                // agent.moveTo(getViewport().width/2, getViewport().height/2);
                agent.moveTo(main.getViewport().width - 150, main.getViewport().height - 100);
                // agent.play("Reading");
                // setTimeout(
                //     function(){
                //         agent.hide();
                //         agent.stop();
                //     }, 3000);

                document.addEventListener("gestartMetResize", function () {
                    // agent.stop();
                    agent.show();
                    // agent.play("Suprised");
                    agent.play("Writing");
                    // agent.play("Processing");
                }, false);
                document.addEventListener("gestoptMetResize", function () {
                    // agent.stop();
                    // agent.show();
                    agent.stopCurrent();
                    agent.play("RestPose");
                    // agent.speak("xxx");
                    // agent.play("Writing");
                    // agent.play("Embarrassed");
                    // agent.play("Congratulate");
                }, false);
                document.addEventListener("startGame", function () {
                    // agent.stopCurrent();
                    // agent.show();
                    agent.play("Wave");
                }, false);

                // wat te doen bij een bepaalde score, via een custom event
                document.addEventListener("customEventScore0", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score0));
                        agent.play("EmptyTrash");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore1", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score1));
                        agent.play("EmptyTrash");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore2", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score2));
                        agent.play("EmptyTrash");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore3", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score3));
                        agent.play("Thinking");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore4", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score4));
                        agent.play("Thinking");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore5", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score5));
                        agent.play("Thinking");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore6", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score6));
                        agent.play("Thinking");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore7", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score7));
                        agent.play("LookUp");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore8", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score8));
                        agent.play("Congratulate");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore9", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score9));
                        agent.play("Congratulate");
                    }, vertragingClippy);
                }, false);

                document.addEventListener("customEventScore10", function () {
                    setTimeout(function () {
                        agent.speak(main.randomValueFromArray(tekstPerScore.score10));
                        agent.play("Congratulate");
                    }, vertragingClippy);
                }, false);
            }

            // clippy.load("Links", function (agent) {
            //     "use strict";
            //     clippyLinksActies(agent);
            // });

            var statusTekst = languageEn.statusText;
            var socialMediaTekst = languageEn.socialMediaTekst;

            // start de instelbare staafdiagrammen, het getal is percentage van totaal
            // main.quizInstelbareStaafdiagrammen.doe(".totaleAardgasbaten", 0.6);
            main.quizInstelbareStaafdiagrammen.doe(".quizQuestion", 7); // make generic
            // main.quizInstelbareStaafdiagrammen.doe(".aantalBesluiten", 4);

            var clipboard = new ClipboardJS('.kopieertekst');

            clipboard.on('success', function (e) {
                // tekst aanpassen
                document.querySelector(".kopieertekst").innerHTML = languageEn.textCopied;
                document.querySelector("#socialMediaTekst").style.fontStyle = "italic";
                document.querySelector("#socialMediaTekst").style.borderStyle = "dotted";

                // en weer terugzetten
                setTimeout(function () {
                    document.querySelector(".kopieertekst").innerHTML = languageEn.copyTextAgain;
                    document.querySelector("#socialMediaTekst").style.fontStyle = "normal";
                    document.querySelector("#socialMediaTekst").style.borderStyle = "solid";
                }, 2000)
                e.clearSelection();
            });

            document.addEventListener("customEventAlleVragenBeantwoord", function (e) {
                // Notifier.info("Je hebt alle vragen beantwoord. Scroll naar beneden.");
                document.querySelector("body").classList.add("eindeSpel");
                setTimeout(function () {
                        alert(languageEn.youAnsweredAllQuestions2 + main.scoreWaarden()
                            .totaalAantalVragenBeantwoord + " " + languageEn.of + " " + main.scoreWaarden()
                            .totaalAantalVragen + languageEn.yourScoreBasedOnQuestions + main
                            .afronden(main.scoreWaarden().scorePercentage, 0) + languageEn.scrollToEndForOverview);
                    },
                    4000);

                // als alle vragen beantwoord zijn, en er is aan bepaalde voorwaarde voldaan:
                if (e.detail.scorePercentage > 50) {
                    setTimeout(function () {
                        store.commit("showToast", youAnsweredAllQuestions);
                    }, 1000);
                }
            }, false);

            /*
             * prevent selection of text
             * source: http://stackoverflow.com/questions/2326004/prevent-selection-in-html
             * DON"T FORGET THE CSS!!!!
             */
            (function makeUnselectable(node) {
                "use strict";
                if (node.nodeType === 1) {
                    node.setAttribute("unselectable", "on");
                }
                var child = node.firstChild;
                while (child) {
                    makeUnselectable(child);
                    child = child.nextSibling;
                }
            })(document.getElementsByTagName("body"));

        }
    }
};
</script>
