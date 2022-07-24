import express from "express"
import userCtrl from "./user.controller"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()
router.route("/signup").post(userCtrl.apiSignup)
router.post("/login").post(userCtrl.apiLogin)
router.route("/logout").post(userCtrl.apiLogout)
router.route("/delete").delete(userCtrl.apiDelete)
router.route("/admin").post(userCtrl.apiCreateAdminUser)
