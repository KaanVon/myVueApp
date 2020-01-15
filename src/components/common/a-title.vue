<template>
  <div>
    <div class="line" v-if="line"></div>
    <div class="a-title" v-if="!title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    line: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.a-title {
 margin-bottom: 10px;
 margin-top: 10px;
 color: #777;
 font-weight: 400;
 width: 140px;
}

.a-title:before {
 content: ' ';
 border-left: 3px solid #2B8CF0;
 padding-left: 5px;
}

.line {
 height: 5px;
 background-color: #f5f7f9
}
</style>