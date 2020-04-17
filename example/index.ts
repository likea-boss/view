import { el, cmp, run } from "../src";

console.time("createComponents");

const Main = cmp("Main", () => {
  return el("div", {}, [
    el("span", { "class": "red" }, "Red String"),
    el("span", { "class": "blue" }, "Blue String"),
    Button(),
    Button(),
    Button(),
    Button(),
    Button(),
    Button(),
    Button(),
  ]);
});

const Main2 = cmp("Main2", () => [
  Main(),
  Main(),
  Main(),
]);

const Button = cmp("Button", () => {
  return el("div", {}, [
    el("p", {}, "Some text"),
    el("button", {}, "Press Me!")
  ]);
});

console.timeEnd("createComponents");

console.time("render");

run(document.body, Main2());

console.timeEnd("render");
