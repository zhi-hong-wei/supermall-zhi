<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['流行','新品','精选']"
                @tabClick="tabClick"
                ref="tabControl1" @swiperImgLoad="swiperImgLoad"
                class="tab-control" v-show="tabFixed"/>
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scrollback"
            :pull-up-load="true" @pullUpLoad="loadmore">  <!-- @+事件，“：+事件”动态绑定-->
      <home-swiper :banners="banners"/>
      <Recommend :recommends="recommends"/>
      <Feature/>
      <TabControl :titles="['流行','新品','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"
                  @swiperImgLoad="swiperImgLoad"/>
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isshow"/> <!--.native监听原生组件，组件不可直接监听-->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import HomeSwiper from './childHome/HomeSwiper'
  import Recommend from './childHome/Recommend'
  import Feature from './childHome/Feature'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import { debounce } from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      HomeSwiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isshow: false,
        tabOffsetTop: 578,  //应该为0，但打印不出高度
        tabFixed: false,
        saveY: 0
      }
    },
    computed: {
      /*计算属性显示目前展示内容*/
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {     /*home返回记录状态和位置*/
      this.$refs.scroll.refresh();
      this.$refs.scroll.scroll.scrollTo(0, this.saveY,0);
     /* this.$refs.scroll.refresh();*/
    },
    deactivated() {   /* home离开记录状态和位置*/
      this.saveY = this.$refs.scroll.scroll.y
    },
    created() {
      //请求多个数据，调用方法，就是拆开来写而已
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh);
      //监听item中图片加载完成
      this.$bus.$on('itemImgLoad', () => {    /* $bus原本没有，在main.js中建原型*/
        refresh()
      })
    },
    methods: {
      /***
       *监听事件相关
       */
      tabClick(index) {
        switch (index) {
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      },
      scrollback(position) {
        //判断返回顶部图标是否显示
        this.isshow = (-position.y) > 1000
        //决定tabcontrol吸顶显示
        this.tabFixed = (-position.y) > this.tabOffsetTop
      },
      loadmore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.scroll.finishPullUp()//此方法用于持续加载更多
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*这是浏览器原生滚动使用，better-scroll已规定滚动范围
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
    box-shadow: 0 -3px 3px -1px white;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* height: calc(100% - 93px);
     overflow: hidden;
     margin-top: 44px;*/
  }
</style>
