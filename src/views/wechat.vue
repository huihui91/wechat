<template>
     <div class="container">
      <!-- 用户列表 -->
      <div class="user-list">
        <div class="header">
          <div class="avatar">
            <img class="img" src="images/avatar2.jpg" alt="" />
          </div>
          <div class="info"><h3 class="username">清流</h3></div>
        </div>
        <div class="title"><h3>用户列表</h3></div>
        <ul>
          <li class="user">
            <div class="avatar"><img src="@/assets/images/avatar.jpg" alt="" /></div>
            <div class="name">刘小骗</div>
          </li>
          <li class="user">
            <div class="avatar"><img src="@/assets/images/avatar2.jpg" alt="" /></div>
            <div class="name">胡清流</div>
          </li>
        </ul>
      </div>
      <!-- 聊天主窗口 -->
      <div class="box">
        <!-- 聊天窗口头部 -->
        <div class="box-hd"><h3>聊天室(99)</h3></div>

        <!-- 聊天窗口主体区域 -->
        <div class="box-bd">
          <div class="system">
            <p class="message_system">
              <span class="content">"往事随风"邀请你和"Boy"加入了群聊</span>
            </p>
          </div>
          <!-- 自己的消息 -->
          <div class="message-box">
            <div class="my message">
              <img class="avatar" src="@/assets/images/avatar2.jpg" alt="" />
              <div class="content">
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">在干嘛</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 别人的消息 -->
          <div class="message-box">
            <div class="other message">
              <img class="avatar" src="@/assets/images/avatar02.jpg" alt="" />
              <div class="content">
                <div class="nickname">小美</div>
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">吃饭</div>
                </div>
              </div>
            </div>
          </div>
          <div class="system">
            <p class="message_system">
              <span class="content">小王离开了聊天室</span>
            </p>
          </div>
          <!-- 自己的消息 -->
          <div class="message-box">
            <div class="my message">
              <img class="avatar" src="@/assets/images/avatar2.jpg" alt="" />
              <div class="content">
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">吃啥</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 别人的消息 -->
          <div class="message-box">
            <div class="other message">
              <img class="avatar" src="@/assets/images/avatar02.jpg" alt="" />
              <div class="content">
                <div class="nickname">小美</div>
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">饭</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 自己的消息 -->
          <div class="message-box">
            <div class="my message">
              <img class="avatar" src="@/assets/images/avatar2.jpg" alt="" />
              <div class="content">
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">哦</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 别人的消息 -->
          <div class="message-box">
            <div class="other message">
              <img class="avatar" src="@/assets/images/avatar02.jpg" alt="" />
              <div class="content">
                <div class="nickname">小美</div>
                <div class="bubble">
                  <!---->
                  <div class="bubble_cont">嗯</div>
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
            <textarea class="text" id="content" contenteditable></textarea>
          </div>
          <!-- 发送按钮 -->
          <div class="action">
            <span class="desc">按下Ctrl+Enter发送</span>
            <a class="btn-send" id="btn-send" href="javascript:;">发送</a>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import * as io from 'socket.io-client'
export default {

  name: 'wechat',
  data(){
    return {
      socket:null
    }
  },
  created() {

  },
  mounted() {
  },
  methods:{
 
  }
}
</script>
