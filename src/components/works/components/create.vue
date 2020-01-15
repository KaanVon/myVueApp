<template>
  <div style="font-size: 14px;font-family: '微软雅黑';">
    <ContentTitle></ContentTitle>
    <div style="padding-top: 10px;">
      <ATitle>
        <span class="atitle">新增作品</span>
      </ATitle>
    </div>
    <Form ref="formObj" :model="formObj" :rules="rules" :label-width="80">
      <Row>
        <i-Col span="5">
          <FormItem label="作品名称">
            <i-Input v-model="formObj.name" placeholder="请填写作品名称"></i-Input>
          </FormItem>
        </i-Col>
        <i-Col span="4">
          <FormItem label="作品编号">
            <i-Input v-model="formObj.code" placeholder="请填写作品编号"></i-Input>
          </FormItem>
        </i-Col>
        <i-Col span="4">
          <FormItem label="作品类型">
            <i-Input v-model="formObj.type" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
        <i-Col span="4">
          <FormItem label="作者姓名">
            <i-Input v-model="formObj.author" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
        <i-Col span="4">
          <FormItem label="作者笔名">
            <i-Input v-model="formObj.nickname" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
      </Row>
      <Row>
        <i-Col span="4">
          <FormItem label="著作权人">
            <i-Input v-model="formObj.nickname" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
        <i-Col span="4">
          <FormItem label="作品进度">
            <i-Input v-model="formObj.nickname" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
         <i-Col span="5">
          <FormItem label="权利来源">
            <i-Input v-model="formObj.nickname" placeholder="请填写"></i-Input>
          </FormItem>
        </i-Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formObj: {},
      rules: {}
    };
  }
};
</script>

<style scoped>
.atitle {
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
  margin-left: 5px;
  color: #333333;
}
</style>