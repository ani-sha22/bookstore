const express = require('express')

// controller functions
const { loginUser, signupUser, google_login, google_signup } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)
router.post('/glogin', google_login)
// signup route
router.post('/signup', signupUser)
router.post('/gsignup',google_signup)

module.exports = router



