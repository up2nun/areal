<template>
  <div class="analytics-container">
    <h2>Аналитика комментариев</h2>
    <form @submit.prevent="fetchComments" class="filter-form">
      <div class="form-group">
        <label for="dateFrom">Дата от: </label>
        <input type="date" v-model="dateFrom" id="dateFrom" required class="date-input"/>
      </div>
      <div class="form-group">
        <label for="dateTo">Дата до: </label>
        <input type="date" v-model="dateTo" id="dateTo" required class="date-input"/>
      </div>
      <button type="submit" class="filter-button">Фильтровать</button>
    </form>
    <div v-if="groupedComments && Object.keys(groupedComments).length > 0" class="comments-section">
      <div v-for="(comments, articleId) in groupedComments" :key="articleId" class="comments-group">
        <h3 class="article-title">Статья {{ articleId }}</h3>
        <ul class="comments-list">
          <li v-for="comment in comments" :key="comment.id" class="comment-item">{{ comment.body }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p class="no-comments-message">Комментарии не найдены для выбранного периода.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const dateFrom = ref('');
    const dateTo = ref('');
    const groupedComments = ref(null);

    const fetchComments = async () => {
      const articleId = route.params.id;
      try {
        const response = await axios.get(`/articles/${articleId}/comments`, {
          params: { dateFrom: dateFrom.value, dateTo: dateTo.value }
        });

        if (response.data && response.data.length > 0) {
          const grouped = response.data.reduce((acc, comment) => {
            if (!acc[comment.articleId]) {
              acc[comment.articleId] = [];
            }
            acc[comment.articleId].push(comment);
            return acc;
          }, {});

          groupedComments.value = grouped;
        } else {
          groupedComments.value = {};
        }
      } catch (error) {
        console.error('Ошибка при получении аналитики комментариев:', error);
        alert('Не удалось получить аналитику комментариев');
      }
    };

    onMounted(() => {
      fetchComments();
    });

    return {
      dateFrom,
      dateTo,
      groupedComments,
      fetchComments
    };
  }
};
</script>

<style scoped>
.analytics-container {
  max-width: 800px;
  margin: auto;
  padding: 35px 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

h2 {
  font-size: 36px;
  margin-bottom: 50px;
  color: #2d3140;
  text-align: center;
}

.filter-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #2d3140;
}

.date-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: all .3s ease;
}

.date-input:focus {
  border-color: #2d3140;
}

.filter-button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: #4caf50;
  font-weight: 500;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #368339;
}

.comments-section {
  margin-top: 20px;
}

.comments-group {
  margin-bottom: 20px;
}

.article-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #2d3140;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 10px;
}

.no-comments-message {
  font-size: 16px;
  color: #666;
}
</style>
