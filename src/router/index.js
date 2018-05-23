import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function page(name) {
  try {
    return require(`@/pages/${name}`).default
  } catch (e) {
    console.warn(`cant find page '${name}'`)
    return require(`@/pages/base-default`).default
  }
}

function route(path, component, children = []) {
  return {
    path: path,
    component: component,
    children: children
  }
}

export default new Router({
  routes: [
    route('/', page('index')),
    route('/cart', page('cart')),
    route('/login', page('login')),
    route('/sign_up', page('sign-up')),
    route('/beers/:id', page('beer'))
  ]
})
