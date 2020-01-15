<template>
  <div>
    <div style="margin-bottom:10px;">
      <i-input v-model="searchKey" style="width:200px;"></i-input>
      <i-button type="primary" style="margin-left:5px;">查询</i-button>
      <i-button @click="show.addUser = true;" style="margin: 0 5px;">添加成员</i-button>
      <i-button @click="deleteRow" type="error" :disabled="selection.length <= 0">批量删除</i-button>
    </div>
    <Table
      :columns="column"
      :data="list"
      :loading="loading.table"
      @on-selection-change="selectionChange"
    ></Table>
    <div style="padding: 10px 0;">
      <page :current.sync="pageIndex" :total="total" :page-size="pageSize" @on-change="getUserList"></page>
    </div>
    <Modal v-model="show.addUser" title="添加用户" :width="450">
      <div style="width:360px;margin: 15px auto;">
        <i-form ref="userModel" :model="userModel" :rules="rules" :label-width="80">
          <Form-Item label="用户名" prop="userid">
            <i-input v-model="userModel.userid"></i-input>
          </Form-Item>
          <Form-Item label="密码" prop="pwd">
            <i-input v-model="userModel.pwd"></i-input>
          </Form-Item>
          <Form-Item label="姓名" prop="name">
            <i-input v-model="userModel.name"></i-input>
          </Form-Item>
          <Form-Item label="头像">
            <Row>
              <i-col span="18" v-if="userModel.avatar">
                <div class="demo-upload-list">
                  <img :src="actionUrl+userModel.avatar" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(userModel)"></Icon>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <Upload
                  :action="actionUrl+'/Upload/Upfile'"
                  :show-upload-list="false"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-success="(res)=>{handleSuccess(res,userModel)}"
                >
                  <Button type="primary" size="small">上传头像</Button>
                </Upload>
              </i-col>
            </Row>
          </Form-Item>
          <form-item label="性别">
            <RadioGroup v-model="userModel.gender">
              <Radio :label="0">未知</Radio>
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </RadioGroup>
          </form-item>
          <Form-Item label="手机号码">
            <i-input v-model="userModel.mobile"></i-input>
          </Form-Item>
          <Form-Item label="角色" prop="roles">
            <Select v-model="userModel.roles" multiple>
              <Option v-for="item in roleList" :value="item.oid" :key="item.oid">{{ item.name }}</Option>
            </Select>
          </Form-Item>
        </i-form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addUser" :loading="loading.addUser">确定</Button>
      </div>
    </Modal>
    <Modal v-model="show.updateUser" title="修改用户" :width="450">
      <div style="width:360px;margin: 15px auto;">
        <i-form ref="updateModel" :model="updateModel" :rules="rules" :label-width="80">
          <Form-Item label="姓名" prop="name">
            <i-input v-model="updateModel.name"></i-input>
          </Form-Item>
          <Form-Item label="头像">
            <Row>
              <i-col span="18" v-if="updateModel.avatar">
                <div class="demo-upload-list">
                  <img :src="actionUrl+updateModel.avatar" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(updateModel)"></Icon>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <Upload
                  :action="actionUrl+'/Upload/Upfile'"
                  :show-upload-list="false"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-success="(res)=>{handleSuccess(res,updateModel)}"
                >
                  <Button type="primary" size="small">上传头像</Button>
                </Upload>
              </i-col>
            </Row>
          </Form-Item>
          <form-item label="性别">
            <RadioGroup v-model="updateModel.gender">
              <Radio :label="0">未知</Radio>
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </RadioGroup>
          </form-item>
          <Form-Item label="手机号码">
            <i-input v-model="updateModel.mobile"></i-input>
          </Form-Item>
          <Form-Item label="角色" prop="roles">
            <Select v-model="updateModel.roles" multiple>
              <Option v-for="item in roleList" :value="item.oid" :key="item.oid">{{ item.name }}</Option>
            </Select>
          </Form-Item>
        </i-form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="updateUser" :loading="loading.updateUser">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Util from "@/assets/js/util";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      searchKey: "",
      selection: [],
      show: {
        addUser: false,
        updateUser: false
      },
      loading: {
        table: false,
        addUser: false,
        updateUser: false
      },
      userModel: {
        userid: "",
        pwd: "",
        avatar: "",
        name: "",
        gender: 0,
        mobile: "",
        roles: []
      },
      updateModel: {},
      rules: {
        userid: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        roles: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "角色不能为空",
            trigger: "change"
          }
        ]
      },
      total: 0,
      list: [],
      column: [
        { type: "selection", width: 52 },
        { title: "姓名", key: "name" },
        { title: "电话", key: "mobile" },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.updateModel = params.row;
                      this.show.updateUser = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.delUser(params.row.oid);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      roleList: [],
      actionUrl: Util.serverUrl()
    };
  },
  methods: {
    getUserList() {
      var para = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchKey: this.searchKey
      };
      this.loading.table = true;
      this.$http.post("/User/List", para).then(res => {
        this.loading.table = false;
        if (!res.data.iserror) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$Notice.error({
            title: "提示",
            desc: res.data.errormsg
          });
        }
      });
    },
    getRoleList() {
      this.$http.post("/role/list").then(res => {
        if (!res.data.iserror) {
          this.roleList = res.data.data;
        } else {
          this.$Notice.error({ title: "提示", desc: res.data.errormsg });
        }
      });
    },
    addUser() {
      this.$refs.userModel.validate(valid => {
        if (valid) {
          this.loading.addUser = true;
          this.$http
            .post("/user/CreateModel", { model: this.userModel })
            .then(res => {
              this.loading.addUser = false;
              if (!res.data.iserror) {
                this.$Notice.success({
                  title: "提示",
                  desc: "添加成功"
                });
                this.getUserList();
                this.show.addUser = false;
                this.userModel = {
                  userid: "",
                  pwd1: "",
                  pwd2: "",
                  name: "",
                  gender: "0",
                  mobile: "",
                  roles: []
                };
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
    updateUser() {
      this.updateUser = true;
      this.$refs.updateModel.validate(valid => {
        if (valid) {
          this.$http
            .post("/user/UpdateModel", { model: this.updateModel })
            .then(res => {
              this.updateUser = false;
              if (res.data.iserror) {
                this.$Modal.error({
                  title: "提示",
                  content: res.data.errormsg
                });
                return;
              }
              this.getUserList();
              this.show.updateUser = false;
            });
        }
      });
    },
    delUser(oid) {
      this.$Modal.confirm({
        title: "确认",
        content: "是否删除该角色?",
        onOk: () => {
          this.$http.post("/user/deleteModel", { oid }).then(res => {
            if (!res.data.iserror) {
              this.$Notice.success({
                title: "提示",
                desc: "删除成功"
              });
              this.getUserList();
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
    selectionChange(selection) {
      this.selection = selection;
    },
    deleteRow() {
      this.$Modal.confirm({
        title: "提示",
        content: "是否删除选择项?",
        onOk: () => {
          var oids = [];
          for (var i in this.selection) {
            oids.push(this.selection[i].oid);
          }
          this.$http.post("/user/BatchDelete", { oids }).then(res => {
            if (!res.data.iserror) {
              this.$Notice.success({
                title: "提示",
                desc: "删除成功"
              });
              this.getUserList();
            } else {
              this.$Modal.error({
                title: "提示",
                content: res.data.errormsg
              });
            }
          });
        }
      });
    },
    handleSuccess(res, model) {
      model.avatar = res.data.url;
    },
    handleRemove(model) {
      model.avatar = "";
    }
  },
  mounted() {
    this.getUserList();
    this.getRoleList();
  }
};
</script>

<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>