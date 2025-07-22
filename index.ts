import { html, render } from "lit-html";

const state = { show_rules: false, score: 12, step: 1 };

const pageHtml = html` Score Rules You Picked The House Picked You Win You Lose
Play Again`;

const rulesModalHtml = html`<div
  class="h-vh flex flex-col items-center justify-center opacity-50"
></div>`;

const step1Html = () => html`pretty picture`;

const stepsHtml = [step1Html];

const bodyHtml = () =>
  state.show_rules
    ? rulesModalHtml
    : html`
        <div class="flex h-screen flex-col items-center justify-between">
          <div
            class="border-header-outline w-stretch m-6 flex flex-row justify-between rounded-md border-2 p-2 text-slate-300"
          >
            <div class="mx-3 flex flex-col justify-center text-xl/4 font-bold">
              <span>ROCK</span>
              <span>PAPER</span>
              <span>SCISSORS</span>
            </div>
            <div
              class="text-dark-text flex flex-col items-center rounded bg-white p-2"
            >
              <span class="text-xs">SCORE</span>
              <span class="text-dark-text px-4 text-3xl font-bold"
                >${state.score}</span
              >
            </div>
          </div>
          ${stepsHtml[state.step - 1]()}
          <button
            class="bordered m-12 rounded-md border-1 border-slate-300 px-10 py-2 tracking-widest text-slate-300"
            @click="${() => (state.show_rules = true)}"
          >
            RULES
          </button>
        </div>
      `;

const renderBody = () => render(bodyHtml(), document.body);
window.onclick = renderBody;
renderBody();
