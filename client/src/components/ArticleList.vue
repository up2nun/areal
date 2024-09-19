<template>
  <div>
    <div class="createArticle">
      <button @click="createArticle">Создать статью</button>
    </div>
    <div class="articles">
      <ul>
        <li v-for="article in articles" :key="article.id">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          <p>{{ article.body }}</p>
          <div class="article-actions">
            <i class="fas fa-edit edit" @click="editArticle(article.id)" title="Редактировать"></i>
            <i class="fas fa-trash delete" @click="deleteArticle(article.id)" title="Удалить"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    articles() {
      return this.$store.getters.allArticles;
    }
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch('fetchArticles');
    },
    createArticle() {
      this.$router.push('/article/new');
    },
    editArticle(articleId) {
      this.$router.push(`/article/edit/${articleId}`);
    },
    deleteArticle(articleId) {
      if (confirm('Вы уверены, что хотите удалить эту статью?')) {
        this.$store.dispatch('deleteArticle', articleId)
          .then(() => this.fetchArticles())
          .catch(error => console.error('Ошибка при удалении статьи:', error));
      }
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>


<style scoped>
.createArticle {
  display: flex;
  justify-content: center;
  padding: 20px 0 30px;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  transition: all .3s ease;
}

.createArticle button {
  font-size: 15px;
  background-color: #4caf50;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 10px;
}

button:hover {
  background-color: #368339;
}

.articles {
  background-color: #fff;
  padding: 16px 20px 10px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

li {
  margin-bottom: 20px;
  font-weight: 500;
  list-style: none;
  color: #2d3140;
  word-wrap: break-word;
}

p {
  font-weight: 400;
  margin: 10px 0 14px;
  font-size: 14px;
  color: #2d3140;
}

.article-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

i {
  font-size: 20px;
  cursor: pointer;
}

.edit {
  color: #4caf50;
}

.delete {
  color: #f34444;
}

</style>
