<template>
  <!-- 输入密码 -->
  <div class="InputPossword">
    <div class="title">
      <button class="back">return</button>
      <p>Set Password</p>
    </div>
    <div class="main">
      <!-- 验证密码 -->
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
          Please enter 8-12 digits of uppercase and lowercase letters, numbers,
          and combinations.
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
      <!-- 登录 -->
      <div class="btnLogin">
        <img v-if="isLogin" src="../../assets/login/Ellipse 87.png" alt="" />
        <p @click="gotoLogin" v-else>DONE</p>
      </div>
    </div>
    <div v-show="shadow" class="shadow"></div>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      parsswordType: "password",
      twoPasswordType: "password",
      password: "",
      towpassword: "",
      isLogin: false, //是否点击登录
      passwordError: false, //密码错误
      passwordErrorTwo: false, //第二次输入的密码错误
      shadow: false, //注册过程中的遮盖层
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
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
    // 登录
    gotoLogin() {
      if (this.towpassword != this.password) {
        this.passwordErrorTwo = true;
        return;
      }
      this.isLogin = true;
      this.shadow = true;
      console.log("登录");
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
.InputPossword {
  width: 462px;
  height: 500px;
  background: #ffff;
  border-radius: 8px;
  margin-left: 30px;
  .title {
    height: 50px;
    line-height: 50px;
    position: relative;
    p {
      text-align: center;
      font-size: 20px;
      color: #ff9900;
    }
    .back {
      position: absolute;
      background: none;
      border: none;
      cursor: pointer;
      left: 60px;
      top: 15px;
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
      > p {
        font-size: 14px;
        color: #000000;
        opacity: 0.3;
      }
      .textRed {
        color: red;
        opacity: 1;
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
        color: white;
        opacity: 1;
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