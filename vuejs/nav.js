import dbProvider from '../db/dbProvider.js';

export default {

    props:['mode'],
    data() {
        return {
          searchInput: '', 
          isLoading: false,
        };
      },
    
    methods: {
        goBack() {
            this.isLoading = true;
            setTimeout(() => {
                this.$emit('goBack');
                this.isLoading = false;
              }, 500);
        },

        searchData() {
            this.$emit('search', this.searchInput)
        }
        
    },
    template: `
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">

        Loading...
      </div>
    </div>
    <nav class="navbar navbar-expand-lg border border-0.5 rounded-2 {{ mode }}" id="navbar">
        <div class="container-fluid">
        <a class="navbar-brand" href="#" @click="goBack">Home</a>

        <form class="d-flex" role="search" @submit.prevent="searchData">
            <div class="form-group me-2">
                <input type="text" class="form-control" placeholder="Search" v-model="searchInput" />
            </div>
            <input type="submit" class="btn btn-outline-success" value="Search" id="searchbtn" />
        </form>
        </div>
    </nav>
    `
}