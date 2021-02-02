<template>
  <header>
    <h1>Celebrities Unchained</h1>
    <p>
      CelebrityBucks.com assigns dollar values to every mention which allows
      them to provide a view into both who and what celeb world is talking
      about.
    </p>
    <p>But who commands the highest price?</p>
  </header>
  <p>Pick a category to play a game:</p>
  <div class="categories">
    <button
      v-for="(category, index) in categories"
      :key="category.slug"
      @click="selectCategory(index)"
    >
      {{ category.label }}
    </button>
  </div>
  <p>
    <br />Powered by <a href="https://tellor.io">Tellor.io</a> and
    <a href="https://celebritybucks.com">CelebrityBucks.com</a>
  </p>
</template>

<script>
export default {
  data() {
    return {
      selected: false,
      selectedCategory: null,
      categories: [
        { slug: "actors", label: "Actors" },
        { slug: "comedians", label: "Comedians" },
        { slug: "musicians", label: "Musicians" },
        { slug: "tv celebs", label: "TV Celebs" }
      ]
    };
  },
  methods: {
    selectCategory(index) {
      this.selectedCategory = index;
      this.$emit(
        "select-category",
        this.categories[this.selectedCategory].slug
      );
    }
  }
};
</script>

<style scoped>
h1 {
  color: #ff3e00;
  font-size: min(12vw, 4em);
  font-weight: 100;
  margin: 0 0 0.5em 0;
}
p {
  max-width: 24em;
  margin: 0 auto 1em auto;
}
.categories {
  width: 100%;
  max-width: 26em;
  margin: 0 auto;
}
button {
  padding: 1em 1em;
  display: block;
  margin: 0 0 0.2em 0;
  width: 100%;
}
@media (min-width: 640px) {
  button {
    display: inline;
    margin: 0 0.2em 0.4em 0.2em;
    width: auto;
  }
}
</style>
