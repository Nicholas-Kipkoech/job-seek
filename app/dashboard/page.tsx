"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bell,
  Home,
  GitBranch,
  Folder,
  CreditCard,
  Gift,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Wifi,
  Smartphone,
  LogOut,
  Upload,
} from "lucide-react";
import PaymentOptionCard from "./PaymentOptionCard";
import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import FilesContent from "./FileContent";

type Tab = "home" | "progress" | "files" | "payment" | "refer" | "updates";

type Applicant = {
  name: string;
  id: string;
  fee: string;
  email: string;
  status: string;
};

const tabs: {
  id: Tab;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "progress",
    label: "Progress",
    icon: GitBranch,
  },
  {
    id: "files",
    label: "Files",
    icon: Folder,
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
  },
  {
    id: "refer",
    label: "Refer",
    icon: Gift,
  },
  {
    id: "updates",
    label: "Updates",
    icon: Bell,
  },
];
function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6EF] px-5">
      <div className="text-sm font-semibold text-[#70848A]">
        Loading dashboard...
      </div>
    </div>
  );
}

function DashboardError({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F6EF] px-5">
      <div className="w-full max-w-md rounded-2xl border border-[#DFE2DC] bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <span className="text-xl font-bold">!</span>
        </div>

        <h1 className="mt-5 font-serif text-2xl font-bold text-[#194B4F] sm:text-3xl">
          Unable to load your dashboard
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#71858A]">{message}</p>

        <Link
          href="/login"
          className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#194B4F] px-6 text-sm font-bold text-white transition hover:bg-[#153E41] sm:w-auto"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const requestedTab = searchParams.get("tab");
  const [profileComplete, setProfileComplete] = useState(false);

  const activeTab: Tab = tabs.some((tab) => tab.id === requestedTab)
    ? (requestedTab as Tab)
    : "home";

  useEffect(() => {
    let mounted = true;

    const loadApplicant = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const supabase = createClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.replace("/login");
          return;
        }

        const { data: application, error: applicationError } = await supabase
          .from("applications")
          .select(
            `
                id,
                first_name,
                last_name,
                email,
                status
              `,
          )
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle<{
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            status: string;
          }>();

        if (applicationError) {
          throw new Error(applicationError.message);
        }

        if (!application) {
          throw new Error(
            "We could not find an application connected to this account.",
          );
        }

        if (!mounted) return;

        setApplicant({
          name: `${application.first_name} ${application.last_name}`.trim(),
          id: application.id,
          email: application.email,
          status: application.status,
          fee: "630,000",
        });
      } catch (error) {
        if (!mounted) return;

        setLoadError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading your application.",
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadApplicant();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const supabase = createClient();

      await supabase.auth.signOut();

      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (loadError || !applicant) {
    return (
      <DashboardError
        message={loadError || "We could not find your application."}
      />
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F6EF] text-[#183F43]">
      {/* HEADER */}
      <header className="pt-4 sm:pt-7">
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1450px] sm:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
          {/* Top header */}
          <div className="flex min-h-[64px] items-center justify-between gap-4 sm:min-h-[72px]">
            {/* Logo */}
            <Link
              href="/dashboard?tab=home"
              className="shrink-0 font-serif text-[24px] font-bold tracking-[-1px] sm:text-[28px]"
            >
              Steve <span className="text-[#148B8B]">Safari</span>
            </Link>

            {/* Applicant */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button
                type="button"
                aria-label="Notifications"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-[#DBE3DF]
                  bg-white
                  text-[#194B4F]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(25,75,79,0.10)]
                  sm:h-[54px] sm:w-[54px]
                "
              >
                <Bell size={20} strokeWidth={1.8} />
              </button>

              {/* Applicant info */}
              <div className="hidden flex-col gap-1 sm:flex">
                <span className="text-[16px] font-bold text-[#142E31]">
                  {applicant.name}
                </span>

                <span className="text-[13px] text-[#70848A]">
                  Application:{" "}
                  {applicant.id.toString().slice(0, 8).toUpperCase()}
                </span>
              </div>

              {/* Mobile name */}
              <div className="max-w-[120px] truncate sm:hidden">
                <span className="block truncate text-sm font-bold text-[#142E31]">
                  {applicant.name}
                </span>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Sign out"
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#DBE3DF]
                  bg-white
                  text-[#71858A]
                  transition
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-[#cf392d]
                  disabled:opacity-50
                  sm:ml-2 sm:h-[46px] sm:w-[46px]
                "
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="mt-4 overflow-hidden border-b border-[#DFE2DC] pb-3 sm:mt-6 sm:pb-[18px]">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide sm:gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <Link
                    key={tab.id}
                    href={`/dashboard?tab=${tab.id}`}
                    className={`
                      inline-flex
                      min-h-[44px]
                      shrink-0
                      items-center
                      gap-[7px]
                      rounded-[10px]
                      px-3
                      text-[14px]
                      font-semibold
                      transition
                      sm:min-h-[52px]
                      sm:gap-[9px]
                      sm:px-[18px]
                      sm:text-[16px]
                      ${
                        isActive
                          ? "bg-[#194B4F] text-white"
                          : "text-[#71858A] hover:bg-[#194B4F]/[0.07] hover:text-[#194B4F]"
                      }
                    `}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* PROFILE COMPLETION BANNER */}
      {!profileComplete && (
        <section className="mx-auto mt-5 w-[calc(100%-32px)] max-w-[1450px] sm:mt-7 sm:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
          <div className="relative overflow-hidden rounded-2xl border border-[#CFE5DE] bg-[#EAF6F2] p-4 sm:rounded-[20px] sm:p-5 lg:p-6">
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#148B8B] shadow-sm sm:h-12 sm:w-12">
                  <Upload size={22} strokeWidth={2} />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#194B4F] sm:text-lg">
                    Complete your profile
                  </h2>

                  <p className="mt-1 max-w-[760px] text-sm leading-5 text-[#668087] sm:text-[15px] sm:leading-6">
                    Upload your important documents, including your{" "}
                    <strong>passport and national ID</strong>, to complete your
                    application profile.
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard?tab=files"
                className="
            inline-flex
            min-h-[46px]
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#194B4F]
            px-5
            text-sm
            font-extrabold
            text-white
            transition
            hover:bg-[#153E41]
            sm:w-auto
          "
              >
                Upload documents
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>

            {/* Decorative circle */}
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#CBE8DE]/60 sm:h-40 sm:w-40" />
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="mx-auto w-[calc(100%-32px)] max-w-[1450px] pb-32 pt-8 sm:w-[calc(100%-48px)] sm:pb-28 sm:pt-11 lg:w-[calc(100%-80px)]">
        {activeTab === "home" && <HomeContent applicant={applicant} />}
        {activeTab === "progress" && <ProgressContent />}
        {activeTab === "files" && (
          <FilesContent onProfileStatusChange={setProfileComplete} />
        )}
        {activeTab === "payment" && <PaymentContent fee={applicant.fee} />}
        {activeTab === "refer" && <ReferContent applicantId={applicant.id} />}
        {activeTab === "updates" && <UpdatesContent />}
      </section>

      {/* WHATSAPP */}
      <WhatsAppButton applicantId={applicant.id} />
    </main>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomeContent({ applicant }: { applicant: Applicant }) {
  return (
    <div>
      {/* Intro */}
      <div>
        <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[2px] text-[#148B8B] sm:mb-[18px] sm:text-[14px]">
          Your Applicant Space
        </p>

        <h1
          className="
            max-w-[900px]
            font-serif
            text-[40px]
            font-bold
            leading-[1.05]
            tracking-[-1.5px]
            text-[#194B4F]
            sm:text-[clamp(48px,5vw,68px)]
            sm:tracking-[-2px]
          "
        >
          Welcome back, {applicant.name}.
        </h1>

        <p className="mt-4 max-w-[700px] text-[17px] leading-[1.5] text-[#668087] sm:mt-[18px] sm:text-[20px]">
          A clear view of your Canada journey, all in one place.
        </p>
      </div>

      {/* Next step */}
      <div
        className="
          relative
          mt-7
          min-h-0
          overflow-hidden
          rounded-[22px]
          bg-[#205E61]
          px-5
          py-7
          text-white
          sm:mt-9
          sm:min-h-[326px]
          sm:rounded-[28px]
          sm:px-[42px]
          sm:py-[42px]
        "
      >
        <div className="relative z-10 max-w-[650px]">
          <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[2px] text-white/85 sm:text-[13px]">
            Next Step
          </p>

          <h2 className="font-serif text-[30px] font-bold leading-[1.1] tracking-[-1px] sm:text-[clamp(34px,4vw,45px)]">
            Complete your service fee.
          </h2>

          <p className="mt-3 text-[16px] leading-[1.5] text-white/90 sm:text-[18px]">
            Payment unlocks the next phase of your application.
          </p>

          <div className="mt-6 text-[26px] font-extrabold sm:mt-8 sm:text-[31px]">
            TZS {applicant.fee}
          </div>

          <Link
            href="/dashboard?tab=payment"
            className="
              mt-4
              inline-flex
              min-h-[54px]
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-white
              px-[22px]
              text-[15px]
              font-extrabold
              text-[#194B4F]
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_12px_25px_rgba(0,0,0,0.13)]
              sm:mt-[18px]
              sm:min-h-[59px]
              sm:w-auto
              sm:text-[16px]
            "
          >
            Pay service fee
            <ArrowRight size={20} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Decorative shape */}
        <div className="absolute -right-10 -top-5 hidden h-[155px] w-[155px] rotate-[15deg] opacity-70 sm:block">
          <div
            className="
              absolute
              inset-0
              bg-[#789379]
              [clip-path:polygon(50%_0%,62%_36%,100%_50%,62%_64%,50%_100%,38%_64%,0%_50%,38%_36%)]
            "
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */

function ProgressContent() {
  return (
    <div>
      <PageHeading
        eyebrow="Application Progress"
        title="Your journey so far."
        description="Track each stage of your application."
      />

      <div className="mt-7 space-y-3 sm:mt-9 sm:space-y-4">
        <ProgressItem
          title="Application submitted"
          description="Your application details have been received."
          status="completed"
        />

        <ProgressItem
          title="Document review"
          description="Your submitted information is being reviewed."
          status="completed"
        />

        <ProgressItem
          title="Service fee"
          description="Complete the service fee to continue."
          status="current"
        />

        <ProgressItem
          title="Job placement"
          description="Your application will proceed to the next phase."
          status="pending"
        />
      </div>
    </div>
  );
}

/* =========================================================
   FILES
========================================================= */

/* =========================================================
   PAYMENT
========================================================= */

function PaymentContent({ fee }: { fee: string }) {
  return (
    <div className="mx-auto max-w-[830px] space-y-4 px-0 py-0 sm:space-y-5 sm:px-5 sm:py-8">
      <PaymentOptionCard
        name="Tanzania Vodacom"
        description="Recommended"
        icon={<Smartphone size={25} />}
        accent="green"
        status={{
          label: "Instant",
          type: "success",
        }}
        amount={`TZS ${fee}`}
        instructions={[
          {
            number: 1,
            content: (
              <>
                Dial <strong>*150*00#</strong> on your Vodacom line
              </>
            ),
          },
          {
            number: 2,
            content: (
              <>
                Select <strong>Send Money M-Pesa Kenya</strong>
                {" → "}
                <strong>Send Money</strong>
              </>
            ),
          },
          {
            number: 3,
            content: <>Enter recipient number shown below</>,
          },
          {
            number: 4,
            content: (
              <>
                Enter amount: <strong>TZS {fee}</strong>
              </>
            ),
          },
          {
            number: 5,
            content: (
              <>
                Confirm with your PIN and note the{" "}
                <strong>transaction code</strong>
              </>
            ),
          },
        ]}
        recipient={{
          label: "Send to M-Pesa number",
          number: "+254748811194",
          accountName: "Simon Maina",
        }}
      />

      {/* <PaymentOptionCard
        name="Airtel Money Kenya"
        description="Interoperable"
        icon={<Wifi size={25} />}
        accent="blue"
        status={{
          label: "Works",
          type: "info",
        }}
        instructions={[
          {
            number: 1,
            content: (
              <>
                Dial <strong>*334#</strong> or <strong>*222#</strong> on your
                Airtel line
              </>
            ),
          },
          {
            number: 2,
            content: (
              <>
                Select <strong>Send Money</strong>
              </>
            ),
          },
          {
            number: 3,
            content: (
              <>
                Choose <strong>Send to Other Networks</strong>
                {" → "}
                <strong>M-Pesa</strong>
              </>
            ),
          },
          {
            number: 4,
            content: (
              <>
                Enter the M-Pesa number below and amount:{" "}
                <strong>KES {fee}</strong>
              </>
            ),
          },
          {
            number: 5,
            content: (
              <>
                Confirm the transaction and note the{" "}
                <strong>transaction code</strong>
              </>
            ),
          },
        ]}
        recipient={{
          label: "Send to M-Pesa number",
          number: "+254118906220",
          accountName: "Stephen Safari Otieno",
        }}
      /> */}
    </div>
  );
}

/* =========================================================
   REFER
========================================================= */

function ReferContent({ applicantId }: { applicantId: string }) {
  const referralLink = `stevesafari.org/register?ref=${applicantId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${referralLink}`);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  return (
    <div>
      <PageHeading
        eyebrow="Refer"
        title="Refer someone."
        description="Invite someone who may be interested in our services."
      />

      <div className="mt-7 rounded-[20px] border border-[#DFE2DC] bg-white p-5 sm:mt-9 sm:rounded-[24px] sm:p-8">
        <h3 className="text-xl font-bold text-[#194B4F]">Your referral link</h3>

        <div className="mt-5 overflow-x-auto rounded-xl bg-[#F5F5EF] px-4 py-4 text-sm text-[#71858A]">
          <span className="whitespace-nowrap">{referralLink}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="
            mt-4
            w-full
            rounded-xl
            bg-[#194B4F]
            px-6
            py-3
            font-bold
            text-white
            transition
            hover:bg-[#153E41]
            sm:w-auto
          "
        >
          Copy referral link
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   UPDATES
========================================================= */

function UpdatesContent() {
  return (
    <div>
      <PageHeading
        eyebrow="Updates"
        title="Latest updates."
        description="Important information about your application."
      />

      <div className="mt-7 space-y-4 sm:mt-9">
        <div className="rounded-[20px] border border-[#DFE2DC] bg-white p-5 sm:p-7">
          <div className="flex gap-4">
            <div
              className="
                flex h-11 w-11
                shrink-0
                items-center justify-center
                rounded-full
                bg-[#EFF7F5]
                text-[#148B8B]
              "
            >
              <Bell size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#194B4F]">Application update</h3>

              <p className="mt-2 text-sm leading-6 text-[#71858A] sm:text-base">
                Your application dashboard has been updated.
              </p>

              <span className="mt-3 block text-xs text-[#9AA8AA]">
                Recently
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROGRESS ITEM
========================================================= */

function ProgressItem({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}) {
  const completed = status === "completed";
  const current = status === "current";

  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-[18px]
        border
        border-[#DFE2DC]
        bg-white
        p-4
        sm:gap-5
        sm:rounded-[20px]
        sm:p-6
      "
    >
      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          sm:h-12
          sm:w-12
          ${
            completed
              ? "bg-[#E7F5EE] text-[#238653]"
              : current
                ? "bg-[#FFF2E9] text-[#C74A31]"
                : "bg-[#F0F1EE] text-[#9AA4A3]"
          }
        `}
      >
        {completed ? (
          <CheckCircle2 size={22} />
        ) : current ? (
          <Clock3 size={22} />
        ) : (
          <div className="h-3 w-3 rounded-full bg-current" />
        )}
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#194B4F] sm:text-base">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#71858A] sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE HEADING
========================================================= */

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[2px] text-[#148B8B] sm:mb-[18px] sm:text-[14px]">
        {eyebrow}
      </p>

      <h1
        className="
          font-serif
          text-[38px]
          font-bold
          leading-[1.05]
          tracking-[-1.5px]
          text-[#194B4F]
          sm:text-[clamp(42px,5vw,62px)]
          sm:tracking-[-2px]
        "
      >
        {title}
      </h1>

      <p className="mt-3 max-w-[700px] text-[17px] leading-7 text-[#668087] sm:mt-[18px] sm:text-[20px]">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   WHATSAPP
========================================================= */

function WhatsAppButton({ applicantId }: { applicantId: string }) {
  const whatsappNumber = "+13439462023";

  const message = encodeURIComponent(
    `Hello Steve Safari, I need assistance with my application. My applicant ID is ${applicantId}.`,
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-4
        right-4
        z-50
        flex
        min-h-[54px]
        items-center
        gap-2
        rounded-full
        bg-[#25D366]
        px-4
        text-sm
        font-extrabold
        text-white
        shadow-[0_12px_30px_rgba(37,211,102,0.25)]
        transition
        hover:-translate-y-1
        sm:bottom-[30px]
        sm:right-[34px]
        sm:min-h-[66px]
        sm:gap-[11px]
        sm:px-[26px]
        sm:text-[17px]
      "
    >
      <MessageCircle size={23} strokeWidth={2.2} />

      <span className="hidden sm:inline">Chat on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
