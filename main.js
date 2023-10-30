import vue_head from "./vuejs/head.js"
import vue_nav from './vuejs/nav.js'
import vue_content from './vuejs/content.js'
import vue_footer from './vuejs/footer.js'
import movies from './db/data.js'
import dbProvider from "./db/dbProvider.js"
import DetailScreen from './vuejs/detail_screen.js';
import SearchScreen from './vuejs/search_screen.js';
import { computed } from 'vue'


export default {
    data() {
        return {
          selectedMovie: null,
          readyToShow: true,

          mode: 'light',
          data: movies,
          popularMovies: [],
          popularPages: {},

          topRatedMovies: [],
          topRatedPages: {},

          recentMovies: [],
          recentPages: {},

          isSearching: false,
          searchingMovie: null,

        }
    },
    provide() {
      return {
        popularMovies: computed(() => this.popularMovies),
        topRatedMovies: computed(() => this.topRatedMovies),
        recentMovies: computed(() => this.recentMovies),
        popularPages: computed(() => this.popularPages),
        topRatedPages: computed(() => this.topRatedPages),
        recentPages: computed(() => this.recentPages),
      }
    },
    methods: {
      getPopularMovies() {

        dbProvider.fetch("get/mostpopular/?per_page=3&page=1", this.data)
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
        dbProvider.fetch(`get/mostpopular/?per_page=3&page=${n}`, this.data)
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

        dbProvider.fetch("get/top50/?per_page=3&page=1", this.data)
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
        dbProvider.fetch(`get/top50/?per_page=3&page=${n}`, this.data)
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

        dbProvider.fetch("get/movie/?per_page=1&page=1", this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.recentMovies = result.data;
            console.log('recentMovies', this.recentMovies)

          })
          .catch(error => {
            console.error(error);
          });

       
      },

      // hien thi detail
      showMovieDetail(movie) {
        dbProvider.fetch(`detail/movie/${movie.id}`, this.data)
          .then(result => {

            this.selectedMovie = result.data;
            console.log('SELECTED', this.selectedMovie);

            if (this.selectedMovie === null || typeof this.selectedMovie === 'undefined') {
              dbProvider.fetch(`detail/top50/${movie.id}`, this.data)
              .then(result => {
    
                this.selectedMovie = result.data;
                console.log('SELECTED Agin', this.selectedMovie);


                if (this.selectedMovie === null || typeof this.selectedMovie === 'undefined') {
                  dbProvider.fetch(`detail/mostPopular/${movie.id}`, this.data)
                  .then(result => {
        
                    this.selectedMovie = result.data;
                    console.log('SELECTED', this.selectedMovie);
        
                  })
                  .catch(error => {
                    console.error(error);
                  });
                }
              })
              .catch(error => {
                console.error(error);
              });
            }

          })
          .catch(error => {
            console.error(error);
          });
          //If movie is not in db yet
        
        
        this.readyToShow = false;
      },
      //Quay ve
      goBackToContent() {
        this.selectedMovie = null;
        this.isSearching = false;
        this.searchingMovie = null;
        this.readyToShow = true;
      },

      toggle() {
        if (this.mode === 'light') {
            this.mode = 'dark';
        } else {
            this.mode = 'light';
        }
      },

      //Tim kiem
      searchData(searchInput) {
        //Lay movie truoc
        console.log('URL', `search/movie/${searchInput}?`)
        dbProvider.fetch(`search/movie/${searchInput}?`, this.data)
          .then(result => {
            // Access the data inside the fulfilled promise
            this.searchingMovie = result.data;
            this.isSearching = true;
            console.log('SEARCHED', this.searchingMovie);


          })
          .catch(error => {
            console.error(error);
          });

        this.readyToShow = false;
      }

    },

    components: {
        vue_head, 
        vue_nav,  
        vue_content, 
        vue_footer,
        movies,
        dbProvider,
        DetailScreen,
        SearchScreen
    },
    mounted() {
      this.getPopularMovies();
      this.getTopRatedMovies();
      this.getRecentMovies();
    },
    template: `
    <div class="container " :class="mode" style="max-width: 1200px;">
      <div class="row">
        <vue_head @toggle='toggle'/>
      </div>
      <div class="row mb-3">
      <vue_nav :mode="mode" 
        @goBack="goBackToContent"
        @search="searchData"
        />
      </div>
      <div class="row">
        <vue_content
          v-if="readyToShow"
          @showDetail="showMovieDetail"
          @changePopularPage="changePopularPage"
          @changeTopRatedPage="changeTopRatedPage"
        />
        <DetailScreen v-if="selectedMovie" :selectedMovie="selectedMovie"/> 
        <SearchScreen :mode="mode" v-if="isSearching" :searchingMovie="searchingMovie"/>
      </div>

      <vue_footer/>
    </div>

    `
}
