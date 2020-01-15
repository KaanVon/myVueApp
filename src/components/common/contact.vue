<template>
  <div>
    <div style="display: flex;height: 350px;">
      <div
        style="flex:1;border-right: 1px solid #ccc; padding:0 10px 0 10px;overflow-x:auto;overflow-x: hidden;"
      >
        <i-Input placeholder="输入搜索" icon="search" v-model="searchKey" @on-change="getTreeData"></i-Input>
        <tree multiple :data="treeData"></tree>
      </div>
      <div style="flex:1;padding-left:20px;">
        <div class="selected-title">已选择的成员</div>
        <div class="selected-container">
          <div v-for="(x, index) in selectedList" class="selected" :key="index">
            <Icon type="md-person" size="16" :style="{color:x.gender==0?'#f56a00':'#7DA4D1'}"></Icon>
            <span class="selected-name">{{x.name}}</span>
            <Icon type="md-close" class="close" @click.native="deleteItem(x)"></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterUsers: {
      type: Array
    }
  },
  data() {
    return {
      treeData: [],
      searchKey: "",
      selectedList: []
    };
  },
  methods: {
    getTreeData() {
      var oids = [];
      if (this.filterUsers)
        this.filterUsers.forEach(item => {
          oids.push(item.uoid);
        });
      var para = {
        pageIndex: 1,
        pageSize: 1000,
        searchKey: this.searchKey,
        oids
      };
      this.$http.post("/User/List", para).then(res => {
        var list = res.data.data.list;
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
                  }
                },
                [
                  h("icon", {
                    props: {
                      type: "ios-person"
                    },
                    style: {
                      marginRight: "5px",
                      color: data.params.gender == 1 ? "#7DA4D1" : "#f56a00"
                    }
                  }),
                  h(
                    "span",
                    {
                      style: "cursor: pointer;margin-right:5px;",
                      on: {
                        click: () => {
                          var s = {
                            oid: data.params.oid,
                            name: data.params.name,
                            gender: data.params.gender
                          };
                          var b = this.selectedList.some(
                            x => x.oid === data.params.oid
                          );
                          if (!b) {
                            this.selectedList.push(s);
                          } else {
                            this.selectedList.map((item, index) => {
                              if (item.oid === data.params.oid) {
                                this.selectedList.splice(index, 1);
                              }
                            });
                          }
                          this.$emit("func", this.selectedList);
                        }
                      }
                    },
                    data.params.name
                  )
                ]
              );
            }
          });
        });
        this.treeData = d;
      });
    },
    deleteItem(v) {
      this.selectedList.map((item, index) => {
        if (item.oid === v.oid) {
          this.selectedList.splice(index, 1);
        }
      });
      this.$emit("func", this.selectedList);
    }
  },
  mounted() {
    
  },
  watch:{
    filterUsers(a) {
      this.getTreeData();
      this.selectedList = []
    }
  }
};
</script>

<style scoped>
.selected-title {
  color: #787878;
  margin-bottom: 10px;
  font-size: 14px;
}

.selected-container {
  overflow: auto;
  height: calc(100% - 25px);
  padding-right: 10px;
  cursor: default;
}

.selected {
  font-size: 12px;
  line-height: 12px;
  padding: 3px 0;
  vertical-align: middle;
}

.selected-name {
  padding-left: 5px;
}

.close {
  float: right;
  color: #111;
  opacity: 0.4;
  -webkit-transition: background-color 0.3s;
  -o-transition: background-color 0.3s;
  transition: background-color 0.3s;
  cursor: pointer;
}
</style>