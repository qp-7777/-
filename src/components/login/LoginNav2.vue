<template>
  <!-- 顶部登录导航 -->
  <div class="LoginNav" :style="{ color: type == 'Live' ? 'black' : 'white' }">
    <div class="logo">
      <!-- <span> logo </span> -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="black"
        active-text-color="#FF9900"
      >
        <el-menu-item index="1">HOME PAGE</el-menu-item>
        <el-menu-item index="2">
          <el-dropdown trigger="click" @command="handleCommand">
            <span
              class="el-dropdown-link"
              :style="{ color: LoginNavIndex == 2 ? '#FF9900' : 'black' }"
            >
              {{ projectName }}
              <!-- SYSTEM -->
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 300px">
              <el-dropdown-item
                v-for="(item, i) in projectList"
                :key="i"
                :command="item.name.toUpperCase()"
              >
                <img
                  style="position: relative; top: 5px"
                  :src="require('../../assets/login/' + item.img + '.png')"
                  alt=""
                />
                <span style="margin-left: 20px">
                  {{ item.name }}
                </span>
              </el-dropdown-item>
              <!-- <el-dropdown-item command="LEARING CENTER">
                Learning Center
              </el-dropdown-item>
              <el-dropdown-item command="TESTING CENTER"
                >Testing Center</el-dropdown-item
              >
              <el-dropdown-item command="TEACHER CENTER"
                >Teacher Center</el-dropdown-item
              > -->
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="userName">
      <div class="seek" v-if="type == 'Live'">
        <el-input style="width: 300px; height: 40px" type="text" />
        <img src="../../assets/login/Group 2149.png" alt="" />
      </div>
      <!-- <div class="headPhoto"></div> -->
      <el-dropdown style="margin-right: 20px" trigger="click">
        <span class="el-dropdown-link" style="color: black">
          <img class="flag" src="../../assets/login/Ellipse 74.png" alt="" />
          English<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="width: 200px">
          <el-dropdown-item>项目1</el-dropdown-item>
          <el-dropdown-item>项目2</el-dropdown-item>
          <el-dropdown-item>项目3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="selectLoginOrRegistration">
        <span @click="cutLoginReg('login')">LOGIN</span>
        <span> | </span>
        <span @click="cutLoginReg('signin')">SIGNIN</span>
      </div>
      <!-- 用户头像和用户名 -->
      <!-- <img
        class="headPhoto"
        src="../../assets/login/image 4.png"
        alt=""
      />
      <span>evelyn</span> -->
      <!-- 消息 铃铛图片 -->
      <div class="message">
        <img src="../../assets/login/Vector.png" alt="" />
        <!-- <span class="redDot"></span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "changeLoginReg"],
  data() {
    return {
      activeIndex: "1",
      LoginNavIndex: "1",
      projectName: "SYSTEM",
      projectList: [
        {
          name: "Teaching management system",
          img: "project 1",
        },
        {
          name: "Textbook management system",
          img: "project 2",
        },
        {
          name: "Teacher training center",
          img: "project 3",
        },
        {
          name: "Learning Center",
          img: "project 4",
        },
        {
          name: "Testing Center",
          img: "project 5",
        },
        {
          name: "Teacher Center",
          img: "project 6",
        },
        {
          name: "Personal Profile",
          img: "project 7",
        },
      ],
    };
  },

  methods: {
    // 切换导航
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.LoginNavIndex = key;
      if (this.$route.name != "Index" && this.LoginNavIndex == "1") {
        this.$router.push("/");
      }
    },
    // 切换项目
    handleCommand(command) {
      this.LoginNavIndex = 2;
      this.projectName = command;
    },
    // 切换登录的注册
    cutLoginReg(value) {
      this.changeLoginReg(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginNav {
  height: 65px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 45px 0 40px;
  z-index: 999;
  background: white;
  .logo {
    display: flex;
    align-items: center;
    .el-menu-demo {
      background: rgba(0, 0, 0, 0);
      // margin-left: 100px;
      li:hover {
        background: none;
      }
      li {
        background: none;
      }
    }
    // 取消组件默认的样式
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
  }
  .userName {
    display: flex;
    align-items: center;
    .seek {
      margin-right: 100px;
      position: relative;
      img {
        left: 10px;
        top: 11px;
        position: absolute;
      }
    }
    .flag {
      position: relative;
      top: 5px;
    }
    .headPhoto {
      width: 50px;
      height: 50px;
      // background: url("../assets/teacherTrain/image 4.png") no-repeat 100% 100%;
      // background-size: 100%;
      border-radius: 50%;
      margin-right: 10px;
    }
    .message {
      position: relative;
      img {
        width: 18px;
        height: 24px;
        margin-left: 30px;
      }
      .redDot {
        width: 6px;
        height: 6px;
        position: absolute;
        display: inline-block;
        background: red;
        border-radius: 50%;
        right: 0;
      }
    }
    .selectLoginOrRegistration {
      display: flex;
      width: 161px;
      height: 32px;
      border: 1px solid black;
      box-sizing: border-box;
      border-radius: 4px;
      justify-content: space-evenly;
      align-items: center;
      color: black;
      > :first-child {
        cursor: pointer;
      }
      > :last-child {
        cursor: pointer;
      }
    }
  }
}
</style>