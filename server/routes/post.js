const {Router} = require ('express')
const { createPost, deletePost, getAllPosts, getPost, updatePost } = require ('../controllers/post.js')
const postRoutes = Router()



postRoutes.get('/post/', getAllPosts)
postRoutes.get('/post/:id', getPost)
postRoutes.post('/post/', createPost)
postRoutes.put('/post/:id', updatePost)
postRoutes.delete('/post/:id', deletePost)

module.exports = postRoutes