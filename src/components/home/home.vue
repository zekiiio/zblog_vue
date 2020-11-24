<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="6">
          <p class="my-title">Zekiosun.Com</p>
        </el-col>
        <el-col :span="10">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="lightblue"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <p class="nav-manu-text">Home</p>
            </el-menu-item>
            <el-menu-item index="2">
              <p class="nav-manu-text">Blogs</p>
            </el-menu-item>
            <el-menu-item index="3">
              <p class="nav-manu-text">About</p>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6">
          <el-input
            class="my-input"
            placeholder="Search"
            prefix-icon="el-icon-search"
            v-model="searchData">
          </el-input>
        </el-col>
        <el-col :span="2">
          <a href="#">
            <p class="my-logout" @click="handleSignout()">logout</p>
          </a>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="container">
      <el-aside width="250px">
        <el-menu
          :router="true"
          :unique-opened="true"
          background-color="lightsteelblue"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="submenu-1">Software</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">AutoCad</el-menu-item>
              <el-menu-item index="1-2">Matlab</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="submenu-1">Document</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="submenu-1">Blog Edit</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="blogs">
                <i class="el-icon-folder"></i>
                <span class="submenu-2">Blog List</span>
              </el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "home.vue",
      beforeCreate() {
        const token = localStorage.getItem('token')
        if(!token){
          this.$router.push({name:'login'})
        }
      },
      methods:{
        handleSignout(){
          //清除token
          localStorage.clear()
          //提示
          this.$message.success('Sign Out Successfully')
          //跳转登录页面
          this.$router.push({name:'login'})
        }
      },
      data(){
        return{
          searchData:''
        }
      }
    }
</script>

<style scoped>
.el-header{
  background-color: lightblue;
}
.container{
  height: 100%;
}
.el-main{
  background-color: lightsteelblue;
}
.el-row{
  height: 100%;
}
.el-col{
  height: 100%;
}
.el-menu{
  height: 100%;
}
.el-menu-item{
  height: 100%;
}
.nav-manu-text{
  height: 100%;
  margin-top: 5px;
  font-size: 20px;
}
.my-input>>>input{
  border-radius: 20px;
  font-size: 20px;
  margin-top: 10px;
}
.my-input>>>input:focus{
  border-color: black;
}
.my-input>>>.el-input__prefix{
  margin-top: 7px;
}
.my-title{
  height: 100%;
  margin-top: 15px;
  font-size: 25px;
  color: white;
  font-weight: bold;
}
.my-logout{
  margin-top: 20px;
  margin-left: 25px;
  font-size: 15px;
  color: white;
}
.submenu-1{
  font-size: 17px;
  font-weight: bold;
}
.submenu-2{
  font-size: 15px;
  font-weight: bold;
}
a:hover{
  text-decoration: none;
}
a:link{
  text-decoration: none;
}
a:visited{
  text-decoration: none;
}
</style>
