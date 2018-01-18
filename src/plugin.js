import VueOffCanvas from './VueOffCanvas.vue'
import { VueOffCanvasEventBus } from './event-bus.js'

const plugin = {
  install: Vue => {
    Vue.component(VueOffCanvas.name, VueOffCanvas)
    Vue.prototype.$VueOffCanvas = {
      open() {
        VueOffCanvasEventBus.$emit('open')
      },
      close() {
        VueOffCanvasEventBus.$emit('close')
      },
      toggle() {
        VueOffCanvasEventBus.$emit('toggle')
      }
    }
  }
}

VueOffCanvas.install = plugin.install

export default VueOffCanvas
