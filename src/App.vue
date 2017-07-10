<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view><!--让内容在此页面展示-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar';
  export default {
    components: {
      Navbar  //注册一下子组件
    }
  }
</script>

<style>

</style>
