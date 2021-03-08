<template>
<div>
    <div class="alert alert-info m-5 p-3 startTour" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <p>{{tourLanguage.welcome}}</p>
        <p>{{tourLanguage.description}}</p>
        <button @click="startTour" type="button" class="btn btn-info tour-start">{{tourLanguage.startTour}}</button>
        <button @click="turnOffTour" type="button" class="btn">{{tourLanguage.dontShowAgain}}</button>
    </div>
    <v-tour name="myTour" :steps="tour.steps" :options="tour.options"></v-tour>
</div>
</template>

<script>
export default {
    name: 'my-tour',
    data() {
        return {
            tour: tour,
            tourLanguage: language.tour // reading from script imported via index.html TODO: make more robust
        }
    },
    mounted: function () {
        this.checkTourSetting();
    },
    methods: {
        checkTourSetting() {
            if (localStorage.getItem('showTour') === 'false') {
                document.addEventListener("DOMContentLoaded", function (event) {
                    $('.startTour').alert('close');
                });
            }
        },
        startTour() {
            this.$tours['myTour'].start();
            $('.startTour').alert('close');
        },
        turnOffTour() {
            localStorage.setItem('showTour', 'false');
            $('.startTour').alert('close');
        }
    }
}
</script>
