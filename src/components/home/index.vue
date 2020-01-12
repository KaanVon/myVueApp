<template>
  <div>
    <div class="header">
      <div class="header-logo">
        <img src="../../assets/img/logo2.png" />
        <span class="header-title">成长成就未来</span>
      </div>
      <Row type="flex" justify="end" align="middle">
        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
          <div class="main-user-name">
            <span>{{ username }}</span>
            <Icon type="ios-arrow-down"></Icon>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem name="ownSpace">修改密码</DropdownItem>
            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar
          size="large"
          src="../../assets/img/logo2.png"
          style="background: #619fe7;margin-left: 10px;margin-right: 40px;"
        ></Avatar>
      </Row>
    </div>
    <div class="main-container">
      <Card :padding="0" style="font-size: 12px;">
        <div class="main-container-content">
          <div class="main-container-menu">
            <Menu
              width="auto"
              :active-name="activename"
              :open-names="openNames"
              @on-select="menuSelect"
              ref="menu"
            >
              <template v-for="x in menuList">
                <Menu-Item v-if="x.submenulist.length <= 0" :name="x.path" :key="x.name">
                  <Icon :type="x.icon"></Icon>
                  <span class="layout-text">{{ x.name }}</span>
                </Menu-Item>
                <Submenu v-else :name="x.name" :key="x.name">
                  <template slot="title">
                    <Icon :type="x.icon"></Icon>
                    <span>{{x.name}}</span>
                  </template>
                  <Menu-Item v-for="z in x.submenulist" :name="z.path" :key="z.name">
                    <Icon :type="z.icon"></Icon>
                    <span class="layout-text">{{ z.name }}</span>
                  </Menu-Item>
                </Submenu>
              </template>
            </Menu>
            <!-- <Spin fix v-if="menuList.length <= 0"></Spin> -->
          </div>
          <div class="main-container-conent">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Util from "@/assets/js/util";
export default {
  data() {
    return {
      menuList: [
        {
          name: "系统管理",
          path: "",
          icon: "md-cog",
          submenulist: [
            { name: "用户管理", path: "/contact", icon: "md-contact" },
            { name: "权限管理", path: "/permission", icon: "md-key" }
          ]
        }
      ],
      openNames: ["系统管理"],
      username: "冯凯",
      activename: "",
      avatar: ""
    };
  },
  methods: {
    handleClickUserDropdown(name) {
      console.log(name);
      switch (name) {
        case "loginout":
          this.exit();
          break;
        case "ownSpace":
          this.$router.push("/updatepwd");
          break;
      }
    },
    menuSelect(active) {
      this.$router.push(active).catch(err => {});
    },
    exit() {
      this.$Modal.confirm({
        title: "提示",
        content: "是否退出?",
        onOk: () => {
          Util.removeUser();
          this.$router.push({ path: "/login" });
          // this.$router.push({ path: '/login', query: { f: this.$route.path } });
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  height: 80px;
  background-color: #495060;
  display: flex;
  flex-direction: row;
  padding: 0 35px;
  align-items: center;
  color: #fff;
}

.header-logo {
  display: flex;
  height: 80px;
  flex: 1;
  align-items: center;
}

.header-title {
  color: #fff;
  font-size: 24px;
  margin-left: 5px;
}

.main-user-name {
  width: 80px;
  text-align: right;
  cursor: pointer;
}

.main-container {
  background-color: #eeeeee;
  padding: 30px 35px;
  min-height: calc(100vh - 80px);
}

.main-container-content {
  padding: 1px;
  display: flex;
}

.main-container-menu {
  width: 205px;
  min-width: 205px;
  border-right: 1px solid #dddee1;
  position: relative;
}

.main-container-conent {
  padding: 25px 30px;
  flex: 1;
  overflow: auto;
}
</style>