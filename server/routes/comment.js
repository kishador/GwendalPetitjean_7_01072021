const {Router} = require ('express')
const { getAllComments, createComment, deleteComment } = require ('../controllers/comment.js')
const commentRoutes = Router()


commentRoutes.get('/post/:id/comments', getAllComments);
commentRoutes.post('/post/:id/comment', createComment);
commentRoutes.delete('/post/:id/comment', deleteComment);

module.exports = commentRoutes
