<template>
  <div class="index">
    <div class="shadow" v-if="LoginOrRegistration != 'signin'">
      <LoginNav :changeLoginReg="changeLoginReg" />

      <div class="logoAndlogin">
        <div class="LogoAndText">
          <div class="logo">logo</div>
          <div class="text">
            <p class="p1">WELCOME TO GCLTP</p>
            <p class="p2">
              This is the global Chinese language teaching platform Explore now!
            </p>
          </div>
        </div>
        <div class="login" v-if="LoginOrRegistration == 'login'">
          <Login
            :changeLoginReg="changeLoginReg"
            :changeLoginType="changeLoginType"
          />
        </div>
        <div
          v-if="LoginOrRegistration == 'Forget password'"
          class="ForgetPassword"
        >
          <ForgetPassword
            :changeLoginReg="changeLoginReg"
            :ForgetType.sync="loginType"
          />
        </div>
        <div class="list" v-if="!LoginOrRegistration">
          <div
            :class="projectIndex == i ? 'Selectproject' : ''"
            @mousemove="projectMove(i)"
            @mouseout="projectOut"
            v-for="(item, i) in projectList"
            :key="i"
          >

            <div>

              <img
                v-if="projectIndex == i"
                :src="require('../../assets/login/' + item.selectImg + '.png')"
                alt=""
              />
              <img
                v-else
                :src="require('../../assets/login/' + item.img + '.png')"
                alt=""
              />
              <p>{{ item.name }}</p>
            </div>
            <p>{{ item.text }}</p>
          </div>
        </div>
        <div class="bottom">
          <div>
            <span> About us </span>
            <span> office: hzmd@160.com </span>
            <span>Tell: 800-820-8820</span>
            <span>site: 123 walton gorgla street town hall,beijing.CH</span>
          </div>
          <div>Copyright © 2010-2021 HugeMind All rights reserved.</div>
        </div>
      </div>
    </div>
    <div v-if="LoginOrRegistration == 'signin'" class="signin">
      <LoginNav2 :changeLoginReg="changeLoginReg" />
      <Registration2 />
    </div>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import Login from "@/components/login/login";
import Registration2 from "@/components/login/registration2";

import ForgetPassword from "@/components/login/ForgetPassword";
import LoginNav from "@/components/login/LoginNav";
import LoginNav2 from "@/components/login/LoginNav2";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Login,
    Registration2,
    ForgetPassword,
    LoginNav,
    LoginNav2,
  },
  props: {},
  data() {
    //这里存放数据
    return {
      LoginOrRegistration: "", //注册 登录 忘记密码
      loginType: "teacher",
      projectList: [
        {
          name: "Teaching management system",
          img: "project 1-1",
          selectImg: "project 1-1-1",
          text:
            "To help you quickly complete the preparation and arrangement of the course.",
        },
        {
          name: "Textbook management system",
          img: "project 2-2",
          selectImg: "project 2-2-2",
          text:
            "Help you quickly customize vivid, interesting and practical digital textbooks.",
        },
        {
          name: "Teacher training center",
          img: "project 3-3",
          selectImg: "project 3-3-3",
          text:
            "Famous teachers teach, rich curriculum system, fast and solid to help you improve your teaching ability.",
        },
        {
          name: "Learning Center",
          img: "project 4-4",
          selectImg: "project 4-4-4",
          text:
            "Digital textbooks, learning materials and rich courses can be easily found here.",
        },
        {
          name: "Testing Center",
          img: "project 5-5",
          selectImg: "project 5-5-5",
          text:
            "A rich question bank will help you quickly compile practical, accurate and comprehensive test papers.",
        },
        {
          name: "Teacher Center",
          img: "project 6-6",
          selectImg: "project 6-6-6",
          text:
            "Rich teaching resources and precious documents can be viewed online or downloaded.",
        },
      ],
      projectIndex: null,
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    changeLoginReg(value) {
      this.LoginOrRegistration = value;
    },
    changeLoginType(value) {
      this.loginType = value;
    },
    projectMove(index) {
      this.projectIndex = index;
    },
    projectOut() {
      this.projectIndex = null;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //生命周期-创建之前
  beforeCreated() {},
  //生命周期-挂载之前
  beforeMount() {},
  //生命周期-更新之前
  beforUpdate() {},
  //生命周期-更新之后
  updated() {},
  //生命周期-销毁之前
  beforeDestory() {},
  //生命周期-销毁完成
  destoryed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  background: url("../../assets/login/indexBG.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    // padding-top: 65px;
    // top: 0;
    // position: absolute;
    // background: url("../../assets/login/indexBG.png") no-repeat;
    // background-size: 100% 100%;

    .logoAndlogin {
      position: relative;
      // display: flex;
      .login {
        position: absolute;
        top: 0;
        right: 100px;
      }
      .ForgetPassword {
        position: absolute;
        top: 0;
        right: 100px;
      }
    }
    .LogoAndText {
      width: 700px;
      margin-left: 120px;
      margin-top: 58px;
      display: flex;
      .logo {
        width: 136px;
        height: 136px;
        background: #c4c4c4;
        border-radius: 25px;
        color: black;
        text-align: center;
        line-height: 136px;
      }
      .text {
        margin-left: 40px;
        color: white;
        p {
          margin: 0;
        }
        .p1 {
          font-weight: 600;
          font-size: 40px;
        }
        .p2 {
          margin-top: 32px;
          font-size: 20px;
          line-height: 30px;
        }
      }
    }

    .bottom {
      width: 100%;
      position: fixed;
      bottom: 0;
      height: 124px;
      background: #2c2c2c;
      > div {
        text-align: center;
        font-size: 20px;
        color: rgb(180, 179, 179);

        span {
          margin-left: 40px;
        }
      }
      :first-child {
        height: 80px;
        line-height: 80px;
        :first-child {
          color: white;
        }
        :first-child::before {
          content: "|";
          background: white;
          width: 6px;
          height: 20px;
          position: relative;
          right: 5px;
        }
      }
    }
  }
  .signin {
    background: #e5e5e5;
    padding-bottom: 30px;
  }
  .list {
    width: 1300px;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 368px;
      height: 161px;
      background: #ffffff;
      border-radius: 4px;
      margin: 15px 50px 0 0;
      cursor: pointer;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        color: #2c2c2c;
        p {
          width: 250px;
        }
      }
      > p {
        width: 340px;
        margin: 10px auto;
        font-size: 14px;
        color: #666666;
        opacity: 0.7;
        text-align: left;
        line-height: 20px;
      }
    }
    .Selectproject {
      background: #ff9900;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>