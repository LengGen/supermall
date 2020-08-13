<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- 替换插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 如果要监听组件的点击，就必须用 .native  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

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

    import {debounce} from 'common/utils'

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
          currentType: 'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY:0
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
      BackTop,
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
    mounted () {
      // 进行防抖操作
      const refresh = debounce(this.$refs.scroll.refresh, 50)

      // 1. 监听 item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    // destroyed () {
    //   console.log("homedied");
    // },
    activated () {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()   //  防止可能突然回到顶部
    },
    deactivated () {
      this.saveY = this.$refs.scroll.scroll.y
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
        // 让两个tabcontrol的状态保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // 1. 判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000

        // 2. 决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 2. 获取tabControl的offsetTop
        // 所有的组件都有一个属性 $el ： 用于获取组件中的元素
        // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
          // res => type前30 page:1
          // ...语法 把数组中的数据一个一个取出来 再一个一个存到 goods[type].list中去
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()  // 完成下拉加载更多
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

    /* 使用浏览器原生滚动时，加上下面的用来测试 */
    /* 给主题内容加了scroll滚动后，但对nav没有加，所以下面的效果有没有都无所谓 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* 无效 */
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  /* 无效 */
  /* .tab-contarol {
    position: sticky;
    top: 44px;
  } */

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
