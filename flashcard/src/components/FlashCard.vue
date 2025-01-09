<template>
  <!-- Root div container for the FlashCardApp component -->
  <div id="app">
    <!-- Main heading of the application -->
    <h1>Fraction Practice Flashcards</h1>

    <!-- Container for the Fraction Question input -->
    <div>
      <!-- Label for the Fraction Question input field -->
      <label for="question">Enter Fraction Question:</label>
      <!-- Input field bound to 'newQuestion' data property using v-model -->
      <input
        v-model="newQuestion"               
        id="question"                      
        placeholder="e.g., 1/2 + 1/3"      
        type="text"                       
      />
    </div>

    <!-- Container for the Correct Answer input -->
    <div>
      <!-- Label for the Correct Answer input field -->
      <label for="answer">Enter Correct Answer:</label>
      <!-- Input field bound to 'newAnswer' data property using v-model -->
     <!-- Two-way data binding for the answer -->
     <!-- ID to associate with the label -->
      <!-- Placeholder text for guidance -->
      <!-- Input type is text -->
      <input
        v-model="newAnswer"                 
        id="answer"                         
        placeholder="e.g., 5/6"            
        type="text"                          
      />
    </div>

    <!-- Button to add a new flashcard by invoking 'addFlashcard' method on click -->
    <button @click="addFlashcard">Add Flashcard</button>

    <!-- Conditional rendering: Display flashcards only if there are any -->
    <div v-if="flashcards.length" class="flashcards">
      <!-- Subheading for the Flashcards section -->
      <h2>Your Flashcards</h2>

      <!-- Container for each flashcard with transition effects -->
       <!-- Loop through each flashcard -->
       <!-- Unique key for each flashcard -->
       <!-- CSS class for styling -->
       <div
        v-for="(card, index) in flashcards"    
        :key="index"                         
        class="flashcard-card"                
      >
        <!-- Paragraph displaying the flashcard question -->
        <p><strong>Question:</strong> {{ card.question }}</p>
        <!-- Paragraph displaying the flashcard answer -->
        <p><strong>Answer:</strong> {{ card.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlashCardApp",  // Name of the component

  // Reactive data properties for the component
  data() {
    return {
      newQuestion: "",  // Holds the value of the new question input
      newAnswer: "",    // Holds the value of the new answer input
      flashcards: [],    // Array to store all flashcards
    };
  },

  // Methods to handle user interactions and data manipulation
  methods: {
    /**
     * Adds a new flashcard to the 'flashcards' array.
     * Validates that both question and answer fields are filled.
     * Clears the input fields after adding the flashcard.
     * Alerts the user if any field is empty.
     */
    addFlashcard() {
      // Check if both question and answer are provided
      if (this.newQuestion && this.newAnswer) {
        // Push a new flashcard object into the 'flashcards' array
        this.flashcards.push({
          question: this.newQuestion,  // Set the question text
          answer: this.newAnswer,      // Set the answer text
        });

        // Clear the input fields after adding the flashcard
        this.newQuestion = "";
        this.newAnswer = "";
      } else {
        // Alert the user to fill in both fields if any is empty
        alert("Please fill in both the question and the answer.");
      }
    },
  },
};
</script>

<style>
/* Styles scoped to this component to prevent conflicts with other components */

/* Styling for the root div with id 'app' */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif; /* Set the font family */
  text-align: center;                                /* Center-align text */
  margin-top: 20px;                                  /* Add top margin */
}

/* Styling for all input fields */
input {
  margin: 5px;                                        /* Add margin around inputs */
  padding: 10px;                                      /* Add padding inside inputs */
  border: 1px solid rgb(139, 118, 118);               /* Set border color and style */
  border-radius: 5px;                                 /* Round the corners of inputs */
}

/* Styling for all buttons */
button {
  margin: 10px;                                       /* Add margin around buttons */
  padding: 10px 20px;                                 /* Add padding inside buttons */
  background-color: #a370c0;                          /* Set background color */
  color: white;                                       /* Set text color to white */
  border: none;                                       /* Remove default border */
  border-radius: 5px;                                 /* Round the corners of buttons */
  cursor: pointer;                                    /* Change cursor to pointer on hover */
}

/* Hover effect for buttons */
button:hover {
  background-color: var(--button-hover-color);        /* Darken background on hover (requires CSS variable) */
}

/* Container for all flashcards */
.flashcards {
  margin-top: 20px;                                   /* Add top margin above flashcards section */
}

/* Subheading styling within the flashcards section */
.flashcards h2 {
  margin-bottom: 10px;                                /* Add bottom margin below the heading */
}

/* Styling for each individual flashcard */
.flashcard-card {
  background-color: #f9f9f9;                          /* Set background color for flashcards */
  padding: 10px;                                      /* Add padding inside flashcards */
  border-radius: 5px;                                 /* Round the corners of flashcards */
  margin-bottom: 10px;                                /* Add bottom margin between flashcards */
  text-align: left;                                   /* Left-align text within flashcards */
}
</style>
