<template>
    <div class="tabControl">
      <div v-for="(item,index) in titles" class="tab-control-item"
           :key="item" @click="tabControl(index)">
        <span :class="{active:index === currentIndex}">{{item}}</span> <!--当前选中变红-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
      },
      data(){
          return{
            currentIndex:0
          }
      },
      methods:{
        tabControl(index){
          this.currentIndex=index;
          this.$emit('tabClick', index)  //子组件事件传出去emit
        }
      }
    }
</script>

<style>
  .tabControl{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    border-bottom: 2px solid var(--color-tint);
    color: var(--color-high-text);
  }
</style>
