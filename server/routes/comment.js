const {Router} = require ('express')
const { getAllComments, createComment, deleteComment } = require ('../controllers/comment.js')
const router = Router()
const auth = require ('../middleware/auth.js')

router.get('/post/:id/comments', auth, getAllComments);
router.post('/post/:id/comment', auth, createComment);
router.delete('/post/:id/comment', auth, deleteComment);

module.exports = router
