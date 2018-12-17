<template>
     <div class="container">
      <!-- 用户列表 -->
      <div class="user-list">
        <div class="header">
          <div class="avatar">
            <img class="img" :src="userAvatar" alt="" />
          </div>
          <div class="info"><h3 class="username">{{userName}}</h3></div>
        </div>
        <div class="title"><h3>用户列表</h3></div>
        <ul>
          <li class="user" v-for="(item,index) in userList" :key="index">
            <div class="avatar"><img :src="item.avatar" alt="" /></div>
            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <!-- 聊天主窗口 -->
      <div class="box">
        <!-- 聊天窗口头部 -->
        <div class="box-hd"><h3>聊天室(99)</h3></div>

        <!-- 聊天窗口主体区域 -->
        <div class="box-bd">
          <div v-for="(item,index) in chatList" :key="index">
           <div class="system" v-show="item.type == 'sys'">
            <p class="message_system">
              <span class="content">{{item.value}}</span>
            </p>
          </div>
          <!-- 自己的消息 -->
          <div class="message-box" v-show="item.name == this.doneUser.name ">
            <div class="my message">
              <img class="avatar" :src="this.userAvatar" alt="" />
              <div class="content">
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">{{item.value}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 别人的消息 -->
          <div class="message-box" v-show="item.name != this.userName">
            <div class="other message">
              <img class="avatar" :src="item.avatar" alt="" />
              <div class="content">
                <div class="nickname">{{item.name}}</div>
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">{{item.value}}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- 聊天窗口底部区域 -->
        <div class="box-ft">
          <!-- 工具栏 -->
          <div class="toolbar">
            <a href="javascript:;" title="表情" class="face"></a>
            <a href="javascript:;" title="截屏" class="screen-cut">
            </a>
            <a href="javascript:;" title="图片" class="file">
              <label for="file"></label>
              <input type="file" id="file" style="display: none;">
            </a>
          </div>
          <!-- 内容输入区域 -->
          <div class="content">
            <textarea class="text" v-model="textValue" contenteditable></textarea>
          </div>
          <!-- 发送按钮 -->
          <div class="action">
            <span class="desc">按下Ctrl+Enter发送</span>
            <a class="btn-send" href="javascript:;" @click="sendMessage">发送</a>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as io from 'socket.io-client'
export default {

  name: 'wechat',
  data(){
    return {
      socket:null,
      userName:null,
      userAvatar:null,
      userList:[],
      addUserList:[],
      textValue:null,
      chatList:[]
    }
  },
  created() {
    this.socket=io('http://localhost:3000')
  },
  computed:{
    ...mapGetters(['doneUser'])
  },
  mounted() {
    if(this.doneUser.name){
      this.socket.emit('login',this.doneUser);
      this.loginInfo(),
      this.ioInfo()
    }else{
      console.log('登录失败')
    }
  },
  methods:{
    //监听登录状态
    loginInfo(){
      this.socket.on('loginError',()=>{
        console.log('登录失败')
      })
      this.socket.on('loginSuccess',data=>{
        this.userName=data.name;
        this.userAvatar=data.avatar;
      })
    },
  //接收广播消息
  ioInfo(){
    //添加的用户
    this.socket.on('addUser',data=>{
      this.addUserList.push(data)
    })
    //用户列表
    this.socket.on('userList',data=>{
      this.userList=data;
    })
    //退出的用户
    this.socket.on('delUser',data=>{
      let idx= this.userList.findIndex(item => item ===data.name);
      this.userList.slice(idx,1)
    })
    //广播图片信息
    this.socket.on('receiveImg',data=>{

    })
    //接收广播聊天信息
    this.socket.on('receiveMeaage',data=>{
      this.chatList.push(data)
    })
   },
   //发送聊天信息
   sendMessage(){
     this.socket.emit('chatMessage',this.textValue)
   },
   //发送图片
   sendImg(data){
     this.socket.emit('sendImg',data)
   }
  },
  beforeDestroy() {
    this.socket.emit('disConnect',{name:this.userName,avatar:this.userAvatar})
  },
  
}
</script>
