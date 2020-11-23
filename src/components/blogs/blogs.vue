<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Blog Edit</el-breadcrumb-item>
      <el-breadcrumb-item>Blog List</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="search-row">
      <el-col>
        <el-input
          placeholder="Search in Blogs"
          class="my-input"
          v-model="query">
          <el-button slot="append" icon="el-icon-search" circle></el-button>
        </el-input>
        <el-button type="info" plain>add</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="bloglist"
      style="width: 100%"
      class="blog-list-table">
      <el-table-column
        type="index"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="300">
      </el-table-column>
      <el-table-column
        prop="theme"
        label="Theme"
        width="100">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="Created"
        width="180">
      </el-table-column>
      <el-table-column
        prop="is_active"
        label="Active"
        width="100">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
    export default {
      name: "blogs.vue",
      data(){
        return{
          query: '',
          pagenum: 1,
          pagesize: 2,
          total: 1,
          bloglist: []
        }
      },
      created(){
        this.getBlogList()
      },
      methods:{
        async getBlogList(){
          //需要授权的请求，必须设置请求头
          /*const AUTH_TOKEN = localStorage.getItem('token')
          this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN*/

          //query为搜索中的数据
          /*const res = await this.$http.get(
            'blogs?query=' + this.query +
            '&pagenum=' + this.pagenum +
            '&pagesize=' + this.pagesize)*/
          const res = await this.$http.get('blogs')
          const {data} = res.data
          this.bloglist = data
        }
      }
    }
</script>

<style scoped>
.box-card{
  height: 100%;
}
.my-input>>>input:focus{
  border-color: black;
}
.my-input{
  width: 300px;
}
.search-row{
  margin-top: 20px;
}
.blog-list-table{
  margin-top: 20px;
}
</style>
