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
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    justify-content: center;

  }

  .recommend-item img {
    width: 80%;
    height: 80%;
  }

</style>
