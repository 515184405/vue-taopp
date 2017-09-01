import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Movie from '@/components/movie/Movie'
	import Hot from '@/components/movie/Hot'
	import Begin from '@/components/movie/Begin'

import Cinema from '@/components/cinema/Cinema'
import User from '@/components/user/User'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode : 'history',
  base : __dirname,
  routes: [
    {path: '/',redirect: '/movie'},
    {path: '/movie',component:Movie,children:[
    	{path : '/',component:Hot},
    	{path : 'begin',component:Begin},
    ]},
    {path: '/cinema',component: Cinema},
    {path: '/user',component: User},
  ]
})
