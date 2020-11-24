<template>
<el-card>
  <mavon-editor v-model="content"/>
</el-card>
</template>

<script>
    export default {
      name: "blogEdit.vue",
      data(){
        return{
          title:'',
          theme:'',
          src:'',
          content:''
        }
      },
      mounted() {
        this.getBlogById()
      },
      methods:{
        async getBlogById(){
          const id = this.$route.params.id
          const res = await this.$http.get(`http://localhost:18081/`+`blogs/${id}`)
          const {code, data} = res.data
          if(code===20000){
            this.title = data.title
            this.theme = data.theme
            this.src = data.location
            this.loadContent()
          }
        },
        async loadContent(){
          const res = await this.$http.get(this.src)
          this.content = res.data
        }
      }
    }
</script>

<style scoped>

</style>
