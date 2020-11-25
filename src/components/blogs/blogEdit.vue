<template>
<el-card>
  <el-form ref="form" :model="blogContent" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="blogContent.title"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="success"
        @click="onSubmit">Confirm</el-button>
      <el-button @click="cancelEdit">Cancel</el-button>
    </el-form-item>
    <mavon-editor
      :subfield="false"
      v-model="blogContent.content"/>
  </el-form>
</el-card>
</template>

<script>
    export default {
      name: "blogEdit.vue",
      data(){
        return{
          blogContent:{
            title:'',
            content:''
          }
        }
      },
      mounted() {
        this.getBlogById()
      },
      methods:{
        async getBlogById(){
          const id = this.$route.params.id
          const res = await this.$http.get(`blogs/blog/${id}`)
          const {code, data} = res.data
          if(code===20000){
            this.blogContent.title = data.title
            this.blogContent.content = data.content
          }
        },
        async onSubmit(){
          const id = this.$route.params.id
          const res = await this.$http.post(`blogs/blog/${id}`,this.blogContent)
          const {code} = res.data
          if(code===20000){
            this.$router.push('/blogs')
          }
        },
        cancelEdit(){
          this.$router.push('/blogs')
        }
      }
    }
</script>

<style scoped>

</style>
