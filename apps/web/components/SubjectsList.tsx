"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  Code,
  Film,
  Lock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { SubjectItem } from "@/lib/content";

gsap.registerPlugin(useGSAP);

interface SubjectsListProps {
  subjects: SubjectItem[];
}

export default function SubjectsList({ subjects }: SubjectsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Header fade in
      gsap.from(".subjects-header", {
        y: -15,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Cards stagger in (stagger 0.1s)
      gsap.from(".subject-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const getIcon = (iconName: string, active: boolean) => {
    const className = `w-8 h-8 ${active ? "text-primary" : "text-muted"}`;
    switch (iconName) {
      case "Calculator":
        return <Calculator className={className} />;
      case "BookOpen":
        return <BookOpen className={className} />;
      case "Code":
        return <Code className={className} />;
      case "Film":
        return <Film className={className} />;
      default:
        return <GraduationCap className={className} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
    >
      {/* Header */}
      <div className="subjects-header text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-primary font-semibold text-sm mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Tableau de bord</span>
        </div>
        <h1 className="text-4xl font-extrabold text-text tracking-tight sm:text-5xl">
          Choisissez votre matière
        </h1>
        <p className="mt-4 text-xl text-muted max-w-2xl mx-auto">
          Explorez les leçons interactives, observez les médias et validez vos acquis avec des quiz dédiés.
        </p>
      </div>

      {/* Grid of 4 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {subjects.map((subject) => {
          if (subject.active) {
            return (
              <div
                key={subject.id}
                className="subject-card group bg-white rounded-2xl p-8 border-2 border-indigo-100 hover:border-primary shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {getIcon(subject.icon, true)}
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-sm font-bold bg-green-50 text-success border border-green-200">
                      Disponible
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-text group-hover:text-primary transition-colors">
                    {subject.name}
                  </h2>
                  <p className="mt-3 text-muted text-base leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href={`/subjects/${subject.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-indigo-700 text-white font-bold text-lg shadow-soft transition-all duration-200 group-hover:translate-y-[-1px] active:translate-y-[0px]"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          }

          // Inactive / Locked card with lower opacity
          return (
            <div
              key={subject.id}
              className="subject-card bg-slate-50/70 rounded-2xl p-8 border-2 border-slate-200/70 opacity-75 cursor-not-allowed flex flex-col justify-between select-none"
              aria-disabled="true"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200/70 flex items-center justify-center">
                    {getIcon(subject.icon, false)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold bg-slate-200 text-muted">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{subject.badge || "Coming soon"}</span>
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-700">
                  {subject.name}
                </h2>
                <p className="mt-3 text-slate-500 text-base leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/60">
                <div className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-locked text-slate-500 font-bold text-base cursor-not-allowed">
                  <Lock className="w-4 h-4" />
                  <span>Coming soon</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

