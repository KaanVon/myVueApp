var system = [
  {
    path: 'contact',
    meta: { title: '用户管理' },
    component: resolve => {
      require(['@/components/system/contact'], resolve)
    }
  },
  {
    path: 'permission',
    meta: { title: '权限管理' },
    component: resolve => {
      require(['@/components/system/role/index'], resolve)
    }
  },
  {
    path: 'menu',
    meta: { title: '菜单管理' },
    component: resolve => {
      require(['@/components/system/menu/index'], resolve)
    }
  },
  {
    path: 'updatepwd',
    meta: { title: '修改密码' },
    component: resolve => {
      require(['@/components/home/updatepwd'], resolve)
    }
  }
]
var works = [
  {
    path: 'works',
    meta: { title: '著作权管理' },
    component: resolve => {
      require(['@/components/works/index'], resolve)
    }
  },
  {
    path: 'works/create',
    meta: { title: '录入作品' },
    component: resolve => {
      require(['@/components/works/components/create'], resolve)
    }
  },
]

var routes = [{
  path: '/',
  name: 'HelloWorld',
  component: resolve => {
    require(['@/components/home/index'], resolve)
  },
  children: [
    ...system,
    ...works
  ]
},
{
  path: '/login2',
  name: 'login2',
  component: resolve => {
    require(['@/components/account/loginpwd'], resolve)
  }
},
{
  path: '/login',
  name: 'login',
  component: resolve => {
    require(['@/components/account/login'], resolve)
  }
}
]

export default routes
