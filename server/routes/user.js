import {Router} from 'express'
const router = Router()
import { signup, login, deleteUser, getUser, updateUser } from '../controllers/user.js'

import multer from '../middleware/multer-config.js'
import auth from '../middleware/auth.js'

router.get('/user/profile', auth, getUser)
router.post('/api/auth/signup', multer, signup)
router.post('/api/auth/login', login)
router.put('/user/profile', auth, multer, updateUser)
router.delete('/user/profile', auth, multer, deleteUser)

export default router