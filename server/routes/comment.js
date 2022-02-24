import {Router} from 'express'
import { getAllComments, createComment, deleteComment } from '../controllers/comment.js'
const router = Router()
import auth from '../middleware/auth.js'

router.get('/post/:id/comments', auth, getAllComments);
router.post('/post/:id/comment', auth, createComment);
router.delete('/post/:id/comment', auth, deleteComment);

export default router
