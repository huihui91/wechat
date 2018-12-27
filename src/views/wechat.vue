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
          <div class="message-box" v-show="item.name == doneUser.name ">
            <div class="my message">
              <img class="avatar" :src="userAvatar" alt="" />
              <div class="content">
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">{{item.value}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 别人的消息 -->
          <div class="message-box" v-show="item.name != userName">
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
     this.socket.emit('chatMessage',this.textValue);
     this.textValue='';
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
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
body {
  height: 100%;
}

body {
  background: url('../assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
}
.container {
  max-width: 1000px;
  min-width: 800px;
  height: 100%;
  margin: 0 auto;
  background-color: pink;
}

.user-list {
  width: 280px;
  height: 100%;
  float: left;
  position: relative;
  background-color: #2e3238;
}

.box {
  overflow: hidden;
  height: 100%;
  background-color: #eee;
  position: relative;
}

.box-hd {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 30px;
}

.box-hd h3 {
  font-size: 18px;
  font-weight: 400;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  z-index: 999;
  box-sizing: border-box;
}

.message-box {
  overflow: hidden;
}

.box-bd {
  position: absolute;
  width: 100%;
  bottom: 180px;
  top: 51px;
  overflow-y: auto;
  overflow-x: hidden;
}

.system {
  overflow: hidden;
}
.message_system {
  text-align: center;
  margin: 10px auto;
  max-width: 50%;
}

.message_system .content {
  display: inline-block;
  font-size: 12px;
  padding: 1px 18px;
  color: #b2b2b2;
  border-radius: 2px;
}

.other {
  margin-bottom: 16px;
  float: left;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}

.my {
  margin-bottom: 16px;
  float: right;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
}

.my.message .avatar {
  float: right;
}

.message .content {
  overflow: hidden;
}

.message .content .nickname {
  font-weight: 400;
  padding-left: 10px;
  font-size: 12px;
  height: 22px;
  line-height: 24px;
  color: #4f4f4f;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
}

.my.message .bubble {
  background-color: #b2e281;
}
.message .bubble {
  max-width: 500px;
  min-height: 1em;
  display: inline-block;
  vertical-align: top;
  position: relative;
  text-align: left;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 10px;
  background-color: #fff;
}

.message .bubble img {
  display: inline-block;
  cursor: pointer;
  max-width: 350px;
  max-height: 240px;
}

.other .bubble:before {
  position: absolute;
  top: 14px;
  left: -10px;
  border: 6px solid transparent;
  content: ' ';
  border-right-color: #fff;
  border-right-width: 4px;
}

.my .bubble:before {
  position: absolute;
  top: 14px;
  right: -10px;
  border: 6px solid transparent;
  content: ' ';
  border-left-color: #b2e281;
  border-left-width: 4px;
}

.bubble_cont {
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
  padding: 9px 13px;
}

.box-ft {
  border-top: 1px solid #ccc;
  position: absolute;
  height: 180px;
  bottom: 0;
  right: 0;
  left: 0;
}

.box-ft .toolbar {
  height: 30px;
  padding: 5px 20px;
}

.box-ft .toolbar .face {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('../assets/images/wechat-sprit.png') no-repeat -404px -398px;
}

.box-ft .toolbar .screen-cut {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('../assets/images/wechat-sprit.png') no-repeat -30px -432px;
}

.box-ft .toolbar .file label {
  opacity: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  background: rgb(255, 255, 255);
}

.box-ft .toolbar .file {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url('../assets/images/wechat-sprit.png') no-repeat -120px -432px;
}

.box-ft .content {
  height: 90px;
  overflow-x: hidden;
  padding: 0px 20px;
}

.box-ft .content .text {
  resize: none;
  border: none;
  outline: none;
  width: 100%;
  height: 84px;
  font-size: 16px;
  background-color: #eee;
}

.box-ft .action {
  text-align: right;
  margin-top: 5px;
  padding-right: 20px;
}

.box-ft .action .desc {
  color: #888;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 7px;
}

.btn-send {
  display: inline-block;
  border: 1px solid #c1c1c1;
  text-decoration: none;
  background-color: #fff;
  color: #222;
  border-radius: 4px;
  padding: 3px 30px;
  font-size: 14px;
}

.btn-send:hover {
  background-color: #d8d8d8;
}

.header {
  padding: 18px;
  position: relative;
}

.header .avatar {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  padding-right: 10.625px;
}

.header .avatar .img {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  display: block;
  cursor: pointer;
}

.header .info {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  width: 2000px;
}

.header .info h3 {
  display: inline-block;
  font-weight: 400;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: #fff;
  font-size: 18px;
  vertical-align: top;
  line-height: 31px;
  text-decoration: none;
}

.title {
  padding: 13px 18px 11px;
  border-bottom: 1px solid #24272c;
  border-top: 1px solid #24272c;
  color: #fff;
}

.title h3 {
  font-weight: 400;
  font-size: 18px;
}

.user {
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  position: relative;
}

.user .avatar {
  float: left;
  margin-right: 10px;
  position: relative;
}

.user .avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
}

.user .name {
  color: #fff;
  overflow: hidden;
  line-height: 36px;
}

.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 380px;
  height: 380px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: #999 0 2px 10px;
}

.login_box h3 {
  text-align: center;
  color: #333;
  font-size: 24px;
  font-weight: 400;
  line-height: 100px;
}

.login_box input {
  width: 300px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  padding: 0;
  display: block;
  outline: none;
  margin-bottom: 5px;
}

.weui-btn {
  position: relative;
  display: block;
  width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  line-height: 2.55555556;
  border-radius: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  background-color: #1aad19;
  border: none;
  cursor: pointer;
  margin-top: 5px;
}

.login_box ul {
  overflow: hidden;
  width: 280px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 0 10px;
}

.login_box li {
  float: left;
  width: 44px;
  height: 44px;
  border: 2px solid transparent;
  margin: 0 4px;
  cursor: pointer;
}

.login_box li.now {
  border-color: #1aad19;
}

.login_box img {
  width: 40px;
  height: 40px;
  display: block;
}

.login_box p {
  height: 30px;
  line-height: 30px;
  padding-left: 38px;
}

::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #666;
}


</style>

