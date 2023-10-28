import vue_head from "./vuejs/head.js"
import vue_nav from './vuejs/nav.js'
import vue_content from './vuejs/content.js'
import vue_footer from './vuejs/footer.js'

export default {
    data() {
        return {

        }
    },
    components: {
        vue_head, 
        vue_nav,  
        vue_content, 
        vue_footer
    },
    template: `
    <div class="container bg-light" style="max-width: 1200px">
      <div class="row">
        <vue_head />
      </div>
      <div class="row mb-3">
        <vue_nav/>
      </div>
      <div class="row">
        <vue_content/>
      </div>
      <vue_footer/>
    </div>

    `
}
