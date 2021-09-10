export default function paginationFormatter(results, page, perPage, totalResults = results.count) {

  const currentPage = +page;

  return {
    results: results.rows || results,
    totalResults,
    page: currentPage,
    totalPages: Math.ceil(totalResults / perPage),
    nextPage: currentPage >= Math.ceil(totalResults / perPage) ? null : currentPage + 1,
    previousPage: currentPage === 1 ? null : currentPage - 1,
    showingResults: results.rows ? results.rows.length : results.length,
  };

}
