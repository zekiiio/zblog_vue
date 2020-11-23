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
        label="Title">
      </el-table-column>
      <el-table-column
        prop="theme"
        label="Theme"
        width="100">
      </el-table-column>
      <el-table-column
        label="Created"
        width="150">
        <!--如果单元格内显示的内容不是字符串(文本)，
        需要给被显示的内容外层包裹一个template-->
        <!--slot-scope会自动寻找最近的外层标签绑定的数据，
        即使赋值abc也会寻找到bloglist-->
        <template slot-scope="bloglist">
          <!--template内部要使用数据，设置slot-scope属性
          属性值是要用数据的数据源,即el-table绑定的bloglist
          但bloglist是一个数组，bloglist.row指的是数组中每个对象-->
          {{bloglist.row.create_time | fmtdate}}
          <!--el-table-column中prop的值无法传给内部的template，
          因此使用上述方法，可删除prop-->
        </template>
      </el-table-column>
      <el-table-column
        label="Active"
        width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_active"
            active-color="lightblue"
            inactive-color="gray">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template>
          <el-row>
            <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

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
          total: 3,
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
          this.$http.defau,lts.headers.common['Authorization'] = AUTH_TOKEN*/
          var res
          //搜索+分页
          if(this.query===''){
            res = await this.$http.get(`blogs?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          }else{
            res = await this.$http.get(
              `blogs?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          }
          //获取所有
          /*const res = await this.$http.get('blogs')*/

          const {
            code,
            data: { total, list }
          } = res.data
          if(code === 20000){
            this.bloglist = list
            this.total = total
          }
        },
        handleSizeChange(val) {
          this.pagesize = val
          this.getBlogList()
        },
        handleCurrentChange(val) {
          this.pagenum = val
          this.getBlogList()
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
