import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Field from '@/components/organisms/Field.vue'
import Property from '@/components/molecules/Property.vue'
import SampleNode from '@/components/sample/SampleNode.vue'
import Sandbox from '@/components/sample/Sandbox.vue'
import Animation from '@/components/sample/Animation.vue'
import SampleCanvas from '@/components/sample/SampleCanvas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sample_node',
    name: 'SampleNode',
    component: SampleNode,
  },
  {
    path: '/animation',
    name: 'Animation',
    component: Animation,
  },
  {
    path: '/sandbox',
    name: 'Sandbox',
    component: Sandbox,
  },
  {
    path: '/property',
    name: 'Property',
    component: Property,
  },
  {
    path: '/field',
    name: 'Field',
    component: Field,
  },
  {
    path: '/samplecanvas',
    name: 'SampleCanvas',
    component: SampleCanvas,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
