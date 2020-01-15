<template>
  <div>
    <div>
      <Button type="primary" size="small" @click="addWorks" style="margin: 5px;">新增作品</Button>
    </div>
    <Table ref="selection" :columns="columns" :data="dataList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 15,
      pageIndex: 1,
      total: 0,
      searchKey: "",
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "作品名称",
          key: "name",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {}
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "作品类型",
          key: "type"
        },
        {
          title: "合同来源",
          key: "source"
        }
      ],
      dataList: []
    };
  },
  methods:{
    addWorks() {
       this.$router.push('/works/create')
    }
  },
  mounted() {}
};
</script>

<style scoped>

</style>