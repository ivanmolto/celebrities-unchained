import { pick_random } from "./utils.js";
const ROUNDS_PER_GAME = 5;
function remove(array, index) {
  if (index === -1) return;
  array[index] = array[array.length - 1];
  array.pop();
}
export function select(celebs, category) {
  const filtered = celebs.filter(c => {
    return c.category.includes(category);
  });
  const seen = new Set();
  const selection = [];
  let i = ROUNDS_PER_GAME;
  while (i--) {
    const n = Math.random();
    const ai = Math.floor(n * filtered.length);
    const a = filtered[ai];
    // remove a from the array so this person can't be picked again
    remove(filtered, ai);
    let b;
    // pick someone at random
    b = pick_random(filtered);
    selection.push({ a, b });
    seen.add(a.id);
    seen.add(b.id);
    // remove b from the array so this person can't be picked again
    remove(filtered, filtered.indexOf(b));
  }
  return selection;
}
