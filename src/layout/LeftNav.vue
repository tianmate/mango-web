<!-- 侧边栏 -->
<template>
    <div >
        <div class="logo-box" v-show="imgShow" >
           <h1>芒果管理系统</h1>
        </div>

      <el-menu router class="menu-list"  background-color="#334157" text-color="#ffffff">

        <tmeplate v-for="menu in menus" :key="menu.id" >
          <!--        多级菜单-->
          <el-submenu

              v-if="menu.children!=null"
              :index="menu.name">
            <template slot="title" >
              <i :class="menu.icon"></i><span>{{menu.name}}</span>
            </template>
<!--            二级菜单项-->
            <el-menu-item-group >
              <el-menu-item v-for="menuItem in menu.children" :key="menuItem.id" :index="menuItem.path" >
                <i :class="menuItem.icon"></i><span>{{ menuItem.name }}</span>
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
import { tree } from "@/api/menu";
    export default {
        data() {
            return {
                collapsed: false,
                menus: [],
                imgShow: true
            };
        },
        created() {

          tree({id: Cookies.get('userInfo')}).then(
              response=>{
                this.menus=response.datas
              }
          )
          //获取当前角色的菜单列表
          // capis.tree({
          //   id: Cookies.get('userInfo')
          // }).then(res=>{
          //   this.menus=res.datas
          // })
        },
    };
</script>
<style>

    .logo-box {
        height: 20px;
        line-height: 20px;
        background-color: rgb(51, 65, 87);
        color: #ffffff;
        font-size: 15px;
        text-align: center;
        padding: 20px 0px;
    }



</style>
