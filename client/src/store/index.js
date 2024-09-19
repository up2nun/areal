import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    articles: [],
    comments: []
  },
  getters: {
    allArticles: state => state.articles,
    allComments: state => state.comments
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const response = await axios.get('/articles');
        commit('setArticles', response.data);
      } catch (error) {
        console.error('Ошибка при получении статей:', error);
      }
    },
    async deleteArticle({ dispatch }, articleId) {
      try {
        await axios.delete(`/articles/${articleId}`);
        dispatch('fetchArticles');
      } catch (error) {
        console.error('Ошибка при удалении статьи:', error);
      }
    },
    async fetchComments({ commit }, articleId) {
      try {
        const response = await axios.get(`/articles/${articleId}/comments`);
        commit('setComments', response.data);
      } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
      }
    }
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setComments(state, comments) {
      state.comments = comments;
    }
  }
});

export default store;
