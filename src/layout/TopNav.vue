<template>
  <div class="header-wrap">
    <div class="breadcrumb">

      <tags-view  />

    </div>

    <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     <el-avatar >user</el-avatar>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="my">个人中心</el-dropdown-item>
        <el-dropdown-item command="quit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


<!--    <el-button style="height: 70%;" type="primary" size="mini" @click="quit">退出</el-button>-->
  </div>
</template>

<script>
// import { removeToken } from "../utils/token";
import tagsView from './TagsView/index';
export default {
  data() {
    return {
      collapsed: false,
      imgShow: require("../assets/img/show.png"),
      imgHidden: require("../assets/img/sq.png"),
    };
  },
  components: {
    tagsView,
  },
  computed:{
    matchedArr(){
      let temp = [],temps = [];
      this.$route.matched.filter((item,index,self) => {
        // if(item.meta.title){
        //     const title = item.meta.title;
        //     temp.push(title);
        // }
        console.log(item)
        if(item.name){
          const name = item.name;
          temp.push(name);
        }
      });
      temp.filter((item,index,self) => {
        if(!temps.includes(item)){
          temps.push(item);
        }
      })
      return temps;
    }
  },
  methods: {
    // 切换显示
    // toggle(showType) {
    //   this.collapsed = !showType;
    //   this.$EventBus.$emit("toggle", this.collapsed);
    // },
    // // 退出
    // async quit() {
    //   this.$message.success("退出成功！")
    //   this.$router.push({ path: "/" });
    //  },
    handleCommand(command) {
      if (command=='quit'){
        this.$message.success("退出成功！")
        this.$router.push({ path: "/login" });
      }else if (command=='my'){
        this.$router.push({ path: "/user/profile" });
      }

    }
  },
};
</script>
<style scoped>

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  /*background-color: #334157;*/
  align-items: center;
  padding-right: 20px;
}

.button-img {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.breadcrumb{
  margin: 5px 20px;
}
</style>
