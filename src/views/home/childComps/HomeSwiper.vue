<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image923" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
    name: 'HomeSwiper',
    props: {
      banner: {
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
    components: {
      Swiper,
      SwiperItem
    },
}
</script>

<style scoped>
</style>
