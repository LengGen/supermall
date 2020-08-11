<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- 替换插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>

      <tab-control class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 如果要监听组件的点击，就必须用 .native  -->
    <back-top @click.native="backClick"></back-top>

  </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/HomeRecommendView'
    import FeatureView from './childComps/HomeFeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backtop/BackTop'

    import {
      getHomeMultidata,
      getHomeGoods
    } from "network/home"

    export default {
    name: 'Home',
    data () {
        return {
          banner:[],
          recommend:[],
          goods: {
            'pop': {page: 0, list:[]},
            'new': {page: 0, list:[]},
            'sell': {page: 0, list:[]}
          },
          currentType: 'pop'
        };
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created () {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      // 事件监听相关的方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      // 网络请求相关的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          // res => pop前30 page:1
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
}
</script>

<style scoped>
  /* scoped代表作用域，只作用于当前组件 */
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    /* vh代表视口高度 */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  /* 另外一种方案： 注意给 #home 添加 相对定位*/
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

</style>
