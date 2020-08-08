<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- 替换插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/HomeRecommendView'

    import {getHomeMultidata} from "network/home"

    export default {
    name: 'Home',
    data () {
        return {
          banner:[],
          recommend:[]
        };
    },
    methods: {},
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created () {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
