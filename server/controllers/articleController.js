const { Article, Comment } = require('../models')

exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body)
        res.json(article)
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll()
        res.json(articles)
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id)
        if (article) {
            res.json(article)
        } else {
            res.json({ error: 'Статья не найдена' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const [updated] = await Article.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedArticle = await Article.findByPk(req.params.id)
            res.json(updatedArticle)
        } else {
            res.json({ error: 'Статья не найдена' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const deleted = await Article.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.send()
        } else {
            res.json({ error: 'Статья не найдена' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};
