import express from "express"
import moviesCtrl from "./movies.controller.js"
import ReviewsCtrl from "./reviews.controller.js"
import userCtrl from "./user.controller.js"

const router = express.Router()

router.route("/movies").get(moviesCtrl.apiGetmovies)
router.route("/id/:id").get(moviesCtrl.apiGetMovieById)
//router.route("/genres").get(moviesCtrl.apiGetMovieGenres)

router
  .route("/comments")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router