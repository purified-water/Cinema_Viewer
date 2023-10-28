export default {
    data() {
        return {

        }
    },
    template: `
    <nav class="navbar navbar-expand-lg bg-white rounded-2">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Home</a>

        <form class="d-flex" role="search">
            <div class="form-group me-2">
            <input type="text" class="form-control" placeholder="Search" />
            </div>
            <input type="submit" class="text-dark btn btn-outline-success" value="Search" id="searchbtn">
            </input>
        </form>
        </div>
    </nav>
    `
}