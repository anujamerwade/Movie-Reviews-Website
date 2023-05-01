import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews
let movies

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (movies){
      return
    }
    try {
      movies = await conn.db("reviews").collection("mymovies")
      console.log("connected to mymovies")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO for movies collection: ${e}`)
    }
    
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db("reviews").collection("reviews")
      console.log("connected to reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
    
  }

  static async addReview(movieId, user, review, rating) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
        rating: rating,
      }
      console.log("adding")
      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: ObjectId(reviewId) })
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review, rating) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review, rating: rating } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async getMovies() {
    try {
      const cursor = await movies.find()
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async searchMovie(query) {
  try {
  const cursor = await movies.find({ title: {$regex: query, $options: "i"} })
  const result = await cursor.toArray()
  console.log(result)
  return result
} catch (e) {
  console.error(`Unable to search movie: ${e}`)
  return { error: e }
}

}


}