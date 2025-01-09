<template>
  <div :class="theme">
    <AppNavbar @toggle-theme="toggleTheme" :theme="theme" />
    <div class="container">
      <!-- This is where routed components will be displayed -->
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
  },
  data() {
    return {
      theme: 'light', // Default theme
    };
  },
  created() {
    // Load theme from localStorage if it exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    }
  }
};
</script>

<style>
/* Define CSS variables for light and dark themes */
.light {
  --bg-color: #ffffff;
  --text-color: #000000;
  --nav-bg-color: #ec4eaa;
  --nav-button-bg-color: #18abe6;
  --nav-button-hover-color: #348cb4;
  --nav-button-active-color: #d191db;
  --button-bg-color: #304675;
  --button-hover-color: #5c4e97;
  --flashcard-bg-color: #f9f9f9;
}

.dark {
  --bg-color: #2c3e50;
  --text-color: #ecf0f1;
  --nav-bg-color: #75889b;
  --nav-button-bg-color: #2980b9;
  --nav-button-hover-color: #1c5980;
  --nav-button-active-color: #8e44ad;
  --button-bg-color: #27ae60;
  --button-hover-color: #1e8449;
  --flashcard-bg-color: #34495e;
}

/* Apply global theme styles */
#app {
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

.container {
  padding: 20px;
}
</style>
