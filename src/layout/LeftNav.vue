<!-- 侧边栏 -->
<template>
    <div >
        <div class="logo-box" v-show="imgShow" >
           <h1>{{systemName}}管理系统</h1>
        </div>

      <el-menu  :default-active="activeMenu" router class="menu-list"  background-color="#334157" text-color="#ffffff">

        <tmeplate v-for="menu in menus" :key="menu.menuId" >
          <!--        多级菜单-->
          <el-submenu

              v-if="menu.children!=null"
              :index="menu.menuName">
            <template slot="title" >
              <i :class="menu.icon"></i><span>{{menu.menuName}}</span>
            </template>
<!--            二级菜单项-->
            <el-menu-item-group >
              <el-menu-item v-for="menuItem in menu.children" :key="menuItem.id" :index="menuItem.path" >
                <i :class="menuItem.icon"></i><span>{{ menuItem.menuName }}</span>
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
import { getConfigInfo} from "@/api/config";
import { mapGetters} from "vuex";
    export default {
        data() {
            return {
              systemName:'',
                collapsed: false,
                menus: [],
                imgShow: true
            };
        },

      computed: {
        // ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
          const route = this.$route;
          const { meta, path } = route;
          // if set path, the sidebar will highlight the path you set
          if (meta.activeMenu) {
            return meta.activeMenu;
          }
          return path;
        },

      },

        created() {

          tree({id: Cookies.get('userInfo')}).then(
              response=>{
                this.menus=response.datas
              }
          )
          getConfigInfo().then(res=>{
            this.systemName=res.datas.systemName
          })
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
