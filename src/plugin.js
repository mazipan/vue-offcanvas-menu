import Component from './Component.vue'

const plugin = {
  install: Vue => {
    Vue.component(Component.name, Component)
  }
}

Component.install = plugin.install
export default Component
