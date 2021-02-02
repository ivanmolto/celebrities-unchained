<template>
  <header v-if="!done">
    <p>
      Tap on the more monetisable celeb's image, or tap 'same price' if world is
      talking about them equally.
    </p>
  </header>
  <header v-if="done">
    <p>These are your results</p>
  </header>
  <div class="game-container">
    <div v-if="done" class="done">
      <strong>{{ score }}/{{ results.length }}</strong>
      <p>{{ pick_message(score / results.length) }}</p>
      <button @click="restart">Restart Game</button>
    </div>
    <div v-else-if="ready">
      <div v-for="(celebs, turn) in playCelebs" :key="turn">
        <div v-if="turn === celebsBattle">
          <transition name="fade">
            <div class="game">
              <div class="card-container">
                <Card
                  :celeb="celebs.a"
                  @click="submit(celebs.a, celebs.b, 1)"
                  :showprice="celebAPrice"
                />
              </div>
              <div>
                <button class="same" @click="submit(celebs.a, celebs.b, 0)">
                  same price
                </button>
              </div>
              <div class="card-container">
                <Card
                  :celeb="celebs.b"
                  @click="submit(celebs.a, celebs.b, -1)"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
  <img
    v-if="last_result"
    class="giant-result"
    alt="{last_result} answer"
    src="{last_result}.svg"
  />
  <div class="results" style="grid-template-columns: repeat(5, 1fr)">
    <span v-for="(result, index) in results" :key="index" class="result">
      <img v-if="result === 'right'" :alt="result" :src="right" />
      <img v-if="result === 'wrong'" :alt="result" :src="wrong" />
    </span>
  </div>
</template>

<script>
import Web3 from "web3";
import { mapState } from "vuex";
import { celebrity } from "../contracts/abis.js";
import Card from "@/components/Card.vue";
import { pick_random } from "../utils.js";
export default {
  name: "Game",
  components: {
    Card
  },
  data() {
    return {
      offset: 100000,
      round: 0,
      done: false,
      ready: true,
      last_result: null,
      results: [false, false, false, false, false],
      right: "https://dnzc6grt341pd.cloudfront.net/right.svg",
      wrong: "https://dnzc6grt341pd.cloudfront.net/wrong.svg",
      celebrityRopstenAddress: "0x1D50e2c7286224A25295945A7B67B9398aCa64dc",
      celebrityContract: null,
      celebAPrice: 0,
      celebBPrice: 0
    };
  },
  methods: {
    pick_message(p) {
      if (p <= 0.2)
        return pick_random([`Time to kick ass`, `Better luck next time`]);
      if (p <= 0.5)
        return pick_random([`Why walk when you can ride?`, `Keep trying!`]);
      if (p <= 0.8) return pick_random([`Wow!`, `Not bad`]);
      if (p < 1) return pick_random([`Cool!`]);
      return pick_random([`Top marks`]);
    },
    restart() {
      this.$store.commit("restartGame");
    },
    async submit(a, b, sign) {
      const requestIdA = Number(a.celebId) + this.offset;
      const priceA = await this.celebrityContract.methods
        .readCelebPrice(requestIdA)
        .call();
      const requestIdB = Number(b.celebId) + this.offset;
      const priceB = await this.celebrityContract.methods
        .readCelebPrice(requestIdB)
        .call();
      this.last_result =
        Math.sign(Number(priceA) - Number(priceB)) === sign ? "right" : "wrong";
      this.results[this.round] = this.last_result;
      if (this.last_result === "right") {
        this.$store.commit("updateScore");
      }
      this.last_result = null;
      if (this.round < 4) {
        this.round += 1;
      } else {
        this.done = true;
      }
    }
  },
  props: {
    selection: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["uiState", "playCelebs", "score"]),
    celebs() {
      return this.$store.state.playCelebs;
    },
    celebsBattle() {
      return this.round;
    },
    showprice() {
      return !!this.last_result;
    }
  },
  created() {
    const web3 = new Web3(Web3.givenProvider);
    const Contract = new web3.eth.Contract(
      celebrity,
      this.celebrityRopstenAddress
    );
    this.celebrityContract = Contract;
  }
};
</script>

<style scoped>
.game-container {
  flex: 1;
}
.game {
  display: grid;
  grid-template-rows: 7fr 1fr 7fr;
  grid-gap: 0.5em;
  width: 100%;
  height: 600;
  max-width: min(100%, 40vh);
  margin: 0 auto;
}
.game > div {
  display: flex;
  align-items: center;
}
.same {
  width: 100%;
  align-items: center;
  margin: 0;
}
.game .card-container button {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.error {
  color: red;
}
.giant-result {
  position: fixed;
  width: 50vmin;
  height: 50vmin;
  left: calc(50vw - 25vmin);
  top: calc(50vh - 25vmin);
  opacity: 0.5;
}
.results {
  display: grid;
  grid-gap: 0.2em;
  width: 100%;
  max-width: 320px;
  margin: 1em auto 0 auto;
}
.result {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 0 0 100% 0;
  transition: background 0.2s;
  transition-delay: 0.1s;
}
.result img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.done {
  position: absolute;
  width: 100%;
  height: 100;
  left: 0;
  top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.done strong {
  font-size: 6em;
  font-weight: 700;
}
@media (min-width: 640px) {
  .game {
    max-width: 100%;
    grid-template-rows: none;
    grid-template-columns: 1fr 8em 1fr;
    max-height: calc(100vh - 6em);
  }
  .same {
    height: 8em;
  }
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
