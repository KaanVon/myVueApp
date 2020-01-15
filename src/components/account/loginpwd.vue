<template>
  <div class="bg">
    <img class="bg-img" src="../../assets/img/login/4.jpg" />
    <div class="input-form" :style="formStyle">
      <div class="form-title">
        <img src="../../assets/img/login/3.png" />
        <span class="form-title-text">用户登录</span>
      </div>
      <Form :show-message="false" ref="model" :model="model" :rules="rules">
        <FormItem prop="name">
          <div style="display: flex">
            <label class="form-label">用户名</label>
            <i-Input style="flex:1" v-model="model.name" placeholder="用户名"></i-Input>
          </div>
        </FormItem>
        <FormItem prop="password">
          <div style="display: flex">
            <label class="form-label">密码</label>
            <i-Input style="flex:1" type="password" v-model="model.password" placeholder="密码"></i-Input>
          </div>
        </FormItem>
        <FormItem>
          <div style="display: flex;align-items:center">
            <label class="form-label"></label>
            <Button style="width:80px" type="primary" :loading="loading" @click="doLogin">登录</Button>
            <a style="margin-left:30px">忘记密码?</a>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Util from "@/assets/js/util";
import axios from "axios";
export default {
  data() {
    return {
      bodyWidth: document.body.clientWidth,
      model: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      show: false,
      loading: false
    };
  },
  computed: {
    formStyle() {
      let style = {};
      style.width = `${this.bodyWidth * 0.187}px`;
      let top = parseInt((this.bodyWidth - 221) / 7.387);
      if (top < 155) {
        top = 155;
      }
      style.top = `${top}px`;
      // 1920 230
      // 1366 155
      return style;
    }
  },
  methods: {
    doLogin() {
      this.$refs.model.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http
            .post("/account/login", this.model)
            .then(res => {
              this.loading = false;
              if (!res.data.iserror) {
                window.clearInterval(this.interval);
                var user = res.data.data;
                axios.defaults.headers.Token = user.token;
                Util.setUser(JSON.stringify(user));
                this.$router.push(this.$route.query.f || "/");
              } else {
                this.$Notice.error({ title: "提示", desc: res.data.errormsg });
              }
            })
            .catch(error => {
              this.loading = false;
              this.$Notice.error({title:'提示',desc:"服务器异常"})
            });
        }
      });
    }
  }
};
</script>

<style  scoped>
.bg {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  position: absolute;
}
.bg-img {
  width: 100%;
  min-height: 340px;
  display: inline-block;
  position: absolute;
}
.input-form {
  position: absolute;
  max-width: 230px;
  height: 150px;
  left: calc(50% - 60px);
  transform: translateX(-50%);
  top: 155px;
}

.form-title {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;
}

.form-title-text {
  color: #2c8cf0;
  font-size: 16px;
  margin-left: 5px;
}

.form-label {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}

.logo-text {
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
}

.ivu-form-item {
  margin-bottom: 12px;
}
</style>
