import ReviewsRepository from "../Repository/reviewsRepository.js"
import User from "../models/user.js"
import { ObjectId } from "bson"
import UserDAO from "../Repository/userRepository.js"
import MoviesDAO from "../Repository/moviesRepository.js"


export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      
      const jwt = req.get("Authorization").slice("Bearer ".length)
     
      const user = await User.decoded(jwt)
      
      
      const movieId = req.body.movie_id
      const review = req.body.text
      
      const date = new Date()

      const ReviewResponse = await ReviewsRepository.addReview(
        movieId,
        user,
        review,
        date,
      )
      
      const updatedReviews = await MoviesDAO.getMovieByID(movieId)
      
      res.json({ status: "success" , reviews: updatedReviews.reviews})
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const jwt = req.get("Authorization").slice("Bearer ".length)
      const user = await User.decoded(jwt)
      
      
      const reviewId = req.body.review_id
      const review = req.body.text
     
      const date = new Date()
      
      const ReviewResponse = await ReviewsRepository.updateReview(
        ObjectId(reviewId),
        user,
        review,
        date,
      )
      
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const jwt = req.get("Authorization").slice("Bearer ".length)
      const user = await User.decoded(jwt)
      
      
      const reviewId = req.body.comment_id
     
      console.log(user.email)
      const date = new Date()
      console.log("before update")
      const commentResponse = await ReviewsRepository.deleteReview(
        reviewId,
        user.email,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}