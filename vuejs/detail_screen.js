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
      <h5>Cốt truyện</h5>
      <p>{{selectedMovie.plot}}</p>

      <h5>Năm</h5>
      <p>{{selectedMovie.year}}</p>
      <h5>imDb Score</h5>
      <p>{{selectedMovie.imDbRating}}</p>
      <h5>Ngôn ngữ</h5>
      <p>{{selectedMovie.language}}</p>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <h3 m-5>Danh sách diễn viên</h3>
      <div class="col-md-3 mb-4"
      v-for="actor in selectedMovie.actorList"
      >
        <div class="card border border-0 rounded-top-1 col-md-3 mb-4" style="width: 15rem">
          <img
            
            :key="actor.id"
            class="rounded-top-1"
            :src="actor.image"
            style="width: 15rem; height: 20rem; object-fit: cover"
            id="actor-item"
          />
        </div>
      </div>
    </div>
  </div>
</div>


    `
}