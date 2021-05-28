<template>
  <!-- 登录 -->
  <div class="login">
    <div class="title">
      <p>Login Account</p>
    </div>
    <!-- 先择老师还是学生 -->
    <div class="teacherAndStudent">
      <div
        @click="selectTS('teacher')"
        :class="TorS == 'teacher' ? 'select' : ''"
      >
        <p>I'm a Teacher</p>
      </div>
      <div
        @click="selectTS('student')"
        :class="TorS == 'teacher' ? '' : 'select'"
      >
        <p>I'm a Student</p>
      </div>
    </div>
    <div class="main">
      <!-- 账号登录 -->
      <template v-if="loginType == '密码'">
        <div>
          <img
            v-if="TorS == 'teacher'"
            class="leftimg"
            src="../../assets/login/Frame 1.png"
            alt=""
          />
          <img
            v-else
            class="leftimg"
            src="../../assets/login/Frame 9.png"
            alt=""
          />
          <input
            :class="accountError ? 'inputError' : 'input'"
            :placeholder="TorS == 'teacher' ? 'Email or phone number' : 'Email'"
            v-model="email_phone"
          />
          <img
            @click="showLoginType"
            class="rightimg"
            src="../../assets/login/Frame 3.png"
            alt=""
          />
          <div class="selectLoginType" v-show="ShowloginType">
            <div @click="selectLoginType('密码')">
              <img src="../../assets/login/Frame 5.png" alt="" />
              Password
            </div>
            <div @click="selectLoginType('验证码')">
              <img src="../../assets/login/Frame 2.png" alt="" />
              CAPTCHA
            </div>
          </div>
        </div>
        <div>
          <img class="leftimg" src="../../assets/login/Frame 4.png" alt="" />
          <input
            :type="parsswordType"
            :class="passwordError ? 'inputError' : 'input'"
            placeholder="Password"
            v-model="password"
          />
          <img
            v-show="parsswordType == 'password'"
            @click="lookParssowrd"
            class="rightimg"
            src="../../assets/login/Frame 7.png"
            alt=""
          />
          <img
            v-show="parsswordType == 'text'"
            @click="lookParssowrd"
            class="rightimg"
            src="../../assets/login/Frame 8.png"
            alt=""
          />
        </div>
      </template>
      <!-- 验证码登录   v-show="loginType == '验证码'"
       -->
      <template v-else>
        <div>
          <img class="leftimg" src="../../assets/login/Frame 12.png" alt="" />
          <input
            :class="accountError ? 'inputError' : 'input'"
            placeholder="Phone number"
          />
          <img
            @click="showLoginType"
            class="rightimg"
            src="../../assets/login/Frame 3.png"
            alt=""
          />
          <div class="selectLoginType" v-show="ShowloginType">
            <div @click="selectLoginType('密码')">
              <img src="../../assets/login/Frame 5.png" alt="" />
              Password
            </div>
            <div @click="selectLoginType('验证码')">
              <img src="../../assets/login/Frame 2.png" alt="" />
              CAPTCHA
            </div>
          </div>
        </div>
        <div class="Verification">
          <img class="leftimg" src="../../assets/login/Frame 6.png" alt="" />
          <input style="width: 202px" class="input" type="text" />
          <button
            @click="getVerificationCode"
            :class="VerificationCodeShow ? 'waitTime' : 'getVerification'"
          >
            {{ VerificationCodeShow ? "59s" : "GET" }}
          </button>
        </div>
      </template>

      <!-- 记住我 忘记密码 -->
      <div class="remeberMeAndForgetparssword">
        <el-checkbox>
          <span style="color: black"> Remember me </span>
        </el-checkbox>
        <p @click="cutLoginReg('Forget password')">Forget password？</p>
      </div>
      <!-- 登录 -->
      <div class="btnLogin">
        <img v-if="isLogin" src="../../assets/login/Ellipse 87.png" alt="" />
        <p @click="gotoLogin" v-else>LOGIN</p>
      </div>
      <!-- 同意协议 -->
      <div class="agreement">
        <el-checkbox v-model="ageeemnt">
          <span style="color: black"> I have read and agreed to the </span>
          <span> user agreement </span>
        </el-checkbox>
      </div>
    </div>
    <div v-show="shadow" class="shadow"></div>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import { getLogin } from "@/api/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["changeLoginReg", "changeLoginType"],
  data() {
    //这里存放数据
    return {
      TorS: "teacher", //老师还是学生
      ShowloginType: false, //显示登录方式
      parsswordType: "password",
      loginType: "密码",
      VerificationCodeShow: false, //是否已经获取了验证码
      isLogin: false, //是否点击登录
      accountError: false, //账号错误
      passwordError: false, //密码错误
      shadow: false, //登录过程中的遮盖层
      ageeemnt: false,
      email_phone: "",
      password: "",
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    //   选择老师或者学生
    selectTS(user_type) {
      this.TorS = user_type;
      this.changeLoginType(this.TorS);
    },
    // 显示选择登录方式
    showLoginType() {
      this.ShowloginType = !this.ShowloginType;
    },
    //选择密码登录和验证码登录
    selectLoginType(type) {
      if (this.loginType != type) {
        this.loginType = type;
      }
      this.ShowloginType = false;
    },
    // 查看密码
    lookParssowrd() {
      if (this.parsswordType == "text") {
        this.parsswordType = "password";
      } else {
        this.parsswordType = "text";
      }
    },
    // 获取验证码
    getVerificationCode() {
      this.VerificationCodeShow = true;
    },
    // 登录
    gotoLogin() {
      let flag = true;
      if (this.loginType == "密码") {
        if (!this.email_phone && !this.password) {
          this.$message.warning("The account password cannot be blank");
          flag = false;
          return;
        }
        if (!this.ageeemnt) {
          this.$message.warning("read and agreed to the user agreement");
          flag = false;
          return;
        }
      }
      if (!flag) {
        return;
      }
      console.log(123456);
      this.isLogin = true;
      let MethodName = "login_control-Login";
      let data = {
        user_type: this.TorS.toUpperCase(),
        user_name: this.email_phone,
        password: this.password,
      };
      getLogin(MethodName, data)
        .then((res) => {
          this.$message.success("login successfully")
          this.changeLoginReg("");
          this.isLogin = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 切换忘记密码
    cutLoginReg(value) {
      this.changeLoginReg(value);
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
/* @import url(); 引入css类 */
.login {
  width: 462px;
  height: 500px;
  background: #ffff;
  border-radius: 8px;
  margin-left: 30px;
  .title {
    height: 100px;
    line-height: 100px;
    p {
      text-align: center;
      font-size: 20px;
      color: #ff9900;
    }
  }
  .teacherAndStudent {
    margin: 0 auto;
    width: 334px;
    height: 40px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      width: 164px;
      height: 36px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .select {
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
  }
  .main {
    > div {
      margin: 24px auto;
      width: 334px;
      position: relative;
      .input {
        width: 334px;
        height: 48px;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        border-radius: 4px;
        outline: none;
        padding-left: 45px;
        padding-right: 45px;
      }
      .inputError {
        width: 334px;
        height: 48px;
        border: 1px solid #ff0000;
        box-sizing: border-box;
        border-radius: 4px;
        outline: none;
        padding-left: 45px;
        padding-right: 45px;
      }
      .input:focus {
        border: 1px solid #ff9900;
      }
      .leftimg {
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .rightimg {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }
      .selectLoginType {
        position: absolute;
        right: 0;
        z-index: 1;
        width: 132px;
        height: 96px;
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        transition: all 2s;

        > div {
          width: 132px;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          margin-top: 8px;
          cursor: pointer;
          img {
            position: relative;
            top: 5px;
          }
        }
        > div:hover {
          background: #f6f6f6;
        }
      }
    }
    .Verification {
      button {
        width: 116px;
        height: 48px;
        margin-left: 16px;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
      }
      .getVerification {
        background: #ff9900;
        border: 1px solid #ff9900;
        color: white;
      }
      .waitTime {
        background: #f0f0f0;
        color: black;
        border: none;
      }
    }
    .remeberMeAndForgetparssword {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
        color: #ff9900;
        cursor: pointer;
      }
    }
    .btnLogin {
      position: relative;
      width: 334px;
      height: 48px;
      background: #ff9900;
      border-radius: 4px;
      color: white;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      z-index: 2;
      p {
        width: 100%;
        height: 100%;
      }
      img {
        vertical-align: middle;
        animation: rotated 1s linear infinite;
      }
    }
    .agreement {
      span {
        color: #ff9900;
      }
    }
  }
  @keyframes rotated {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .shadow {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    opacity: 0.6;
    border-radius: 8px;
  }
}
</style>