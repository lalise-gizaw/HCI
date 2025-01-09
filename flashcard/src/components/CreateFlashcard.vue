<template>
  <div>
    <!-- Heading for creating a new flashcard -->
    <h1>Create Flashcard</h1>
    
    <!-- Flashcard creation/edit form -->
    <form @submit.prevent="saveFlashcard">
      
      <!-- Label and input for the flashcard question -->
      <label for="question">Question:</label>
      <input 
        v-model="newFlashcard.question" 
        type="text" 
        placeholder="Enter question" 
        required 
      />

      <!-- Label and input for the flashcard answer -->
      <label for="answer">Answer:</label>
      <input 
        v-model="newFlashcard.answer" 
        type="text" 
        placeholder="Enter answer" 
        required 
      />

      <!-- Label and input for the flashcard category -->
      <label for="category">Category:</label>
      <input 
        v-model="newFlashcard.category" 
        type="text" 
        placeholder="e.g., Math" 
      />

      <!-- Label and input for uploading an image -->
      <label for="image">Image:</label>
      <input 
        type="file" 
        @change="handleImageUpload" 
        accept="image/*" 
      />

      <!-- Submit button changes text based on editing state -->
      <button type="submit">
        {{ isEditing ? 'Update Flashcard' : 'Save Flashcard' }}
      </button>

      <!-- Cancel button appears only when editing -->
      <button 
        type="button" 
        v-if="isEditing" 
        @click="cancelEdit"
      >
        Cancel
      </button>
    </form>

    <!-- Heading for the list of flashcards -->
    <h2>Flashcards</h2>

    <!-- Input for searching flashcards -->
    <input 
      v-model="searchQuery" 
      placeholder="Search fhlashcards..." 
    />

    <!-- Dropdown for selecting flashcard category -->
    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <!-- Dynamically generate category options -->
      <option 
        v-for="category in categories" 
        :key="category" 
        :value="category"
      >
        {{ category }}
      </option>
    </select>

    <!-- Transition group for animating flashcard list changes -->
    <transition-group name="fade" tag="ul">
      <!-- Loop through filtered flashcards and display each one -->
      <li 
        v-for="flashcard in filteredFlashcards" 
        :key="flashcard.id" 
        class="flashcard-item"
      >
        <div class="flashcard-content">
          <!-- Display image if flashcard has one -->
          <div v-if="flashcard.image" class="flashcard-image">
            <img :src="flashcard.image" alt="Flashcard Image" />
          </div>
          
          <!-- Display flashcard details: question, answer, category -->
          <div class="flashcard-details">
            <p><strong>Question:</strong> {{ flashcard.question }}</p>
            <p><strong>Answer:</strong> {{ flashcard.answer }}</p>
            <p><strong>Category:</strong> {{ flashcard.category }}</p>
          </div>
        </div>
        
        <!-- Buttons for editing and deleting the flashcard -->
        <div class="flashcard-actions">
          <button @click="editFlashcard(flashcard)">Edit</button>
          <button @click="deleteFlashcard(flashcard.id)">Delete</button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Object to hold the new or edited flashcard data
      newFlashcard: {
        question: '',
        answer: '',
        category: '',
        image: ''
      },
      // Array to store all flashcards
      flashcards: [],
      // Flag to indicate if a flashcard is being edited
      isEditing: false,
      // ID of the flashcard currently being edited
      editingFlashcardId: null,
      // Search query string for filtering flashcards
      searchQuery: '',
      // Selected category for filtering flashcards
      selectedCategory: ''
    };
  },
  computed: {
    // Compute unique categories from the flashcards for the dropdown
    categories() {
      const cats = this.flashcards
        .map(card => card.category)
        .filter(cat => cat); // Remove empty categories
      return [...new Set(cats)]; // Remove duplicates
    },
    // Filter flashcards based on search query and selected category
    filteredFlashcards() {
      return this.flashcards.filter(card => {
        // Check if the flashcard matches the search query
        const matchesSearch =
          card.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (card.category && card.category.toLowerCase().includes(this.searchQuery.toLowerCase()));
        
        // Check if the flashcard matches the selected category
        const matchesCategory = this.selectedCategory 
          ? card.category === this.selectedCategory 
          : true;
        
        // Return true if both conditions are met
        return matchesSearch && matchesCategory;
      });
    }
  },
  // Lifecycle hook to load flashcards from localStorage when component is mounted
  mounted() {
    this.loadFlashcards();
  },
  methods: {
    // Handle image upload by converting the file to a base64 string
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newFlashcard.image = e.target.result; // Save the base64 string
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    },
    // Save a new flashcard or update an existing one
    saveFlashcard() {
      if (this.isEditing) {
        // Find the index of the flashcard being edited
        const index = this.flashcards.findIndex(card => card.id === this.editingFlashcardId);
        if (index !== -1) {
          // Update the flashcard data
          this.flashcards[index] = {
            ...this.flashcards[index],
            question: this.newFlashcard.question,
            answer: this.newFlashcard.answer,
            category: this.newFlashcard.category,
            image: this.newFlashcard.image
          };
          // Reset editing state
          this.isEditing = false;
          this.editingFlashcardId = null;
        }
      } else {
        // Create a new flashcard with a unique ID
        const newCard = {
          ...this.newFlashcard,
          id: Date.now() // Use timestamp as a unique ID
        };
        this.flashcards.push(newCard); // Add to the flashcards array
      }

      // Save the updated flashcards array to localStorage
      localStorage.setItem('flashcards', JSON.stringify(this.flashcards));

      // Reset the form fields
      this.newFlashcard = { question: '', answer: '', category: '', image: '' };
    },
    // Start editing a selected flashcard
    editFlashcard(flashcard) {
      this.isEditing = true; // Set editing mode to true
      this.editingFlashcardId = flashcard.id; // Store the ID of the flashcard being edited
      this.newFlashcard = { ...flashcard }; // Pre-fill the form with flashcard data
    },
    // Cancel the editing process and reset the form
    cancelEdit() {
      this.isEditing = false; // Exit editing mode
      this.editingFlashcardId = null; // Clear the editing flashcard ID
      this.newFlashcard = { question: '', answer: '', category: '', image: '' }; // Reset form
    },
    // Delete a flashcard after user confirmation
    deleteFlashcard(id) {
      if (confirm('Are you sure you want to delete this flashcard?')) {
        // Remove the flashcard with the given ID from the array
        this.flashcards = this.flashcards.filter(card => card.id !== id);
        // Update the localStorage with the new flashcards array
        localStorage.setItem('flashcards', JSON.stringify(this.flashcards));
      }
    },
    // Load flashcards from localStorage when the component is mounted
    loadFlashcards() {
      const flashcards = JSON.parse(localStorage.getItem('flashcards')) || []; // Retrieve from localStorage or use empty array
      this.flashcards = flashcards; // Set the flashcards data
    }
  }
};
</script>

<style scoped>
/* Styles for the form layout */
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

/* Styles for labels */
label {
  margin-top: 10px;
}

/* Styles for text and file input fields */
input[type="text"],
input[type="file"] {
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box; /* Ensure padding does not affect total width */
}

/* General button styles */
button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: var(--button-bg-color); /* Use CSS variable for background color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

/* Hover effect for buttons */
button:hover {
  background-color: var(--button-hover-color); /* Use CSS variable for hover color */
}

/* Specific styles for the Cancel button */
button[type="button"] {
  background-color: #e74c3c; /* Red color to indicate cancellation */
}

/* Hover effect for the Cancel button */
button[type="button"]:hover {
  background-color: #c0392b; /* Darker red on hover */
}

/* Styles for each flashcard item in the list */
.flashcard-item {
  list-style: none; /* Remove default list styling */
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  padding: 15px;
  margin-bottom: 10px;
  background-color: var(--flashcard-bg-color); /* Use CSS variable for background color */
  display: flex;
  justify-content: space-between; /* Space between content and actions */
  align-items: center;
  transition: all 0.3s ease; /* Smooth transition for any changes */
}

/* Container for flashcard content */
.flashcard-content {
  display: flex;
  align-items: center;
}

/* Styles for flashcard images */
.flashcard-image img {
  width: 100px;
  height: 100px;
  object-fit: cover; /* Ensure the image covers the container without distortion */
  border-radius: 4px; /* Slightly rounded corners */
  margin-right: 15px; /* Space between image and details */
}

/* Styles for flashcard text details */
.flashcard-details p {
  margin: 5px 0; /* Vertical spacing between paragraphs */
}

/* Container for action buttons within a flashcard */
.flashcard-actions button {
  margin-left: 10px; /* Space between buttons */
  padding: 5px 10px;
  background-color: var(--button-bg-color); /* Use CSS variable for background color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

/* Hover effect for action buttons */
.flashcard-actions button:hover {
  background-color: var(--button-hover-color); /* Use CSS variable for hover color */
}

/* Transition effects for flashcard list animations */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s; /* Duration of the transition */
}
.fade-enter-from, .fade-leave-to {
  opacity: 0; /* Start or end with zero opacity */
  transform: translateY(-10px); /* Slight upward movement */
}
</style>
