<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                用户名称
                <div class="pull-right">{{ user.username }}</div>
              </li>

              <li class="list-group-item">
                用户昵称
                <div class="pull-right">{{ user.nickName }}</div>
              </li>

              <li class="list-group-item">
               手机号码
                <div class="pull-right">{{ user.tel }}</div>
              </li>

              <li class="list-group-item" >
                所属角色
                <div class="pull-right" v-for="(item,index) in user.roles" :key="index">{{ item.name }}|</div>
              </li>


            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";

const {getUserProfile} = require("@/api/system/user");

export default {
  name: "Profile",
  components: {  userInfo, resetPwd },
  data() {
    return {
      user: {},
      activeTab: "userinfo"
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.datas;
      });
    }
  }
};
</script>
