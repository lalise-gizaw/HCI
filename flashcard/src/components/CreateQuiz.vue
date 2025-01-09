<template>
  <!-- Root container for the CreateQuiz component -->
  <div class="create-quiz">
    <!-- Main heading for the Create Quiz page -->
    <h1>Create a New Quiz</h1>

    <!-- Form section for creating a new quiz -->
    <div class="quiz-creation-form">
      <!-- Label for the quiz name input -->
      <label for="quiz-name">Quiz Name:</label>
      
      <!-- Input field for the quiz name with two-way data binding -->
      <input
        type="text"
        id="quiz-name"
        v-model="quizName"                
        placeholder="Enter quiz name"     
      />

      <!-- Label for selecting flashcards -->
      <label for="flashcards">Select Flashcards:</label>
      
      <!-- Multi-select dropdown for choosing flashcards with two-way data binding -->
      <select
        id="flashcards"
        v-model="selectedFlashcards"       
        multiple                           
      >
        <!-- Iterate over each flashcard to create option elements -->
                  <!-- Loops through 'flashcards' array -->

        <option
          v-for="flashcard in flashcards"    
          :key="flashcard.id"                
          :value="flashcard.id"                    >
          {{ flashcard.question }}            <!-- Displays the flashcard question as option text -->
        </option>
      </select>

      <!-- Button to create the quiz by triggering the 'createQuiz' method -->
      <button @click="createQuiz">Create Quiz</button>
    </div>

    <!-- Display the created quiz if 'quizCreated' is true -->
    <div v-if="quizCreated" class="quiz-display">
      <!-- Display the name of the created quiz -->
      <h2>{{ quizName }}</h2>

      <!-- Transition group for animating flashcards within the quiz -->
      <transition-group name="fade" tag="div" class="quiz-flashcards">
        <!-- Iterate over each flashcard included in the quiz to display them -->
        <div
          v-for="flashcard in quizFlashcards"  
          :key="flashcard.id"                  
          class="quiz-flashcard"              
        >
          <!-- Display the question of the flashcard -->
          <p><strong>Question:</strong> {{ flashcard.question }}</p>
          
          <!-- Display the answer of the flashcard -->
          <p><strong>Answer:</strong> {{ flashcard.answer }}</p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateQuiz", // Name of the component

  data() {
    return {
      quizName: "",              // Stores the name of the quiz entered by the user
      selectedFlashcards: [],    // Array to store IDs of flashcards selected for the quiz
      flashcards: [],            // Array to hold all available flashcards loaded from localStorage
      quizCreated: false,        // Flag to indicate whether a quiz has been successfully created
      quizFlashcards: [],        // Array to store flashcards that are included in the created quiz
    };
  },

  mounted() {
    this.loadFlashcards(); // Load flashcards from localStorage when the component is mounted
  },

  methods: {
    /**
     * Load flashcards from the browser's localStorage.
     * If no flashcards are found, initialize with an empty array.
     */
    loadFlashcards() {
      const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
      this.flashcards = flashcards; // Assign the loaded flashcards to the component's data property
    },

    /**
     * Create a new quiz based on the selected flashcards.
     * Validates user input and populates the 'quizFlashcards' array.
     */
    createQuiz() {
      // Validate that a quiz name has been entered
      if (!this.quizName.trim()) {
        alert("Please enter a quiz name.");
        return; // Exit the method if validation fails
      }

      // Validate that at least one flashcard has been selected
      if (this.selectedFlashcards.length === 0) {
        alert("Please select at least one flashcard for the quiz.");
        return; // Exit the method if validation fails
      }

      // Filter the selected flashcards based on their IDs
      this.quizFlashcards = this.flashcards.filter((flashcard) =>
        this.selectedFlashcards.includes(flashcard.id)
      );

      // Set the 'quizCreated' flag to true to display the quiz section
      this.quizCreated = true;

      // Optionally, you can perform additional actions here, such as saving the quiz to localStorage
    },
  },
};
</script>

<style scoped>
/* Styling for the CreateQuiz component container */
.create-quiz {
  font-family: Avenir, Helvetica, Arial, sans-serif; /* Sets the font family */
  text-align: center;                                 /* Centers text horizontally */
  margin: 20px;                                       /* Adds margin around the container */
}

/* Styling for the quiz creation form */
.quiz-creation-form {
  margin: 20px auto;                                  /* Centers the form with vertical and horizontal margins */
  padding: 20px;                                       /* Adds padding inside the form */
  border: 1px solid #ccc;                              /* Adds a light border around the form */
  border-radius: 8px;                                  /* Rounds the corners of the form */
  max-width: 500px;                                    /* Sets a maximum width for the form */
  background-color: var(--flashcard-bg-color);         /* Sets background color using a CSS variable */
  text-align: left;                                    /* Aligns text to the left inside the form */
}

/* Styling for labels within the quiz creation form */
.quiz-creation-form label {
  display: block;                                      /* Makes labels take up the full width */
  margin-bottom: 5px;                                  /* Adds space below each label */
  font-weight: bold;                                   /* Makes label text bold */
}

/* Styling for input fields and the select dropdown */
.quiz-creation-form input,
.quiz-creation-form select {
  width: 100%;                                         /* Makes input and select take up full width */
  padding: 8px;                                        /* Adds padding inside inputs */
  margin-bottom: 15px;                                 /* Adds space below inputs */
  border: 1px solid #ddd;                              /* Adds a light border */
  border-radius: 4px;                                  /* Rounds the corners of inputs */
  box-sizing: border-box;                              /* Includes padding and border in the element's total width and height */
}

/* Styling for the Create Quiz button */
.quiz-creation-form button {
  padding: 10px 20px;                                  /* Adds padding inside the button */
  background-color: var(--button-bg-color);            /* Sets background color using a CSS variable */
  color: white;                                        /* Sets text color to white */
  border: none;                                        /* Removes the default border */
  border-radius: 4px;                                  /* Rounds the corners of the button */
  cursor: pointer;                                     /* Changes cursor to pointer on hover */
  font-size: 16px;                                     /* Sets the font size of the button text */
  transition: background-color 0.3s ease;             /* Adds a smooth transition for background color changes */
}

/* Hover effect for the Create Quiz button */
.quiz-creation-form button:hover {
  background-color: var(--button-hover-color);         /* Changes background color on hover using a CSS variable */
}

/* Styling for the quiz display section */
.quiz-display {
  margin: 20px auto;                                   /* Centers the quiz display with vertical and horizontal margins */
  padding: 20px;                                        /* Adds padding inside the quiz display */
  border: 1px solid #ccc;                               /* Adds a light border around the quiz display */
  border-radius: 8px;                                   /* Rounds the corners of the quiz display */
  max-width: 600px;                                     /* Sets a maximum width for the quiz display */
  background-color: var(--flashcard-bg-color);          /* Sets background color using a CSS variable */
}

/* Styling for the container holding all quiz flashcards */
.quiz-flashcards {
  display: flex;                                        /* Uses flexbox for layout */
  flex-direction: column;                               /* Arranges flashcards vertically */
  gap: 15px;                                            /* Adds space between flashcards */
}

/* Styling for individual flashcards within the quiz */
.quiz-flashcard {
  background-color: #f9f9f9;                           /* Sets a light background color */
  padding: 15px;                                        /* Adds padding inside the flashcard */
  border-radius: 6px;                                   /* Rounds the corners of the flashcard */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);            /* Adds a subtle shadow for depth */
  text-align: left;                                     /* Aligns text to the left */
  transition: transform 0.3s ease, opacity 0.3s ease;   /* Adds smooth transitions for transform and opacity */
}

/* Transition classes for the fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;                            /* Applies a 0.5-second transition for all properties during enter and leave */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;                                            /* Starts with 0 opacity (fully transparent) */
  transform: translateY(10px);                           /* Slightly moves the flashcard downwards */
}
</style>
