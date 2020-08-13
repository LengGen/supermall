<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item.index"
        class="tab-control-item"
        :class="{active: index == currentIndex}"
        @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
    name: 'TabControl',
    props: {
      titles: {
        type:Array,
        default() {
          return []
        }
      }
    },
    data () {
        return {
          currentIndex: 0,
        };
    },
    methods: {
      itemClick(index) {
        // this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    },
    components: {},
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    justify-content: space-around;
    background-color: #fff;

    padding-bottom: 3px;
  }

  .tab-control-item {
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    padding:2px 5px;
  }

  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }

</style>
