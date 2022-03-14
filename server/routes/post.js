const {Router} = require ('express')
const { createPost, deletePost, getAllPosts, getPost, updatePost } = require ('../controllers/post.js')
const postRoutes = Router()
const multer = require ('../middleware/multer-config.js')


postRoutes.get('/post/', getAllPosts)
postRoutes.get('/post/:id', getPost)
postRoutes.post('/post', multer, createPost)
postRoutes.put('/post/:id', multer, updatePost)
postRoutes.delete('/post/:id', multer, deletePost)

module.exports = postRoutes