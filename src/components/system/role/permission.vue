<template>
  <div>
    <h2 style="margin-right:10px;margin-bottom:10px;">{{role.name}}</h2>
    <div>
      <Button
        :disabled="role.oid == 0"
        type="primary"
        @click="saveRolePermission"
        :loadding="loading"
      >保存</Button>
      <CheckboxGroup v-model="selectedPermissionList">
        <div v-for="x in permissionList" :key="x.oid">
          <div>{{ x.name }}</div>
          <div v-for="z in x.children" :key="z.oid">
            <div style="margin-left: 15px;">{{ z.name }}</div>
            <div style="margin-left: 30px">
              <template v-for="c in z.permissions">
                <Checkbox style="width: 140px;" :label="c.oid" :key="c.oid">{{ c.name }}</Checkbox>
              </template>
            </div>
          </div>
          <div style="margin-left: 15px;">
            <template v-for="z in x.permissions">
              <Checkbox style="width: 140px;" :label="z.oid" :key="z.oid">{{ z.name }}</Checkbox>
            </template>
          </div>
        </div>
      </CheckboxGroup>
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
      permissionList: [],
      selectedPermissionList: [],
      loading: false
    };
  },
  methods: {
    getPermissionList() {
      this.$Spin.show();
      this.$http.post("/Permission/List").then(res => {
        this.$Spin.hide();
        if (!res.data.iserror) {
          this.permissionList = res.data.data;
        } else {
          this.$Modal.error({
            title: "提示",
            content: res.data.errormsg
          });
        }
      });
    },
    getSelectedPermissionList() {
      this.$http
        .post("/role/GetPremission", { oid: this.role.oid })
        .then(res => {
          if (!res.data.iserror) {
            this.selectedPermissionList = res.data.data.permissions;
          } else {
            this.Notice.error({
              title: "提示",
              desc: res.data.errormsg
            });
          }
        });
    },
    saveRolePermission() {
      var para = {
        roid: this.role.oid,
        permissions: this.selectedPermissionList
      };
      this.loading = true;
      this.$http.post("/role/SetPremission", para).then(res => {
        this.loading = false;
        if (!res.data.iserror) {
          this.$Notice.success({
            title: "提示",
            desc: "设置成功"
          });
        } else {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
        }
      });
    }
  },
  mounted() {
    this.getPermissionList();
  },
  watch:{
    role(a){
      this.getSelectedPermissionList();
    }
  }
};
</script>

<style scoped>
</style>