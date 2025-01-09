<template>
  <!-- Navigation bar container -->
  <nav>
    <!-- Link to the Home page using Vue Router's router-link component -->
    <router-link to="/" class="nav-button">Home</router-link>
    
    <!-- Link to the Create Flashcard page -->
    <router-link to="/create-flashcard" class="nav-button">Create Flashcard</router-link>
    
    <!-- Link to the Create Quiz page -->
    <router-link to="/create-quiz" class="nav-button">Create Quiz</router-link>
    
    <!-- Link to the Fraction Rules page -->
    <router-link to="/fraction-rules" class="nav-button">Fraction Rules</router-link>
    
    <!-- Button to toggle between Light and Dark modes -->
    <button @click="$emit('toggle-theme')" class="theme-toggle">
      <!-- Display button text based on the current theme prop -->
      {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
    </button>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar", // Name of the component
  
  props: {
    theme: {
      type: String,      // The 'theme' prop expects a string value
      default: 'light'   // Default value for 'theme' is 'light'
    }
  }
};
</script>

<style scoped>
/* Styling for the navigation bar */
nav {
  background-color: var(--nav-bg-color); /* Sets the background color using a CSS variable */
  padding: 1rem;                         /* Adds padding inside the nav */
  display: flex;                         /* Uses flexbox for layout */
  justify-content: center;               /* Centers the nav items horizontally */
  align-items: center;                   /* Centers the nav items vertically */
}

/* Styling for the navigation buttons (router-links) */
.nav-button {
  color: white;                                 /* Sets text color to white */
  text-decoration: none;                        /* Removes underline from links */
  margin: 0 10px;                                /* Adds horizontal spacing between buttons */
  padding: 10px 20px;                            /* Adds padding inside the buttons */
  background-color: var(--nav-button-bg-color);  /* Sets background color using a CSS variable */
  border-radius: 4px;                            /* Rounds the corners of the buttons */
  font-size: 16px;                               /* Sets the font size */
  transition: background-color 0.3s ease;        /* Adds a smooth transition for background color changes */
}

/* Hover effect for navigation buttons */
.nav-button:hover {
  background-color: var(--nav-button-hover-color); /* Changes background color on hover using a CSS variable */
}

/* Styling for the active navigation button (current route) */
.nav-button.router-link-exact-active {
  background-color: var(--nav-button-active-color); /* Sets active button background color using a CSS variable */
  font-weight: bold;                                  /* Makes the text bold to indicate active state */
}

/* Styling for the theme toggle button */
.theme-toggle {
  margin-left: 20px;                                 /* Adds left margin to separate from other buttons */
  padding: 10px 20px;                                /* Adds padding inside the button */
  background-color: var(--button-bg-color);          /* Sets background color using a CSS variable */
  color: white;                                      /* Sets text color to white */
  border: none;                                      /* Removes default border */
  border-radius: 4px;                                /* Rounds the corners of the button */
  font-size: 16px;                                   /* Sets the font size */
  cursor: pointer;                                   /* Changes cursor to pointer on hover */
  transition: background-color 0.3s ease;            /* Adds a smooth transition for background color changes */
}

/* Hover effect for the theme toggle button */
.theme-toggle:hover {
  background-color: var(--button-hover-color);        /* Changes background color on hover using a CSS variable */
}
</style>
