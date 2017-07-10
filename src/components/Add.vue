<!--添加页-->
<template>
  <div>
    <form>
      <div class="form-group">
        <label for="bookName" class="control-label">书名:</label>
        <input type="text" id="bookName" class="form-control" placeholder="请输入书名" autocomplete="off"
               v-model="book.bookName">
      </div>
      <div class="form-group">
        <label for="bookCover" class="control-label">封面:</label>
        <input type="text" id="bookCover" class="form-control" placeholder="请输入封面" autocomplete="off"
               v-model="book.bookCover">
      </div>
      <div class="form-group">
        <label for="bookPrice" class="control-label">书架:</label>
        <input type="text" id="bookPrice" class="form-control" placeholder="请输入价格" autocomplete="off"
               v-model="book.bookPrice">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="add">添加图书</button>
      </div>
    </form>
  </div>
</template>

<script>

  export default {

    data(){
      return {
        book: {//初始化，把内容置为空
          bookName: '',
          bookPrice: '',
          bookCover: '',
        }
      }
    },
  methods:{
    add(){
      this.$http.post('/book',this.book).then(()=>{
          this.$router.push('/list');
      });//把数据传给后台

    }
  }
  }
</script>

<style scoped>

</style>
