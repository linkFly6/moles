<style lang="sass">
  .menus {
    width: 160px;
    height: 100%;
    // border-right: 1px solid #a8d7fa;
    background: #f7f7f9;
    .list {
      height: 100%;
      padding: 0;
      margin: 0;
      .text {
        text-align: left;
      }
    }
    .menu-item {
      border-radius: 0;
      color: rgba(0, 0, 0, 0.54);
      width: 100%;
      height: 60px;
      .mu-flat-button-wrapper {
        justify-content: flex-start;
        padding-left: 10px;
      }
      &.active {
        background-color: rgba(204,204,206,.87);
      }
    }
  }
</style>

<template>
  <div class="menus">
    <ul class="list">
      <li>
        <mu-flat-button label="概况" class="menu-item" label-class="text" icon="directions" :class="{ active : actionName === 'index' }"
          @click="toProject" />
      </li>
    </ul>
  </div>
</template>
<script>;
  export default {
    data() {
      return {
        actionName: this.$route.name
      };
    },
    components: {
    },
    events: {
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      toProject() {
        this.actionName = 'project';
        this.$router.push('/task/project');
      }
    }
  }
</script>