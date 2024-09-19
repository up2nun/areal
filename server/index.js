const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const articleRoutes = require('./routes/articles')
const commentRoutes = require('./routes/comments')
const { getCommentsByDate } = require('./controllers/commentController')
const cors = require('cors');

app.use(cors());

app.use(express.json())

app.use('/articles', articleRoutes)
app.use('/articles/:id/comments', commentRoutes)
app.get('/analytic/comments', getCommentsByDate)

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))