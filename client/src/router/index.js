import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/components/ArticleList.vue';
import ArticleView from '@/components/ArticleView.vue';
import ArticleForm from '@/components/ArticleForm.vue';
import ArticleEdit from '@/components/ArticleEdit.vue';
import CommentAnalytics from '@/components/CommentAnalytics.vue';

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/article/:id',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/article/new',
    name: 'ArticleCreate',
    component: ArticleForm
  },
  {
    path: '/article/edit/:id',
    name: 'ArticleEdit',
    component: ArticleEdit
  },
  {
    path: '/article/:id/analytics',
    name: 'CommentAnalytics',
    component: CommentAnalytics
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
