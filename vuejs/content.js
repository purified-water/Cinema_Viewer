import dbProvider from "../db/dbProvider.js";
import movies from '../db/data.js'

export default {
    inject: ['popularMovies', 'topRatedMovies', 'recentMovies', 'popularPages', 'topRatedPages'],
    data() {
        return {
          popularMoviesPage: 0,

          hoveredMovie: null, // Added to store the currently hovered movie
        }
    },
    components: {
      dbProvider,
      movies
    },
    // Get data from parent (main.js)
    // props: {
    //   mostPopularMovies: Object,
    // },
    methods: {

      showMovieDetail(movie) {

        this.$emit('showDetail', movie);
      },

      nextPopularMovies() {
        console.log('NEX', this.n)

        this.popularMoviesPage = this.n;
        if (this.popularMoviesPage < 5) {
          this.$emit('changePopularPage', this.n + 1);

        } else { //Out of scope
          this.$emit('changePopularPage', 0);

        }
      },

      prevPopularMovies() {
        console.log('Prev', this.n)
        this.popularMoviesPage = this.n;
        if (this.popularMoviesPage > 0) {
          this.$emit('changePopularPage', this.n - 1);

        } else { //Out of scope
          this.$emit('changePopularPage', 5);

        }
      },

      
      // populateMovies() {

      //   console.log('ppop page', this.popularPages)
      //   console.log('CONTENT', this.popularMovies)
      //   if (this.popularMovies) {
      //     this.threePopularMovies = this.popularMovies.slice(
      //       this.popularMoviesPage * 3,
      //       (this.popularMoviesPage + 1) * 3
      //     );
      //   }


      //   // this.topRatedMovies = this.moviesData.Top50Movies.slice(0, 3);
      //   // let newestMovies = this.moviesData.MostPopularMovies.sort((a, b) => {
      //   //   return b.year - a.year;
      //   // });

      //   // this.topRecentMovies = newestMovies.slice(0, 1);

      // },

      
    },
    // mounted() {
    //   this.populateMovies();
    // },
   
    
    template: `  
    <div class="container p-0">
  <div class="container d-flex justify-content-center">
    <div
      class="card border border-0 rounded-1"
      style="width: 18rem; height: 26rem"
      v-for="movie in recentMovies"
      :key="movie.id"
    >
      <img
        class="rounded-1"
        @click="showMovieDetail(movie)"
        :src="movie.image"
        :alt="movie.title"
        style="width: 100%; height: 100%; object-fit: cover"
      />
    </div>
  </div>

  <!--- Most popular --->
  <div class="row">
  <div class="col-6 d-flex align-items-center">
    <span class="fs-3">Most Popular</span>
  </div>
  <div class="col-6 d-flex justify-content-end">
    <ul class="pagination">
      <li
        v-for="n in popularPages.total_pages"
        :class="{ active: n === popularPages.page }"
        class="page-item-m"
      >
        <a class="page-link" href="#" @click="$emit('changePopularPage', n)">
        </a>
      </li>
    </ul>
  </div>
</div>

  <div class="d-flex justify-content-around">
    <a
      class="page-link d-flex align-items-center"
      aria-label="Previous"
      @click="prevPopularMovies"
    >
      <span aria-hidden="true">&lt;</span>
    </a>

    <div class="movie-item" v-for="movie in popularMovies" :key="movie.id">
      <div class="container" style="width: 100%; height: 100%">
        <img
          @mouseenter="hoveredMovie = movie"
          @mouseleave="hoveredMovie = null"
          @click="showMovieDetail(movie)"
          class="rounded-1"
          :src="movie.image"
          :alt="movie.title"
          style="width: 100%; height: 100%; object-fit: fill"
        />
        <div v-if="hoveredMovie === movie" class="card text-bg-dark">
          {{ movie.title }} ({{ movie.year}})
        </div>
      </div>
    </div>

    <a
      class="page-link d-flex align-items-center"
      aria-label="Next"
      @click="nextPopularMovies"
      >
      <span aria-hidden="true">&gt;</span>
    </a>
  </div>
  <!--- Top rating --->

  <div class="row">
  <div class="col-6 d-flex align-items-center">
    <span class="fs-3">Top Rating</span>
  </div>
  <div class="col-6 d-flex justify-content-end">
    <ul class="pagination">
      <li
        v-for="n in topRatedPages.total_pages"
        :class="{ active: n === topRatedPages.page }"
        class="page-item-m"
      >
        <a class="page-link" href="#" @click="$emit('changeTopRatedPage', n)">
        </a>
      </li>
    </ul>
  </div>
</div>

  <div class="d-flex justify-content-around">
    <a
      class="page-link d-flex align-items-center"
      href="#"
      aria-label="Previous"
    >
      <span aria-hidden="true">&lt;</span>
    </a>

    <div class="movie-item" v-for="movie in topRatedMovies" :key="movie.id">
      <div class="container" style="width: 100%; height: 100%">
        <img
          @mouseenter="hoveredMovie = movie"
          @mouseleave="hoveredMovie = null"
          @click="showMovieDetail(movie)"
          class="rounded-1"
          :src="movie.image"
          :alt="movie.title"
          style="width: 100%; height: 100%; object-fit: fill"
        />
        <div
          v-if="hoveredMovie === movie"
          class="card text-bg-dark"
          style="z-index: 1000"
        >
          {{ movie.title }} ({{ movie.year}})
        </div>
      </div>
    </div>

    <a class="page-link d-flex align-items-center" href="#" aria-label="Next">
      <span aria-hidden="true">&gt;</span>
    </a>
  </div>
</div>

  


    `
}