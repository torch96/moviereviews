import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id
      const comment = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        comment,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const commentId = req.body._id
      const text = req.body.text
      const date = new Date()

      const commentResponse = await ReviewsDAO.updateReview(
        commentId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = commentResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (commentResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const commentId = req.query.id
      const userId = req.body.user_id
      console.log(commentId)
      const commentResponse = await ReviewsDAO.deleteReview(
        commentId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}