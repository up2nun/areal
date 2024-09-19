<template>
  <div>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div v-if="editingCommentId === comment.id" class="comment_form">
        <textarea v-model="editableCommentText"></textarea>
        <div class="btn-actions">
          <i class="fas fa-save save" @click="saveComment(comment.id)"></i>
          <i class="fas fa-times cancel " @click="cancelEdit"></i>
        </div>
      </div>
      <div class="newComment" v-else>
        <p>{{ comment.body }}</p>
        <div class="btn-actions">
          <i class="fas fa-edit edit" @click="startEdit(comment)"></i>
          <i class="fas fa-trash delete" @click="$emit('delete-comment', comment.id)"></i>
        </div>
      </div>
    </div>
    <div class="analytics-button">
      <button @click="toggleAnalytics">Показать аналитику комментариев</button>
    </div>
    <div v-if="showAnalytics" class="comment-analytics">
      <CommentAnalytics />
    </div>
  </div>
</template>

<script>
import CommentAnalytics from '@/components/CommentAnalytics.vue';

export default {
  components: {
    CommentAnalytics
  },
  props: {
    comments: Array
  },
  data() {
    return {
      editingCommentId: null,
      editableCommentText: '',
      showAnalytics: false
    };
  },
  methods: {
    toggleAnalytics() {
      this.showAnalytics = !this.showAnalytics;
    },
    startEdit(comment) {
      this.editingCommentId = comment.id;
      this.editableCommentText = comment.body;
    },
    async saveComment(commentId) {
      if (this.editableCommentText.trim() === '') {
        alert('Комментарий не может быть пустым');
        return;
      }

      const updatedComment = {
        id: commentId,
        body: this.editableCommentText
      };

      this.$emit('edit-comment', updatedComment);

      this.editingCommentId = null;
      this.editableCommentText = '';
    },
    cancelEdit() {
      this.editingCommentId = null;
      this.editableCommentText = '';
    }
  }
};
</script>

<style scoped>
.newComment, .comment_form {
  background-color: #fff;
  padding: 16px 20px 10px;
  border-radius: 10px;
  width: 31%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.btn-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

textarea {
  width: 100%;
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

p {
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: 500;
  color: #2d3140;
  word-wrap: break-word;
}

i {
  font-size: 20px;
  cursor: pointer;
}

.edit, .save {
  color: #4caf50;
}

.delete, .cancel {
  color: #f34444;
}

.analytics-button {
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

.analytics-button button {
  font-size: 15px;
  background-color: #4caf50;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 10px;
}

.analytics-button button:hover {
  background-color: #368339;
}
</style>
