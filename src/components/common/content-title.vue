<template>
  <div>
    <div class="content-title">
      <Icon  class="content-back" type="ios-undo" @click.native="goBack"></Icon>
    </div>
    <div style="padding-top: 10px;">
      <ATitle>
        <span class="atitle">新增客户</span>
      </ATitle>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      // history.back();
      this.$router.go(-1);
    }
  }
};
</script>
<style  scoped>
.content-title {
  font-size: 26px;
  margin-bottom: 10px;
}
.content-back {
  color: #999;
  margin-right: 10px;
  cursor: pointer;
}
.content-back:after {
  content: "";
  width: 1px;
  height: 30px;
  border-right: 1px solid #ddd;
  margin-left: 15px;
}
</style>