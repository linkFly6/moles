<style lang="sass">
  .quick-compress {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    .box{
      flex: 1;
    }
  }
</style>

<template>
  <div class="quick-compress">
    <div class="box">
      <mu-icon-button icon="android" />
    </div>
    <magic-bar></magic-bar>
  </div>
</template>
<script>
    import MagicBar from '../components/MagicBar'
  export default {
    data() {
      return {};
    },
    components: {
        MagicBar
    },
    events: {
    },
    mounted() {

    },
    updated() {

    },
    methods: {
    }
  }
</script>