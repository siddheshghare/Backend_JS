import {Router}from "express"
import {registerUser,loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile
} from "../controllers/user_controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router=Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
           name: "coverImage",
           maxCount:1
        }

    ]),
    
    
    registerUser)

    router.route("/login").post(loginUser)



    router.route("/logout").post(verifyJWT, logoutUser)

    router.route("/refresh_AccessToken").post(refreshAccessToken)

    router.route("/change_password").post(verifyJWT, changeCurrentPassword)
    router.route("/current_user").get(verifyJWT,getCurrentUser)

    router.route("/update_details").patch(verifyJWT,updateAccountDetails)

    router.route("/update_avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
    router.route("/update_coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
    router.route("/c/:username").get(verifyJWT,getUserChannelProfile)



export default router;
