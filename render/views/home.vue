<template>
  <div class="home-page">
    <div class="sidebar">
      <div class="top">
        <img src="../assets/page.jpg" alt="云笔记" class="logo" />
        <span class="title">笔记系统</span>
      </div>
      <div class="operate">
        <div class="operate-btn" @click="getMyNotes">我的笔记</div>
        <div class="operate-btn" @click="buildNewNote">新建笔记</div>
        <div class="operate-btn" @click="syncToLocal">同步本地</div>
        <div class="operate-btn" @click="saveLocal">保存本地</div>
        <div class="operate-btn" @click="syncToCloud">同步到云</div>
      </div>
      <div class="bottom">
        <span class="cur-date">{{ currentDate }}</span>
        <span class="cur-day">{{ currentWeekDay }}</span>
      </div>
    </div>
    <div class="main-win">
      <div class="article-list" v-if="list" v-show="showMyNotesList">
        <!-- 搜索文档 -->
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchFileConetnt"
          @input="searchFile"
        >
        </el-input>
        <li
          style="display: flex; justify-content: space-between"
          v-for="(item, index) in list"
          :key="index"
          @click="selectNote(item)"
        >
          {{ item.title
          }}<i @click="deleteFile" class="el-icon-delete-solid"></i>
        </li>
      </div>
      <!-- 左边栏笔记列表,不显示标签 -->
      <div class="article-content">
        <div class="article-name">
          <li
            @click="selectNote(item)"
            v-for="(item, index) in openNoteList"
            :class="currentNoteId == item.id ? 'cur-menu' : ''"
          >
            {{ item.title.substring(0, 10) }}
            <span class="close" @click="closeNote($event, index, item)">-</span>
          </li>
        </div>
        <!-- <textarea
          class="editor"
          v-model="noteTxt"
          @click="bodyClick($event)"
          @contextmenu="getContextmenu($event)"
          style="height: 932px"
        ></textarea> -->
        <TinymceEditor :value="formData.content" @changeValue="changeValue" />
        <contextMenu
          v-model="openContextMenu"
          :clientX="clientX"
          :clientY="clientY"
        ></contextMenu>
        <!-- 新增文件 -->
        <Confirm v-model="openNewNoteConfirm" @on-confirm="createNote">
          <div slot="title">输入新文件名</div>
          <div slot="content">
            文件名：
            <input type="text" v-model="titleInput" />
            <!-- 文件标签 -->
            <div slot="title">选择文件所属标签：</div>
            <div
              style="
                display: flex;
                align-items: flex-end;
                flex-direction: column;
              "
            >
              <el-tag
                :key="index"
                v-for="(tag, index) in dynamicTags"
                closable
                :disable-transitions="false"
                @click.native="addType(tag)"
                :style="tag.choice ? 'backgroundColor: red' : ''"
                @close="handleClose(tag)"
              >
                {{ tag.name }}
              </el-tag>
            </div>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ 新标签</el-button
            >
          </div>
        </Confirm>
        <!-- 检索文字弹窗 -->
        <el-dialog
          :visible="searchDialogVisible"
          :show-close="false"
          @close="searchDialogVisible = false"
          style="width: 450px"
          :modal="false"
        >
          <el-input
            width="150"
            v-model="keyword"
            placeholder="请输入搜索关键字"
          ></el-input>
          <div style="display: flex; width: 41px; flex-wrap: wrap">
            <span style="font-size: 11px; word-break: keep-all">找到N处</span>
            <i
              class="el-icon-arrow-down"
              @click="keyword ? switchKeyWord : ''"
            ></i>
            <i
              style="margin-left: 17px"
              class="el-icon-arrow-up"
              @click="keyword ? switchKeyWord : ''"
            ></i>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Confirm from "../components/confirm.vue";
import contextMenu from "../components/context-menu.vue";
import TinymceEditor from "../components/tinymce.vue";
export default {
  data() {
    return {
      openContextMenu: false, // 打开右键列表
      showMyNotesList: false, // 是否展示我的笔记列表
      listAll: [], // 笔记全部记录
      list: [], // 展示的笔记
      openNoteList: [], // 记录打开的文档列表
      currentNoteId: "", // 当前打开的文档id
      noteTxt: "", // 文档内容
      clientX: "",
      clientY: "",
      openNewNoteConfirm: false, // 新建笔记弹窗控制开关
      titleInput: "", // 标题输入
      searchFileConetnt: "", // 搜索文档
      searchDialogVisible: false, // 检索弹窗
      keyword: "", // 检索关键字
      formData: {}, // 富文本内容
      // 新增标签页面
      dynamicTags: [
        { name: "厨艺", choice: false },
        { name: "技术", choice: false },
        { name: "硬盘", choice: false },
        { name: "命令", choice: false },
        { name: "图像剪切", choice: false },
        { name: "书单", choice: false },
        { name: "旅行", choice: false },
      ],
      // 选中标签
      choiceTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  components: {
    Confirm,
    contextMenu,
    TinymceEditor,
  },
  methods: {
    // 为新文档增加标签
    addType(tag) {
      tag.choice = !tag.choice;
      // 选定标签
      // if (this.choiceTags.indexOf(tag.name)) this.choiceTags.push(tag.name);
    },
    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 新增标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 富文本
    changeValue(value) {
      this.formData.content = value;
    },
    // tab按键
    pressAndHoldSpaces(numSpaces, duration) {
      function pressSpace() {
        const event = new KeyboardEvent("keydown", {
          key: " ",
          keyCode: 32,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(event);
      }
      function releaseSpace() {
        const event = new KeyboardEvent("keyup", {
          key: " ",
          keyCode: 32,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(event);
      }
      for (let i = 0; i < numSpaces; i++) {
        setTimeout(pressSpace, i * duration);
        setTimeout(releaseSpace, (i + 1) * duration);
      }
    },
    // 切换检索到的关键字
    switchKeyWord() {},
    // 文档内关键字搜索
    searchKey() {},
    // 搜索文档，自动打印
    searchFile() {
      if (this.searchFileConetnt != null) {
        this.list = this.listAll.filter((item) =>
          item.title.includes(this.searchFileConetnt)
        );
      } else {
        // 若为空则显示所有
        this.list = this.listAll
      }
    },
    // 删除单个文本
    deleteFile() {},
    // 监听画板事件
    bodyClick(e) {
      // 判断是否在菜单内
      var clientX = e.clientX;
      var clientY = e.clientY;
      if (
        clientX < this.clientX ||
        clientX + 100 > this.clientX ||
        clientY < this.clientY ||
        clientY + 100 > this.clientY
      ) {
        // 屏幕外
        this.openContextMenu = false;
      }
    },
    // 右键调起
    getContextmenu(e) {
      console.log("右键", e);
      this.openContextMenu = true;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    },
    // 获取我的笔记
    getMyNotes() {
      this.showMyNotesList = !this.showMyNotesList;
      this.$store.dispatch("getItem", { key: "myNotes" }).then((myNotes) => {
        if (myNotes) {
          this.listAll = JSON.parse(myNotes) || [];
          this.list = JSON.parse(myNotes) || [];
        } else {
          this.$toast.error("暂无笔记");
        }
      });
    },
    // 点击`新建笔记`
    buildNewNote() {
      this.openNewNoteConfirm = true;
    },
    // 新建笔记确定
    createNote() {
      // 获取标签
      let tagName = "";
      this.dynamicTags.forEach((item) => {
        if (item.choice) {
          tagName += item.name;
        }
      });
      console.log("---", tagName);
      if (!this.titleInput) {
        this.$toast.error("文件名不能为空");
        return;
      }
      this.titleInput += "---" + tagName;
      console.log(this.titleInput);
      var id = +new Date();
      var myNotes = this.$store
        .dispatch("getItem", { key: "myNotes" })
        .then((myNotes) => {
          if (myNotes) {
            myNotes = JSON.parse(myNotes);
          } else {
            myNotes = [];
          }
          myNotes.push({
            id: id,
            title: this.titleInput,
            content: "",
            time: new Date(),
          });
          // 打开文档加入
          this.openNoteList.push({
            id: id,
            title: this.titleInput,
            content: "",
            time: new Date(),
          });
          // 文档加入
          this.listAll.push({
            id: id,
            title: this.titleInput,
            content: "",
            time: new Date(),
          });
          this.list.push({
            id: id,
            title: this.titleInput,
            content: "",
            time: new Date(),
          });
          // 将当前文档的id设为新增的这块
          this.currentNoteId = id;
          this.$store.dispatch("setItem", {
            key: "myNotes",
            value: JSON.stringify(myNotes),
          }); // 存储
          this.openNewNoteConfirm = false;
        });
    },
    // 保存本地
    saveLocal() {
      // 当前文档保存
      if (!this.currentNoteId) {
        this.$toast.error("请选择你要保存的文档!");
        return;
      }
      this.$store.dispatch("getItem", { key: "myNotes" }).then((notesList) => {
        notesList = JSON.parse(notesList);
        for (var i = 0; i < notesList.length; i++) {
          if (this.currentNoteId === notesList[i].id) {
            notesList[i].content = this.noteTxt;
            notesList[i].updateTime = new Date();
          }
        }
        this.$store
          .dispatch("setItem", {
            key: "myNotes",
            value: JSON.stringify(notesList),
          })
          .then((res) => {
            this.$toast.success("本地保存成功!!!");
            this.listAll = notesList; // 刷新本地
            this.list = notesList;
          });
      });
    },
    // 同步到云
    syncToCloud() {
      this.$toast.success("你有点骚气");
    },
    // 同步本地
    syncToLocal() {},
    // 切换选中
    selectNote(data) {
      // 若无则插入,重复不做处理
      var match = this.openNoteList.filter((it) => {
        return it.id === data.id;
      });
      if (!match.length) {
        this.openNoteList.push(data);
      }
      this.noteTxt = data.content;
      this.currentNoteId = data.id;
    },
    // 关闭打开的文档
    closeNote(e, index, data) {
      e.stopPropagation(); // 阻止冒泡
      this.openNoteList.splice(index, 1);
      if (data.id === this.currentNoteId) {
        // 关闭的是选中的文档
        this.noteTxt = "";
        this.currentNoteId = "";
      }
    },
    // 监听ctrl + s 保存事件
    keyBoardSave(e) {
      console.log("keyCode", e.keyCode);
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode === 83) {
        this.saveLocal();
      } else if (this.noteTxt.length && ctrlKey && keyCode === 70) {
        // 检索事件
        this.searchDialogVisible = true;
      } else if (this.noteTxt.length && !ctrlKey && e.keyCode === 9) {
        // tab顶格
        // this.pressAndHoldSpaces(5, 100)
      }
    },
  },
  mounted() {
    // document
    //   .querySelector('.editor')
    //   .addEventListener('keydown', this.keyBoardSave, false)
  },
  computed: {
    currentDate: function () {
      var time = new Date();
      return (
        time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate()
      );
    },
    currentWeekDay: function () {
      var day = new Date().getDay();
      var str = "";
      switch (day) {
        case 0:
          str = "星期日";
          break;
        case 1:
          str = "星期一";
          break;
        case 2:
          str = "星期二";
          break;
        case 3:
          str = "星期三";
          break;
        case 4:
          str = "星期四";
          break;
        case 5:
          str = "星期五";
          break;
        case 6:
          str = "星期六";
          break;
      }
      return str;
    },
  },
};
</script>

<style lang="less">
.el-tag + .el-tag {
  cursor: pointer;
  width: 77px;
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.cur-menu {
  background: slateblue !important;
}

li {
  list-style: none;
  font-size: 14px;
  cursor: pointer;
}

@media screen and (min-width: 800px) {
  .home-page {
    height: 100%;
    .sidebar {
      width: 400px;
      height: 98%;
      float: left;
      background: #fff;
      .top {
        display: flex;
        align-items: center;
        .logo {
          width: 120px;
          height: 120px;
        }
        .title {
          color: steelblue;
          font-size: 36px;
        }
      }
      .operate {
        position: fixed;
        bottom: 80px;
        width: 400px;
        .operate-btn {
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
      .bottom {
        position: fixed;
        bottom: 20px;
        width: 400px;
        text-align: center;
        .cur-date {
          color: #666;
          font-size: 28px;
        }
        .cur-day {
          color: #333;
          font-size: 32px;
        }
      }
    }
    .main-win {
      margin-left: 400px;
      height: 98%;
      background: #000;
      display: flex;
      .editor {
        height: calc(100% - 40px);
        overflow-y: scroll;
        tab-size: 4;
      }
      .article-list {
        flex-basis: 200px;
        background: #f5e5e8;
        li {
          list-style: none;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          padding: 4px;
          &:hover {
            background: slateblue;
            color: white;
          }
        }
      }
      .article-content {
        flex: 1;
        .article-name {
          background: #d4bbbb;
          height: 40px;
          color: #fff;
          li {
            display: inline-block;
            width: 100px;
            position: relative;
            margin: 5px;
          }
          .close {
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
        .editor {
          background: white;
          tab-size: 4;
        }
        /deep/ .el-dialog__wrapper {
          position: fixed;
          bottom: 0;
          left: 80%;
          overflow: auto;
          margin: 0;
        }

        /deep/ .el-dialog__header {
          display: none;
        }
        /deep/ .el-dialog__body {
          display: flex;
          align-items: center;
          padding: 5px 5px 5px 5px;
          color: #606266;
          font-size: 11px;
          word-break: break-all;
        }
      }
      .editor {
        height: calc(100% - 30px);
        overflow-y: scroll;
        resize: none;
        width: calc(100% - 5px);
        background: #ccc;
        tab-size: 4;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .home-page {
    height: 100%;
    .sidebar {
      width: 200px;
      height: 98%;
      float: left;
      background: #fff;
      .top {
        display: flex;
        align-items: center;
        .logo {
          width: 60px;
          height: 60px;
        }
        .title {
          color: steelblue;
          font-size: 18px;
        }
      }
      .operate {
        position: fixed;
        bottom: 50px;
        width: 200px;
        .operate-btn {
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
      .bottom {
        position: fixed;
        bottom: 10px;
        width: 200px;
        text-align: center;
        .cur-date {
          color: #666;
          font-size: 14px;
        }
        .cur-day {
          color: #333;
          font-size: 16px;
        }
      }
    }
    .main-win {
      margin-left: 200px;
      height: 98%;
      background: #000;
      display: flex;
      .article-list {
        flex-basis: 100px;
        background: #f5e5e8;
        li {
          list-style: none;
          font-size: 14px;
          color: #666;
          cursor: pointer;
          padding: 4px;
          &:hover {
            background: slateblue;
            color: #fff;
          }
        }
      }
      .article-content {
        /deep/ .el-dialog__wrapper {
          position: fixed;
          bottom: 0;
          left: 80%;
          overflow: auto;
          margin: 0;
        }

        /deep/ .el-dialog__header {
          display: none;
        }
        /deep/ .el-dialog__body {
          display: flex;
          align-items: center;
          padding: 5px 5px 5px 5px;
          color: #606266;
          font-size: 11px;
          word-break: break-all;
        }
        flex: 1;
        .article-name {
          background: #d4bbbb;
          height: 30px;
          color: #fff;
          li {
            display: inline-block;
            width: 100px;
            position: relative;
            margin: 5px;
          }
          .close {
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
        .editor {
          height: calc(100% - 36px);
          overflow-y: scroll;
          resize: none;
          width: calc(100% - 2px);
          background: white;
          padding: 0;
          tab-size: 4;
          border: none;
          margin: 0;
          color: #fff;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
</style>