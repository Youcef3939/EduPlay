"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  Calculator,
  Code,
  Film,
  PlayCircle,
  HelpCircle,
  BarChart3,
  Compass,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LandingNavbar from "./LandingNavbar";
import MiniQuiz from "./MiniQuiz";
import type { NormalizedQuestion, SubjectItem } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface LandingClientViewProps {
  quizQuestion: NormalizedQuestion;
  subjects: SubjectItem[];
}

export default function LandingClientView({
  quizQuestion,
  subjects,
}: LandingClientViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated stat values (for count-up)
  const [statSubjects, setStatSubjects] = useState(0);
  const [statQuestions, setStatQuestions] = useState(0);
  const [statMedia, setStatMedia] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useGSAP(
    () => {
      // Check session
      setIsAuthenticated(document.cookie.includes("eduplay_session=student"));

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Skip all animations and set final stat states immediately
        setStatSubjects(4);
        setStatQuestions(5);
        setStatMedia(3);
        return;
      }

      // --- 1. HERO TIMELINE (0.6s per text element) ---
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      heroTl
        .from(".hero-badge", {
          y: -20,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".hero-headline",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".hero-subtitle",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".hero-cta-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".hero-visual-box",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );

      // Continuous floating ambient motion on hero icons
      gsap.to(".hero-float-icon-1", {
        y: -14,
        x: 4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-float-icon-2", {
        y: 12,
        x: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // --- 2. MINI QUIZ SECTION SCROLLTRIGGER ---
      gsap.from(".mini-quiz-wrapper", {
        scrollTrigger: {
          trigger: ".mini-quiz-wrapper",
          start: "top 85%",
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // --- 3. HOW IT WORKS (STAGGER 0.15s) ---
      gsap.from(".how-step-card", {
        scrollTrigger: {
          trigger: ".how-it-works-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.55,
        stagger: 0.15,
        ease: "power2.out",
      });

      // --- 4. STATS ROW COUNT-UP (1.0s DURATION) ---
      ScrollTrigger.create({
        trigger: ".stats-container",
        start: "top 85%",
        once: true,
        onEnter: () => {
          const stats = [
            { target: 4, setter: setStatSubjects },
            { target: 5, setter: setStatQuestions },
            { target: 3, setter: setStatMedia },
          ];

          stats.forEach((item) => {
            const countObj = { val: 0 };
            gsap.to(countObj, {
              val: item.target,
              duration: 1.0,
              ease: "power2.out",
              onUpdate: () => item.setter(Math.round(countObj.val)),
            });
          });
        },
      });

      // --- 5. SUBJECTS PREVIEW (STAGGER 0.12s) ---
      gsap.from(".subject-preview-item", {
        scrollTrigger: {
          trigger: ".subjects-preview-grid",
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const getSubjectIcon = (iconName: string, active: boolean) => {
    const className = `w-7 h-7 ${active ? "text-primary" : "text-muted"}`;
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
        return <Compass className={className} />;
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-background overflow-x-hidden">
      {/* Sticky Landing Navbar */}
      <LandingNavbar />

      {/* =====================================================
          1. HERO SECTION
          ===================================================== */}
      <section className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/70 via-background to-white">
        {/* Ambient background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/10 via-indigo-400/10 to-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-soft text-primary font-bold text-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Apprentissage interactif & stimulant</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl font-black text-text tracking-tight leading-[1.15] mb-6">
              Comprenez vos leçons,{" "}
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                explorez les médias
              </span>{" "}
              et réussissez vos quiz.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-muted font-normal leading-relaxed mb-10 max-w-2xl">
              EduPlay transforme votre manière d&apos;apprendre grâce à des cours structurés, des illustrations claires, des vidéos sélectionnées et des quiz immédiats.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href={isAuthenticated ? "/subjects" : "/login"}
                className="hero-cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-primary hover:bg-indigo-700 text-white font-extrabold text-lg shadow-soft hover:shadow-card hover:-translate-y-1 active:translate-y-0 transition-all duration-200 group"
              >
                <span>{isAuthenticated ? "Accéder aux cours" : "Start learning"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <a
                href="#mini-quiz"
                className="hero-cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-7 rounded-2xl bg-white hover:bg-indigo-50/50 text-text font-bold text-lg border-2 border-slate-200 hover:border-primary shadow-sm hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
              >
                <HelpCircle className="w-5 h-5 text-accent" />
                <span>Tester le mini-quiz</span>
              </a>
            </div>

            {/* Floating Logo & Interactive Card Visual */}
            <div className="hero-visual-box relative mt-14 w-full max-w-md">
              <div className="bg-white rounded-3xl p-6 shadow-card border border-indigo-100 flex items-center gap-5 text-left relative z-10 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Image
                    src="/logo.svg"
                    alt="EduPlay Logo"
                    width={52}
                    height={52}
                    priority
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xl text-primary">EduPlay</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-success border border-green-200">
                      En ligne
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    Chapitre 1 : Graphes orientés et non orientés prêt pour révision.
                  </p>
                </div>
              </div>

              {/* Decorative floating badges */}
              <div className="hero-float-icon-1 absolute -top-5 -left-6 bg-white p-3 rounded-2xl shadow-card border border-slate-100 hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 z-20">
                <Calculator className="w-4 h-4 text-primary" />
                <span>Mathématiques</span>
              </div>

              <div className="hero-float-icon-2 absolute -bottom-5 -right-6 bg-white p-3 rounded-2xl shadow-card border border-slate-100 hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 z-20">
                <Award className="w-4 h-4 text-accent" />
                <span>Quiz & Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. INTERACTIVE MINI-QUIZ SECTION
          ===================================================== */}
      <section id="mini-quiz" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-primary font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Aperçu interactif</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
              Testez notre format de quiz en direct
            </h2>
            <p className="mt-3 text-lg text-muted max-w-xl mx-auto">
              Sélectionnez une réponse ci-dessous pour découvrir la validation instantanée.
            </p>
          </div>

          <div className="mini-quiz-wrapper">
            <MiniQuiz question={quizQuestion} />
          </div>
        </div>
      </section>

      {/* =====================================================
          3. HOW IT WORKS (3 STEP CARDS)
          ===================================================== */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-primary font-bold text-xs uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4 text-primary" />
              <span>Méthodologie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
              Comment fonctionne EduPlay ?
            </h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              Une démarche pédagogique rythmée en 3 étapes pour comprendre rapidement et ancrer durablement les notions.
            </p>
          </div>

          <div className="how-it-works-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="how-step-card bg-slate-50/70 rounded-3xl p-8 border border-slate-200 hover:border-primary/50 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-soft">
                  1
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">
                  Choisissez une matière
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  Sélectionnez votre domaine d&apos;apprentissage parmi nos matières disponibles et accédez immédiatement au cours structuré.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-sm font-bold text-primary">
                <BookOpen className="w-4 h-4" />
                <span>Accès instantané</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="how-step-card bg-slate-50/70 rounded-3xl p-8 border border-slate-200 hover:border-primary/50 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-soft">
                  2
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">
                  Observez & Assimilez
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  Consultez des synthèses claires, des illustrations schématiques et visionnez les vidéos explicatives associées pour bien visualiser.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-sm font-bold text-primary">
                <PlayCircle className="w-4 h-4" />
                <span>Texte, Image & Vidéo</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="how-step-card bg-slate-50/70 rounded-3xl p-8 border border-slate-200 hover:border-primary/50 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary font-black text-xl mb-6 shadow-soft">
                  3
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">
                  Validez avec les quiz
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  Répondez aux quiz interactifs pour tester vos connaissances en temps réel, analyser vos erreurs et enregistrer votre progression.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-sm font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Feedback immédiat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. STATS ROW (COUNT UP 1s DURATION)
          ===================================================== */}
      <section className="stats-container py-16 bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-indigo-400/30">
            {/* Stat 1 */}
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="stat-number text-5xl sm:text-6xl font-black tracking-tight text-white mb-2">
                {statSubjects}
              </div>
              <div className="text-xl font-bold text-indigo-100 mb-1">
                Matières
              </div>
              <p className="text-sm text-indigo-200">
                Un cursus multidisciplinaire complet
              </p>
            </div>

            {/* Stat 2 */}
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="stat-number text-5xl sm:text-6xl font-black tracking-tight text-white mb-2">
                {statQuestions}
              </div>
              <div className="text-xl font-bold text-indigo-100 mb-1">
                Questions par quiz
              </div>
              <p className="text-sm text-indigo-200">
                Évaluation ciblée, rapide et efficace
              </p>
            </div>

            {/* Stat 3 */}
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="stat-number text-5xl sm:text-6xl font-black tracking-tight text-white mb-2">
                {statMedia}
              </div>
              <div className="text-xl font-bold text-indigo-100 mb-1">
                Formats de médias
              </div>
              <p className="text-sm text-indigo-200">
                Texte synthétique, illustrations et vidéo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. SUBJECTS PREVIEW SECTION
          ===================================================== */}
      <section id="subjects-preview" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-primary font-bold text-xs uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Catalogue</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
              Aperçu des matières
            </h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              Découvrez la liste complète des matières prévues sur EduPlay.
            </p>
          </div>

          <div className="subjects-preview-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {subjects.map((subject) => {
              if (subject.active) {
                return (
                  <div
                    key={subject.id}
                    className="subject-preview-item group bg-white rounded-3xl p-8 border-2 border-indigo-100 hover:border-primary shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {getSubjectIcon(subject.icon, true)}
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full text-sm font-bold bg-green-50 text-success border border-green-200">
                          Disponible
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-text group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      <p className="mt-3 text-muted text-base leading-relaxed">
                        {subject.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <Link
                        href={`/subjects/${subject.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-indigo-700 text-white font-bold text-base shadow-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                      >
                        <span>Accéder au cours</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              }

              // Locked subject card
              return (
                <div
                  key={subject.id}
                  className="subject-preview-item bg-white/60 rounded-3xl p-8 border-2 border-slate-200/70 opacity-75 cursor-not-allowed flex flex-col justify-between select-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                        {getSubjectIcon(subject.icon, false)}
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-muted">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Coming soon</span>
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-700">
                      {subject.name}
                    </h3>
                    <p className="mt-3 text-slate-500 text-base leading-relaxed">
                      {subject.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-100 text-slate-400 font-bold text-base cursor-not-allowed">
                      <Lock className="w-4 h-4" />
                      <span>Bientôt disponible</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. FOOTER
          ===================================================== */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative rounded-xl overflow-hidden bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
                <Image
                  src="/logo.svg"
                  alt="EduPlay"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-primary tracking-tight">
                EduPlay
              </span>
            </div>

            {/* Navigation links */}
            <div className="flex items-center gap-6 text-sm font-semibold text-muted">
              <a href="#how-it-works" className="hover:text-primary transition-colors">
                Comment ça marche
              </a>
              <a href="#subjects-preview" className="hover:text-primary transition-colors">
                Matières
              </a>
              <Link href="/login" className="hover:text-primary transition-colors">
                Connexion
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted">
            <p>
              © 2026 <strong className="text-slate-700">EduPlay Team</strong>. Tous droits réservés.
            </p>
            <p className="text-center sm:text-right bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600">
              Note : Ce projet est un <strong className="text-primary">prototype de validation pédagogique</strong>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

