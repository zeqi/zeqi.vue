//import Main from '../main'

// export default [{
//   path: '/',
//   component: Main,
//   children: [{
//     name:'home',
//     path: '/home',
//     component: r => require.ensure([], () => r(require('../components/home/index.vue')), 'home')
//   }]
// }]

export default [{
  path: '/',
  redirect: '/home'
},
{
  name: 'home',
  path: '/home',
  component: r => require.ensure([], () => r(require('../components/home/index.vue')), 'home'),
  meta: { keepAlive: true }
}
]