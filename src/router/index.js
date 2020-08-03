import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import chatRoom from '@/components/chatRoom'
import consumptionHis from '@/components/Vue_consumptionHis'
import FAQ from '@/components/pages/Vue_FAQ'
import register from '@/components/pages/register'
import deposit from '@/components/Vue_deposit'

import mainboard from '@/components/mainBoard'
import socialhall from '@/components/socialhall'
import StarRate from '@/components/StarRate'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainBoard',
      component: mainboard,
      children:[
        {
          path:'register',
          name:'register',
          component: register,
        },
        {
          path:'socialhall',
          name:'socialhall',
          component: socialhall,
        },
        {
          path:'FAQ',
          name:'FAQ',
          component: FAQ,
        },
        {
          path:'deposit',
          name:'deposit',
          component: deposit,
        },
      ]
    },
    {
      path: '/consumptionHis',
      name: 'consumptionHis',
      component: consumptionHis
    },
    {
      path: '/StarRate',
      name: 'StarRate',
      component: StarRate
    },
  ]
})
