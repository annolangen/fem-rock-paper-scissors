import { html, render } from "lit-html";
import paper from "url:./images/icon-paper.svg";
import scissors from "url:./images/icon-scissors.svg";
import rock from "url:./images/icon-rock.svg";
import triangle from "url:./images/bg-triangle.svg";
import rules from "url:./images/image-rules.svg";
import close from "url:./images/icon-close.svg";
import { TemplateResult } from "lit-html";

interface Choice {
  name: string;
  borderColor: string;
  shadowColor: string;
  imgHtml: TemplateResult;
}

const choices: Choice[] = [
  {
    name: "rock",
    borderColor: "border-rock",
    shadowColor: "shadow-rock-to",
    imgHtml: html`<img src=${rock} alt="Rock" />`,
  },
  {
    name: "paper",
    borderColor: "border-paper",
    shadowColor: "shadow-paper-to",
    imgHtml: html`<img src=${paper} alt="Paper" />`,
  },
  {
    name: "scissors",
    borderColor: "border-scissors",
    shadowColor: "shadow-scissors-to",
    imgHtml: html`<img src=${scissors} alt="Scissors" />`,
  },
];

const state = {
  showRules: false,
  score: 0,
  step: 4,
  youPick: choices[0],
  housePick: choices[0],
  outcome: "YOU WIN",
};

const score = {
  rock: {
    rock: 0,
    paper: -1,
    scissors: 1,
  },
  paper: {
    rock: 1,
    paper: 0,
    scissors: -1,
  },
  scissors: {
    rock: -1,
    paper: 1,
    scissors: 0,
  },
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function pick(c: Choice) {
  state.youPick = c;
  state.step = 2;
  renderBody();
  await wait(500);
  state.housePick = choices[Math.floor(Math.random() * choices.length)];
  renderBody();
  await wait(500);
  state.step = 3;
  renderBody();
  await wait(500);
  state.step = 4;
  const delta = score[state.youPick.name][state.housePick.name];
  state.outcome = delta > 0 ? "YOU WIN" : delta < 0 ? "YOU LOSE" : "DRAW";
  state.score += delta;
  renderBody();
}

const rulesModalHtml = html`<div
  class="absolute flex h-screen w-screen flex-col items-center justify-around bg-white md:m-24 md:h-100 md:w-100 md:rounded"
>
  <div class="w-stretch m-4 flex justify-center md:flex-row md:justify-between">
    <div class="text-dark-text px-4 text-3xl font-bold">RULES</div>
    <button class="hidden md:block" @click="${() => (state.showRules = false)}">
      <img src=${close} alt="Close" />
    </button>
  </div>
  <img src=${rules} alt="Rules" />
  <button class="md:hidden" @click="${() => (state.showRules = false)}">
    <img src=${close} alt="Close" />
  </button>
</div>`;

const choiceHtml = (choice: Choice, extraClass = "") =>
  html` <button
    class="${choice.borderColor} ${choice.shadowColor} ${extraClass} shadow-solid-bottom relative rounded-full border-16"
  >
    <span
      class="flex h-24 w-24 items-center justify-center rounded-full bg-slate-300"
    >
      ${choice.imgHtml}
    </span>
  </button>`;

const pickableChoiceHtml = (c: Choice, extraClass = "") =>
  html`<div @click="${() => pick(c)}">${choiceHtml(c)}</div>`;

const step1Html = () => html`
  <div
    class="w-stretch aspect-ratio-1-1 relative m-16 max-w-xs bg-contain bg-center bg-no-repeat"
    style="background-image: url(${triangle})"
  >
    <!-- Paper -->
    <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
      ${pickableChoiceHtml(choices[1])}
    </div>

    <!-- Scissors -->
    <div class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
      ${pickableChoiceHtml(choices[2])}
    </div>

    <!-- Rock -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0">
      ${pickableChoiceHtml(choices[0])}
    </div>
  </div>
`;

const twoChoicesHtml = (you: TemplateResult, house: TemplateResult) =>
  html` <div
    class="w-stretch relative flex max-w-xs flex-row justify-center bg-contain bg-center bg-no-repeat text-white"
  >
    <div class="grid w-[80vw] grid-cols-2 justify-items-center gap-10">
      ${you} ${house}
      <span class="text-sm tracking-widest text-white">YOU PICKED</span>
      <span class="text-sm tracking-widest text-white">THE HOUSE PICKED</span>
    </div>
  </div>`;

const step2Html = () => html`
  ${twoChoicesHtml(
    choiceHtml(state.youPick),
    html`<span class="w-10" h-10></span>`
  )}
`;

const step3Html = () => html`
  ${twoChoicesHtml(choiceHtml(state.youPick), choiceHtml(state.housePick))}
`;

const step4Html = () => html`
  <div class="flex flex-col justify-between">
    ${twoChoicesHtml(
      choiceHtml(state.youPick, "rippled-border"),
      choiceHtml(state.housePick)
    )}
    <h1
      class="mt-16 mb-4 self-center text-5xl font-bold tracking-wider text-white"
    >
      ${state.outcome}
    </h1>
    <button
      class="text-dark-text self-center rounded-lg bg-white px-16 py-2 text-sm tracking-widest"
      @click="${() => (state.step = 1)}"
    >
      PLAY AGAIN
    </button>
  </div>
`;

const stepsHtml = [step1Html, step2Html, step3Html, step4Html];

const bodyHtml = () => html`
  <div class="flex h-screen flex-col items-center justify-between">
    <div
      class="border-header-outline w-stretch m-6 flex max-w-lg flex-row justify-between rounded-md border-2 p-2 text-slate-100"
    >
      <div class="mx-3 flex flex-col justify-center text-xl/4 font-bold">
        <span>ROCK</span>
        <span>PAPER</span>
        <span>SCISSORS</span>
      </div>
      <div class="flex flex-col justify-items-center rounded bg-slate-100 p-2">
        <span class="text-score-text text-xxs">SCORE</span>
        <span class="text-dark-text px-4 text-3xl font-extrabold"
          >${state.score}</span
        >
      </div>
    </div>
    ${stepsHtml[state.step - 1]()}
    <button
      class="bordered m-12 rounded-md border-1 border-slate-300 px-10 py-2 tracking-widest text-slate-300 md:self-end"
      @click="${() => (state.showRules = true)}"
    >
      RULES
    </button>
    ${state.showRules ? rulesModalHtml : null}
  </div>
`;

const renderBody = () => render(bodyHtml(), document.body);
window.onclick = renderBody;
renderBody();
