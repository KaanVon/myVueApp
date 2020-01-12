<template>
  <div>
    <ContentTitle back line></ContentTitle>
    <Card style="width:40%;margin:0 auto; min-width:420px;">
      <p slot="title">修改密码</p>
      <Form :label-width="80" ref="model" :model="model" :rules="rules" :show-message="false">
        <FormItem label="原密码：" prop="oldpwd">
          <i-Input v-model="model.oldpwd" type="password"></i-Input>
        </FormItem>
        <FormItem label="新密码：" prop="newpwd1">
          <i-Input v-model="model.newpwd1" type="password"></i-Input>
        </FormItem>
        <FormItem label="再次确认新密码：" prop="newpwd2">
          <i-Input v-model="model.newpwd2" type="password"></i-Input>
        </FormItem>
        <FormItem>
          <Button type="info" :loading="loading.save" @click="save">修改密码</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import Util from '@/assets/js/util'
export default {
  data() {
    return {
      model: {
        oldpwd: "",
        newpwd1: "",
        newpwd2: ""
      },
      rules: {
        oldpwd: [
          { required: true, message: "请输入旧密码", trigger: "change" }
        ],
        newpwd1: [
          { required: true, message: "请输入新密码", trigger: "change" }
        ],
        newpwd2: [
          { required: true, message: "请再次输入新密码", trigger: "change" }
        ]
      },
      loading: {
        save: false
      }
    };
  },
  methods: {
    save() {
      this.$refs.model.validate(valid => {
        if (valid) {
          if (this.model.newpwd1 != this.model.newpwd2) {
            this.$Message.error("请确认新密码是否一致");
            return;
          }
          this.loading.save = true;
          this.$http.post("/User/Updatepwd", this.model).then(res => {
            this.loading.save = false;
            if (!res.data.iserror) {
              this.$Notice.success({
                title: "提示",
                desc: "提交成功"
              });
              Util.removeUser();
              this.$router.push(this.$route.query.f || "/");
            }else{
                this.$Notice.error({
                    title:'提示',
                    content: res.data.errormsg
                })
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>