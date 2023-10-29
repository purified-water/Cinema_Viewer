import dbProvider from '../db/dbProvider.js';

export default {

    props:['mode'],
    data() {
        return {
          searchInput: '', 
        };
      },
    
    methods: {
        goBack() {
            this.$emit('goBack');

        },

        searchData() {
            this.$emit('search', this.searchInput)
            this.searchInput = '';
        }
        
    },
    template: `
    <nav class="navbar navbar-expand-lg border border-0.5 rounded-2 {{ mode }}" id="navbar">
        <div class="container-fluid">
        <a class="navbar-brand" href="#" @click="goBack">Home</a>

        <form class="d-flex" role="search" @submit="searchData">
            <div class="form-group me-2">
                <input type="text" class="form-control" placeholder="Search" v-model="searchInput" />
            </div>
            <input type="submit" class="btn btn-outline-success" value="Search" id="searchbtn" />
        </form>
        </div>
    </nav>
    `
}