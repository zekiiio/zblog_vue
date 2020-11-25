<template>
  <el-card class="box-card">
    <!--1. 目录-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Blog Edit</el-breadcrumb-item>
      <el-breadcrumb-item>Blog List</el-breadcrumb-item>
    </el-breadcrumb>

    <!--2. 搜索栏-->
    <el-row class="search-row">
      <el-col>
        <el-input
          @clear="loadBlogs()"
          clearable
          placeholder="Search in Blogs"
          class="my-input"
          v-model="query">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchBlog()"
            circle></el-button>
        </el-input>
        <!--2.1 添加按钮-->
        <el-button type="info" plain @click="showAddBlog()">add</el-button>
      </el-col>
    </el-row>

    <!--3. 列表-->
    <el-table
      :data="bloglist"
      style="width: 100%"
      class="blog-list-table">
      <!--3.1 基本信息-->
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

      <!--3.2 是否显示-->
      <el-table-column
        label="Active"
        width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_active"
            :active-value="1"
            :inactive-value="0"
            active-color="lightblue"
            inactive-color="gray">
          </el-switch>
        </template>
      </el-table-column>

      <!--3.3 操作按钮-->
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-row>
            <!--编辑网页-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editBlog(scope.row.id)"
              circle></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
            <!--删除数据-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="showDelBlogBox(scope.row.id)"
              circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--4. 分页栏-->
    <div class="pageblock">
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

    <!--5. 对话框-->
    <el-dialog title="Add Blog" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="addForm">
        <el-form-item label="Title" label-width="100px">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Theme" label-width="100px">
          <el-input v-model="addForm.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Author" label-width="100px">
          <el-input v-model="addForm.author" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">Cancel</el-button>
        <el-button type="primary" @click="addBlog()">Confirm</el-button>
      </div>
    </el-dialog>

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
          bloglist: [],
          //添加blog的对话框的属性
          dialogFormVisibleAdd: false,
          //添加blog的表单数据
          addForm: {
            title: '',
            theme: '',
            author: ''
          },
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
            res = await this.$http.get(`blogs?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
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
        },
        searchBlog(){
          this.getBlogList()
        },
        loadBlogs(){
          this.getBlogList()
        },
        showAddBlog(){
          this.dialogFormVisibleAdd = true
        },
        async addBlog(){
          //2.关闭对话框
          this.dialogFormVisibleAdd = false
          const res = await this.$http.post('blogs',this.addForm)
          const {code, message} = res.data
          if(code === 20000){
            //1.提示成功
            this.$message.success(message)
            //3.更新视图
            this.getBlogList()
            //4.清空文本框
            this.addForm = {}
          }else{
            this.$message.warning(message)
          }
        },
        showDelBlogBox(blogId){
          this.$confirm('The Blog will be deleted','Tips',{
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(async ()=>{
            //发送删除请求，传用户id
            const res = await this.$http.delete(`blogs/${blogId}`)
            if(res.data.code===20000){
              this.pagenum = 1
              //更新视图
              this.getBlogList()
              this.$message({
                type: 'success',
                message: res.data.message
              })
            }
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: 'Delete Cancel'
            })
          })
        },
        editBlog(blogId){
          this.$router.push(`blog/${blogId}`)
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
.pageblock{
  margin-top: 20px
}
</style>
