<template>
  <div id="login">
    <div id="login-content">
      <Form ref="Loginmodel" :model="Loginmodel" :rules="rules">
        <FormItem prop="userid">
          <i-Input type="text" v-model="Loginmodel.userid" placeholder="用户名">
            <Icon type="ios-person" slot="prepend" size="20"></Icon>
          </i-Input>
        </FormItem>
        <FormItem prop="password">
          <i-Input type="password" v-model="Loginmodel.password" placeholder="密码">
            <Icon type="ios-lock" slot="prepend" size="20"></Icon>
          </i-Input>
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
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      Loginmodel: {
          userid:'',
          password: ''
      },
      rules: {
        userid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
    };
  },
  methods: {
    doLogin() {
      this.$refs.Loginmodel.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http
            .post("/account/login", this.Loginmodel)
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
              this.$Notice.error({ title: "提示", desc: "服务器异常" });
            });
        }
      });
    }
  },
  mounted() {
    let user = Util.getUser();
    if (user) this.$router.push("/");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
}

#login-content {
  width: 360px;
  text-align: center;
  background-color: aliceblue;
  padding: 25px;
  position: absolute;
  right: 13%;
  top: 35%;
  border-radius: 2%;
}

.form-label {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}
</style>
