import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import Movie from '@/components/movie/Movie'
	import Hot from '@/components/movie/Hot'
	import Begin from '@/components/movie/Begin'

import Cinema from '@/components/cinema/Cinema'
import User from '@/components/user/User'
import Buy from '@/components/buy/Buy'
  import MovieCard from '@/components/user/MovieCard'

Vue.use(Router)
Vue.use(VueResource)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/taopp-max.png',
  loading: '../static/img/taopp-max.png',
  attempt: 1
})

export default new Router({
  mode : 'history',
  base : __dirname,
  routes: [
    {path: '/',redirect: '/movie'},
    {path: '/movie',component:Movie,children:[
    	{path : '/',component:Hot},
    	{path : 'begin',component:Begin},
    ]},
    {path: '/buy',component: Buy},
    {path: '/cinema',component: Cinema},
    {path: '/user',component: User,children:[
      {path : 'card',component:MovieCard},
    ]},
  ]
})
