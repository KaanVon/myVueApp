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
      <Table :columns="columns" :data="list" :loading="loading.table"></Table>
      <div style="padding: 10px 0;">
        <Page :current="pageIndex" :total="total" :page-size="pageSize" @on-change="currentChange"></Page>
      </div>
    </div>
    <Modal v-model="show.addUser" title="添加成员">
      <div>
        <ContactSelect @func="getSelectedUser" :filterUsers="list"></ContactSelect>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="addRoleUser" :loading="loading.addRoleUser">确定</i-button>
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
      loading:{
        table: false,
        addRoleUser:false
      },
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
                  click: () => {
                    this.delRoleUser(params.row.oid);
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
      },
      selectedUsers:[]
    };
  },
  methods: {
    getList() {
      var para = {
        roleoid: this.role.oid,
        searchkey: this.searchKey,
        page: this.pageIndex,
        rows: this.pageSize
      };
      this.loading.table = true;
      this.$http.post("/Role/GetUser", para).then(res => {
        this.loading.table = false;
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
    delRoleUser(oid) {
      this.$http.post("/Role/DelUser", { oid }).then(res => {
        if (!res.data.iserror) {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getList();
        } else {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
        }
      });
    },
    addRoleUser() {
      var oids = []
      this.selectedUsers.forEach(item=> oids.push(item.oid)) 
      var para = {
        roid : this.role.oid,
        uoids : oids
      }
      this.loading.addRoleUser = true
      this.$http.post('/Role/AddUser',para).then(res => {
        this.loading.addRoleUser = false
        if(!res.data.iserror){
          this.$Notice.success({
            title:"提示",
            desc:"添加成功"
          })
          this.getList();
          this.show.addUser = false;
        }else {
           this.$Notice.error({
            title:"提示",
            desc:res.data.errormsg
          })
        }
      })
    },
    getSelectedUser(data) {
      this.selectedUsers = data;
    }
  },
  mounted() {},
  watch: {
    role(a) {
      this.getList();
    }
  }
};
</script>

<style scoped>
.content-header {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
</style>