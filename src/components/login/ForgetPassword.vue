<template>
  <!-- 忘记密码 -->
  <div class="ForgetPassword">
    <div class="title">
      <p>Reset password</p>
    </div>
    <div class="main">
      <div class="ploneEmail">
        <div>
          <img
            v-if="loginType == '手机'"
            class="leftimg"
            src="../../assets/login/Frame 12.png"
            alt=""
          />
          <img
            v-else
            class="leftimg"
            src="../../assets/login/Frame 9.png"
            alt=""
          />
          <input
            v-model="phone_or_email"
            @change="ChangeUsername"
            :class="accountError ? 'inputError' : 'input'"
            :placeholder="loginType == '手机' ? 'Phone number' : 'email'"
          />
          <!-- <img
            @click="showLoginType"
            class="rightimg"
            src="../../assets/login/Frame 3.png"
            alt=""
          /> -->
          <div class="selectLoginType" v-show="ShowloginType">
            <div @click="selectLoginType('邮箱')">
              <img src="../../assets/login/Frame 10.png" alt="" />
              <span> EMAIL </span>
            </div>
            <div @click="selectLoginType('手机')">
              <img src="../../assets/login/Frame 2.png" alt="" />
              <span> PHONE </span>
            </div>
          </div>
        </div>
        <div class="Verification">
          <img class="leftimg" src="../../assets/login/Frame 6.png" alt="" />
          <input
            @input="verification_codeChange"
            v-model="verification_code"
            style="width: 202px"
            class="input"
            type="text"
            maxlength="6"
          />
          <button v-if="VerificationCodeShow" class="waitTime">
            {{ time + "s" }}
          </button>
          <button v-else @click="getVerificationCode" class="getVerification">
            GET
          </button>
        </div>
      </div>
      <div class="tomima">
        <div>
          <img class="leftimg" src="../../assets/login/Frame 4.png" alt="" />
          <input
            :type="parsswordType"
            :class="passwordError ? 'inputError' : 'input'"
            placeholder="Password"
            @change="changeParssword"
            v-model="password"
          />
          <img
            v-show="parsswordType == 'password'"
            @click="lookParssowrd(1)"
            class="rightimg"
            src="../../assets/login/Frame 7.png"
            alt=""
          />
          <img
            v-show="parsswordType == 'text'"
            @click="lookParssowrd(1)"
            class="rightimg"
            src="../../assets/login/Frame 8.png"
            alt=""
          />
          <p :class="passwordError ? 'textRed' : ''">
            Please enter 8-12 digits of uppercase and lowercase letters,
            numbers, and combinations.
          </p>
        </div>
        <div>
          <img class="leftimg" src="../../assets/login/Frame 4.png" alt="" />
          <input
            :type="twoPasswordType"
            :class="passwordErrorTwo ? 'inputError' : 'input'"
            placeholder="Password again"
            v-model="towpassword"
            @change="Changetowpassword"
          />
          <img
            v-show="twoPasswordType == 'password'"
            @click="lookParssowrd(2)"
            class="rightimg"
            src="../../assets/login/Frame 7.png"
            alt=""
          />
          <img
            v-show="twoPasswordType == 'text'"
            @click="lookParssowrd(2)"
            class="rightimg"
            src="../../assets/login/Frame 8.png"
            alt=""
          />
          <p :class="passwordErrorTwo ? 'textRed' : ''">
            Please enter the password again. The two entries must be the same.
          </p>
        </div>
      </div>
      <!-- 验证 -->
      <div class="btnLogin">
        <img v-if="isLogin" src="../../assets/login/Ellipse 87.png" alt="" />
        <p @click="gotoLogin" v-else>VERIFY</p>
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
  props: ["ForgetType", "changeLoginReg"],
  data() {
    //这里存放数据
    return {
      ShowloginType: false, //显示登录方式
      loginType: "邮箱",
      VerificationCodeShow: false, //是否已经获取了验证码
      isLogin: false, //是否点击登录
      accountError: false, //账号是否错误
      EmailCorrect: false, //邮箱格式是否正确
      shadow: false, //登录过程中的遮盖层
      phone_or_email: "", // 邮箱或者手机号
      time: 60, //获取验证码的时间
      verification_code: null,
      parsswordType: "password",
      twoPasswordType: "password",
      password: "",
      towpassword: "",
      passwordError: false, //密码错误
      passwordErrorTwo: false, //第二次输入的密码错误
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    // 显示选择登录方式
    showLoginType() {
      this.ShowloginType = !this.ShowloginType;
    },
    //选择邮箱验证和手机验证
    selectLoginType(type) {
      if (this.loginType != type) {
        this.loginType = type;
      }
      this.ShowloginType = false;
    },
    // 账号的验证
    ChangeUsername() {
      if (this.phone_or_email) {
        if (this.loginType == "邮箱") {
          let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //验证邮箱的正则
          this.EmailCorrect = reg.test(this.phone_or_email);
          if (!this.EmailCorrect) {
            this.accountError = true;
            this.$message.error("The mailbox format is incorrect");
          } else {
            this.accountError = false;
          }
        } else {
          let reg = /^1[3|4|5|7|8][0-9]{9}$/;
          this.EmailCorrect = reg.test(this.phone_or_email);
          if (!this.EmailCorrect) {
            this.accountError = true;
            this.$message.error("The phone number is incorrect");
          } else {
            this.accountError = false;
          }
        }
      }
    },
    // 获取验证码
    getVerificationCode() {
      let this_ = this;
      let timer;
      if (this_.phone_or_email) {
        this_.VerificationCodeShow = true;
        timer = setInterval(() => {
          this_.time--;
          if (this_.time == 0) {
            this_.VerificationCodeShow = false;
            clearInterval(timer);
            timer = null;
            this_.time = 60;
          }
        }, 1000);
        let MethodName = "user_manager-SendVerificationCode";
        let data = {
          verification_type: this.loginType == "邮箱" ? "EMAIL" : "SMS",
          phone_or_email: this_.phone_or_email,
        };
        getLogin(MethodName, data).then((res) => {
          console.log(res);
        });
      } else {
        this_.$message.warning(
          "Please input email or mobile phone number first"
        );
      }
    },
    // 验证码的验证只能输入数字
    verification_codeChange() {
      this.verification_code = this.verification_code.replace(/[^\d]/g, "");
    },
    // 查看密码
    lookParssowrd(number) {
      if (number == 1) {
        if (this.parsswordType == "text") {
          this.parsswordType = "password";
        } else {
          this.parsswordType = "text";
        }
      } else {
        if (this.twoPasswordType == "text") {
          this.twoPasswordType = "password";
        } else {
          this.twoPasswordType = "text";
        }
      }
    },
    // 验证密码
    changeParssword() {
      if (this.password) {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        let result = reg.test(this.password);
        if (result) {
          this.passwordError = false;
        } else {
          this.passwordError = true;
        }
      }
    },
    // 验证第二次密码是否一样
    Changetowpassword() {
      if (this.towpassword) {
        if (this.towpassword != this.password) {
          this.passwordErrorTwo = true;
          return;
        } else {
          this.passwordErrorTwo = false;
        }
      }
    },

    // 注册
    gotoLogin() {
      this.isLogin = true;
      let MethodName = "user_manager-ResetPassword";
      let data = {
        user_type: this.ForgetType.toUpperCase(),
        password: this.password,
        verification_type: this.loginType == "邮箱" ? "EMAIL" : "SMS",
        phone_or_email: this.phone_or_email,
        verification_code: this.verification_code,
      };
      getLogin(MethodName, data)
        .then((res) => {
          this.$message.success("Password changed successfully");
          this.changeLoginReg("login");
          this.isLogin = false;
        })
        .catch((err) => {
          this.isLogin = false;
        });
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
.ForgetPassword {
  width: 820px;
  height: 500px;
  background: #f8f8f8;
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
    .ploneEmail {
      display: flex;
      justify-content: center;
      > div {
        // margin: 24px auto;
        margin: 20px 10px;
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
            text-align: left;
            margin-top: 8px;
            cursor: pointer;
            padding-left: 10px;
            img {
              position: relative;
              top: 5px;
              margin-right: 5px;
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
    }
    .tomima {
      display: flex;
      justify-content: center;
      > div {
        // margin: 24px auto;
        margin: 10px 10px;
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
        p {
          font-size: 14px;
          color: #000000;
          opacity: 0.3;
        }
        .textRed {
          color: red;
          opacity: 1;
        }
      }
    }

    .btnLogin {
      margin: 0 auto;
      margin-top: 90px;
      position: relative;
      width: 693px;
      height: 50px;
      background: #ff9900;
      border-radius: 4px;
      color: white;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      z-index: 2;
      p {
        margin: 0;
        padding: 0;
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