<template>
  <div>
    <AddComment :articleId="article.id" @add-comment="addComment" />
    <CommentList :comments="comments" @edit-comment="editComment" @delete-comment="deleteComment" />
  </div>
</template>

<script>
import AddComment from './AddComment.vue';
import CommentList from './CommentList.vue';
import axios from 'axios';

export default {
  components: { AddComment, CommentList },
  data() {
    return {
      article: {},
      comments: []
    };
  },
  methods: {
    async addComment(commentText) {
      try {
        const response = await axios.post(`/articles/${this.article.id}/comments`, { body: commentText });
        this.comments.push(response.data);
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    },
    async editComment(updatedComment) {
      try {
        console.log('Комментарий обновлен на сервере:', updatedComment);
        const response = await axios.put(`/articles/${this.article.id}/comments/${updatedComment.id}`, { body: updatedComment.body });
        const index = this.comments.findIndex(c => c.id === updatedComment.id);
        if (index !== -1) this.comments.splice(index, 1, response.data);
      } catch (error) {
        console.error('Ошибка при редактировании комментария:', error);
      }
    },
    async deleteComment(commentId) {
      try {
        await axios.delete(`/articles/${this.article.id}/comments/${commentId}`);
        this.comments = this.comments.filter(c => c.id !== commentId);
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    }
  },
  async mounted() {
    try {
      const articleId = this.$route.params.id;
      const articleResponse = await axios.get(`/articles/${articleId}`);
      this.article = articleResponse.data;

      const commentsResponse = await axios.get(`/articles/${articleId}/comments`);
      this.comments = commentsResponse.data;
    } catch (error) {
      console.error('Ошибка при загрузке статьи или комментариев:', error);
    }
  }
};
</script>

