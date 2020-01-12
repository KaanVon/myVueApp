<template>
  <div>
    <h2 style="margin-right:10px;margin-bottom:10px;">{{role.name}}</h2>
    <div>
      <Button :disabled="role.oid == 0" type="primary" @click="saveRolePermission">保存</Button>
       <div v-for="x in permissionList" :key="x.group" style="margin:10px 0;">
        <div>
          <b>{{x.group}}</b>
        </div>
        <div style="margin-left:15px;">
          <CheckboxGroup v-model="selectedPermissionList">
            <Checkbox v-for="z in x.list" :label="z.oid" :key="z.oid" style="width: 140px;">
              <span>{{z.description}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
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
        permissionList:[],
        selectedPermissionList:{}
    };
  },
  methods: {
    getPermissionList() {},
    saveRolePermission() {}
  },
  mounted() {
    this.getPermissionList();
  }
};
</script>

<style scoped>
</style>