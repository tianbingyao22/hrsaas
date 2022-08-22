import Layout from '@/layout'
export default {
  path: '/permissions',
  component: Layout,
  meta: {
    id: 'permissions'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
