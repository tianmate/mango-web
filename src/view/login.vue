<template>

  <div class="root">
    <div class="container">
      <div class="logo">
        <img class="icon" src="../assets/img/icon.jpg" />
      </div>

      <div class="title">{{systemName}}管理系统</div>

      <div class="inputs" >

        <input type="text" name="email" v-model="username" class="username_input" placeholder="用户名" />

        <input type="password"  v-model="password" name="password" placeholder="密码" />

        <input type="password"  v-model="inputCode" name="password" class="code-input" placeholder="验证码" />

        <div class="login-code"  @click="createImageCode">
          <img :src="code"
               class="login-code-img">
        </div>
        <button type="submit" v-on:click="login()">LOGIN</button>
      </div>

    </div>


    <div class="footer">
      <span>Copyright © 程序员田同学</span>
    </div>

  </div>

</template>

<script>
import { login,createImageCode ,getConfig} from "@/api/login";
export default {

  name: "login",

  data() {
    return {
      systemName:getConfig(),
      username: 'root',
      password: '123456',
      code: '',
      uuid: '',
      inputCode:'',
      info: null
    }

  },

  created() {
    this.createImageCode()
  },
  methods: {
    login: function () {

          const that = this;
      login({
            username: that.username,
            password: that.password,
            code: that.inputCode,
            uuid: that.uuid
          }).then(res => {
            if (res.code === 200) {
              that.$message.success("登录成功");
              that.$router.push({path: "/index"});
              that.$router.push({path: "/index"});
              //保存到cookie
              Cookies.set('accessToken', res.datas.token);
              Cookies.set('userInfo', res.datas.userInfo.id);
              //保存到vuex中
              this.$store.commit(res.datas.userInfo)
            } else {
              that.$message.error(res.msg);
            }
          }).catch(reason => {
            // that.$message.error("登录有误");
            // console.log(reason)
          });



    },
    createImageCode(){
      const that = this;
      createImageCode({}).then(res =>{
        console.log(res.img)
        this.code=res.img
        this.uuid=res.uuid
      })
    }
  }

}
</script>

<style scoped>




.container {
  width: 350px;
  height: 520px;
  background: #ecf0f3;
  padding: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  position: absolute;
  /*居中显示*/
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.logo {
  height: 100px;
  width: 100px;
  background-size: 160px;
  background-position: -30px;
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.icon {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.title {
  margin-top: 20px;
  margin-left: 65px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1da1f2;
  letter-spacing: 1px;
}

/*输入部分*/
.inputs {
  text-align: left;
  margin-top: 30px;
}

label,
input,
button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
  font-size: 16px;
}

label:nth-of-type(2) {
  margin-top: 14px;
}

input {
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  border-radius: 50px;
  height: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

input::placeholder {
  color: gray;
}
.username_input{
  margin-bottom: 10px;
}
button {
  margin-top: 20px;
  background: #1da1f2;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  font-family: sans-serif;
  letter-spacing: 1px;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
}
button:hover {
  box-shadow: none;
}

/*验证码输入框*/
.code-input{
  width: 120px;
  margin: 10px 0px;

}


.login-code{
  position: absolute;
  right: 70px;
  bottom: 150px;
}

/*图片验证码*/
.login-code {
  width: 25%;
  height: 30px;
  float: right;
  margin: 10px 20px;

}
/**
版权信息
 */
.footer{
  position: absolute;
  left: 44%;
  top: 90%;
}
</style>