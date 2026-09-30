"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  UserPlus,
  LogIn,
  MessageCircle,
  ShieldCheck,
  FileCheck,
  House,
  Plane,
  Stethoscope,
  Hotel,
  HardHat,
  Leaf,
  Factory,
  Play,
  Star,
  CheckCircle2,
} from "lucide-react";

const jobs = [
  {
    title: "Healthcare",
    description: "Nurses, Caregivers, Medical Assistants & more",
    icon: Stethoscope,
  },
  {
    title: "Hospitality",
    description: "Hotel, Restaurant, Food Service & more",
    icon: Hotel,
  },
  {
    title: "Construction",
    description: "Skilled & Unskilled Labor Jobs",
    icon: HardHat,
  },
  {
    title: "Agriculture",
    description: "Farm Workers, Greenhouse & more",
    icon: Leaf,
  },
  {
    title: "Manufacturing",
    description: "Factory, Production, Warehouse & more",
    icon: Factory,
  },
];

const testimonials = [
  {
    name: "Aisha Wanjiku",
    location: "Nairobi, Kenya",
    text: "Steve Safari helped me get my caregiver job in Canada. The process was smooth and professional.",
  },
  {
    name: "Daniel Otieno",
    location: "Kisumu, Kenya",
    text: "The team guided me through every step of my application and helped me understand the process.",
  },
  {
    name: "Grace Njeri",
    location: "Eldoret, Kenya",
    text: "The support I received was excellent, from job placement to relocation guidance.",
  },
];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMenu = () => setMobileMenu(false);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10294b] text-2xl font-bold text-white">
              S
            </div>

            <div>
              <div className="font-serif text-[17px] font-bold tracking-wide text-[#10294b]">
                STEVE <span className="text-[#d5362b]">SAFARI</span>
              </div>

              <div className="text-[7px] tracking-[2px] text-slate-500">
                MOVING TO CANADA MADE EASY
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#d5362b]"
            >
              About
            </a>

            <a
              href="#jobs"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#d5362b]"
            >
              Jobs
            </a>

            <a
              href="#process"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#d5362b]"
            >
              Process
            </a>

            <a
              href="#testimonials"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#d5362b]"
            >
              Testimonials
            </a>

            <a
              href="#contact"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#d5362b]"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold text-slate-600"
            >
              <LogIn size={17} />
              Login
            </a>

            <a
              href="/register"
              className="flex items-center gap-2 rounded-md bg-[#d5362b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/10 transition hover:bg-[#b92820]"
            >
              <UserPlus size={17} />
              Register Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-800 lg:hidden"
          >
            {mobileMenu ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 pb-6 lg:hidden">
            <nav className="flex flex-col">
              {[
                ["About", "#about"],
                ["Jobs", "#jobs"],
                ["Process", "#process"],
                ["Testimonials", "#testimonials"],
                ["Contact", "#contact"],
              ].map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  onClick={closeMenu}
                  className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-700"
                >
                  {name}
                </a>
              ))}

              <a
                href="/login"
                className="mt-4 flex items-center justify-center gap-2 rounded-md border-2 border-[#d5362b] py-3 font-bold text-[#d5362b]"
              >
                <LogIn size={17} />
                Login
              </a>

              <a
                href="/register"
                className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#d5362b] py-3 font-bold text-white"
              >
                <UserPlus size={17} />
                Register Free
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#f2dede 1px, transparent 1px), linear-gradient(90deg, #f2dede 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#10294b] shadow-sm">
              🍁 Your Canadian Dream Starts Here
            </div>

            <h1 className="font-serif text-[55px] font-bold leading-[.95] tracking-tight text-slate-900 sm:text-7xl lg:text-[88px]">
              Get a Job in
              <span className="block text-[#d5362b]">Canada</span>
            </h1>

            <div className="my-7 h-1 w-16 bg-[#d5362b]" />

            <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl lg:text-[44px]">
              <span className="text-[#d5362b]">Faster</span> & Stress-Free
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              We connect Africans directly to real Canadian employers ready to
              sponsor your visa and cover relocation — complete end-to-end
              support from Africa to Canada.
            </p>

            {/* Buttons */}
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href="/register"
                className="flex items-center justify-center gap-2 rounded-md bg-[#d5362b] px-6 py-4 font-bold text-white shadow-lg shadow-red-900/10 transition hover:bg-[#b92820]"
              >
                <UserPlus size={18} />
                Register Now
              </a>

              <a
                href="/login"
                className="flex items-center justify-center gap-2 rounded-md border-2 border-[#d5362b] px-6 py-4 font-bold text-[#d5362b] transition hover:bg-red-50"
              >
                <LogIn size={18} />
                Login Now
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-[#087d70] px-6 py-4 font-bold text-white transition hover:bg-[#06665c]"
              >
                <MessageCircle size={18} />
                Join WhatsApp
              </a>
            </div>

            {/* Features */}
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#d5362b]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <strong className="block text-xs">Real Employers</strong>

                  <span className="text-[10px] text-slate-500">
                    Direct connections
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#d5362b]">
                  <FileCheck size={20} />
                </div>

                <div>
                  <strong className="block text-xs">Visa Support</strong>

                  <span className="text-[10px] text-slate-500">
                    Complete guidance
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#d5362b]">
                  <House size={20} />
                </div>

                <div>
                  <strong className="block text-xs">Relocation</strong>

                  <span className="text-[10px] text-slate-500">
                    Africa to Canada
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative min-h-[420px] sm:min-h-[540px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85"
                alt="Toronto Canada"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* Success Card */}
            <div className="absolute right-3 top-5 z-10 rounded-lg bg-white px-6 py-5 text-center shadow-2xl sm:-right-5 sm:top-8">
              <div className="font-serif text-3xl font-bold text-[#d5362b]">
                99%
              </div>

              <div className="text-xs text-slate-500">★ Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section
        id="jobs"
        className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mb-12">
          <div className="mb-5 h-1 w-14 bg-[#d5362b]" />

          <h2 className="font-serif text-4xl font-bold text-[#10294b] sm:text-5xl">
            Popular Job Categories
          </h2>

          <p className="mt-3 text-slate-500">
            We work with top Canadian employers across multiple industries.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {jobs.map((job) => {
            const Icon = job.icon;

            return (
              <div
                key={job.title}
                className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#d5362b]">
                  <Icon size={26} />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#10294b]">
                  {job.title}
                </h3>

                <p className="mt-3 min-h-[65px] text-sm leading-6 text-slate-500">
                  {job.description}
                </p>

                <button className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#d5362b] transition group-hover:bg-[#d5362b] group-hover:text-white">
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12"
      >
        {/* Image */}
        <div className="relative h-[400px] overflow-hidden rounded-2xl sm:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=85"
            alt="Canada"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#10294b]/70 to-transparent" />

          <div className="absolute left-7 top-7 text-white">
            <div className="text-4xl">🍁</div>

            <h3 className="mt-2 font-serif text-3xl font-bold">
              Your Future
              <br />
              Starts Here
            </h3>
          </div>

          <button className="absolute bottom-7 left-7 flex items-center gap-2 rounded-md bg-black/80 px-5 py-3 text-sm font-bold text-white backdrop-blur">
            <Play size={16} fill="white" />
            Watch Our Story
          </button>
        </div>

        {/* Content */}
        <div>
          <div className="mb-5 h-1 w-14 bg-[#d5362b]" />

          <h2 className="font-serif text-4xl font-bold text-[#10294b] sm:text-5xl">
            Why Choose
            <br />
            Steve Safari?
          </h2>

          <p className="mt-6 leading-8 text-slate-500">
            We make your journey to Canada simple, safe and successful. With
            years of experience, we connect skilled African talent with real
            Canadian employers.
          </p>

          <div className="mt-9 grid gap-7 sm:grid-cols-2">
            {(
              [
                [ShieldCheck, "Trusted & Verified", "Canadian Employers"],
                [FileCheck, "Visa & Documentation", "Complete Guidance"],
                [UserPlus, "Personalized Support", "From Start to Finish"],
                [Plane, "Relocation Assistance", "Housing & Travel Support"],
              ] as const
            ).map(([Icon, title, subtitle]) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-200 text-[#d5362b]">
                  <Icon size={19} />
                </div>

                <div>
                  <strong className="block text-sm text-[#10294b]">
                    {title}
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    {subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section
        id="process"
        className="bg-[#10294b] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-12">
            <div className="mb-5 h-1 w-14 bg-[#d5362b]" />

            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              How It Works
            </h2>

            <p className="mt-3 max-w-xl text-slate-300">
              Our simple process takes you from registration to your Canadian
              opportunity.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Register",
                "Create your account and submit your professional information.",
              ],
              [
                "02",
                "Get Matched",
                "We match your skills with available Canadian opportunities.",
              ],
              [
                "03",
                "Apply",
                "Our team helps you prepare and submit your application.",
              ],
              [
                "04",
                "Move to Canada",
                "Receive relocation guidance and prepare for your new life.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl border border-white/10 bg-white/5 p-7"
              >
                <div className="font-serif text-4xl text-red-400">{number}</div>

                <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-[#10294b] px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1300px] grid-cols-2 border-t border-white/10 py-10 lg:grid-cols-4">
          {[
            ["500+", "Successful Placements"],
            ["98%", "Visa Approval Rate"],
            ["50+", "Canadian Employers"],
            ["5+", "Years Experience"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={`py-5 text-center ${
                index < 3 ? "lg:border-r lg:border-white/20" : ""
              }`}
            >
              <div className="font-serif text-3xl font-bold text-white sm:text-4xl">
                {number}
              </div>

              <div className="mt-2 text-xs text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mb-12">
          <div className="mb-5 h-1 w-14 bg-[#d5362b]" />

          <h2 className="font-serif text-4xl font-bold text-[#10294b] sm:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mt-3 text-slate-500">
            Experiences from people who started their journey with us.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-xl border border-slate-200 p-7 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold text-[#10294b]">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-[#10294b]">{item.name}</h3>

                  <div className="mt-1 flex text-[#f4a400]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="my-6 leading-7 text-slate-500">{item.text}&quot;</p>

              <span className="text-xs text-slate-400">{item.location}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        id="contact"
        className="mx-4 mb-16 overflow-hidden rounded-2xl sm:mx-8 lg:mx-auto lg:max-w-[1300px]"
      >
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(8,31,57,.96), rgba(8,31,57,.60)), url('https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=85')",
          }}
        >
          <div className="px-7 py-16 sm:px-12 lg:px-16">
            <div className="mb-5 h-1 w-14 bg-[#d5362b]" />

            <h2 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              Your Canadian Future
              <br />
              Is Closer Than You Think
            </h2>

            <p className="mt-5 max-w-xl text-slate-300">
              Join thousands of Africans who are building their future in
              Canada.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="flex items-center justify-center gap-2 rounded-md bg-[#d5362b] px-6 py-4 font-bold text-white"
              >
                <UserPlus size={18} />
                Register Now
              </a>

              <a
                href="#process"
                className="flex items-center justify-center gap-2 rounded-md border border-white px-6 py-4 font-bold text-white"
              >
                <ArrowRight size={18} />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#091c33] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-3">
          <div>
            <div className="font-serif text-2xl font-bold">
              STEVE <span className="text-[#d5362b]">SAFARI</span>
            </div>

            <p className="mt-4 max-w-sm leading-7 text-slate-400">
              Connecting African talent with opportunities in Canada.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="#about">
                About
              </a>

              <a className="block hover:text-white" href="#jobs">
                Jobs
              </a>

              <a className="block hover:text-white" href="#process">
                Process
              </a>

              <a className="block hover:text-white" href="#testimonials">
                Testimonials
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contact</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a
                href="mailto:info@stevesafari.org"
                className="block hover:text-white"
              >
                info@stevesafari.org
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1300px] border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Steve Safari. All rights reserved.
        </div>
      </footer>

      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#20c76b] text-white shadow-xl transition hover:scale-110"
      >
        <MessageCircle size={27} />
      </a>
    </main>
  );
}
