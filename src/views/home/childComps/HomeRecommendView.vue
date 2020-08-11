<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
    name: 'RecommendView',
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
        return {

        };
    },
    methods: {},
    components: {},
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
    justify-content:space-around;
  }

  .recommend-item img {
    width: 70px;
    height: 65px;
    border-radius: 100%;
  }

</style>
