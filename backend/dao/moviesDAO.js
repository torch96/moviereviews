import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let movies

export default class moviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return
    }
    try {
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`,
      )
    }
  }

  static async getmovies({
    filters = null,
    page = 0,
    moviesPerPage = 21,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } }
      } else if ("genres" in filters) {
        query = { "genres": { $eq: filters["genres"] } }
      } 
    }

    let cursor
    
    try {
      cursor = await movies
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { moviesList: [], totalNumMovies: 0 }
    }

    const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page)

    try {
      const moviesList = await displayCursor.toArray()
      const totalNumMovies = await movies.countDocuments(query)

      return { moviesList, totalNumMovies }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { moviesList: [], totalNumMovies: 0 }
    }
  }

  static async getMovieByID(id) {
    try {
    
    
     
    
    const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "comments",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$movie_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "comments",
                  },
              },
              {
                  $addFields: {
                      comments: "$comments",
                  },
              },
          ]
      return await movies.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getmovieByID: ${e}`)
      throw e
    }
  }

  static async getGenres() {
    let genres = []
    try {
      genres = await movies.distinct("genres")
      return genres
    } catch (e) {
      console.error(`Unable to get genres, ${e}`)
      return genres
    }
  }
}

