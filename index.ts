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

const state = { show_rules: false, score: 12, step: 1 };

const pageHtml = html` Score Rules You Picked The House Picked You Win You Lose
Play Again`;

const rulesModalHtml = html`<div
  class="absolute flex h-screen w-screen flex-col items-center justify-around bg-white md:m-24 md:h-100 md:w-100 md:rounded"
>
  <div class="w-stretch m-4 flex justify-center md:flex-row md:justify-between">
    <div class="text-dark-text px-4 text-3xl font-bold">RULES</div>
    <button
      class="hidden md:block"
      @click="${() => (state.show_rules = false)}"
    >
      <img src=${close} alt="Close" />
    </button>
  </div>
  <img src=${rules} alt="Rules" />
  <button class="md:hidden" @click="${() => (state.show_rules = false)}">
    <img src=${close} alt="Close" />
  </button>
</div>`;

const choiceHtml = (choice: Choice) =>
  html` <button
    class="${choice.borderColor} ${choice.shadowColor} shadow-solid-bottom relative rounded-full border-16"
  >
    <span
      class="flex h-24 w-24 items-center justify-center rounded-full bg-slate-300"
    >
      ${choice.imgHtml}
    </span>
  </button>`;

const step1Html = () => html`
  <div
    class="w-stretch aspect-ratio-1-1 relative m-16 max-w-xs bg-contain bg-center bg-no-repeat"
    style="background-image: url(${triangle})"
  >
    <!-- Paper -->
    <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
      ${choiceHtml(choices[1])}
    </div>

    <!-- Scissors -->
    <div class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
      ${choiceHtml(choices[2])}
    </div>

    <!-- Rock -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0">
      ${choiceHtml(choices[0])}
    </div>
  </div>
`;

const stepsHtml = [step1Html];

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
      <div class="flex flex-col items-center rounded bg-slate-100 p-2">
        <span class="text-score-text text-xxs">SCORE</span>
        <span class="text-dark-text px-4 text-3xl font-extrabold"
          >${state.score}</span
        >
      </div>
    </div>
    ${stepsHtml[state.step - 1]()}
    <button
      class="bordered m-12 rounded-md border-1 border-slate-300 px-10 py-2 tracking-widest text-slate-300 md:self-end"
      @click="${() => (state.show_rules = true)}"
    >
      RULES
    </button>
    ${state.show_rules ? rulesModalHtml : null}
  </div>
`;

const renderBody = () => render(bodyHtml(), document.body);
window.onclick = renderBody;
renderBody();
