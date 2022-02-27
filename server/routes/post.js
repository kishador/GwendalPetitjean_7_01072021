const {Router} = require ('express')
const { createPost, deletePost, getAllPosts, getPost, updatePost } = require ('../controllers/post.js')
const router = Router()
const multer = require ('../middleware/multer-config.js')
const auth = require ('../middleware/auth.js')

router.get('/posts', getAllPosts)
router.get('/post/:id', auth, getPost)
router.post('/post', auth, multer, createPost)
router.put('/post/:id', auth, multer, updatePost)
router.delete('/post/:id', auth, multer, deletePost)

module.exports = router