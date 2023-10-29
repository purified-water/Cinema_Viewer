
export default {
  async fetch(requestString, data) {
    const [type, movieClass, pattern] = requestString.split("/");
    const params = new URLSearchParams(pattern);

    //Chooose the class depending on movieClass
    let getMovieClass;

    switch (movieClass) {
      case "MostPopularMovies":
        getMovieClass = data.MostPopularMovies;
        break;
      case "Top50Movies":
        getMovieClass = data.Top50Movies;
        break;
      case "Movies":
      getMovieClass = data.Movies;
      break;
      case "Names":
      getMovieClass = data.Names;
      break;

      default:
        break;
    }

  

    if (type === "search") {
      //Tasch smith?per_page=10&page=2”
      const searchTerm = pattern.split("?")[0]



      // Xử lý tìm kiếm
      const perPage = params.get("per_page") || 10;
      const page = params.get("page") || 1;

      // Thực hiện tìm kiếm
      const results = data.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tính toán thông tin phân trang
      const total = results.length;
      const totalPage = Math.ceil(total / perPage);

      // Trả về kết quả
      return {
        search: searchTerm,
        page: parseInt(page),
        per_page: parseInt(perPage),
        total_page: totalPage,
        total: total,
        items: results.slice((page - 1) * perPage, page * perPage)
      };
    } 
    
    else if (type === "detail") {
      // Xử lý chi tiết
      const id = pattern;

      // Tìm kiếm thông tin chi tiết bằng id
      const movie = getMovieClass.find(movie => movie.id === id);

      // Trả về kết quả
      return movie;
    } 
    
    else if (type === "get") {
      // Xử lý lấy danh sách top 50 (hoặc topboxoffice)
      const perPage = params.get("per_page") || 3;

      const page = params.get("page") || 1;
      // Tính toán thông tin phân trang
      const total = 15;
      const totalPage = Math.ceil(total / perPage);

      const results = getMovieClass.slice((page - 1) * perPage, page * perPage);

      // Trả về kết quả
      return {
        data: results,
        page: parseInt(page), 
        total_pages: totalPage,
        total: total
      
      }
    } 
    
    else {
      // Xử lý trường hợp không hợp lệ
      throw new Error("Invalid request type");
    }
  }
};