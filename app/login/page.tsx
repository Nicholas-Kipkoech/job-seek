"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LogIn,
  UserCircle2,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });

    // Connect your authentication here
  };

  return (
    <main className="min-h-screen bg-[#faf9f8] text-[#202020]">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#e9e5e2] bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#cf392d] font-serif text-sm font-bold text-white">
              SS
            </div>

            <span className="font-serif text-2xl font-semibold text-[#222] sm:text-[27px]">
              Steve Safari
            </span>
          </Link>

          {/* Header actions */}
          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/"
              className="hidden items-center gap-2 text-sm font-semibold text-[#777] transition hover:text-[#cf392d] sm:flex"
            >
              <ArrowLeft size={17} />
              Home
            </Link>

            <Link
              href="/register"
              className="rounded-md border-2 border-[#cf392d] px-4 py-2.5 text-sm font-bold text-[#cf392d] transition hover:bg-[#cf392d] hover:text-white sm:px-6"
            >
              Register Now
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-11">
        <div className="mx-auto max-w-[1185px] overflow-hidden rounded-2xl border border-[#dedad7] bg-white shadow-[0_20px_60px_rgba(30,20,10,0.08)]">
          <div className="grid lg:grid-cols-[48%_52%]">
            {/* ================= LEFT PANEL ================= */}
            <div className="relative min-h-[570px] overflow-hidden bg-[#cf392d] px-7 py-10 text-white sm:px-12 sm:py-14 lg:px-14 lg:py-16">
              {/* Decorative circles */}
              <div className="absolute -bottom-32 -right-24 h-[360px] w-[360px] rounded-full border border-white/15" />

              <div className="absolute -bottom-20 -right-12 h-[260px] w-[260px] rounded-full border border-white/10" />

              <div className="absolute -top-28 -left-28 h-64 w-64 rounded-full border border-white/10" />

              <div className="relative z-10">
                {/* Brand */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 font-serif text-sm font-bold">
                    SS
                  </div>

                  <span className="font-serif text-2xl font-bold sm:text-3xl">
                    Steve Safari
                  </span>
                </div>

                {/* Main heading */}
                <div className="mt-20 max-w-[480px] sm:mt-24">
                  <h1 className="font-serif text-[44px] font-bold leading-[1.08] sm:text-[56px] lg:text-[52px] xl:text-[58px]">
                    Your future
                    <br />
                    in Canada
                    <br />
                    <span className="italic text-white/80">starts here.</span>
                  </h1>

                  <p className="mt-7 max-w-[430px] text-base font-medium leading-8 text-white/85 sm:text-lg">
                    Thousands of East African workers have found stable,
                    well-paying jobs in Canada through Steve Safari. Log in to
                    check your application status.
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:absolute lg:bottom-[-80px] lg:left-0 lg:right-0">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 size={18} />
                    <span>Application Tracking</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 size={18} />
                    <span>Employer Connections</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 size={18} />
                    <span>Visa Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
              <div className="mx-auto max-w-[470px]">
                {/* Portal label */}
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#777]">
                  <UserCircle2 size={20} />
                  Applicant Portal
                </div>

                {/* Heading */}
                <h2 className="mt-5 font-serif text-[40px] font-semibold leading-tight text-[#202020] sm:text-[46px]">
                  Welcome back
                </h2>

                <p className="mt-3 max-w-[450px] text-[15px] leading-7 text-[#777] sm:text-base">
                  Sign in to your account to track your application and connect
                  with employers.
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#333]"
                    >
                      Email Address <span className="text-[#cf392d]">*</span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b6b6b6]"
                      />

                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-[61px] w-full rounded-lg border border-[#ddd8d5] bg-white pl-12 pr-4 text-[15px] text-[#222] outline-none transition placeholder:text-[#999] focus:border-[#cf392d] focus:ring-4 focus:ring-[#cf392d]/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-bold text-[#333]"
                    >
                      Password <span className="text-[#cf392d]">*</span>
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b6b6b6]"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-[61px] w-full rounded-lg border border-[#ddd8d5] bg-white pl-12 pr-12 text-[15px] text-[#222] outline-none transition placeholder:text-[#999] focus:border-[#cf392d] focus:ring-4 focus:ring-[#cf392d]/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b7b7b7] transition hover:text-[#cf392d]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember / Forgot */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="peer sr-only"
                      />

                      <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 border-[#ddd8d5] transition peer-checked:border-[#cf392d] peer-checked:bg-[#cf392d]">
                        {rememberMe && (
                          <CheckCircle2 size={15} className="text-white" />
                        )}
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-[#444]">
                          Keep me signed in
                        </span>

                        <span className="mt-0.5 block text-xs text-[#999]">
                          Saves credentials for 30 days
                        </span>
                      </span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-bold text-[#cf392d] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="flex h-[59px] w-full items-center justify-center gap-2 rounded-lg bg-[#cf392d] text-base font-bold text-white shadow-lg shadow-red-900/10 transition hover:bg-[#b92e24] active:scale-[.99]"
                  >
                    <LogIn size={19} />
                    Sign In
                  </button>
                </form>

                {/* Register */}
                <div className="mt-8 text-center text-sm text-[#777]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-[#cf392d] hover:underline"
                  >
                    Create an account
                  </Link>
                </div>

                {/* Security */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#999]">
                  <LockKeyhole size={14} />
                  Your information is securely protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 pb-8 text-center text-xs text-[#999]">
        © {new Date().getFullYear()} Steve Safari. All rights reserved.
      </footer>
    </main>
  );
}
