<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)">{{item}}</div>  <!-- :class导航栏点击颜色改变-->
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavbar",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex=index;   //导航栏点击
        this.$emit('titleClick',index)   //子组件点击方法要发出去
      },
      backClick(){
        this.$router.back()     //详情页返回主页与push对应
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 8px;
  }
</style>
