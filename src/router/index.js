import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import chatRoom from '@/components/chatRoom'
import register from '@/components/pages/register'

import mainboard from '@/components/mainBoard'
import socialhall from '@/components/socialhall'
import UserHouse from '@/components/pages/UserHouse'
import UserHosting from '@/components/pages/UserHosting'
import UserHistory from '@/components/pages/UserHistory'
import Login from '@/components/login'
//-------------33------------------------------------- 
import FAQ from '@/components/pages/Vue_FAQ'
import consumption from '@/components/Vue_consumptionHis'
import deposit from '@/components/Vue_deposit'
import member from '@/components/Vue_member'
import memberJoing from '@/components/Vue_memberJoing'
import memberCollect from '@/components/Vue_memberCollect'
import memberHosting from '@/components/Vue_memberHosting'
import memberHistory from '@/components/Vue_memberHistory'
import memberFollow from '@/components/Vue_memberFollow'
import memberLucky from '@/components/Vue_memberLuck'
//-------------------33-------------------------------------
//------------------------ kk------------------------
import newActivity from '@/components/kuoNewActivity_Vue'
import activity from '@/components/kuoActivity_Vue'
import payPage from '@/components/kuoPayPage_Vue'
import actLocations from '@/components/kuoGpsPage_Vue'
import newActFinish from '@/components/kuoNewActivityFinish'

//------------------------ kk------------------------


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
          path:'login',
          name:'login',
          component: Login,
        },
        {
          path:'consumption',
          name:'consumption',
          component: consumption,
        },
        {
          path:'/member',
          name:'member',
          component: member,
          children:[
            {
              path:'memberJoing',
              name:'memberJoing',
              component: memberJoing,
            },
            {
              path:'memberCollect',
              name:'memberCollect',
              component: memberCollect,
            },
            {
              path:'memberHosting',
              name:'memberHosting',
              component: memberHosting,
            },
            {
              path:'memberHistory',
              name:'memberHistory',
              component: memberHistory,
            },
            {
              path:'memberFollow',
              name:'memberFollow',
              component: memberFollow,
            },
            {
              path:'memberLucky',
              name:'memberLucky',
              component: memberLucky,
            },
          ]
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
        {
          path:'/userhouse',
          name:'userhouse',
          component:UserHouse,
          children:[
            {
              path:'userhosting',
              name:'userhosting',
              component: UserHosting,
            },
            {
              path:'userhistory',
              name:'userhistory',
              component: UserHistory,
            },
          ]
        },
        {
          path: '/newActivity',
          name: 'newActivity',
          component: newActivity
          
        },   
         {
          path: '/activity/',
          name: 'activity',
          component: activity
    
        }, 
         {
          path: '/payPage',
          name: 'payPage',
          component: payPage
    
        },
         {
          path: '/actLocations',
          name: 'actLocations',
          component: actLocations
    
        },
         {
          path: '/newActFinish',
          name: 'newActFinish',
          component: newActFinish
        },
      ]
    },
  ]
})
