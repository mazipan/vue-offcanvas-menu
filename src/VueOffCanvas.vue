<template>
  <div class="VueOffCanvas">

    <div class="overlay"
        :class="{'overlay--show': isOpen}"
        @click="toggleOffCanvas">
    </div>

    <div class="container">
			<div class="menu-wrap">

				<nav class="menu">
					<div class="icon-list">
						<a href="#"><i class="fa fa-fw fa-star-o"></i><span>Favorites</span></a>
						<a href="#"><i class="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>
						<a href="#"><i class="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>
						<a href="#"><i class="fa fa-fw fa-comment-o"></i><span>Comments</span></a>
						<a href="#"><i class="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>
						<a href="#"><i class="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
					</div>
				</nav>

				<button class="close-button"
                @click="toggleOffCanvas">
                Close Menu
        </button>

				<div class="morph-shape"
            id="morph-shape">

					<svg xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 100 800"
              preserveAspectRatio="none">
						<path d="M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z"/>
					</svg>

				</div>

			</div>
			<button class="menu-button"
              @click="toggleOffCanvas">
              Hamburger Menu
      </button>
			<div class="content-wrap">
				<div class="content">

					<header class="codrops-header">
						<h1>
              Off-Canvas Menu Effects
              <span>Showing (off-canvas) menus stylishly</span>
            </h1>

            <nav class="codrops-demos">
							<a class="current-demo" @click="toggleOffCanvas">OPEN Off-Canvas</a>
						</nav>

            <div class="codrops-links">
							<a href="http://tympanus.net/codrops/?p=20100"><span><i class="fa fa-link"></i> See Codrops Article</span></a>
						</div>
            <div class="codrops-links">
							<a href="https://github.com/mazipan/vue-offcanvas-menu"><span><i class="fa fa-github"></i> See Github</span></a>
						</div>
					</header>

				</div>
			</div><!-- /content-wrap -->
		</div><!-- /container -->

  </div>
</template>

<script>
import Snap from 'snapsvg'
import { VueOffCanvasEventBus } from './event-bus.js'

export default {
  name: 'VueOffCanvas',
  data () {
    return {
      isOpen: false,
      isAnimating: false,
      morphEl: null,
      s: null,
      path: null,
      initialPath: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
      pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z'
    }
  },
  created () {
    // listen eventBus
    VueOffCanvasEventBus.$on('open', this.openOffCanvas)
    VueOffCanvasEventBus.$on('close', this.closeOffCanvas)
    VueOffCanvasEventBus.$on('toggle', this.toggleOffCanvas)
  },
  beforeDestroy () {
    VueOffCanvasEventBus.$off('open')
    VueOffCanvasEventBus.$off('close')
    VueOffCanvasEventBus.$off('toggle')
  },
  mounted () {
    this.morphEl = document.getElementById('morph-shape')
    this.s = Snap(this.morphEl.querySelector('svg'))
    this.path = this.s.select('path')
  },
  methods: {
    startAnimate() {
      if(this.isAnimating) return false
      this.isAnimating = true
    },
    toggleOffCanvas() {
      this.startAnimate()

      if (this.isOpen) {
        this.closeOffCanvas()
      } else {
        this.openOffCanvas()
      }
    },
    openOffCanvas() {
      this.startAnimate()
      this.isOpen = true

      document.body.classList.add('show-menu')
      this.path.animate({'path': this.pathOpen}, 400, mina.easeinout, () => {
        this.isAnimating = false;
      })
    },
    closeOffCanvas() {
      this.startAnimate()
      this.isOpen = false

      document.body.classList.remove('show-menu')
      setTimeout(() => {
        this.path.attr('d', this.initialPath)
        this.isAnimating = false
      }, 300)
    }
  }
}
</script>

<style lang="scss">
@import './elastic.scss';
</style>
