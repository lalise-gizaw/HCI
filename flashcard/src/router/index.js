import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import CreateFlashcard from '../components/CreateFlashcard.vue';
import FlashcardsView from '../components/FlashcardsView.vue';  // Add this import
import FractionRules from '../components/FractionRules.vue';
import CreateQuiz from '../components/CreateQuiz.vue';




const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/create-flashcard', name: 'CreateFlashcard', component: CreateFlashcard },
  { path: '/flashcards', name: 'FlashcardsView', component: FlashcardsView },
  { path: '/fraction-rules', name: 'FractionRules', component: FractionRules},
  {path: '/create-quiz', name: 'CreateQuiz', component: CreateQuiz},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
