<template>
  <span ref="el"></span>
</template>

<script>
import { CountUp } from 'countup.js';

export default {
  name: 'ICountUp',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    delay: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      instance: null,
      delayTimer: null
    };
  },
  watch: {
    endVal(value) {
      if (this.instance) {
        this.instance.update(value);
      }
    }
  },
  mounted() {
    this.delayTimer = setTimeout(() => {
      this.init();
    }, this.delay);
  },
  beforeDestroy() {
    clearTimeout(this.delayTimer);
    this.instance = null;
  },
  methods: {
    init() {
      if (this.instance || !this.$refs.el) return;

      const options = {
        startVal: this.startVal,
        decimalPlaces: this.decimals,
        duration: this.options.duration != null ? this.options.duration : this.duration,
        ...this.options
      };

      const instance = new CountUp(this.$refs.el, this.endVal, options);
      if (!instance.error) {
        instance.start(() => {
          this.$emit('ready', instance, CountUp);
        });
        this.instance = instance;
      }
    }
  }
};
</script>
