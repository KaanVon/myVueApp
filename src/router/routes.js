var system = [
    {
        path:'/contact',
        meta: { title: '用户管理' },
        component: resolve => {
            require(['@/components/system/contact'],resolve)
        }
    },
    {
        path:'/permission',
        meta: { title: '权限管理' },
        component: resolve => {
            require(['@/components/system/role/index'],resolve)
        }
    },
    {
        path: '/updatepwd',
        meta: { title: '修改密码' },
        component: resolve => {
          require(['@/components/home/updatepwd'], resolve)
        }
    }
]


var routes = [{
    path: '/',
    name: 'HelloWorld',
    component: resolve => {
      require(['@/components/home/index'], resolve)
    },
    children:[
        ...system
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['@/components/account/loginpwd'], resolve)
    }
  }
]

export default routes
