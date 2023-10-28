import vue_head from "./vuejs/head.js"
import vue_nav from './vuejs/nav.js'
import vue_content from './vuejs/content.js'
import vue_footer from './vuejs/footer.js'

export default {
    data() {
        return {
          mode: 'light',
        }
    },
    methods: {
      toggle() {
        if (this.mode === 'light') {
            this.mode = 'dark';
        } else {
            this.mode = 'light';
        }

        console.log('Toggled')
      }

    },
    components: {
        vue_head, 
        vue_nav,  
        vue_content, 
        vue_footer
    },
    template: `
    <div class="container " :class="mode" style="max-width: 1200px">
      <div class="row">
        <vue_head @toggle='toggle'/>
      </div>
      <div class="row mb-3">
      <vue_nav :mode="mode" />
      </div>
      <div class="row">
        <vue_content/>
      </div>
      <vue_footer/>
    </div>

    `
}
