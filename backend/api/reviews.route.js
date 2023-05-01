import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("").get(ReviewsCtrl.apiGetMovies)
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
router.route("/search/:query").get(ReviewsCtrl.apiSearchMovie)

export default router