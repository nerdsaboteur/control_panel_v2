const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Index.vue')
  }]
},
{
  path: '/stuffz',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Stuffz.vue')
  }]
},
{
  path: '/thingz',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Thingz.vue')
  }]
},
{
  path: '/detail/task/:id',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Detail.vue')
  }]
}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
