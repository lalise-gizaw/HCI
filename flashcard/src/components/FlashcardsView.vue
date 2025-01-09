<template>
  <!-- Root div container for the Flashcard Quiz component -->
  <div>
    <!-- Main heading of the Flashcard Quiz page -->
    <h1>Flashcard Quiz</h1>

    <!-- Conditional rendering: Check if there are any flashcards available -->
    <div v-if="flashcards.length">
      <!-- Transition component for animating flashcard changes -->
      <transition name="fade" mode="out-in">
        <!-- Container for the current flashcard -->
        <div
          :key="currentFlashcard.id" 
          class="flashcard"          
        >
          <!-- Conditional rendering: Display image if the current flashcard has one -->
          <div v-if="currentFlashcard.image" class="flashcard-image">
            <!-- Display the flashcard image -->
            <img :src="currentFlashcard.image" alt="Flashcard Image" />
          </div>

          <!-- Paragraph displaying the flashcard question -->
          <p class="question">{{ currentFlashcard.question }}</p>

          <!-- Button to toggle the visibility of the flashcard answer -->
          <button @click="toggleAnswer">
            <!-- Display button text based on whether the answer is visible -->
            {{ answerVisible ? 'Hide Answer' : 'Show Answer' }}
          </button>

          <!-- Conditional rendering: Show the answer if 'answerVisible' is true -->
          <p v-if="answerVisible" class="answer">{{ currentFlashcard.answer }}</p>
        </div>
      </transition>

      <!-- Navigation buttons to move between flashcards -->
      <div class="flashcard-navigation">
        <!-- Button to go to the previous flashcard; disabled if at the first flashcard -->
        <button @click="previousFlashcard" :disabled="currentIndex === 0">Previous</button>

        <!-- Button to go to the next flashcard; disabled if at the last flashcard -->
        <button @click="nextFlashcard" :disabled="currentIndex === flashcards.length - 1">Next</button>
      </div>
    </div>

    <!-- Message displayed if there are no flashcards available -->
    <p v-else>No flashcards available.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flashcards: [],          // Array to store all flashcards loaded from localStorage
      currentIndex: 0,         // Index of the currently displayed flashcard
      answerVisible: false,    // Boolean flag to control the visibility of the answer
    };
  },
  mounted() {
    // Lifecycle hook that runs when the component is mounted to the DOM
    this.loadFlashcards();    // Load flashcards from localStorage upon mounting
  },
  methods: {
    /**
     * Load flashcards from the browser's localStorage.
     * If no flashcards are found, initialize with an empty array.
     */
    loadFlashcards() {
      const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
      this.flashcards = flashcards; // Assign the loaded flashcards to the component's data
    },

    /**
     * Toggle the visibility of the flashcard's answer.
     * If the answer is currently visible, hide it; otherwise, show it.
     */
    toggleAnswer() {
      this.answerVisible = !this.answerVisible;
    },

    /**
     * Navigate to the next flashcard in the array.
     * Increments the currentIndex if not at the last flashcard.
     * Also hides the answer when moving to the next flashcard.
     */
    nextFlashcard() {
      if (this.currentIndex < this.flashcards.length - 1) {
        this.currentIndex++;         // Move to the next flashcard
        this.answerVisible = false;  // Hide the answer for the new flashcard
      }
    },

    /**
     * Navigate to the previous flashcard in the array.
     * Decrements the currentIndex if not at the first flashcard.
     * Also hides the answer when moving to the previous flashcard.
     */
    previousFlashcard() {
      if (this.currentIndex > 0) {
        this.currentIndex--;         // Move to the previous flashcard
        this.answerVisible = false;  // Hide the answer for the new flashcard
      }
    },
  },
  computed: {
    /**
     * Compute the currently displayed flashcard based on the currentIndex.
     * Returns the flashcard object at the currentIndex position.
     */
    currentFlashcard() {
      return this.flashcards[this.currentIndex];
    }
  }
};
</script>

<style scoped>
/* Styling for the flashcard container */
.flashcard {
  margin: 20px auto;                          /* Center the flashcard with vertical and horizontal margins */
  padding: 20px;                              /* Add padding inside the flashcard */
  border: 1px solid #ddd;                     /* Add a light border around the flashcard */
  border-radius: 8px;                         /* Round the corners of the flashcard */
  background-color: var(--flashcard-bg-color);/* Set background color using a CSS variable for theming */
  width: 300px;                               /* Set a fixed width for the flashcard */
  text-align: center;                         /* Center-align the text inside the flashcard */
  transition: all 0.5s ease;                  /* Smooth transition for all properties over 0.5 seconds */
}

/* Styling for the flashcard image */
.flashcard-image img {
  width: 100%;            /* Make the image take up the full width of its container */
  height: auto;           /* Maintain the aspect ratio of the image */
  max-height: 200px;      /* Set a maximum height to prevent oversized images */
  object-fit: cover;      /* Ensure the image covers the container without distortion */
  border-radius: 4px;     /* Slightly round the corners of the image */
  margin-bottom: 15px;    /* Add space below the image */
}

/* Styling for all buttons */
button {
  margin-top: 10px;                         /* Add space above the button */
  padding: 10px 20px;                       /* Add padding inside the button */
  background-color: var(--button-bg-color); /* Set background color using a CSS variable for theming */
  border: none;                             /* Remove the default border */
  color: white;                             /* Set the text color to white */
  cursor: pointer;                          /* Change the cursor to a pointer on hover */
  font-size: 16px;                          /* Set the font size of the button text */
  border-radius: 4px;                       /* Round the corners of the button */
  transition: background-color 0.3s ease;   /* Smooth transition for background color changes */
}

/* Hover effect for buttons */
button:hover {
  background-color: var(--button-hover-color); /* Darken the button background on hover */
}

/* Styling for the flashcard navigation container */
.flashcard-navigation {
  margin-top: 20px; /* Add space above the navigation buttons */
}

/* Styling for navigation buttons within the flashcard navigation */
.flashcard-navigation button {
  padding: 10px 20px;                       /* Add padding inside the navigation buttons */
  background-color: var(--button-bg-color); /* Set background color using a CSS variable for theming */
  border: none;                             /* Remove the default border */
  color: white;                             /* Set the text color to white */
  font-size: 16px;                          /* Set the font size of the button text */
  cursor: pointer;                          /* Change the cursor to a pointer on hover */
  border-radius: 4px;                       /* Round the corners of the button */
  transition: background-color 0.3s ease;   /* Smooth transition for background color changes */
}

/* Disabled state styling for navigation buttons */
.flashcard-navigation button:disabled {
  background-color: #e0e0e0; /* Light gray background for disabled buttons */
  cursor: not-allowed;        /* Change the cursor to indicate the button is not clickable */
}

/* Hover effect for enabled navigation buttons */
.flashcard-navigation button:not(:disabled):hover {
  background-color: var(--button-hover-color); /* Darken the button background on hover */
}

/* Transition classes for the fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s; /* Apply a 0.5-second transition for all properties during enter and leave */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;                      /* Start with 0 opacity (fully transparent) */
  transform: translateY(10px);     /* Slightly move the flashcard downwards */
}
</style>
