<template>
  <div class="comments">
    <div class="comment" v-for="(item, index) in comments" :key="index">
      <div class="comment_header">
        <div class="left">
          <a :href="item.user_link">
            <img :src="item.avatar" :alt="item.id" />
          </a>
          <div>
            <a :href="item.user_link" class="name">
              {{item.user_name}}
            </a>
            <div class="time">
              {{item.time}}
            </div>
          </div>
        </div>
        <div class="likes" @mouseover="mouse_over(item.id)" @mouseout="active_comment_like_modal = false">
          <button v-bind:class="[is_liked(item.id, false) ? 'liked' : '']" @click="add_like(item.id, false)">-</button>
          <div>{{ likes_count(item.id) }}</div>
          <button v-bind:class="[is_liked(item.id, true) ? 'liked' : '']" @click="add_like(item.id, true)">+</button>
          <!-- 1) сделать функцию @hover -->
          <!-- 2) сделать элемент который будет отображаться при :hover через css-->
        </div>
        <div class="likes_modal" v-show="active_comment_like_modal === item.id">{{item.likes}}</div>
      </div>
      <div class="comment_content">
        {{item.text}}
      </div> 
    </div>
  </div>
</template>

<style scoped>
.comments{
  border-top:1px solid #333;
}
.comment{
  margin: 5px;
  background: #eee;
  min-height: 40px;
}
.comment_header{
  display: flex;
  justify-content: space-between;
  position: relative;
}
.comment_header .left{
  display: flex;
}
.comment_header .left a img{
  width:30px;
  height:30px;
}
.comment_header .left > div {
  margin-left: 5px;
}
.comment_header .likes{
  display:flex;
  align-items:center;
}
.liked{
  background: yellow;
}

.comment_header .likes_modal{
  position: absolute;
  border:1px solid #333;
  border-radius: 10px;
  padding:10px;
  right:0px;
  width:400px;
  background:#fff;
  z-index:99;
  top:40px;
}
</style>


<script>
export default {
  name: 'Comments',
  props: {
    id: String
  },
  computed: {
    
  },
  methods:{
    mouse_over: function(comment_id) {
      this.active_comment_like_modal = comment_id;
    },
    is_liked: function(comment_id, is_positive) {
      let comment = this.comments.find(item => item.id === comment_id);
      let found_like_from_me = comment.likes.find(item => item.user_id === this.my_user_id);
      if (found_like_from_me) {
        if (found_like_from_me.is_postive === is_positive) {
          return true;
        }
      } 
    },
    add_like: function(comment_id, is_positive) {
      let comment = this.comments.find(item => item.id === comment_id);
      let found_like_from_me = comment.likes.find(item => item.user_id === this.my_user_id);
      if (found_like_from_me) {
        if (found_like_from_me.is_postive === is_positive) {
          comment.likes = comment.likes.filter(function(el){return el !== found_like_from_me});  
        } else {
          found_like_from_me.is_postive = is_positive;
        }
      } else {
        comment.likes.push({
          user_id: this.my_user_id,
          user_link: this.my_user_link,
          user_name: this.my_user_name,
          is_postive: is_positive
        });
        
      }
      
    },
    likes_count: function(comment_id) {
      let comment = this.comments.find(item => item.id === comment_id);
      let result = 0;
      for (let index in comment.likes) {
        if (comment.likes[index].is_postive === true) {
          result = result + 1;
        } else {
          result = result - 1;
        }
      }
      return result;
    }
  },
  data: function() {
    return {
      my_user_id: 26,
      my_user_link: 'http://goog.le/',
      my_user_name: 'HAHAHA',
      active_comment_like_modal: '',
      comments: [
        {
          id: 1,
          text: 'some text',
          avatar: 'https://leonardo.osnova.io/cff1ade4-f348-3790-91a3-8d25f2682dfd/-/scale_crop/108x108/center/',
          time: 'час назад',
          user_id: 123,
          user_name: 'Maxim Medvedev',
          user_link: 'http://ya.ru/',
          likes: [
            {
              user_id: 26,
              user_link: 'http://ya.ru/123',
              user_name: 'Artem qwe',
              is_postive: false
            },
            {
              user_id: 23,
              user_link: 'http://ya.ru/322',
              user_name: 'Muhammad 123',
              is_postive: true
            }
          ]
        },
        {
          id: 2,
          text: 'some text',
          avatar: 'https://leonardo.osnova.io/cff1ade4-f348-3790-91a3-8d25f2682dfd/-/scale_crop/108x108/center/',
          time: 'час назад',
          user_id: 123,
          user_name: 'Maxim Medvedev',
          user_link: 'http://ya.ru/',
          likes: [
            {
              user_id: 25,
              user_link: 'http://ya.ru/23',
              user_name: 'Anton',
              is_postive: false
            },
            {
              user_id: 26,
              user_link: 'http://ya.ru/123',
              user_name: 'Artem qwe',
              is_postive: true
            },
            {
              user_id: 21,
              user_link: 'http://ya.ru/322',
              user_name: 'Muhammad 123',
              is_postive: true
            }
          ]
        },
        {
          id: 3,
          text: 'some text',
          avatar: 'https://leonardo.osnova.io/cff1ade4-f348-3790-91a3-8d25f2682dfd/-/scale_crop/108x108/center/',
          time: 'час назад',
          user_id: 123,
          user_name: 'Maxim Medvedev',
          user_link: 'http://ya.ru/',
          likes: [
            {
              user_id: 2,
              user_link: 'http://ya.ru/23',
              user_name: 'Anton',
              is_postive: false
            },
            {
              user_id: 5,
              user_link: 'http://ya.ru/123',
              user_name: 'Artem qwe',
              is_postive: false
            },
            {
              user_id: 23,
              user_link: 'http://ya.ru/322',
              user_name: 'Muhammad 123',
              is_postive: false
            }
          ]
        }
      ]
    }
  }
}
</script>
