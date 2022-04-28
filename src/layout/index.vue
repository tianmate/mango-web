<template>
  <!--  整个布局-->
  <el-container class="index-container">
    <!--    左侧菜单栏-->
    <el-aside class="aside" width="200px">
      <left-nav></left-nav>
    </el-aside>

    <!--  内容区-->
    <el-container class="main-container">
      <!--   内容区顶部-->
      <el-header class="header">
        <top-nav></top-nav>
      </el-header>

      <!--  内容区中间部分-->
      <el-main class="main">

        <!--   数据区-->
        <transition name="fade">
          <router-view ></router-view>
        </transition>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import LeftNav from '../layout/LeftNav';
import TopNav from '../layout/TopNav';
export default {
name: "index",

  components: {
    LeftNav,
    TopNav,
  },
}
</script>

<style scoped>
.index-container {
  width: 100%;
  height: 100vh;
}

.aside {
  /*width: 64px !important;*/
  height: 100%;
  background-color: #334157;
  margin: 0px;
  width: 200px;
}

.header{
  /*background-color: #f0f0f0;*/

  box-shadow:  2px 2px 5px grey;
}
.main {
  padding: 0px;
  border-left: 2px solid #333;

}
.main {
  padding: 20px;
}

</style>