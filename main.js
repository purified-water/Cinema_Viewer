import vue_head from "./vuejs/head.js"
import vue_nav from './vuejs/nav.js'
import vue_content from './vuejs/content.js'
import vue_footer from './vuejs/footer.js'
import movies from './db/data.js'
import dbProvider from "./db/dbProvider.js"
import { computed } from 'vue'



export default {
    data() {
        return {
          mode: 'light',
          data: movies,
          popularMovies: [],
          popularPages: {},

          topRatedMovies: [],
          topRatedPages: {},

          recentMovies: []
        }
    },
    provide() {
      return {
        popularMovies: computed(() => this.popularMovies),
        topRatedMovies: computed(() => this.topRatedMovies),
        recentMovies: computed(() => this.recentMovies),
        popularPages: computed(() => this.popularPages),
        topRatedPages: computed(() => this.topRatedPages),
      }
    },
    methods: {
      getPopularMovies() {

        dbProvider.fetch("get/MostPopularMovies/?per_page=3&page=1", this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.popularMovies = result.data;
            this.popularPages = {
              page: result.page,
              total_pages: result.total_pages,
            }

            console.log(this.popularPages)
          })
          .catch(error => {
            console.error(error);
          });

       
      },
      changePopularPage(n) {
        dbProvider.fetch(`get/MostPopularMovies/?per_page=3&page=${n}`, this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.popularMovies = result.data;
            this.popularPages = {
              page: result.page,
              total_pages: result.total_pages,
            }

          })
          .catch(error => {
            console.error(error);
          });
      },


      getTopRatedMovies() {

        dbProvider.fetch("get/Top50Movies/?per_page=3&page=1", this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.topRatedMovies = result.data;
            this.topRatedPages = {
              page: result.page,
              total_pages: result.total_pages,
            }

          })
          .catch(error => {
            console.error(error);
          });

       
      },

      changeTopRatedPage(n) {
        dbProvider.fetch(`get/Top50Movies/?per_page=3&page=${n}`, this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.topRatedMovies = result.data;
            this.topRatedPages = {
              page: result.page,
              total_pages: result.total_pages,
            }


          })
          .catch(error => {
            console.error(error);
          });
      },


      getRecentMovies() {

        dbProvider.fetch("get/Movies/?per_page=1&page=1", this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.recentMovies = result.data;
            console.log('recentMovies', this.recentMovies)

          })
          .catch(error => {
            console.error(error);
          });

       
      },


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
        vue_footer,
        movies,
        dbProvider
    },
    mounted() {
      this.getPopularMovies();
      this.getTopRatedMovies();
      this.getRecentMovies();
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
        <vue_content
          @changePopularPage="changePopularPage"
          @changeTopRatedPage="changeTopRatedPage"
        />
      </div>
      <vue_footer/>
    </div>

    `
}
