const {Router} = require ('express')
const userRoutes = Router()
const { signup, login, deleteUser, getUser, updateUser, getAllUsers } = require ('../controllers/user.js')




userRoutes.get('/api/user/:id', getUser)
userRoutes.post('/api/signup', signup)
userRoutes.post('/api/auth/login', login)
userRoutes.get("/api/user", getAllUsers);
userRoutes.post('/api/user/upload', updateUser)
userRoutes.delete('/user/profile', deleteUser)
userRoutes.put("/api/user/:id", updateUser);
module.exports = userRoutes