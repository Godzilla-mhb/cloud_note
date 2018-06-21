<template>
    <div class="home-page">
        <div class="sidebar">
            <div class="top">
                <img src="../assets/page.jpg" alt="云笔记" class="logo">
                <span class="title">云笔记</span>
            </div>
            <div class="operate">
                <div class="operate-btn">我的笔记</div>
                <div class="operate-btn">新建笔记</div>
                <div class="operate-btn">保存本地</div>
                <div class="operate-btn">同步到云</div>
            </div>
            <div class="bottom">
                <span class="cur-date">{{currentDate}}</span>
                <span class="cur-day">{{currentWeekDay}}</span>
            </div>
        </div>
        <div class="main-win">
            <div class="article-list" v-if="list.length">
                <li v-for="(item, index) in list" :key="item.id" @click="selectNote(item)">{{item.title}}</li>
            </div>
            <div class="article-content">
                <div class="article-name">
                    <li @click="selectNote(item)" v-for="(item,index) in openNoteList" :class="currentNoteId == item.id ? 'cur-menu' : '' ">{{item.title}}<span class="close" @click="closeNote($event,index,item)">-</span></li>
                </div>
                <textarea class="editor" v-model="noteTxt"></textarea>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{id: 1, title: '新建文本1.txt', content: '123456'}, {id: 2, title: '新建文本2.txt', content: '654321'}], // 笔记全部记录
      openNoteList: [], // 记录打开的文档列表
      currentNoteId: '', // 当前打开的文档id
      noteTxt: '' // 文档内容
    }
  },
  methods: {
    // 选中文本
    selectNote (data) {
      // 若无则插入,重复不做处理
      var match = this.openNoteList.filter(it => {
        return it.id === data.id
      })
      if (!match.length) {
        this.openNoteList.push(data)
      }
      this.noteTxt = data.content
      this.currentNoteId = data.id
    },
    // 关闭打开的文档
    closeNote (e, index, data) {
      e.stopPropagation() // 阻止冒泡
      this.openNoteList.splice(index, 1)
      if (data.id == this.currentNoteId) { // 关闭的是选中的文档
        this.noteTxt = ''
      }
    }
  },
  computed: {
    currentDate: function () {
      var time = new Date()
      return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
    },
    currentWeekDay: function () {
      var day = new Date().getDay()
      var str = ''
      switch (day) {
        case 0:
          str = '星期日'
          break
        case 1:
          str = '星期一'
          break
        case 2:
          str = '星期二'
          break
        case 3:
          str = '星期三'
          break
        case 4:
          str = '星期四'
          break
        case 5:
          str = '星期五'
          break
        case 6:
          str = '星期六'
          break
      }
      return str
    }
  }
}
</script>

<style lang="less">
.cur-menu{
    background:slateblue!important;
}
li{
    list-style: none;
    font-size:14px;
    cursor: pointer;
}
@media screen and (min-width: 800px) {
    .home-page{
        height: 100%;
        .sidebar{
            width: 400px;
            height: 100%;
            float: left;
            background: #fff;
            .top{
                display: flex;
                align-items: center;
                .logo{
                    width: 120px;
                    height: 120px;
                }
                .title{
                    color:steelblue;
                    font-size:36px;
                }
            }
            .operate{
                position: fixed;
                bottom: 80px;
                width: 400px;
                .operate-btn{
                    width: 240px;
                    text-align: center;
                    border: 2px solid #eee;
                    border-radius: 8px;
                    background: green;
                    color: #fff;
                    font-size: 28px;
                    padding: 10px 0;
                    cursor: pointer;
                    margin: 0 auto;
                }
            }
            .bottom{
                position: fixed;
                bottom: 20px;
                width: 400px;
                text-align: center;
                .cur-date{
                    color:#666;
                    font-size: 28px;
                }
                .cur-day{
                    color:#333;
                    font-size: 32px;
                }
            }
        }
        .main-win{
            margin-left: 400px;
            height: 100%;
            background: #000;
            display: flex;
            .editor{
                height: calc(100% - 40px);
                overflow-y: scroll;
            }
            .article-list{
                flex-basis: 200px;
                background: pink;
                li{
                    list-style: none;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    padding: 4px;
                    &:hover{
                        background: blue;
                    }
                }
            }
            .article-content{
                flex:1;
                .article-name{
                    background: #252526;
                    height: 40px;
                    color:#fff;
                    li{
                        display: inline-block;
                        width: 100px;
                        position: relative;
                        margin: 5px;
                    }
                    .close{
                        position: absolute;
                        display: inline-block;
                        width: 10px;
                        text-align: center;
                        line-height: 8px;
                        height: 10px;
                        background: red;
                        top: -5px;
                        right: -3px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }
                .editor{
                    background: #1e1e1e;
                }
            }
            .editor{
                    height: calc(100% - 30px);
                    overflow-y: scroll;
                    resize:none;
                    width: calc(100% - 5px);
                    background: #ccc;
            }
        }
    }    
}

@media screen and (max-width: 800px) {
    .home-page{
        height: 100%;
        .sidebar{
            width: 200px;
            height: 100%;
            float: left;
            background: #fff;
            .top{
                display: flex;
                align-items: center;
                .logo{
                    width: 60px;
                    height: 60px;
                }
                .title{
                    color:steelblue;
                    font-size:18px;
                }
            }
            .operate{
                position: fixed;
                bottom: 50px;
                width: 200px;
                .operate-btn{
                    width: 120px;
                    text-align: center;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    background: green;
                    color: #fff;
                    font-size: 14px;
                    padding: 5px 0;
                    cursor: pointer;
                    margin: 0 auto;
                }
            }
            .bottom{
                position: fixed;
                bottom: 10px;
                width: 200px;
                text-align: center;
                .cur-date{
                    color:#666;
                    font-size: 14px;
                }
                .cur-day{
                    color:#333;
                    font-size: 16px;
                }
            }
        }
        .main-win{
            margin-left: 200px;
            height: 100%;
            background: #000;
            display: flex;
            .article-list{
                flex-basis: 100px;
                background: pink;
                li{
                    list-style: none;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    padding: 4px;
                    &:hover{
                        background: blue;
                        color:#fff;
                    }
                }
            }
            .article-content{
                flex: 1;
                .article-name{
                    background: #252526;
                    height: 30px;
                    color:#fff;
                    li{
                        display: inline-block;
                        width: 100px;
                        position: relative;
                        margin: 5px;
                    }
                    .close{
                        position: absolute;
                        display: inline-block;
                        width: 10px;
                        text-align: center;
                        line-height: 8px;
                        height: 10px;
                        background: red;
                        top: -5px;
                        right: -3px;
                        border-radius: 50%;
                        cursor: pointer;                        
                    }
                }
                .editor{
                    height: calc(100% - 36px);
                    overflow-y: scroll;
                    resize:none;
                    width: calc(100% - 2px);
                    background: #1e1e1e;
                    padding: 0;
                    border:none;
                    margin:0;
                    color:#809a80;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                }
            }
        }
    }    
}

</style>

