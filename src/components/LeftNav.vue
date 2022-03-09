<!-- 侧边栏 -->
<template>
    <div >
        <div class="logo-box" v-show="imgShow" @click="$router.replace({ path: '/dashboard' })">
            <img class="logo-img" src="../assets/img/spring-logo.svg" alt="">
        </div>

      <el-menu router class="menu-list">

        <tmeplate v-for="menu in menus" :key="menu.id" >
          <!--        多级菜单-->
          <el-submenu

              v-if="menu.child!=null"
              :index="menu.name">
            <template slot="title" ><i :class="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
<!--            二级菜单项-->
            <el-menu-item-group >
              <el-menu-item v-for="menuItem in menu.child" :key="menuItem.id" :index="menuItem.path" >
                 <span>{{ menuItem.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!--   一级菜单-->
        <el-menu-item :index="menu.path" v-else >
          <i :class="menu.icon" style="font-size: 24px;margin-right: 0;padding: 5px;"></i>
          <span slot="title" class="menu-text">{{ menu.name }}</span>
        </el-menu-item>

        </tmeplate>
      </el-menu>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapsed: false,
                menus: [],
                imgShow: true
            };
        },
        created() {

          //获取当前角色的菜单列表
          capis.tree({
            id: Cookies.get('userInfo')
          }).then(res=>{
            this.menus=res.datas
          })
        },
    };
</script>
<style>

  .menu-list{
    margin-left: 25px;
    background-color: #334157;
  }

    .logo-box {
        height: 20px;
        line-height: 40px;
        background-color: #334157;
        color: #9d9d9d;
        font-size: 10px;
        text-align: center;
        padding: 20px 0px;
    }

    .logo-img {
        height: 30px;
    }

</style>
