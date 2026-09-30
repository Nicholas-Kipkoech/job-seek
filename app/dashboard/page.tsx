"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} from "lucide-react";
import PaymentOptionCard from "./PaymentOptionCard";
import { Suspense } from "react";

type Tab = "home" | "progress" | "files" | "payment" | "refer" | "updates";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">
        Loading dashboard...
      </div>
    </div>
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
  const searchParams = useSearchParams();

  const requestedTab = searchParams.get("tab");

  const activeTab: Tab = tabs.some((tab) => tab.id === requestedTab)
    ? (requestedTab as Tab)
    : "home";

  const applicant = {
    name: "Forex Pro",
    id: "SS-01437",
    fee: "30,000",
  };

  return (
    <main className="min-h-screen bg-[#F8F6EF] text-[#183F43]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="pt-7">
        <div className="mx-auto w-[calc(100%-80px)] max-w-[1450px]">
          {/* Top header */}

          <div className="flex min-h-[72px] items-center justify-between">
            {/* Logo */}

            <Link
              href="/dashboard?tab=home"
              className="font-serif text-[28px] font-bold tracking-[-1px]"
            >
              Steve <span className="text-[#148B8B]">Safari</span>
            </Link>

            {/* Applicant */}

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="
                  flex h-[54px] w-[54px]
                  items-center justify-center
                  rounded-full
                  border border-[#DBE3DF]
                  bg-white
                  text-[#194B4F]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_20px_rgba(25,75,79,0.10)]
                "
              >
                <Bell size={23} strokeWidth={1.8} />
              </button>

              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-bold text-[#142E31]">
                  {applicant.name}
                </span>

                <span className="text-[13px] text-[#70848A]">
                  {applicant.id}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav className="mt-6 border-b border-[#DFE2DC] pb-[18px]">
            <div className="flex items-center gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                const isActive = activeTab === tab.id;

                return (
                  <Link
                    key={tab.id}
                    href={`/dashboard?tab=${tab.id}`}
                    className={`
                      inline-flex
                      min-h-[52px]
                      shrink-0
                      items-center
                      gap-[9px]
                      rounded-[10px]
                      px-[18px]
                      text-[16px]
                      font-semibold
                      transition

                      ${
                        isActive
                          ? "bg-[#194B4F] text-white"
                          : "text-[#71858A] hover:bg-[#194B4F]/[0.07] hover:text-[#194B4F]"
                      }
                    `}
                  >
                    <Icon size={22} strokeWidth={1.8} />

                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto w-[calc(100%-80px)] max-w-[1450px] pb-28 pt-11">
        {activeTab === "home" && <HomeContent applicant={applicant} />}

        {activeTab === "progress" && <ProgressContent />}

        {activeTab === "files" && <FilesContent />}

        {activeTab === "payment" && <PaymentContent fee={applicant.fee} />}

        {activeTab === "refer" && <ReferContent />}

        {activeTab === "updates" && <UpdatesContent />}
      </section>

      {/* =====================================================
          WHATSAPP BUTTON
      ====================================================== */}

      <WhatsAppButton applicantId={applicant.id} />
    </main>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomeContent({
  applicant,
}: {
  applicant: {
    name: string;
    id: string;
    fee: string;
  };
}) {
  return (
    <div>
      {/* Intro */}

      <div>
        <p
          className="
            mb-[18px]
            text-[14px]
            font-extrabold
            uppercase
            tracking-[2px]
            text-[#148B8B]
          "
        >
          Your Applicant Space
        </p>

        <h1
          className="
            max-w-[900px]
            font-serif
            text-[clamp(48px,5vw,68px)]
            font-bold
            leading-[1.02]
            tracking-[-2px]
            text-[#194B4F]
          "
        >
          Welcome back, {applicant.name}.
        </h1>

        <p
          className="
            mt-[18px]
            text-[20px]
            leading-[1.5]
            text-[#668087]
          "
        >
          A clear view of your Canada journey, all in one place.
        </p>
      </div>

      {/* Next step */}

      <div
        className="
          relative
          mt-9
          min-h-[326px]
          overflow-hidden
          rounded-[28px]
          bg-[#205E61]
          px-[42px]
          py-[42px]
          text-white
        "
      >
        <div className="relative z-10">
          <p
            className="
              mb-2
              text-[13px]
              font-extrabold
              uppercase
              tracking-[2px]
              text-white/85
            "
          >
            Next Step
          </p>

          <h2
            className="
              font-serif
              text-[clamp(34px,4vw,45px)]
              font-bold
              leading-[1.1]
              tracking-[-1px]
            "
          >
            Complete your service fee.
          </h2>

          <p
            className="
              mt-3
              text-[18px]
              leading-[1.5]
              text-white/90
            "
          >
            Payment unlocks the next phase of your application.
          </p>

          <div
            className="
              mt-8
              text-[31px]
              font-extrabold
            "
          >
            KES {applicant.fee}
          </div>

          <Link
            href="/dashboard?tab=payment"
            className="
              mt-[18px]
              inline-flex
              min-h-[59px]
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-white
              px-[22px]
              text-[16px]
              font-extrabold
              text-[#194B4F]
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_12px_25px_rgba(0,0,0,0.13)]
            "
          >
            Pay service fee
            <ArrowRight size={20} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Decorative shape */}

        <div
          className="
            absolute
            right-[50px]
            top-[42px]
            h-[155px]
            w-[155px]
            rotate-[15deg]
            opacity-70
          "
        >
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

      <div className="mt-9 space-y-4">
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

function FilesContent() {
  return (
    <div>
      <PageHeading
        eyebrow="Your Documents"
        title="Your files."
        description="View and manage documents related to your application."
      />

      <div
        className="
          mt-9
          rounded-[20px]
          border
          border-[#DFE2DC]
          bg-white
          p-8
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-xl
              bg-[#EFF7F5]
              text-[#148B8B]
            "
          >
            <FileText size={26} />
          </div>

          <div>
            <h3 className="font-bold text-[#194B4F]">Application documents</h3>

            <p className="mt-1 text-sm text-[#71858A]">
              Your uploaded files will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAYMENT
========================================================= */
function PaymentContent({ fee }: { fee: string }) {
  return (
    <div className="mx-auto max-w-[830px] space-y-5 px-5 py-8">
      {/* =====================================================
          SAFARICOM
      ====================================================== */}

      <PaymentOptionCard
        name="Safaricom M-Pesa"
        description="Recommended"
        icon={<Smartphone size={25} />}
        accent="green"
        status={{
          label: "Instant",
          type: "success",
        }}
        amount={`KES ${fee}`}
        instructions={[
          {
            number: 1,
            content: (
              <>
                Dial <strong>*334#</strong> on your Safaricom line
              </>
            ),
          },
          {
            number: 2,
            content: (
              <>
                Select <strong>Lipa na M-Pesa</strong>
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
                Enter amount: <strong>KES {fee}</strong>
              </>
            ),
          },
          {
            number: 5,
            content: (
              <>
                Confirm with your M-Pesa PIN and note the{" "}
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
      />

      {/* =====================================================
          AIRTEL
      ====================================================== */}

      <PaymentOptionCard
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
      />
    </div>
  );
}

/* =========================================================
   REFER
========================================================= */

function ReferContent() {
  return (
    <div>
      <PageHeading
        eyebrow="Refer"
        title="Refer someone."
        description="Invite someone who may be interested in our services."
      />

      <div
        className="
          mt-9
          rounded-[24px]
          border
          border-[#DFE2DC]
          bg-white
          p-8
        "
      >
        <h3 className="text-xl font-bold text-[#194B4F]">Your referral link</h3>

        <div
          className="
            mt-5
            flex
            min-h-[56px]
            items-center
            rounded-xl
            bg-[#F5F5EF]
            px-5
            text-sm
            text-[#71858A]
          "
        >
          stevesafari.org/register?ref=SS-01437
        </div>

        <button
          type="button"
          className="
            mt-4
            rounded-xl
            bg-[#194B4F]
            px-6
            py-3
            font-bold
            text-white
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

      <div className="mt-9 space-y-4">
        <div
          className="
            rounded-[20px]
            border
            border-[#DFE2DC]
            bg-white
            p-7
          "
        >
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

              <p className="mt-2 text-[#71858A]">
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
        gap-5
        rounded-[20px]
        border
        border-[#DFE2DC]
        bg-white
        p-6
      "
    >
      <div
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-full

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
          <CheckCircle2 size={24} />
        ) : current ? (
          <Clock3 size={24} />
        ) : (
          <div className="h-3 w-3 rounded-full bg-current" />
        )}
      </div>

      <div>
        <h3 className="font-bold text-[#194B4F]">{title}</h3>

        <p className="mt-1 text-sm text-[#71858A]">{description}</p>
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
      <p
        className="
          mb-[18px]
          text-[14px]
          font-extrabold
          uppercase
          tracking-[2px]
          text-[#148B8B]
        "
      >
        {eyebrow}
      </p>

      <h1
        className="
          font-serif
          text-[clamp(42px,5vw,62px)]
          font-bold
          leading-[1.05]
          tracking-[-2px]
          text-[#194B4F]
        "
      >
        {title}
      </h1>

      <p className="mt-[18px] text-[20px] text-[#668087]">{description}</p>
    </div>
  );
}

/* =========================================================
   WHATSAPP
========================================================= */

function WhatsAppButton({ applicantId }: { applicantId: string }) {
  const whatsappNumber = "254700000000";

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
        bottom-[30px]
        right-[34px]
        z-50
        flex
        min-h-[66px]
        items-center
        gap-[11px]
        rounded-full
        bg-[#25D366]
        px-[26px]
        text-[17px]
        font-extrabold
        text-white
        shadow-[0_12px_30px_rgba(37,211,102,0.25)]
        transition
        hover:-translate-y-1
      "
    >
      <MessageCircle size={28} strokeWidth={2.2} />

      <span>Chat on WhatsApp</span>
    </a>
  );
}
