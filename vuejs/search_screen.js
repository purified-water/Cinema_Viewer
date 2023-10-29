export default {
    props: ['searchingMovie', ['mode']],
    data() {
        return {

        }
    },

    methods: {
        shortPlot(plot) {
            console.log('plot', plot)
            if (plot) {
                //Lay 15 tu cua plot thoi
                return plot.split(' ').slice(0, 15).join(' ') + "...";
            } 
            return '';
       
        },
        // showMovieDetail(movie) {

        //     this.$emit('showDetail', movie);
        //   },
    
    },
    template: `
    <div class="container">
    <div class="row">
        <div class="col-md-3 mb-4" v-for="movie in searchingMovie" :key="movie.id">
            <div class="card border border-0 rounded-top-1" style="width: 18rem">
            <img
                @click="showMovieDetail(movie)"
                class="rounded-top-1"
                :src="movie.image"
                :alt="movie.title"
                style="width: 18rem; height: 24rem; object-fit: cover"
            />
            <div class="card-body border border-0 rounded-1" :class="{ 'dark': mode === 'dark' }" style="height: 200px">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ shortPlot(movie.plot) }}</p>
                <div class="row d-flex">
                <p class="col-md-6">{{ movie.runtimeStr }}</p>
                <p class="col-md-6 d-flex justify-content-end">{{ movie.ratings.imDb }}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
  </div>


    `
}