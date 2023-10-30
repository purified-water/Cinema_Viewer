export default {
    props: ['selectedMovie'],
    data() {
        return {

        }
    },
    template: `
    <div class="container">
  <div class="row d-flex">
    <div class="col-md-5">
      <div class="card border border-0 rounded-1" style="width: 18rem">
        <img
          class="rounded-1"
          :src="selectedMovie.image"
          :alt="selectedMovie.fullTitle"
          style="width: 18rem; height: 24rem; object-fit: cover"
        />
      </div>
    </div>
    <div class="col-md-7">
      <h3>{{selectedMovie.fullTitle}}</h3>
      <h5>Directors</h5>
      <p
        v-if="selectedMovie.directorList"
        v-for="director in selectedMovie.directorList"
        :key="director.id"
      >
        {{director.name}}
      </p>

      <p v-else>{{ selectedMovie.crew.split('(')[0] }}</p>

      <h5>Genre</h5>
      <div class="d-flex flex-row">
        <p
          v-if="selectedMovie.genreList"
          v-for="(genre, index) in selectedMovie.genreList"
          :key="genre.key"
        >
          {{genre.value}}
          <span v-if="index < selectedMovie.genreList.length - 1">,</span>

        </p>
        <p v-else>N/A</p>
      </div>
      

      <h5>Plot</h5>
      <p v-if="selectedMovie.plot">{{selectedMovie.plot}}</p>
      <p v-else>N/A</p>

      <h5>Release Year</h5>
      <p>{{selectedMovie.year}}</p>
      <h5>imDb Score</h5>
      <p
        v-if="selectedMovie && selectedMovie.ratings && selectedMovie.ratings.imDb"
      >
        {{selectedMovie.ratings.imDb}}
      </p>
      <p v-else-if="selectedMovie && selectedMovie.imDbRating">
        {{selectedMovie.imDbRating}}
      </p>
      <p v-else>Rating not available</p>
      <h5>Language</h5>
      <p v-if="selectedMovie.languages">{{selectedMovie.languages}}</p>
      <p v-else>N/A</p>

    </div>
  </div>
  <div class="container">
    <div class="row">
      <h3 m-5>Actor/Actress List</h3>
      <div class="col-md-3 mb-4" v-for="actor in selectedMovie.actorList">
        <div
          class="card border border-0 rounded-top-1 col-md-3 mb-4"
          style="width: 15rem"
        >
          <img
            :key="actor.id"
            class="rounded-top-1"
            :src="actor.image"
            style="width: 15rem; height: 20rem; object-fit: cover"
            id="actor-item"
          />
          <span class="text-center">{{actor.name}}</span>
        </div>
      </div>
    </div>
  </div>
</div>


    `
}