"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Wrench,
  UserRound,
  Globe2,
  FileText,
  Clock3,
  ClipboardList,
  ListChecks,
} from "lucide-react";

const steps = [
  {
    number: 1,
    label: "JOB TYPE",
    icon: BriefcaseBusiness,
  },
  {
    number: 2,
    label: "YOUR ROLE",
    icon: UserRound,
  },
  {
    number: 3,
    label: "COUNTRY",
    icon: Globe2,
  },
  {
    number: 4,
    label: "PASSPORT",
    icon: FileText,
  },
  {
    number: 5,
    label: "NOTICE",
    icon: Clock3,
  },
  {
    number: 6,
    label: "DETAILS",
    icon: ClipboardList,
  },
];

const jobTypes = [
  {
    id: "skilled",
    title: "Skilled Jobs",
    description: "Requires training, education, or experience.",
    swahili: "(Inahitaji elimu au uzoefu wa kazi)",
    icon: GraduationCap,
    examples: [
      "Software Engineer",
      "Registered Nurse",
      "Electrician",
      "Driver",
    ],
  },
  {
    id: "unskilled",
    title: "Unskilled Jobs",
    description: "No formal education or experience required.",
    swahili: "Hakuna elimu au uzoefu maalum unaohitajika — everyone qualifies.",
    icon: Wrench,
    examples: ["General Worker", "Warehouse Worker", "Farm Worker", "Cleaner"],
  },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedJobType, setSelectedJobType] = useState("skilled");

  const [jobRole, setJobRole] = useState("");

  /*
   * =========================================================
   * STEP NAVIGATION
   * =========================================================
   */

  const handleContinue = () => {
    // STEP 1
    if (currentStep === 1) {
      if (!selectedJobType) return;

      setCurrentStep(2);
      return;
    }

    // STEP 2
    if (currentStep === 2) {
      if (!jobRole.trim()) return;

      setCurrentStep(3);
      return;
    }

    // Remaining steps
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /*
   * =========================================================
   * SELECTED JOB TYPE
   * =========================================================
   */

  const selectedJob = jobTypes.find((job) => job.id === selectedJobType);

  /*
   * =========================================================
   * CONTINUE BUTTON STATE
   * =========================================================
   */

  const canContinue =
    currentStep === 1
      ? !!selectedJobType
      : currentStep === 2
        ? !!jobRole.trim()
        : true;

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <main className="min-h-screen bg-[#faf9f8] text-[#202020]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-[#e9e4e1] bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ca392d] font-serif text-xs font-bold text-white">
              SS
            </div>

            <span className="font-serif text-2xl font-semibold">
              Steve Safari
            </span>
          </Link>

          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#707070] transition hover:text-[#ca392d]"
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">Back to Home</span>

            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <section className="mx-auto max-w-[900px] px-4 pt-10 sm:px-6 sm:pt-12">
        {/* ---------------------------------------------------
            DESKTOP PROGRESS
        --------------------------------------------------- */}

        <div className="relative hidden sm:block">
          {/* Background line */}
          <div className="absolute left-[8%] right-[8%] top-[23px] h-[2px] bg-[#e6dedd]" />

          {/* Progress line */}
          <div
            className="absolute left-[8%] top-[23px] h-[2px] bg-[#ca392d] transition-all duration-300"
            style={{
              width:
                currentStep === 1
                  ? "0%"
                  : currentStep === 2
                    ? "17%"
                    : currentStep === 3
                      ? "34%"
                      : currentStep === 4
                        ? "51%"
                        : currentStep === 5
                          ? "68%"
                          : "84%",
            }}
          />

          <div className="relative grid grid-cols-6">
            {steps.map((step) => {
              const active = currentStep === step.number;

              const completed = currentStep > step.number;

              return (
                <div key={step.number} className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled={!completed && !active}
                    onClick={() => {
                      if (completed) {
                        setCurrentStep(step.number);
                      }
                    }}
                    className={`
                      relative z-10 flex h-12 w-12
                      items-center justify-center
                      rounded-full border-2
                      font-semibold
                      transition-all duration-200

                      ${
                        active
                          ? "border-[#ca392d] bg-[#ca392d] text-white shadow-[0_0_0_7px_rgba(202,57,45,0.10)]"
                          : completed
                            ? "border-[#ca392d] bg-[#ca392d] text-white"
                            : "border-[#e5dedd] bg-white text-[#666]"
                      }
                    `}
                  >
                    {completed ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </button>

                  <span
                    className={`
                      mt-3 text-[11px] font-bold tracking-wide
                      ${
                        active
                          ? "text-[#ca392d]"
                          : completed
                            ? "text-[#ca392d]"
                            : "text-[#555]"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------
            MOBILE PROGRESS
        --------------------------------------------------- */}

        <div className="sm:hidden">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#ca392d]">
              Step {currentStep} of 6
            </span>

            <span className="text-xs font-semibold text-[#777]">
              {steps[currentStep - 1].label}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#e8e2df]">
            <div
              className="h-full rounded-full bg-[#ca392d] transition-all duration-300"
              style={{
                width: `${(currentStep / 6) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-[850px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-xl border border-[#e4ddda] bg-white p-6 shadow-[0_15px_50px_rgba(30,20,10,0.06)] sm:p-10 lg:p-14">
          {/* =================================================
              STEP 1
          ================================================= */}

          {currentStep === 1 && (
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <BriefcaseBusiness size={19} />
                  Step 1 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  What type of job are you looking for?
                </h1>

                <p className="mt-3 text-base leading-7 text-[#666]">
                  Choose the category that best matches your background.
                </p>
              </div>

              {/* Job cards */}

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {jobTypes.map((job) => {
                  const selected = selectedJobType === job.id;

                  const Icon = job.icon;

                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setSelectedJobType(job.id)}
                      aria-pressed={selected}
                      className={`
                        group relative w-full
                        rounded-xl border-2 p-6
                        text-left
                        transition-all duration-200

                        ${
                          selected
                            ? "border-[#ca392d] bg-[#fff5f3] shadow-[0_8px_30px_rgba(202,57,45,0.08)]"
                            : "border-[#e5dedd] bg-white hover:border-[#d88980] hover:bg-[#fffafa]"
                        }
                      `}
                    >
                      {/* Selected check */}

                      {selected && (
                        <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#ca392d] text-white">
                          <Check size={16} strokeWidth={3} />
                        </span>
                      )}

                      {/* Icon */}

                      <div
                        className={`
                          flex h-[60px] w-[60px]
                          items-center justify-center
                          rounded-lg border transition

                          ${
                            selected
                              ? "border-[#ca392d] bg-[#ca392d] text-white"
                              : "border-[#f0c7c2] bg-[#fff5f3] text-[#ca392d]"
                          }
                        `}
                      >
                        <Icon size={29} />
                      </div>

                      {/* Title */}

                      <h2 className="mt-6 font-serif text-[26px] font-semibold text-[#171717]">
                        {job.title}
                      </h2>

                      {/* Description */}

                      <p className="mt-2 text-sm font-semibold leading-6 text-[#555]">
                        {job.description}
                      </p>

                      {/* Swahili */}

                      <p className="mt-1 text-sm font-medium leading-6 text-[#777]">
                        {job.swahili}
                      </p>

                      {/* Examples */}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.examples.map((example) => (
                          <span
                            key={example}
                            className={`
                              rounded-full border
                              px-3 py-1.5
                              text-[11px] font-semibold

                              ${
                                selected
                                  ? "border-[#efc5c0] bg-white text-[#b9362c]"
                                  : "border-[#e8e2df] bg-white text-[#666]"
                              }
                            `}
                          >
                            {example}
                          </span>
                        ))}
                      </div>

                      {/* Selection */}

                      <div className="mt-6 flex items-center gap-2">
                        <span
                          className={`
                            flex h-5 w-5
                            items-center justify-center
                            rounded-full border-2

                            ${
                              selected
                                ? "border-[#ca392d] bg-[#ca392d]"
                                : "border-[#cfc8c5]"
                            }
                          `}
                        >
                          {selected && (
                            <Check
                              size={12}
                              className="text-white"
                              strokeWidth={4}
                            />
                          )}
                        </span>

                        <span
                          className={`
                            text-xs font-bold
                            ${selected ? "text-[#ca392d]" : "text-[#777]"}
                          `}
                        >
                          {selected ? "Selected" : "Select this option"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* =================================================
              STEP 2
          ================================================= */}

          {currentStep === 2 && (
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <ListChecks size={19} />
                  Step 2 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  What job are you looking for?
                </h1>

                <p className="mt-3 text-base leading-7 text-[#666]">
                  Tell us the specific job role you want in Canada.
                </p>
              </div>

              {/* Selected category */}

              <div className="mt-9">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <BriefcaseBusiness size={16} />

                  {selectedJob?.title}
                </div>
              </div>

              {/* Job input */}

              <div className="mt-9">
                <label
                  htmlFor="jobRole"
                  className="mb-2 block text-sm font-bold text-[#252525]"
                >
                  Which job are you looking for in Canada?{" "}
                  <span className="text-[#ca392d]">*</span>
                </label>

                <input
                  id="jobRole"
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Unataka kazi gani Canada?"
                  className="
                    h-[61px]
                    w-full
                    rounded-lg
                    border
                    border-[#ded8d5]
                    bg-white
                    px-5
                    text-[16px]
                    text-[#222]
                    outline-none
                    transition

                    placeholder:text-[#888]

                    focus:border-[#ca392d]
                    focus:ring-4
                    focus:ring-[#ca392d]/10
                  "
                />

                <p className="mt-2 text-xs text-[#999]">
                  Example: Nurse, Driver, Software Developer, Farm Worker,
                  Cleaner
                </p>
              </div>
            </>
          )}

          {/* =================================================
              STEP 3
          ================================================= */}

          {currentStep === 3 && (
            <StepPlaceholder
              icon={Globe2}
              step="3"
              title="Which country are you applying from?"
              description="Tell us where you currently live."
            />
          )}

          {/* =================================================
              STEP 4
          ================================================= */}

          {currentStep === 4 && (
            <StepPlaceholder
              icon={FileText}
              step="4"
              title="Do you have a valid passport?"
              description="Tell us about your passport status."
            />
          )}

          {/* =================================================
              STEP 5
          ================================================= */}

          {currentStep === 5 && (
            <StepPlaceholder
              icon={Clock3}
              step="5"
              title="When can you start?"
              description="Tell us your availability to begin working."
            />
          )}

          {/* =================================================
              STEP 6
          ================================================= */}

          {currentStep === 6 && (
            <StepPlaceholder
              icon={ClipboardList}
              step="6"
              title="Tell us about yourself"
              description="Enter your personal details to complete your application."
            />
          )}

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-[#eee8e5] pt-7 sm:flex-row sm:items-center sm:justify-between">
            {/* Back */}

            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handleBack}
              className={`
                flex items-center justify-center
                gap-2 rounded-lg px-5 py-3
                text-sm font-bold transition

                ${
                  currentStep === 1
                    ? "cursor-not-allowed text-[#c7c2bf]"
                    : "text-[#666] hover:bg-[#f7f3f1]"
                }
              `}
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {/* Continue */}

            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className={`
                flex items-center justify-center
                gap-2 rounded-lg px-7 py-3.5
                text-sm font-bold text-white
                shadow-lg transition

                ${
                  canContinue
                    ? "bg-[#ca392d] shadow-red-900/10 hover:bg-[#b93026] active:scale-[.98]"
                    : "cursor-not-allowed bg-[#cfc7c4]"
                }
              `}
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="pb-8 text-center text-xs text-[#999]">
        © {new Date().getFullYear()} Steve Safari. All rights reserved.
      </footer>
    </main>
  );
}

/*
 * ===========================================================
 * PLACEHOLDER COMPONENT FOR STEPS 3-6
 * ===========================================================
 */

function StepPlaceholder({ icon: Icon, step, title, description }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
        <Icon size={19} />
        Step {step} of 6
      </div>

      <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
        {title}
      </h1>

      <p className="mt-3 text-base leading-7 text-[#666]">{description}</p>

      <div className="mt-10 rounded-lg border border-dashed border-[#ddd5d1] bg-[#faf8f7] p-8 text-center">
        <p className="text-sm text-[#888]">This step will be added next.</p>
      </div>
    </div>
  );
}
