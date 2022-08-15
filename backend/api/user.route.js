import express from "express"
import userCtrl from "./user.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/register").post(userCtrl.apiSignup)
router.route("/signin").post(userCtrl.apiLogin)
router.route("/logout").post(userCtrl.apiLogout)
router.route("/delete").delete(userCtrl.apiDeleteUser)
router.route("/admin").post(userCtrl.apiCreateAdmin)


export default router