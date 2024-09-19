<template>
  <div>
    <h2>Комментарии</h2>
    <textarea v-model="commentText" placeholder="Введите комментарий"></textarea>
    <button @click="submitComment">Отправить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentText: ''
    };
  },
  methods: {
    submitComment() {
      if (this.commentText.trim()) {
        this.$emit('add-comment', this.commentText)
        this.commentText = ''
      } else {
        alert('Комментарий не может быть пустым')
      }
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 36px;
  color: #2d3140;
  margin: 20px 0 30px;
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

textarea:focus {
  border-color: #2d3140;
}

button {
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