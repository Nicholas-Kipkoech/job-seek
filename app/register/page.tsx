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
  LucideIcon,
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

const countries = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
  "DR Congo",
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedJobType, setSelectedJobType] = useState("skilled");

  const [jobRole, setJobRole] = useState("");

  const [country, setCountry] = useState("");
  const [passportStatus, setPassportStatus] = useState("");
  const [feeAcknowledged, setFeeAcknowledged] = useState(false);

  /***
   * USER DETAILS
   */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [countryLivingIn, setCountryLivingIn] = useState("");

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

    // STEP 3
    if (currentStep === 3) {
      if (!country) return;

      setCurrentStep(4);
      return;
    }

    // STEP 4
    if (currentStep === 4) {
      if (!passportStatus) return;

      setCurrentStep(5);
      return;
    }
    // STEP 5
    if (currentStep === 5) {
      if (!feeAcknowledged) return;

      setCurrentStep(6);
      return;
    }

    // STEP 6
    if (currentStep === 6) {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !phone.trim() ||
        !whatsapp.trim() ||
        !email.trim() ||
        !countryOfBirth
      ) {
        return;
      }

      // Registration is complete here.
      // Connect your API/database submission here.
      console.log({
        selectedJobType,
        jobRole,
        country,
        passportStatus,
        feeAcknowledged,
        firstName,
        lastName,
        phone,
        whatsapp,
        email,
        countryOfBirth,
        countryLivingIn,
      });

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
        : currentStep === 3
          ? !!country
          : currentStep === 4
            ? !!passportStatus
            : currentStep === 5
              ? feeAcknowledged
              : currentStep === 6
                ? !!firstName.trim() &&
                  !!lastName.trim() &&
                  !!phone.trim() &&
                  !!whatsapp.trim() &&
                  !!email.trim() &&
                  !!countryOfBirth
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
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <Globe2 size={19} />
                  Step 3 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  Select your country
                </h1>

                <p className="mt-3 text-base leading-7 text-[#666]">
                  Select your country to view the applicable service fee for
                  your job placement.
                </p>
              </div>

              {/* Job type / Test badges */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Skilled Jobs */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <BriefcaseBusiness size={16} />

                  {selectedJob?.title}
                </div>

                {/* Test */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <span className="text-[13px]">◆</span>
                  Test
                </div>
              </div>

              {/* Country */}

              <div className="mt-8">
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-bold text-[#252525]"
                >
                  Country <span className="text-[#ca392d]">*</span>
                </label>

                <div className="relative">
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="
                      h-[61px]
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-[#ded8d5]
                      bg-white
                      px-5
                      pr-12
                      text-[16px]
                      text-[#222]
                      outline-none
                      transition

                      focus:border-[#ca392d]
                      focus:ring-4
                      focus:ring-[#ca392d]/10
                    "
                  >
                    <option value="">— Choose Your Country —</option>

                    {countries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {/* Custom dropdown arrow */}

                  <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#666]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================
              STEP 4
          ================================================= */}

          {currentStep === 4 && (
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <FileText size={19} />
                  Step 4 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  Travel Passport Status
                </h1>

                <p className="mt-3 text-base leading-7 text-[#555]">
                  Do you have a travel passport?
                </p>

                <p className="mt-1 text-base leading-7 text-[#555]">
                  Una passport ya kusafiria?
                </p>
              </div>

              {/* Context badges */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Job type */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <BriefcaseBusiness size={16} />

                  {selectedJob?.title}
                </div>

                {/* Test */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <span className="text-[13px]">◆</span>
                  Test
                </div>

                {/* Country */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <Globe2 size={16} />

                  {country || "Country"}
                </div>
              </div>

              {/* Passport options */}

              <div className="mt-8 space-y-4">
                {/* YES */}

                <button
                  type="button"
                  onClick={() => setPassportStatus("yes")}
                  aria-pressed={passportStatus === "yes"}
                  className={`
          flex w-full items-center gap-5
          rounded-lg border-2
          px-7 py-6
          text-left
          transition-all duration-200

          ${
            passportStatus === "yes"
              ? "border-[#ca392d] bg-[#fff7f5] shadow-[0_8px_25px_rgba(202,57,45,0.07)]"
              : "border-[#e5dedd] bg-white hover:border-[#d88980] hover:bg-[#fffafa]"
          }
        `}
                >
                  {/* Radio */}

                  <span
                    className={`
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-full border-2
            transition

            ${passportStatus === "yes" ? "border-[#ca392d]" : "border-[#999]"}
          `}
                  >
                    {passportStatus === "yes" && (
                      <span className="h-3.5 w-3.5 rounded-full bg-[#ca392d]" />
                    )}
                  </span>

                  <span className="text-base font-bold text-[#222] sm:text-[17px]">
                    Yes / Ndiyo, ninayo.
                  </span>
                </button>

                {/* NO */}

                <button
                  type="button"
                  onClick={() => setPassportStatus("no")}
                  aria-pressed={passportStatus === "no"}
                  className={`
          flex w-full items-center gap-5
          rounded-lg border-2
          px-7 py-6
          text-left
          transition-all duration-200

          ${
            passportStatus === "no"
              ? "border-[#ca392d] bg-[#fff7f5] shadow-[0_8px_25px_rgba(202,57,45,0.07)]"
              : "border-[#e5dedd] bg-white hover:border-[#d88980] hover:bg-[#fffafa]"
          }
        `}
                >
                  {/* Radio */}

                  <span
                    className={`
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-full border-2
            transition

            ${passportStatus === "no" ? "border-[#ca392d]" : "border-[#999]"}
          `}
                  >
                    {passportStatus === "no" && (
                      <span className="h-3.5 w-3.5 rounded-full bg-[#ca392d]" />
                    )}
                  </span>

                  <span className="text-base font-bold text-[#222] sm:text-[17px]">
                    No / Hapana, sina.
                  </span>
                </button>

                {/* APPLIED */}

                <button
                  type="button"
                  onClick={() => setPassportStatus("applied")}
                  aria-pressed={passportStatus === "applied"}
                  className={`
          flex w-full items-center gap-5
          rounded-lg border-2
          px-7 py-6
          text-left
          transition-all duration-200

          ${
            passportStatus === "applied"
              ? "border-[#ca392d] bg-[#fff7f5] shadow-[0_8px_25px_rgba(202,57,45,0.07)]"
              : "border-[#e5dedd] bg-white hover:border-[#d88980] hover:bg-[#fffafa]"
          }
        `}
                >
                  {/* Radio */}

                  <span
                    className={`
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-full border-2
            transition

            ${
              passportStatus === "applied"
                ? "border-[#ca392d]"
                : "border-[#999]"
            }
          `}
                  >
                    {passportStatus === "applied" && (
                      <span className="h-3.5 w-3.5 rounded-full bg-[#ca392d]" />
                    )}
                  </span>

                  <span className="text-base font-bold text-[#222] sm:text-[17px]">
                    I have already applied / Nimeshaomba passport.
                  </span>
                </button>
              </div>
            </>
          )}

          {/* =================================================
              STEP 5
          ================================================= */}

          {currentStep === 5 && (
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <Clock3 size={19} />
                  Step 5 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  Important Service Fee Notice
                </h1>

                <p className="mt-3 text-base leading-7 text-[#555]">
                  Please read and acknowledge our policy regarding service fees
                  before proceeding.
                </p>
              </div>

              {/* Context badges */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Job type */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <BriefcaseBusiness size={16} />

                  {selectedJob?.title}
                </div>

                {/* Test */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <span className="text-[13px]">◆</span>
                  Test
                </div>

                {/* Country */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <Globe2 size={16} />

                  {country || "Country"}
                </div>
              </div>

              {/* Service fee notice */}

              <div className="mt-8 rounded-lg border-2 border-[#efb1aa] bg-[#fff4f2] px-7 py-7 sm:px-8">
                {/* English notice */}

                <div>
                  <h2 className="text-lg font-bold text-[#b9362c]">NOTICE:</h2>

                  <p className="mt-2 text-[15px] leading-7 text-[#272727] sm:text-base">
                    The process only starts after the service fee is paid. You
                    must be committed. The fee cannot be paid later. If you are
                    not ready to pay the fee, please do not continue filling in
                    your details.
                  </p>
                </div>

                {/* Divider */}

                <div className="my-6 border-t border-[#edc7c3]" />

                {/* Swahili notice */}

                <div>
                  <h2 className="text-lg font-bold text-[#b9362c]">TAARIFA:</h2>

                  <p className="mt-2 text-[15px] leading-7 text-[#272727] sm:text-base">
                    Mchakato unaanza baada ya kulipa service fee. Lazima uwe
                    tayari na umeamua. Malipo hayawezi kufanywa baadaye. Kama
                    hauko tayari kulipa, tafadhali usiendelee kujaza taarifa
                    zako.
                  </p>
                </div>
              </div>

              {/* Acknowledgement */}

              <button
                type="button"
                onClick={() => setFeeAcknowledged(!feeAcknowledged)}
                aria-pressed={feeAcknowledged}
                className={`
        mt-8 flex w-full items-start gap-5
        rounded-lg border-2
        px-7 py-6
        text-left
        transition-all duration-200

        ${
          feeAcknowledged
            ? "border-[#ca392d] bg-[#fff7f5] shadow-[0_8px_25px_rgba(202,57,45,0.07)]"
            : "border-[#e5dedd] bg-white hover:border-[#d88980] hover:bg-[#fffafa]"
        }
      `}
              >
                {/* Checkbox */}

                <span
                  className={`
          mt-0.5 flex h-7 w-7 shrink-0
          items-center justify-center
          rounded-md border-2
          transition

          ${
            feeAcknowledged
              ? "border-[#ca392d] bg-[#ca392d]"
              : "border-[#999] bg-white"
          }
        `}
                >
                  {feeAcknowledged && (
                    <Check size={17} className="text-white" strokeWidth={3} />
                  )}
                </span>

                {/* Text */}

                <span className="text-base font-bold leading-7 text-[#222] sm:text-[17px]">
                  I understand and agree to proceed
                  <span className="block font-medium text-[#666]">
                    (Naelewa na niko tayari kuendelea)
                  </span>
                </span>
              </button>
            </>
          )}

          {/* =================================================
              STEP 6
          ================================================= */}

          {currentStep === 6 && (
            <>
              {/* Header */}

              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
                  <UserRound size={19} />
                  Step 6 of 6
                </div>

                <h1 className="mt-5 font-serif text-[34px] font-semibold leading-tight text-[#171717] sm:text-[42px]">
                  Your personal details
                </h1>

                <p className="mt-3 text-base leading-7 text-[#555]">
                  Enter your information exactly as it appears on your official
                  documents.
                </p>
              </div>

              {/* Context badges */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Job type */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <BriefcaseBusiness size={16} />

                  {selectedJob?.title}
                </div>

                {/* Test */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <span className="text-[13px]">◆</span>
                  Test
                </div>

                {/* Country */}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0c4bf] bg-[#fff7f5] px-4 py-2 text-sm font-bold text-[#ca392d]">
                  <Globe2 size={16} />

                  {country || "Country"}
                </div>
              </div>

              {/* =====================================================
        PERSONAL DETAILS FORM
    ===================================================== */}

              <div className="mt-8 grid gap-x-5 gap-y-7 md:grid-cols-2">
                {/* First Name */}

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    First Name <span className="text-[#ca392d]">*</span>
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    autoComplete="given-name"
                    className="
            h-[61px]
            w-full
            rounded-lg
            border border-[#ded8d5]
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
                </div>

                {/* Last Name */}

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    Last Name <span className="text-[#ca392d]">*</span>
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Kamau"
                    autoComplete="family-name"
                    className="
            h-[61px]
            w-full
            rounded-lg
            border border-[#ded8d5]
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
                </div>

                {/* Phone */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    Phone Number <span className="text-[#ca392d]">*</span>
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    autoComplete="tel"
                    className="
            h-[61px]
            w-full
            rounded-lg
            border border-[#ded8d5]
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
                </div>

                {/* WhatsApp */}

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    WhatsApp Number <span className="text-[#ca392d]">*</span>
                  </label>

                  <input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+254 700 000 000"
                    autoComplete="tel"
                    className="
            h-[61px]
            w-full
            rounded-lg
            border border-[#ded8d5]
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
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    Email Address <span className="text-[#ca392d]">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="
            h-[61px]
            w-full
            rounded-lg
            border border-[#ded8d5]
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
                </div>

                {/* Empty space on desktop */}

                <div className="hidden md:block" />

                {/* Country of Birth */}

                <div>
                  <label
                    htmlFor="countryOfBirth"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    Country of Birth <span className="text-[#ca392d]">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="countryOfBirth"
                      value={countryOfBirth}
                      onChange={(e) => setCountryOfBirth(e.target.value)}
                      className="
              h-[61px]
              w-full
              appearance-none
              rounded-lg
              border border-[#ded8d5]
              bg-white
              px-5
              pr-12
              text-[16px]
              text-[#222]
              outline-none
              transition
              focus:border-[#ca392d]
              focus:ring-4
              focus:ring-[#ca392d]/10
            "
                    >
                      <option value="">— Select country —</option>

                      {countries.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#666]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Country You Live In */}

                <div>
                  <label
                    htmlFor="countryLivingIn"
                    className="mb-2 block text-sm font-bold text-[#252525]"
                  >
                    Country You Live In{" "}
                    <span className="ml-1 font-normal text-[#999]">
                      (optional)
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      id="countryLivingIn"
                      value={countryLivingIn}
                      onChange={(e) => setCountryLivingIn(e.target.value)}
                      className="
              h-[61px]
              w-full
              appearance-none
              rounded-lg
              border border-[#ded8d5]
              bg-white
              px-5
              pr-12
              text-[16px]
              text-[#222]
              outline-none
              transition
              focus:border-[#ca392d]
              focus:ring-4
              focus:ring-[#ca392d]/10
            "
                    >
                      <option value="">— Select country —</option>

                      {countries.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#666]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[#eee8e5] pt-7 sm:grid-cols-[0.8fr_1.7fr]">
            {/* Back */}

            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handleBack}
              className={`
                flex h-[62px]
                items-center justify-center
                gap-2 rounded-lg
                border-2
                text-base font-bold
                transition

                ${
                  currentStep === 1
                    ? "cursor-not-allowed border-[#e8e2df] text-[#c7c2bf]"
                    : "border-[#e5dedb] text-[#555] hover:bg-[#f7f3f1]"
                }
              `}
            >
              <ArrowLeft size={19} />
              Back
            </button>

            {/* Continue */}

            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className={`
                flex h-[62px]
                items-center justify-center
                gap-2 rounded-lg
                text-base font-bold text-white
                shadow-lg transition

                ${
                  canContinue
                    ? "bg-[#ca392d] shadow-red-900/10 hover:bg-[#b93026] active:scale-[.98]"
                    : "cursor-not-allowed bg-[#cfc7c4]"
                }
              `}
            >
              {currentStep === 6 ? "Submit Application" : "Continue"}

              {currentStep === 6 ? (
                <Check size={19} />
              ) : (
                <ArrowRight size={19} />
              )}
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
 * PLACEHOLDER COMPONENT FOR STEPS 4-6
 * ===========================================================
 */

type StepPlaceholderProps = {
  icon: LucideIcon;
  step: number | string;
  title: string;
  description: string;
};

function StepPlaceholder({
  icon: Icon,
  step,
  title,
  description,
}: StepPlaceholderProps) {
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
