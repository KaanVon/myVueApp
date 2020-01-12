<template>
  <div>
    <div style="padding-bottom: 10px;">
      <h2 style="margin-right:10px;vertical-align:middle;">{{role.name}}</h2>
    </div>
    <div>
      <div class="content-header">
        <i-input v-model="searchKey" style="width:200px;"></i-input>
        <i-button type="primary" style="margin-left:5px;">查询</i-button>
        <i-button style="margin-left:5px;" @click="show.addUser=true">添加</i-button>
      </div>
      <Table :columns="columns" :data="list" :loading="table"></Table>
      <div style="padding: 10px 0;">
        <Page :current="pageIndex" :total="total" :page-size="pageSize" @on-change="currentChange"></Page>
      </div>
    </div>
    <Modal v-model="show.addUser" title="添加成员">
      <div>
        <ContactSelect></ContactSelect>
      </div>
      <div slot="footer">
        <i-button type="primary">确定</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import ContactSelect from "../../common/contact";
export default {
  components: { ContactSelect },
  props: {
    role: {
      type: Object
    }
  },
  data() {
    return {
      searchKey: "",
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      table: false,
      list: [],
      columns: [
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "操作",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click() {
                    this.delRoleUser(params.row.uoid);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      show: {
        addUser: false
      }
    };
  },
  methods: {
    getList() {
      var para = {
        roid: this.role.oid,
        searchKey: this.searchKey,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.table = true;
      this.$http.post("", para).then(res => {
        this.table = false;
        if (!res.data.iserror) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$Notice.error({
            title: "提示",
            content: res.data.errormsg
          });
        }
      });
    },
    currentChange(v) {
      this.pageIndex = v;
      this.getList();
    },
    delRoleUser(oid) {},
    addRoleUser() {}
  },
  mounted() {}
};
</script>

<style scoped>
.content-header {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
</style>