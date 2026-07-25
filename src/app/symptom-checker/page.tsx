"use client";

import { useReducer } from "react";
import Link from "next/link";
import { symptomTree } from "@/data/symptom-checker";
import type { Outcome } from "@/data/symptom-checker";

// The state of the checker at any moment
type State = {
  currentId: string;
  history: string[]; // stack of visited question IDs, for the Back button
  outcome: Outcome | null;
};

// Every possible action the user can take
type Action =
  | { type: "CHOOSE"; next: string }
  | { type: "BACK" }
  | { type: "RESTART" };

const initialState: State = {
  currentId: symptomTree.startId,
  history: [],
  outcome: null,
};

// A reducer is like a traffic controller — it takes the current state
// and an action, and returns the new state. All state logic lives here,
// keeping the UI clean and easy to read.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHOOSE": {
      if (action.next.startsWith("outcome:")) {
        const outcomeKey = action.next.replace("outcome:", "");
        return {
          ...state,
          history: [...state.history, state.currentId],
          outcome: symptomTree.outcomes[outcomeKey],
        };
      }
      return {
        currentId: action.next,
        history: [...state.history, state.currentId],
        outcome: null,
      };
    }
    case "BACK": {
      const previous = state.history[state.history.length - 1];
      return {
        currentId: previous ?? symptomTree.startId,
        history: state.history.slice(0, -1),
        outcome: null,
      };
    }
    case "RESTART":
      return initialState;
  }
}

// Outcome styling varies by severity
const outcomeStyles = {
  "self-care": {
    border: "border-success/40",
    bg: "bg-success/5",
    badge: "bg-success/10 text-success",
    icon: "✓",
  },
  "see-gp": {
    border: "border-caution/40",
    bg: "bg-caution/5",
    badge: "bg-caution/10 text-caution",
    icon: "!",
  },
  urgent: {
    border: "border-urgent/40",
    bg: "bg-urgent/5",
    badge: "bg-urgent/10 text-urgent",
    icon: "!",
  },
};

export default function SymptomCheckerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const question = symptomTree.questions[state.currentId];
  const stepNumber = state.history.length + 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Disclaimer — always visible */}
      <div className="mb-8 rounded-lg border border-caution/40 bg-caution/5 px-4 py-3 text-sm text-ink">
        <strong>Important:</strong> This tool is for illustrative purposes only
        and does not provide real medical advice. In an emergency, call your
        local emergency number immediately.
      </div>

      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
        Symptom Checker
      </h1>
      <p className="mt-2 text-subtle">
        Answer a few questions to get general guidance on your next step.
      </p>

      <div className="mt-8">
        {state.outcome ? (
          // --- OUTCOME SCREEN ---
          <div>
            {(() => {
              const styles = outcomeStyles[state.outcome.type];
              return (
                <div className={`rounded-lg border ${styles.border} ${styles.bg} p-6`}>
                  <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
                    {state.outcome.title}
                  </span>
                  <p className="mt-4 text-ink">{state.outcome.description}</p>
                  <ul className="mt-4 space-y-2">
                    {state.outcome.advice.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink">
                        <span className="mt-0.5 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => dispatch({ type: "RESTART" })}
                className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                Start again
              </button>
              <Link
                href="/conditions"
                className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
              >
                Browse Health A–Z
              </Link>
            </div>
          </div>
        ) : (
          // --- QUESTION SCREEN ---
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-subtle">
                Question {stepNumber}
              </span>
              {state.history.length > 0 && (
                <button
                  onClick={() => dispatch({ type: "BACK" })}
                  className="text-sm font-medium text-brand-600 hover:underline"
                >
                  ← Back
                </button>
              )}
            </div>

            <p className="font-heading text-xl font-semibold text-ink">
              {question.text}
            </p>

            <ul className="mt-6 space-y-3">
              {question.choices.map((choice) => (
                <li key={choice.label}>
                  <button
                    onClick={() =>
                      dispatch({ type: "CHOOSE", next: choice.next })
                    }
                    className="w-full rounded-lg border border-line bg-surface px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {choice.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Progress dots */}
            {state.history.length > 0 && (
              <div className="mt-6 flex gap-1.5">
                {state.history.map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-6 rounded-full bg-brand-600"
                  />
                ))}
                <div className="h-1.5 w-6 rounded-full bg-line" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}