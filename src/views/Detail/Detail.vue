<template>
  <div class="detail">
    <DetailNavbar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">    <!--应用滚动要设置高度--><!--probe和@scroll滚动到哪对应图标显示-->
      <DetailSwiper :top-images="topImages"/>   <!--传属性时尽量不要驼峰，用-   -->
      <DetailBaseInfo :goods="goods"/>
      <DetailComment :comment="comment" ref="comment"/>
      <DetailShopInfo :shop="shop"/>
      <DetailParamInfo :param-info="paramInfo" ref="param"/>
      <DetailGoodsInfo :detail-info="detailInfo"
                       @imageLoad="imageLoad"/>  <!--监听图片加载完毕-->
      <GoodsList :goods="recommend" ref="recommend"/>  <!--前者引用props,后者引用data里面储存数据-->
    </Scroll>
    <DetailBottom @addCart="addCart"/>
    <BackTop @click.native="backClick" v-show="isshow"/>
  </div>
</template>

<script>
  import DetailNavbar from './Childcomp/DetailNavbar'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import DetailSwiper from './Childcomp/DetailSwiper'
  import DetailBaseInfo from './Childcomp/DetailBaseInfo'
  import DetailShopInfo from './Childcomp/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './Childcomp/DetailGoodsInfo'
  import DetailParamInfo from './Childcomp/DetailParamInfo'
  import DetailComment from './Childcomp/DetailComment'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottom from './Childcomp/DetailBottom'
  import {debounce} from "common/utils";
  import {backTopMixin} from 'common/mixin'

  export default {
    name: "Detail",
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottom
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comment: {},
        recommend: [],
        detailY: [],
        getDetailY: null,
        cIndex: 0
      }
    },
    created() {
      //1.保存iid
      this.iid = this.$route.params.iid
      //2.请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //2.1获取轮播图数据
        this.topImages = data.itemInfo.topImages
        //2.2获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)  //多组数据一个对象
        //2.3商铺信息
        this.shop = new Shop(data.shopInfo)
        //2.4商品详情展示
        this.detailInfo = data.detailInfo;
        //2.5参数展示
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //2.6评论展示
        if (data.rate.cRate !== 0) {
          this.comment = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommend = res.data.list
      })

      /*滚动内容显示显示对应标题，有bug*/
      this.getDetailY = debounce(() => {
        this.detailY = [];
        this.detailY.push(0);
        this.detailY.push(this.$refs.param.$el.offsetTop);
        this.detailY.push(this.$refs.comment.$el.offsetTop);
        this.detailY.push(this.$refs.recommend.$el.offsetTop);
        this.detailY.push(Number.MAX_VALUE)
      }, 100);
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getDetailY()
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.detailY[index] + 44, 500)
      },

      /*滚动内容显示显示对应标题，有bug*/
      contentScroll(position) {
        const positionY = -position.y
        let length = this.detailY.length
        for (let i = 0; i < length - 1; i++) {
          if (this.cIndex !== i &&
            ((positionY >= this.detailY[i] && positionY < this.detailY[i + 1]))) {
            this.cIndex = i;
            this.$refs.nav.currentIndex = this.cIndex
          }
        }
        this.isshow = (-position.y) > 1000
      },
      addCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.newPrice = this.newPrice;

        //将商品添加购物车里 vuex
        /*this.$store.commit('addCart',product)  commit用于mutations中调用*/
        this.$store.dispatch('addCart', product).then(res => {   /*dispatch用于actions中调用，会返回promise*/
          this.$toast.show(res, 1500)
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
    box-shadow: 1px -3px 3px -1px #fff;
  }
</style>
