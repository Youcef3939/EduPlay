"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Sparkles, ArrowRight, Lock } from "lucide-react";
import gsap from "gsap";
import type { NormalizedQuestion } from "@/lib/content";

interface MiniQuizProps {
  question: NormalizedQuestion;
}

export default function MiniQuiz({ question }: MiniQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    // GSAP feedback pulse if motion is allowed
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const btn = optionRefs.current[index];
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 1 },
          {
            scale: 1.03,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );
      }
    }
  };

  const isCorrect = selectedOption === question.answerIndex;

  return (
    <div className="mini-quiz-card w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-card border-2 border-indigo-100 hover:-translate-y-1 transition-transform duration-300">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-primary font-bold text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Mini-Quiz Interactif Démo</span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-muted">
          Théorie des graphes
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl font-black text-text mb-6 leading-snug">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3.5 mb-6">
        {question.options.map((option, index) => {
          let styleClasses =
            "bg-slate-50 border-2 border-slate-200 text-text hover:border-primary hover:bg-indigo-50/50";
          let badgeIcon = null;

          if (isAnswered) {
            if (index === question.answerIndex) {
              styleClasses =
                "bg-green-50 border-2 border-success text-green-900 font-bold shadow-soft";
              badgeIcon = <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />;
            } else if (index === selectedOption) {
              styleClasses =
                "bg-red-50 border-2 border-danger text-red-900 font-bold shadow-soft";
              badgeIcon = <XCircle className="w-5 h-5 text-danger flex-shrink-0" />;
            } else {
              styleClasses =
                "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={index}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onClick={() => handleSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 sm:p-4.5 rounded-2xl text-base sm:text-lg font-medium transition-all duration-200 flex items-center justify-between gap-4 ${styleClasses} ${
                isAnswered ? "cursor-default" : "cursor-pointer hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    isAnswered && index === question.answerIndex
                      ? "bg-success text-white"
                      : isAnswered && index === selectedOption
                      ? "bg-danger text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
              {badgeIcon}
            </button>
          );
        })}
      </div>

      {/* Feedback banner once answered */}
      {isAnswered && (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 font-bold text-base">
              {isCorrect ? (
                <span className="text-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  Excellente réponse !
                </span>
              ) : (
                <span className="text-danger flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" />
                  Incorrect.
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {isCorrect
                ? "Vous avez bien identifié les constituants fondamentaux d'un graphe."
                : `La bonne réponse était l'option ${String.fromCharCode(
                    65 + question.answerIndex
                  )} (${question.options[question.answerIndex]}).`}
            </p>
          </div>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-primary hover:bg-indigo-700 text-white font-bold text-sm shadow-soft transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Voir tous les cours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Lock hint */}
      {isAnswered && (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
          <Lock className="w-3.5 h-3.5" />
          <span>Options verrouillées suite à votre choix.</span>
        </div>
      )}
    </div>
  );
}

