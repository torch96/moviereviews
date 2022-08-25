import mongodb from "mongodb"
//import {ObjectId} from "bson"

const ObjectId = mongodb.ObjectId

let comments

export default class ReviewsRepository {
  static async injectDB(conn) {
    if (comments) {
      return
    }
    try {
      comments = await conn.db(process.env.MOVIEREVIEWS_NS).collection("comments")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(movieId, user, comment, date) {
    try {
      const commentDoc = { 
        name: user.name,
        email: user.email,
          
        date: date,
        text: comment,
        movie_id: ObjectId(movieId), }
        
      return await comments.insertOne(commentDoc)
    } catch (e) {
      console.error(`Unable to post comment: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, text, date) {
    
    
    try {
     // console.log(ObjectId(reviewId))
      const updateResponse = await comments.updateOne(
         {_id: ObjectId(reviewId), email: user.email},
          
        { $set: { text: text, date: date  } },
      )
     
      return updateResponse
    } catch (e) {
      console.error(`Unable to update comment: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(commentId, email) {

    try {
      
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId(commentId), email: email,
        
      })
        
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete comment     : ${e}`)
      return { error: e }
    }
  }

}