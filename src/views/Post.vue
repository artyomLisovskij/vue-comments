<template>
  <div class="post">
    
    <div class="image">
    {{$route.params.id}}
    </div>
    <Comments :id="$route.params.id" />
    
  </div>
</template>

<script>
import Comments from '../components/Comments.vue'
export default {
  name: 'Post',
  data: function() {
    return {
    }
  },
  components: { Comments },
  methods: {
    
  }
}
</script>

<style scoped>
.post{
  width:500px;
  margin:0 auto;
  min-height:200px;
}
.image{
  width:100%;
  background: red;
  height:200px;
}
</style>