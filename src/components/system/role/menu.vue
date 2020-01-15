<template>
  <div>
    <div style="padding-bottom: 10px;">
      <h2 style="margin-right:10px;vertical-align:middle;">{{role.name}}</h2>
    </div>
    <div>
      <CheckboxGroup v-model="selectedList">
        <div v-for="x in menuList" :key="x.oid" style="margin:10px 0;">
          <div>
            <Checkbox :label="x.oid" :key="x.oid" style="width:120px;">
              <span>{{x.name}}</span>
            </Checkbox>
          </div>
          <div style="margin-left:15px;">
            <Checkbox v-for="z in x.children" :label="z.oid" :key="z.oid" style="width:120px;">
              <span>{{z.name}}</span>
            </Checkbox>
          </div>
        </div>
      </CheckboxGroup>
      <div v-if="menuList.length <=0 ">加载中..</div>
      <Button :disabled="role.oid == 0" type="primary" @click="saveRoleMenu">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: Object
    }
  },
  data() {
    return {
      menuList: [],
      selectedList: []
    };
  },
  methods: {
    getMenuList() {
      this.$http.post("/Menu/List").then(res => {
        if (!res.data.iserror) {
          this.menuList = res.data.data;
        } else {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
        }
      });
    },
    getRoleMenu() {
      this.$http.post("/role/GetMenu", { oid: this.role.oid }).then(res => {
        if (!res.data.iserror) {
          this.selectedList = res.data.data.menus;
        } else {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
        }
      });
    },
    saveRoleMenu() {
      this.$Spin.show();
      this.$http
        .post("/role/SetMenu", { oid: this.role.oid, menus: this.selectedList })
        .then(res => {
          this.$Spin.hide();
          if (!res.data.iserror) {
            this.$Notice.success({
              title: "提示",
              desc: "保存成功"
            });
            this.$store.dispatch('getMyMenuList')
          } else {
            this.$Modal.error({
              title: "提示",
              content: res.data.errormsg
            });
          }
        });
    }
  },
  mounted() {
    this.getMenuList();
  },
  watch: {
    role(a) {
      this.getRoleMenu();
    }
  }
};
</script>

<style scoped>
</style>