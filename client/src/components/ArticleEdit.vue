<template>
  <div>
    <ArticleForm :articleData="article" :isEdit="true" @save-article="updateArticle" />
  </div>
</template>

<script>
import ArticleForm from './ArticleForm.vue';
import axios from 'axios';

export default {
  components: { ArticleForm },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    async updateArticle(article) {
      try {
        const response = await axios.put(`/articles/${article.id}`, article);
        this.article = response.data;
        alert('Статья успешно обновлена');
        this.$router.push(`/article/${article.id}`);
      } catch (error) {
        console.error('Ошибка при обновлении статьи:', error);
      }
    }
  },
  async mounted() {
    try {
      const articleId = this.$route.params.id;
      const articleResponse = await axios.get(`/articles/${articleId}`);
      this.article = articleResponse.data;
    } catch (error) {
      console.error('Ошибка при загрузке статьи:', error);
    }
  }
};
</script>
