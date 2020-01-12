<template>
  <div>
    <div class="content-title">
      <Icon v-if="back" class="content-back" type="md-undo" @click.native="goBack"></Icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
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