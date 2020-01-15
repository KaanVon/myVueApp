<template>
  <div>
    <div style="display:flex;">
      <div style="border-right:1px dashed #ccc;width:220px;height:600px;padding-right:5px;">
        <div style="display:flex;flex-direction:row;align-items:center;">
          <!-- <Input v-model="searchkey" icon="ios-search" placeholder="搜索角色" style="width: 200px" /> -->
          <Icon type="md-add" class="icon-add" size="16" @click.native="show.addRole = true"></Icon>
        </div>
        <div>
          <tree :data="roleList"></tree>
        </div>
      </div>
      <div style="padding-left:10px;flex:1">
        <Tabs value="name1" :animated="false">
          <TabPane label="菜单权限控制" name="name1">
            <CwMenu :role="roleData"></CwMenu>
          </TabPane>
          <TabPane label="操作权限控制" name="name2">
            <CwPermission :role="roleData"></CwPermission>
          </TabPane>
          <TabPane label="角色用户" name="name3">
            <CwRoleUser :role="roleData"></CwRoleUser>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <Modal v-model="show.addRole" title="新增角色">
      <div style="width:80%;max-width:360px;margin: 0 auto;">
        <i-form ref="modelAdd" :model="modelAdd" :rules="rules" :label-width="80">
          <form-item label="角色名称" prop="name">
            <i-input v-model="modelAdd.name" placeholder="请输入"></i-input>
          </form-item>
        </i-form>
      </div>
      <div slot="footer">
        <i-button type="primary" :loading="loading.addRole" @click="handleAddRole">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="show.updateRole" title="编辑角色">
      <div style="width:80%;max-width:360px;margin: 0 auto;">
        <i-form ref="modelUpdate" :model="modelUpdate" :rules="rules" :label-width="80">
          <form-item label="角色名称" prop="name">
            <i-input v-model="modelUpdate.name" placeholder="请输入"></i-input>
          </form-item>
        </i-form>
      </div>
      <div slot="footer">
        <i-button type="primary" :loading="loading.updateRole" @click="handleUpdateRole">确定</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import CwPermission from "./permission";
import CwMenu from "./menu";
import CwRoleUser from "./roleUser";
export default {
  components: { CwPermission, CwMenu, CwRoleUser },
  data() {
    return {
      searchkey: "",
      roleList: [],
      hovRoleOid: 0,
      roleData: {
        oid: 0,
        name: "操作权限控制"
      },
      loading: {
        addRole: false,
        updateRole: false
      },
      modelAdd: {},
      modelUpdate: {},
      show: { addRole: false, updateRole: false },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getRoleList() {
      this.$http.post("/role/list").then(res => {
        if (res.data.iserror) {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
          return;
        }
        var list = res.data.data;
        if (list.length > 0) this.roleData = list[0];
        var d = [];
        list.forEach(item => {
          d.push({
            title: item.name,
            params: item,
            render: (h, { root, node, data }) => {
              return h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%"
                  },
                  on: {
                    mouseover: () => {
                      this.hovRoleOid = data.params.oid;
                    }
                  }
                },
                [
                  h("icon", { props: { type: "md-pricetag" } }),
                  h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        marginLeft: "2px",
                        padding: "2px",
                        backgroundColor:
                          this.roleData.oid === data.params.oid ? "#d5e8fc" : ""
                      },
                      on: {
                        click: () => {
                          this.roleData = data.params;
                        }
                      }
                    },
                    data.title
                  ),
                  h(
                    "span",
                    {
                      style: {
                        display:
                          this.hovRoleOid === data.params.oid
                            ? "block"
                            : "none",
                        marginRight: "32px",
                        float: "right",
                        cursor: "pointer"
                      }
                    },
                    [
                      h(
                        "Dropdown",
                        {
                          props: {
                            trigger: "click",
                            placement: "bottom-end"
                          },
                          on: {
                            "on-click": name => {
                              this.handleRole(name, data.params);
                            }
                          }
                        },
                        [
                          h("Icon", { props: { type: "md-more" } }),
                          h("DropdownMenu", { slot: "list" }, [
                            h(
                              "DropdownItem",
                              { props: { name: "edit" } },
                              "编辑"
                            ),
                            h(
                              "DropdownItem",
                              { props: { name: "del" } },
                              "删除"
                            )
                          ])
                        ]
                      )
                    ]
                  )
                ]
              );
            }
          });
        });
        this.roleList = d;
      });
    },
    handleRole(name, item) {
      switch (name) {
        case "edit":
          this.modelUpdate = item;
          this.show.updateRole = true;
          break;
        case "del":
          this.handleDelRole(item.oid);
          break;
      }
    },
    handleAddRole() {
      this.$refs.modelAdd.validate(valid => {
        if (valid) {
          this.loading.addRole = true;
          this.$http
            .post("/role/createRole", { model: this.modelAdd })
            .then(res => {
              this.loading.addRole = false;
              if (!res.data.iserror) {
                this.$Notice.success({
                  title: "提示",
                  desc: "添加成功"
                });
                this.modelAdd = {};
                this.getRoleList();
                this.show.addRole = false;
              } else {
                this.$Notice.error({
                  title: "提示",
                  desc: res.data.errormsg
                });
              }
            });
        }
      });
    },
    handleUpdateRole() {
      this.$refs.modelUpdate.validate(valid => {
        if (valid) {
          this.loading.updateRole = true;
          this.$http
            .post("/role/updateRole", { model: this.modelUpdate })
            .then(res => {
              this.loading.updateRole = false;
              if (!res.data.iserror) {
                this.$Notice.success({
                  title: "提示",
                  desc: "修改成功"
                });
                this.modelUpdate = {};
                this.getRoleList();
                this.show.updateRole = false;
              } else {
                this.$Notice.error({
                  title: "提示",
                  desc: res.data.errormsg
                });
              }
            });
        }
      });
    },
    handleDelRole(oid) {
      this.$Modal.confirm({
        title: "提示",
        content: "是否删除?",
        onOk: () => {
          this.$http.post("/role/delRole", { oid }).then(res => {
            if (res.data.iserror) {
              this.$Notice.error({
                titile: "提示",
                desc: res.data.errormsg
              });
              return;
            }
            this.getRoleList();
          });
        }
      });
    }
  },
  mounted() {
    this.getRoleList();
  }
};
</script>

<style scoped>
.icon-add {
  margin-left: 5px;
  cursor: pointer;
  padding: 5px;
}
.icon-add:hover {
  background-color: #f1f9f9;
}
</style>