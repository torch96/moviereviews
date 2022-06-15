import moviesDAO from "../dao/moviesDAO.js"

export default class moviesController {
  static async apiGetmovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 21
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.genres) {
      filters.genres = req.query.genres
    }  else if (req.query.title) {
      filters.title = req.query.title
    }

    const { moviesList, totalNumMovies } = await moviesDAO.getmovies({
      filters,
      page,
      moviesPerPage,
    })

    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    }
    res.json(response)
  }
  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {}
      let movie = await moviesDAO.getMovieByID(id)
      if (!movie) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(movie)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetMovieGenres(req, res, next) {
    try {
      let genres = await moviesDAO.getGenres()
      res.json(genres)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}