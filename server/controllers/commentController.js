const { Comment, Article } = require('../models')
const { Op } = require('sequelize')

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.body,
            articleId: req.params.id
        });
        res.json(comment)
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { articleId: req.params.id }
        });
        res.json(comments)
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.commentId, articleId: req.params.id }
        });
        if (comment) {
            res.json(comment)
        } else {
            res.json({ error: 'Комментарий не найден' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.updateComment = async (req, res) => {
    try {
        const [updated] = await Comment.update(req.body, {
            where: { id: req.params.commentId, articleId: req.params.id }
        });
        if (updated) {
            const updatedComment = await Comment.findOne({
                where: { id: req.params.commentId, articleId: req.params.id }
            });
            res.json(updatedComment)
        } else {
            res.json({ error: 'Комментарий не найден' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const deleted = await Comment.destroy({
            where: { id: req.params.commentId, articleId: req.params.id }
        });
        if (deleted) {
            res.send()
        } else {
            res.json({ error: 'Комментарий не найден' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

exports.getCommentsByDate = async (req, res) => {
    const { dateFrom, dateTo } = req.query;
    const { articleId } = req.params;

    let whereConditions = { articleId };

    if (dateFrom && dateTo) {
        whereConditions.createdAt = {
            [Op.between]: [new Date(dateFrom), new Date(dateTo)],
        };
    }

    try {
        const comments = await Comment.findAll({
            where: whereConditions,
            include: {
                model: Article,
                as: 'article',
                attributes: ['id', 'title'],
            },
            order: [['createdAt', 'DESC']],
        });

        console.log('Полученные комментарии:', comments);

        res.json(comments);
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        res.json({ error: error.message });
    }
};

