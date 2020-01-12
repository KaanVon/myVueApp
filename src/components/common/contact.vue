<template>
  <div>
    <div style="display: flex;height: 350px;">
      <div style="flex:1;border-right: 1px solid #ccc; padding:0 10px 0 10px;overflow-x:auto;overflow-x: hidden;">
        <i-Input placeholder="输入搜索" icon="search" v-model="searchKey" @on-change="getSearch"></i-Input>
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
  data() {
    return {
      treeData: [],
      searchKey: "",
      selectedList: []
    };
  },
  methods: {
    getTreeData() {
      var list = [
        { oid: 1, name: "冯凯", gender: 1 },
        { oid: 2, name: "冯艳", gender: 0 }
      ];
      var d = [];
      var that = this;
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
                      click() {
                        var s = {
                          oid: data.params.oid,
                          name: data.params.name,
                          gender: data.params.gender
                        };
                        var b = that.selectedList.some(
                          x => x.oid === data.params.oid
                        );
                        if (!b) {
                          that.selectedList.push(s);
                        } else {
                          that.selectedList.map((item, index) => {
                            if (item.oid === data.params.oid) {
                              that.selectedList.splice(index, 1);
                            }
                          });
                        }
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
    },
    getSearch() {},
    deleteItem(v) {
      this.selectedList.map((item, index) => {
        if (item.oid === v.oid) {
          this.selectedList.splice(index, 1);
        }
      });
    }
  },
  mounted() {
    this.getTreeData();
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
  -webkit-transition: background-color .3s;
  -o-transition: background-color .3s;
  transition: background-color .3s;
  cursor: pointer;
}
</style>