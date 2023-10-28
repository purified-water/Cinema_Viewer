import dbProvider from '../db/dbProvider.js';

export default {

    props:['mode'],
    
    methods: {
        
    //   created() {
    //     // You can call the fetch function here when the component is created
    //     // For example, to search for movies with a search term "avenger"
    //     dbProvider.fetch('search/movie/avenger?per_page=6&page=1')
    //       .then(response => {
    //         this.searchData = response;
    //         console.log(this.searchData)
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    },
    template: `
    <nav class="navbar navbar-expand-lg border border-0.5 rounded-2 {{ mode }}" id="navbar">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Home</a>

        <form class="d-flex" role="search">
            <div class="form-group me-2">
            <input type="text" class="form-control" placeholder="Search" />
            </div>
            <input type="submit" class="btn btn-outline-success" value="Search" id="searchbtn"/>
        </form>
        </div>
    </nav>
    `
}