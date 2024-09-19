<template>
  <div class="editArticle">
    <div class="formGroup">
      <h2>{{ isEdit ? 'Редактировать статью' : 'Создать статью' }}</h2>
      <div class="nameForm">
        <label for="title">Название:</label>
        <input type="text" id="title" v-model="article.title" />
      </div>
      <div class="bodyForm">
        <label for="body">Текст:</label>
        <textarea id="body" v-model="article.body"></textarea>
      </div>
      <button @click="saveArticle">{{ isEdit ? 'Сохранить' : 'Создать' }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    articleData: {
      type: Object,
      default: () => ({ title: '', body: '' })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      article: { ...this.articleData }
    }
  },
  watch: {
    articleData(newData) {
      this.article = { ...newData }
    }
  },
  methods: {
    async saveArticle() {
      try {
        if (this.isEdit) {
          await axios.put(`/articles/${this.article.id}`, this.article)
          alert('Статья успешно обновлена')
          this.$router.push('/')
        } else {
          await axios.post(`/articles`, this.article)
          alert('Статья успешно создана')
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Ошибка при сохранении статьи:', error)
      }
    }
  }
};
</script>

<style scoped>
.editArticle {
  width: 90%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 35px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 36px;
  text-align: center;
  color: #2d3140;
  margin-bottom: 50px;
}

.nameForm {
  display: flex;
  flex-direction: column;
}

.bodyForm {
  display: flex;
  flex-direction: column;
}


label {
  color: #2d3140;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

textarea {
  width: 100%;
  height: 10vh;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
  border-radius: 10px;
  margin-bottom: 18px;
  transition: all .3s ease;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 10px;
  margin-bottom: 18px;
  transition: all .3s ease;
}

textarea:focus,
input:focus {
  border-color: #2d3140;
}

button {
  width: 100%;
  font-size: 15px;
  background-color: #4caf50;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  transition: all .3s ease;
  margin-bottom: 50px;
}

button:hover {
  background-color: #368339;
}
</style>