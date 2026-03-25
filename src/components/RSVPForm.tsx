"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Question {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

interface RSVPFormProps {
  questions: Question[];
  deadline: string;
}

export default function RSVPForm({ questions, deadline }: RSVPFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentQ = questions[step];
  const isLast = step === questions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const deadlineFormatted = new Date(deadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-obsidian px-6 py-32"
      id="rsvp"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.06)_0%,_transparent_60%)]" />

      <motion.div
        className="relative mx-auto w-full max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-body text-[10px] uppercase tracking-ultrawide text-gold">
            Kindly Respond
          </p>
          <h2 className="mt-4 font-display text-4xl font-light tracking-luxury text-silk md:text-5xl">
            RSVP
          </h2>
          <p className="mt-3 font-body text-xs text-silk/60">
            Please respond by {deadlineFormatted}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10 h-px w-full bg-gold/10">
          <motion.div
            className="h-full bg-gold/50"
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>
              <h3 className="font-display text-3xl font-light tracking-luxury text-silk">
                Thank You
              </h3>
              <p className="mt-4 font-body text-sm text-silk/70">
                We are overjoyed and cannot wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Question label */}
              <label className="mb-1 block font-display text-2xl font-light tracking-luxury text-silk md:text-3xl">
                {currentQ.label}
              </label>
              <p className="mb-8 font-body text-xs text-silk/60">
                Step {step + 1} of {questions.length}
              </p>

              {/* Input */}
              {currentQ.type === "select" ? (
                <div className="flex flex-col gap-3">
                  {currentQ.options?.map((opt) => (
                    <motion.button
                      key={opt}
                      className={`border px-6 py-4 text-left font-body text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 ${
                        answers[currentQ.id] === opt
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-gold/15 bg-transparent text-silk/70 hover:border-gold/30 hover:text-silk/70"
                      }`}
                      onClick={() => handleAnswer(opt)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <input
                  type={currentQ.type}
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full border-b border-gold/20 bg-transparent py-4 font-body text-lg text-silk placeholder:text-silk/40 focus:border-gold/50 focus:outline-none"
                />
              )}

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  className={`font-body text-xs uppercase tracking-ultrawide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 ${
                    step === 0
                      ? "cursor-not-allowed text-silk/30"
                      : "text-silk/60 hover:text-silk/70 active:scale-95"
                  }`}
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  Back
                </button>

                <motion.button
                  className="group relative overflow-hidden border border-gold/30 px-8 py-3 font-body text-xs uppercase tracking-ultrawide text-gold transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.97]"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">
                    {isLast ? "Submit" : "Continue"}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gold/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
