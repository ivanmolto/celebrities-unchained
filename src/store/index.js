import { createStore } from "vuex";

export default createStore({
  state: {
    uiState: "welcome",
    playCelebs: [],
    score: 0,
  },
  mutations: {
    updateUIState(state, uistate) {
      state.uiState = uistate;
    },
    updatePlayCelebs(state, celebucks) {
      state.playCelebs = celebucks;
    },
    updateScore(state) {
      state.score += 1
    },
    restartGame(state) {
      state.uiState = "welcome";
      state.score = 0;
    }
  },
  actions: {},
  modules: {}
});
