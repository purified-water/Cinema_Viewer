
export default {
  async fetch(requestString, data) {
    //Tach cai url ra
    const [type, className, pattern] = requestString.split("/");

    //“<type>/<class>/pattern?param1=value1&param2=value2&...”
    const params = new URLSearchParams(pattern);

    //Chooose the class depending on movieClass
    let getMovieClass;

    switch (className) {
      case "mostpopular":
        getMovieClass = data.MostPopularMovies;
        break;
      case "top50":
        getMovieClass = data.Top50Movies;
        break;
      case "movie":
      getMovieClass = data.Movies;
      break;
      case "name":
      getMovieClass = data.Names;
      break;

      default:
        break;
    }

    
    if (type === "search") {
      //Tasch smith?per_page=10&page=2”
      //Truoc dau ?
      const searchTerm = (pattern.split("?")[0]).toLowerCase();
      console.log('SEARCH TERM', searchTerm)

      // Xử lý tìm kiếm
      const perPage = params.get("per_page") || 10;
      const page = params.get("page") || 1;
      
      let tempData;
      // Thực hiện tìm kiếm
      switch (className) {
        case 'movie':
            tempData = data.Movies;
            if (pattern) {
                tempData = data.Movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm) || 
                movie.fullTitle.toLowerCase().includes(searchTerm) || 
                movie.keywords.toLowerCase().includes(searchTerm)) 
            }
            break;
        case 'name':
            tempData = data.Names;
            if (pattern) {
                tempData = data.Names.filter((name) => name.name.toLowerCase().includes(searchTerm));
            }
            break;
        case 'top50':
            tempData = data.Top50Movies;
            if (pattern){
                tempData = data.Top50Movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm) || 
                movie.fullTitle.toLowerCase().includes(searchTerm) || 
                movie.keywords.toLowerCase().includes(searchTerm)) 
            }
            break;
        case 'mostpopular':
            tempData = data.MostPopularMovies;
            if (pattern) {
                tempData = data.MostPopularMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm) || 
                movie.fullTitle.toLowerCase().includes(searchTerm) || 
                movie.keywords.toLowerCase().includes(searchTerm)) 
            }
            break;
        default:
            break;
      }

      //Couldnt get any
      if (tempData.length === 0) {

        //Tim dien vien
        const actor = data.Names.filter((name) => name.name.toLowerCase().includes(searchTerm));

        //Lay tung id da dien trong 
       
        
        for (const mov of data.Movies) {
          const actors = mov.actorList.map(actor => actor.name.toLowerCase());

          for (let i =0; i < actors.length; i++) {
            if (actors[i].includes(searchTerm)) {
              tempData.push(mov);
              break;
            }
          }
          
        }
        if (tempData.length === 0) {
          for (const mov of data.Movies) {
            const dirs = mov.directorList.map(dir => dir.name.toLowerCase());

            for (let i =0; i < dirs.length; i++) {
              if (dirs[i].includes(searchTerm)) {
                tempData.push(mov);
                break;
              }
            }
            
          }
        }
        
      }
      const results = tempData;

      // Tính toán thông tin phân trang
      const total = results.length || 10;
      const totalPage = Math.ceil(total / perPage);

      // Trả về kết quả
      return {
        search: searchTerm,
        page: parseInt(page),
        per_page: parseInt(perPage),
        total_page: totalPage,
        total: total,
        data: results.slice((page - 1) * perPage, page * perPage)
      };
    } 
    
    else if (type === "detail") {
      // Xử lý chi tiết
      let tempData = null;
      console.log('PATTERN', pattern)
      switch (className) {
        case 'top50':
            tempData = data.Top50Movies.find((movie) => movie.id === pattern);
            break;
        case 'mostPopular':
          tempData = data.MostPopularMovies.find((movie) => movie.id === pattern);
          break;
        case 'movie':
            tempData = data.Movies.find((movie) => movie.id === pattern);
            break;
        case 'name':
            tempData = data.Names.find((name) => name.id === pattern);
            break;
      }
      return {
        data: tempData,
        total: tempData ? 1 : 0,
      }
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