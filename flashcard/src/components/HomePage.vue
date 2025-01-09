<template>
  <div>
    <h1>Home</h1>
    <button @click="goToCreateFlashcard">Create Flashcard</button>
    <button @click="goToCreateQuiz">Create Quiz</button>

    <h2>Flashcards</h2>

    <input v-model="searchQuery" placeholder="Search flashcards..." />

    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>

    <transition-group name="fade" tag="ul">
      <li v-for="flashcard in filteredFlashcards" :key="flashcard.id" class="flashcard-item">
        <div class="flashcard-content">
          <div v-if="flashcard.image" class="flashcard-image">
            <img :src="flashcard.image" alt="Flashcard Image" />
          </div>
          <div class="flashcard-details">
            <p><strong>Question:</strong> {{ flashcard.question }}</p>
            <p><strong>Answer:</strong> {{ flashcard.answer }}</p>
            <p><strong>Category:</strong> {{ flashcard.category }}</p>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flashcards: [],
      searchQuery: '',
      selectedCategory: ''
    };
  },
  computed: {
    categories() {
      const cats = this.flashcards.map(card => card.category).filter(cat => cat);
      return [...new Set(cats)];
    },
    filteredFlashcards() {
      return this.flashcards.filter(card => {
        const matchesSearch =
          card.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (card.category && card.category.toLowerCase().includes(this.searchQuery.toLowerCase()));
        const matchesCategory = this.selectedCategory ? card.category === this.selectedCategory : true;
        return matchesSearch && matchesCategory;
      });
    }
  },
  mounted() {
    this.loadFlashcards();
  },
  methods: {
    loadFlashcards() {
      const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
      this.flashcards = flashcards;
    },
    goToCreateFlashcard() {
      this.$router.push('/create-flashcard');
    },
    goToCreateQuiz() {
      this.$router.push('/create-quiz');
    }
  }
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--button-bg-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--button-hover-color);
}

input[type="text"],
select {
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.flashcard-item {
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: var(--flashcard-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.flashcard-content {
  display: flex;
  align-items: center;
}

.flashcard-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.flashcard-details p {
  margin: 5px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
