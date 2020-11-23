<template>
  <div class="login-warp">
    <el-form
      class="login-form"
      :model="formData">
      <div class="login-title">Sign to &nbsp&nbsp
        <span class="login-site">Zekiosun.Com</span>
      </div>
      <el-form-item>
        <p class="form-label">Username</p>
        <el-input class="my-input" v-model="formData.username" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="form-label">Password</p>
        <el-input class="my-input" v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-row>
        <el-button class="login-btn" type="success" @click.prevent="handleLogin()">
          <span class="text-sign-in">Sign in</span>
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "login.vue",
      data(){
        return {
          formData: {
            username: '',
            password: ''
          }
        }
      },
      methods:{
        //登录请求
        //异步操作
        /*handleLogin(){
          this.$http.post('login',this.formData)
          .then((res)=>{
            const {data, meta:{msg,status}} = res.data
            if(status === 200) {
              this.$router.push({name:'home'})
              //提示登录成功，参见ElementUi文档Message
              this.$message.success(msg)
            }else {
              //登录不成功
              this.$message.warning(msg)
            }
          })
        }*/
        //使用ES7 async+await新特性
        async handleLogin(){
          const res = await this.$http.post('login',this.formData)
          const {data, message, code} = res.data
          if(code === 20000) {
            //保存token
            localStorage.setItem('token',data.token)
            //跳转home
            this.$router.push({name:'home'})
            //提示登录成功，参见ElementUi文档Message
            this.$message.success(message)
          }else {
            //登录不成功
            this.$message.warning(message)
          }
        }
      }
    }
</script>

<style scoped>
.login-warp {
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-warp .login-form {
  width: 400px;
  background-color: #e1e4e8;
  border-radius: 10px;
  padding: 30px;
}
.login-warp .login-btn {
  width: 100%;
  border-radius: 20px;
}
.form-label{
  font-size: 20px;
  font-weight: normal;
  margin: 5px;
  padding-bottom: 5px;
}
.login-title{
  border-bottom: solid;
  border-bottom-width: thin;
  font-size: 25px;
  margin-bottom: 30px;
  padding-bottom: 5px;
}
.login-site{
  font-size: 30px;
  color: white;
  font-weight: bolder;
}
.text-sign-in{
  font-size: 20px;
}
/*修改el-input的固有样式样式*/
.my-input>>>input{
  border-radius: 20px;
  font-size: 20px;
}
.my-input>>>input:focus{
  border-color: black;
}

</style>
