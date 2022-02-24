import {Router} from 'express'
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/post.js'
const router = Router()
import multer from '../middleware/multer-config.js'
import auth from '../middleware/auth.js'

router.get('/posts', auth, getAllPosts)
router.get('/post/:id', auth, getPost)
router.post('/post', auth, multer, createPost)
router.put('/post/:id', auth, multer, updatePost)
router.delete('/post/:id', auth, multer, deletePost)

export default router