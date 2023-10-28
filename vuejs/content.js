

export default {
    data() {
        return {
          mostPopularMovies: [],
          popularMoviesPage: 0,


          topRatedMovies: [],
          topRecentMovies: [],

          hoveredMovie: null, // Added to store the currently hovered movie
        }
    },
    //Get data from parent (main.js)
    props: {
      moviesData: Object,
    },
    methods: {
      nextPopularMovies() {
        if (this.popularMoviesPage < 5) {
          this.popularMoviesPage++;
          this.populateMovies();
        } else { //Out of scope
          this.popularMoviesPage = 0;
          this.populateMovies();
        }
      },

      prevPopularMovies() {
        if (this.popularMoviesPage > 0) {
          this.popularMoviesPage--;
          this.populateMovies();
        } else { //Out of scope
          this.popularMoviesPage = 5;
          this.populateMovies();
        }
      },

      populateMovies() {
        this.mostPopularMovies = this.moviesData.MostPopularMovies.slice(
            this.popularMoviesPage * 3, 
            (this.popularMoviesPage + 1) * 3
        );


        this.topRatedMovies = this.moviesData.Top50Movies.slice(0, 3);
        let newestMovies = this.moviesData.MostPopularMovies.sort((a, b) => {
          return b.year - a.year;
        });

        this.topRecentMovies = newestMovies.slice(0, 1);

      },

      
    },
    mounted() {
      this.populateMovies();
    },
   
    
    template: `
    <div class="container p-0">
      <div class="container d-flex justify-content-center">
        <div
          class="card border border-0 rounded-1"
          style="width: 18rem; height: 26rem"
          v-for="movie in topRecentMovies" :key="movie.id"
        >
          <img 
            class="rounded-1" 
            :src="movie.image"
            :alt="movie.title" 
            style="width: 100%; height: 100%; object-fit: cover"
            />
        </div>
      </div>


      <!--- Most popular --->
      <div class="row">
        <span class="fs-6">Most popular</span>
      </div>

      <div class="d-flex justify-content-around">
        <a
          class="page-link d-flex align-items-center"
          aria-label="Previous" 
          @click="prevPopularMovies"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>


        <div class="movie-item" v-for="movie in mostPopularMovies" :key="movie.id"> 
          <div class="container" 
          style="width: 100%; height: 100%;"
          
          >
            <img
              @mouseenter="hoveredMovie = movie"
              @mouseleave="hoveredMovie = null"
              class="rounded-1"
              :src="movie.image"
              :alt="movie.title"
              style="width: 100%; height: 100%; object-fit: fill"
            />
            <div 
              v-if="hoveredMovie === movie" 
              class="card text-bg-dark">{{ movie.title }} ({{ movie.year}})
            </div>
          </div>
         
        </div>

        <a 
        class="page-link d-flex align-items-center" 
        aria-label="Next"
        @click="nextPopularMovies"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </div>
      <!--- Top rating --->

      <div class="row">
        <span class="fs-6">Top rating</span>
      </div>

      <div class="d-flex justify-content-around">
        <a
          class="page-link d-flex align-items-center"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>


        <div class="movie-item" v-for="movie in topRatedMovies" :key="movie.id"> 
          <div class="container" 
          style="width: 100%; height: 100%;"
          
          >
            <img
              @mouseenter="hoveredMovie = movie"
              @mouseleave="hoveredMovie = null"
              class="rounded-1"
              :src="movie.image"
              :alt="movie.title"
              style="width: 100%; height: 100%; object-fit: fill"
            />
            <div 
              v-if="hoveredMovie === movie" 
              class="card text-bg-dark" style=" z-index: 1000;">{{ movie.title }} ({{ movie.year}})
            </div>
          </div>
         
        </div>


        <a class="page-link d-flex align-items-center" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </div>
    </div>






  


    `
}