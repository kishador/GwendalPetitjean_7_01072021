const {Router} = require ('express')
const userRoutes = Router()
const { signup, login, deleteUser, getUser, updateUser, getAllUsers } = require ('../controllers/user.js')

const multer = require ('../middleware/multer-config.js')


userRoutes.get('/api/user/:id', getUser)
userRoutes.post('/api/signup', signup)
userRoutes.post('/api/auth/login', login)
userRoutes.get("/api/user", getAllUsers);
userRoutes.post('/api/user/upload', updateUser)
userRoutes.delete('/user/profile', multer, deleteUser)

module.exports = userRoutes