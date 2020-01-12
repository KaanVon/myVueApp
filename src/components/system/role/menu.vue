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
      selectedList:[]
    };
  },
  methods: {
    getMenuList() {},
    saveRoleMenu() {}
  },
  mounted() {}
};
</script>

<style scoped>
</style>