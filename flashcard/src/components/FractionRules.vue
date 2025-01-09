<template>
  <!-- Root div container for the FractionRules component -->
  <div class="fraction-rules">
    <!-- Main heading for the Fraction Rules page -->
    <h2>Fraction Rules</h2>

    <!-- Section for the Addition Rule -->
    <section>
      <h3>1. Adding Fractions:</h3>
      <p>
        <!-- Explanation of the addition rule for fractions -->
        When adding fractions, make sure that the denominators are the same. If they are not the same, you need to find a common denominator before adding the numerators.
        <br />
        <!-- Example heading -->
        Example: 
        <br />
        <!-- Displaying the addition of two fractions using styled spans -->
        <span class="fraction">
          <span class="numerator">1</span>
          <span class="denominator">4</span>
        </span> 
        + 
        <span class="fraction">
          <span class="numerator">1</span>
          <span class="denominator">2</span>
        </span> 
        = 
        <span class="fraction">
          <span class="numerator">3</span>
          <span class="denominator">4</span>
        </span>
        <br />
        <!-- Steps to perform the addition -->
        Steps:
        <ol>
          <li>Find a common denominator. In this case, the common denominator between 4 and 2 is 4.</li>
          <li>Rewrite the fractions: 
            <span class="fraction">
              <span class="numerator">1</span>
              <span class="denominator">4</span>
            </span> 
            and 
            <span class="fraction">
              <span class="numerator">2</span>
              <span class="denominator">4</span>
            </span>
          </li>
          <li>Add the numerators: 1 + 2 = 3</li>
          <li>Write the result as: 
            <span class="fraction">
              <span class="numerator">3</span>
              <span class="denominator">4</span>
            </span>
          </li>
        </ol>
      </p>
    </section>

    <!-- Section for the Multiplication Rule -->
    <section>
      <h3>2. Multiplying Fractions:</h3>
      <p>
        <!-- Explanation of the multiplication rule for fractions -->
        When multiplying fractions, you simply multiply the numerators (top numbers) and the denominators (bottom numbers).
        <br />
        <!-- Example heading -->
        Example: 
        <br />
        <!-- Displaying the multiplication of two fractions using styled spans -->
        <span class="fraction">
          <span class="numerator">1</span>
          <span class="denominator">3</span>
        </span> 
        × 
        <span class="fraction">
          <span class="numerator">2</span>
          <span class="denominator">5</span>
        </span> 
        = 
        <span class="fraction">
          <span class="numerator">2</span>
          <span class="denominator">15</span>
        </span>
        <br />
        <!-- Steps to perform the multiplication -->
        Steps:
        <ol>
          <li>Multiply the numerators: 1 × 2 = 2</li>
          <li>Multiply the denominators: 3 × 5 = 15</li>
          <li>Write the result as: 
            <span class="fraction">
              <span class="numerator">2</span>
              <span class="denominator">15</span>
            </span>
          </li>
        </ol>
      </p>
    </section>

    <!-- Section for the Division Rule -->
    <section>
      <h3>3. Dividing Fractions:</h3>
      <p>
        <!-- Explanation of the division rule for fractions -->
        When dividing fractions, you multiply the first fraction by the reciprocal (flipping the second fraction).
        <br />
        <!-- Example heading -->
        Example: 
        <br />
        <!-- Displaying the division of two fractions using styled spans -->
        <span class="fraction">
          <span class="numerator">3</span>
          <span class="denominator">4</span>
        </span> 
        ÷ 
        <span class="fraction">
          <span class="numerator">2</span>
          <span class="denominator">5</span>
        </span> 
        = 
        <span class="fraction">
          <span class="numerator">15</span>
          <span class="denominator">8</span>
        </span>
        <br />
        <!-- Steps to perform the division -->
        Steps:
        <ol>
          <li>Flip the second fraction (reciprocal): 
            <span class="fraction">
              <span class="numerator">5</span>
              <span class="denominator">2</span>
            </span>
          </li>
          <li>Multiply the first fraction by the reciprocal: 
            <span class="fraction">
              <span class="numerator">3</span>
              <span class="denominator">4</span>
            </span>
            ×
            <span class="fraction">
              <span class="numerator">5</span>
              <span class="denominator">2</span>
            </span>
          </li>
          <li>Multiply the numerators: 3 × 5 = 15</li>
          <li>Multiply the denominators: 4 × 2 = 8</li>
          <li>Write the result as: 
            <span class="fraction">
              <span class="numerator">15</span>
              <span class="denominator">8</span>
            </span>
          </li>
        </ol>
      </p>
    </section>

  </div>
</template>

<script>
export default {
  name: "FractionRules" // Name of the component
};
</script>

<style scoped>
/* Styling for fraction display */
.fraction {
  display: inline-block;            /* Display fraction inline with other elements */
  text-align: center;               /* Center align text within fraction */
  position: relative;               /* Relative positioning for potential future use */
  font-size: 1.1em;                 /* Adjust font size for better visibility */
  margin: 0 5px;                    /* Add horizontal margin between fractions */
}

/* Styling for the numerator part of the fraction */
.fraction .numerator {
  display: block;                   /* Display numerator as a block element */
  font-size: 1.3em;                 /* Increase font size for the numerator */
}

/* Styling for the denominator part of the fraction */
.fraction .denominator {
  display: block;                   /* Display denominator as a block element */
  font-size: 1.1em;                 /* Adjust font size for the denominator */
  border-top: 1px solid black;      /* Add a top border to represent the fraction line */
  margin-top: 4px;                  /* Add space above the denominator */
  padding-top: 3px;                 /* Add padding to position the denominator properly */
}

/* Styling for the main heading */
h2 {
  font-size: 2.5em;                  /* Set a large font size for the heading */
  color: #d5006d;                    /* Apply a pinkish color to the heading */
  margin-bottom: 15px;               /* Add space below the heading */
}

/* Styling for subheadings */
h3 {
  font-size: 1.8em;                  /* Set a slightly smaller font size for subheadings */
  color: #8c00b3;                    /* Apply a purple color to subheadings */
  margin-bottom: 10px;               /* Add space below the subheadings */
}

/* Styling for paragraph text */
p {
  font-size: 1.2em;                  /* Set a readable font size for paragraphs */
  line-height: 1.6;                  /* Increase line height for better readability */
  margin-bottom: 20px;               /* Add space below paragraphs */
}

/* Styling for ordered lists */
ol {
  margin-top: 10px;                  /* Add space above the list */
  margin-left: 20px;                 /* Indent the list from the left */
}

/* Styling for list items */
li {
  font-size: 1.1em;                  /* Slightly larger font size for list items */
  margin-bottom: 10px;               /* Add space below each list item */
}
</style>
