const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const role = user.role

    res.status(200).json({email, role, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, role} = req.body

  try {
    const user = await User.signup(email, password, role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, role, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const google_signup = async (req, res) => {
  const {email, role} = req.body

  try {
    const user = await User.g_signup(email,role)
    const token = createToken(user._id)

    res.status(200).json({email, role, token})
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

const google_login = async (req, res) => {
  const {email} = req.body

  try {
    const user = await User.g_login(email)
    const token = createToken(user._id)
    const role = user.role

    res.status(200).json({email, role, token})
  }catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, google_login, google_signup }