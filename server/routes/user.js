const {Router} = require ('express')
const router = Router()
const { signup, login, deleteUser, getUser, updateUser } = require ('../controllers/user.js')

const multer = require ('../middleware/multer-config.js')
const auth = require ('../middleware/auth.js')

router.get('/user/profile', auth, getUser)
router.post('/api/signup', signup)
router.post('/api/auth/login', login)
router.put('/user/profile', auth, multer, updateUser)
router.delete('/user/profile', auth, multer, deleteUser)

module.exports = router