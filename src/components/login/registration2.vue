<template>
  <div class="registration2">
    <div class="title">
      <p class="p1">Register an account</p>
      <p class="p2">User information</p>
    </div>
    <div class="form" v-loading="loading">
      <!-- 
        :show-message="false"
         -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        :hide-required-asterisk="true"
        :show-message="false"
      >
        <el-form-item prop="Username">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 15.png" alt="" />
            <span> Username </span>
          </span>
          <el-input
            placeholder="Please enter"
            v-model="ruleForm.Username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="Realname">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 16.png" alt="" />
            <span> Realname </span>
          </span>
          <el-input
            placeholder="Please enter your real name"
            v-model="ruleForm.Realname"
          ></el-input>
        </el-form-item>
        <el-form-item prop="FromWhere">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 17.png" alt="" />
            <span> From where </span>
          </span>
          <el-select
            v-model="ruleForm.FromWhere"
            placeholder="Select country and region"
          >
            <!-- <el-option></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="org_id">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 18.png" alt="" />
            <span> Mechanism </span>
          </span>
          <el-select
            v-model="ruleForm.org_id"
            placeholder="Selection mechanism"
          >
            <el-option
              v-for="item in institutionList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <hr />
        <div class="title2">Registration information</div>
        <el-form-item prop="user_type">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 19.png" alt="" />
            <span> identity </span>
          </span>
          <el-radio-group style="width: 334px" v-model="ruleForm.user_type">
            <el-radio label="TEACHER">
              <span style="color: black"> Teacher </span>
            </el-radio>
            <el-radio label="STUDENT">
              <span style="color: black"> Student </span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="email">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 10.png" alt="" />
            <span> Email </span>
          </span>
          <el-input
            @change="ChangeEmail"
            v-model="ruleForm.email"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item prop="verification_code">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 20.png" alt="" />
            <span> CAPTCHA </span>
          </span>
          <el-input
            style="width: 202px"
            v-model="ruleForm.verification_code"
            placeholder="CAPTCHA"
            @input="verification_codeChange"
            maxlength="6"
          />
          <button v-if="VerificationCodeShow" class="waitTime">
            {{ time + "s" }}
          </button>
          <button
            type="button"
            v-else
            @click.prevent="getVerificationCode"
            class="getVerification"
          >
            GET
          </button>
        </el-form-item>
        <el-form-item prop="password">
          <span slot="label" class="lable">
            <img src="../../assets/login/Frame 4.png" alt="" />
            <span> Password </span>
          </span>
          <el-input
            v-model="ruleForm.password"
            placeholder="password"
            :type="parsswordType"
            @change="changeParssword"
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
          <p :class="passwordError ? 'textRed' : 'psswordHint'">
            Please enter 8-12 digits of uppercase and lowercase letters,
            numbers, and combinations.
          </p>
        </el-form-item>
        <el-form-item prop="Twopassword">
          <span slot="label" class="lable" style="width: 200px">
            <img src="../../assets/login/Frame 4.png" alt="" />
            <span> Repeat </span>
          </span>
          <el-input
            v-model="ruleForm.Twopassword"
            placeholder="password again"
            :type="twoPasswordType"
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
          <p :class="passwordErrorTwo ? 'textRed' : 'psswordHint'">
            Please enter the password again. The two entries must be the same.
          </p>
        </el-form-item>
        <hr />
        <div class="agreementAndRemeberMeAndForgetparssword">
          <!-- 同意协议 -->
          <div class="agreement">
            <el-checkbox v-model="ageeemnt">
              <span style="color: black"> I have read and agreed to the </span>
              <span> user agreement </span>
            </el-checkbox>
          </div>
          <!-- 我有账户 -->
          <!-- <div class="remeberMeAndForgetparssword">
            <p>I have an account. Log in.</p>
          </div> -->
        </div>
        <div class="sumit">
          <button v-if="isLogin">
            <img src="../../assets/login/Ellipse 87.png" alt="" />
          </button>
          <button v-else type="button" @click.prevent="submitForm('ruleForm')">
            REGISTER
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import { getLogin } from "@/api/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      ruleForm: {
        Username: "",
        Realname: "",
        FromWhere: "",
        org_id: "",
        user_type: "STUDENT",
        email: "",
        verification_code: "",
        password: "",
        Twopassword: "",
      },
      register: "邮箱",
      ageeemnt: false,
      rules: {
        Username: [
          { required: true, message: "Please enter", trigger: "blur" },
        ],
        Realname: [
          {
            required: true,
            message: "Please enter your real name",
            trigger: "blur",
          },
        ],
        // FromWhere: [
        //   {
        //     required: true,
        //     message: "Select country and region",
        //     trigger: "blur",
        //   },
        // ],
        org_id: [
          {
            required: true,
            message: "Selection mechanism",
            trigger: "blur",
          },
        ],
        user_type: [
          {
            required: true,
          },
        ],
        email: [
          {
            required: true,
          },
        ],
        verification_code: [
          {
            required: true,
          },
        ],
        password: [
          {
            required: true,
          },
        ],
        Twopassword: [
          {
            required: true,
          },
        ],
      },
      parsswordType: "password",
      twoPasswordType: "password",
      VerificationCodeShow: false,
      time: 60,
      EmailError: null, //邮箱是否正确
      loading: false,
      institutionList: [], //机构列表
      inPage: 1,
      inPageSize: 10,
      isLogin: false,
      passwordError: false,
      passwordErrorTwo: false,
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    //   提交
    submitForm(formName) {
      let flag = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          flag = true;
          return false;
        }
      });
      //   是否勾选了同意协议
      if (!this.ageeemnt) {
        this.$message.warning("read and agreed to the user agreement");
        return;
      }
      if (this.ruleForm.Twopassword != this.ruleForm.password) {
        this.$message.warning(
          "Please enter the password again. The two entries must be the same"
        );
        return;
      }
      if (this.passwordError) {
        this.$message.warning(
          "Please enter 8-12 digits of uppercase and lowercase letters, numbers, and combinations"
        );
        return;
      }
      if (flag) {
        return;
      }
      this.isLogin = true;
      let MethodName = "user_manager-RegisterUser";
      let data = {
        user_type: this.ruleForm.user_type,
        user_name: this.ruleForm.Username,
        real_name: this.ruleForm.password,
        org_id: this.ruleForm.org_id,
        verification_type: this.register == "邮箱" ? "EMAIL" : "SMS",
        phone_or_email: this.ruleForm.email,
        verification_code: this.ruleForm.verification_code,
      };
      getLogin(MethodName, data)
        .then((res) => {
          console.log(res);
          this.isLogin = false;
        })
        .catch((err) => {
          this.isLogin = false;
        });
    },
    // 验证密码
    changeParssword() {
      if (this.ruleForm.password) {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        let result = reg.test(this.ruleForm.password);
        if (result) {
          this.passwordError = false;
        } else {
          this.passwordError = true;
        }
      }
    },
    // 验证第二次密码是否一样
    Changetowpassword() {
      if (this.ruleForm.Twopassword) {
        if (this.ruleForm.Twopassword != this.ruleForm.password) {
          this.passwordErrorTwo = true;
          return;
        } else {
          this.passwordErrorTwo = false;
        }
      }
    },
    // 验证邮箱
    ChangeEmail() {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //验证邮箱的正则
      this.EmailError = reg.test(this.ruleForm.email);
      if (!this.EmailError) {
        this.EmailError = false;
        this.$message.error("The mailbox format is incorrect");
      }
    },
    // 获取验证码
    getVerificationCode() {
      let this_ = this;
      let timer;
      if (this_.ruleForm.email) {
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
        let MethodName = "SendVerificationCode";
        let data = {
          verification_type: this.register == "邮箱" ? "EMAIL" : "SMS",
          phone_or_email: this_.ruleForm.email,
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
      this.ruleForm.verification_code = this.ruleForm.verification_code.replace(
        /[^\d]/g,
        ""
      );
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
    // 获取机构列表
    getinstitutionList() {
      this.loading = true;
      let MethodName = "org_manager-PageQueryOrgList";
      let data = {
        name: this.inName,
        page_capacity: this.inPageSize,
        cur_page: this.inPage,
      };
      getLogin(MethodName, data).then((res) => {
        this.loading = false;
        this.institutionList = res.org_list;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getinstitutionList();
  },
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
.registration2 {
  margin-top: 40px;
  width: 1200px;
  background: white;
  margin-left: 60px;
  padding: 40px 0 40px 40px;
  border-radius: 8px;
  .title {
    // height: 60px;
    // line-height: 60px;
    p {
      margin: 0;
      padding: 0;
    }
    .p1 {
      font-size: 24px;
      color: #ff9900;
    }
    .p2 {
      margin-top: 40px;
      font-size: 20px;
      color: #000000;
    }
  }
  .form {
    margin-top: 50px;
    .title2 {
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      margin: 20px 0;
    }
    hr {
      margin: 0;
      width: 474px;
      height: 1px;
      background: #d9d9d9;
    }
    .el-input,
    .el-select {
      width: 334px;
    }

    .el-form-item {
      width: 1140px;
      display: flex;
      .lable {
        display: inline-block;
        width: 120px !important;
        text-align: left;
        img {
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .el-form-item::after {
      content: "*";
      color: red;
      position: relative;
      left: 5px;
      top: 10px;
    }
    .getVerification {
      width: 116px;
      height: 40px;
      margin-left: 16px;
      border-radius: 4px;
      cursor: pointer;
      box-sizing: border-box;
      background: #ff9900;
      border: 1px solid #ff9900;
      color: white;
    }
    .waitTime {
      width: 116px;
      height: 40px;
      margin-left: 16px;
      border-radius: 4px;
      cursor: pointer;
      box-sizing: border-box;
      background: #f0f0f0;
      color: black;
      border: none;
    }
    .rightimg {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .psswordHint {
      width: 334px;
      margin: 0;
      padding: 0;
      font-size: 14px;
      color: #000000;
      opacity: 0.3;
      line-height: 20px;
      margin-top: 5px;
    }
    .textRed {
      width: 334px;
      margin: 0;
      padding: 0;
      font-size: 14px;
      color: red;
      opacity: 1;
      line-height: 20px;
      margin-top: 5px;
    }
    .sumit {
      width: 474px;
      text-align: right;
      button {
        width: 337px;
        height: 48px;
        background: #ff9900;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        outline: none;
        color: white;
        img {
          vertical-align: middle;
          animation: rotated 1s linear infinite;
        }
      }
    }
    .agreementAndRemeberMeAndForgetparssword {
      width: 474px;
      display: flex;
      justify-content: flex-end;
      > div {
        margin: 20px 0;
        width: 334px;
        position: relative;
      }
      .agreement {
        span {
          color: #ff9900;
        }
      }
    }
    .remeberMeAndForgetparssword {
      p {
        margin: 0;
        color: #ff9900;
        cursor: pointer;
        text-align: right;
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
}
</style>