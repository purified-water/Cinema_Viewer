
export default {
  fetch(query) {
    console.log('fetched');

    const [type, className, pattern, queryString] = query.split('/');
    const params = new URLSearchParams(queryString);
    if (type === 'search') {
      // Handle search request
      const searchTerm = className;
      const perPage = parseInt(params.get('per_page') || 10);
      const page = parseInt(params.get('page') || 1);

      // Your data processing logic here
      const result = {
        search: searchTerm,
        page,
        per_page: perPage,
        total_page: 5, // Replace with your total pages logic
        total: 10,     // Replace with your total items logic
        items: []       // Replace with your data filtering logic
      };

      return Promise.resolve(result);
    }
  }
};