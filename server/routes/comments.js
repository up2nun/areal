const express = require('express')
const router = express.Router({ mergeParams: true })
const commentController = require('../controllers/commentController')

router.post('/', commentController.createComment)
router.get('/', commentController.getAllComments)
router.get('/:commentId', commentController.getCommentById)
router.get('/articles/:articleId/comments', commentController.getCommentsByDate)
router.put('/:commentId', commentController.updateComment)
router.patch('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)

module.exports = router
