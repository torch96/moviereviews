import express from "express"
import moviesCtrl from "./movies.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(moviesCtrl.apiGetmovies)
router.route("/id/:id").get(moviesCtrl.apiGetMovieById)
router.route("/genres").get(moviesCtrl.apiGetMovieGenres)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router