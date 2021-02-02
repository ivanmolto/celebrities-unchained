<template>
  <main>
    <Welcome v-if="uiState === 'welcome'" @select-category="start" />
    <div v-else>
      <Game :selection="selection" />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import Welcome from "@/components/Welcome.vue";
import Game from "@/components/Game.vue";
import axios from "axios";
import { select } from "./select.js";

export default {
  name: "App",
  components: {
    Welcome,
    Game
  },
  data() {
    return {
      celebs: null,
      lookup: null,
      selection: null
    };
  },
  methods: {
    start(slug) {
      this.selection = select(this.celebs, slug);
      this.$store.commit("updatePlayCelebs", this.selection);
      this.$store.commit("updateUIState", "playing");
    }
  },
  computed: {
    ...mapState(["uiState", "playCelebs"])
  },
  created() {
    if (window.ethereum) {
      window.ethereum.enable();
    } else {
      alert("To use this app you'll need Metamask or another web3 provider");
    }
    axios
      .get("https://d39hli8rzffwqz.cloudfront.net/celebrities.json")
      .then(response => {
        this.celebs = response.data;
        this.lookup = new Map();
        this.celebs.forEach(c => {
          this.lookup.set(c.celebId, c);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
}
html * {
  position: relative;
  box-sizing: border-box;
}
body {
  --border-radius: 5px;
  --do-effect: #7fdbff;
  --do-effect-lighter: rgb(166, 230, 255);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  background: #222;
  color: #eee;
  margin: 0;
  font-size: 14px;
}
p {
  line-height: 1.5;
}
a {
  color: var(--do-effect);
  text-decoration: none;
}
button {
  font-family: inherit;
  font-size: inherit;
  background: var(--do-effect);
  color: #222;
  border: none;
  border-radius: var(--border-radius);
  margin: 0 0 0.5em 0;
  padding: 0.5em 1em;
  line-height: 1;
}
button:not(:disabled):hover {
  background-color: var(--do-effect-lighter);
}
@media (min-width: 480px) {
  body {
    font-size: 16px;
  }
}
main {
  text-align: center;
  padding: 1em;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
