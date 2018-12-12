<template>
   <div class="login_box" >
      <h3>用户登录</h3>
      <p>用户名</p>
      <input type="text" placeholder="请输入用户名" v-model="userName" />
      <p>选择头像</p>
      <ul class="avatar" >
        <li v-for="(item,index) in userAvatarList" :key="index" @click="selectAvatar(item,index)" :class="{'now':active==index}"><img :src="item.path" alt="" /></li>
      </ul>
      <button class="weui-btn" @click="loginBtn">登录</button>
    </div>
</template>
<script>
  export default{
    data(){
      return{
        userAvatarList:[
          {path: require("@/assets/images/avatar01.jpg")},
          {path:require("@/assets/images/avatar02.jpg")},
          {path:require("@/assets/images/avatar03.jpg")},
          {path:require("@/assets/images/avatar04.jpg")},
          {path:require("@/assets/images/avatar05.jpg")},
          {path:require("@/assets/images/avatar06.jpg")},
          {path:require("@/assets/images/avatar07.jpg")},
          {path:require("@/assets/images/avatar08.jpg")},
          {path:require("@/assets/images/avatar09.jpg")},
          {path:require("@/assets/images/avatar10.jpg")}
        ],
        userName:null,
        userAvatar:null,
        active:null
      }
    },
    methods:{
      loginBtn(){
        if(!this.userName||!this.userAvatar) return ;
        this.$router.push('/wechat')
      },
      selectAvatar(item,index){
        this.userAvatar=item.path;
        this.active=index;
      }
    }
  }
</script>

