"use client";

import { useState } from "react";
import { Check, Copy, Smartphone, Wifi, CreditCard } from "lucide-react";

type PaymentInstruction = {
  number: number;
  content: React.ReactNode;
};

type Recipient = {
  label?: string;
  number: string;
  accountName?: string;
};

type PaymentOptionCardProps = {
  name: string;
  description?: string;

  icon?: React.ReactNode;

  status?: {
    label: string;
    type?: "success" | "info" | "warning";
  };

  instructions: PaymentInstruction[];

  recipient?: Recipient;

  amount?: string;

  accent?: "green" | "blue" | "red";

  className?: string;
};

export default function PaymentOptionCard({
  name,
  description,
  icon,
  status,
  instructions,
  recipient,
  amount,
  accent = "green",
  className = "",
}: PaymentOptionCardProps) {
  const [copied, setCopied] = useState(false);

  const accentStyles = {
    green: {
      iconBg: "bg-[#EAF7ED]",
      iconColor: "text-[#15912A]",
      status: "border-[#A9DFC0] bg-[#F0FBF4] text-[#15912A]",
    },

    blue: {
      iconBg: "bg-[#EAF4FB]",
      iconColor: "text-[#1981C4]",
      status: "border-[#A9D5EC] bg-[#F1F8FC] text-[#1981C4]",
    },

    red: {
      iconBg: "bg-[#FFF0ED]",
      iconColor: "text-[#D43A29]",
      status: "border-[#F0B8AF] bg-[#FFF6F4] text-[#D43A29]",
    },
  };

  const styles = accentStyles[accent];

  const copyRecipient = async () => {
    if (!recipient?.number) return;

    await navigator.clipboard.writeText(recipient.number);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`
        rounded-[12px]
        border
        border-[#DEDCD8]
        bg-white
        px-6
        py-6
        shadow-[0_2px_5px_rgba(0,0,0,0.02)]
        ${className}
      `}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Icon */}

          <div
            className={`
              flex
              h-[49px]
              w-[49px]
              shrink-0
              items-center
              justify-center
              rounded-[9px]
              ${styles.iconBg}
              ${styles.iconColor}
            `}
          >
            {icon ?? <Smartphone size={25} />}
          </div>

          {/* Name */}

          <div>
            <h3 className="text-[17px] font-bold leading-tight text-[#151515]">
              {name}
            </h3>

            {description && (
              <p className="mt-1 text-[13px] text-[#777]">{description}</p>
            )}
          </div>
        </div>

        {/* Status */}

        {status && (
          <div
            className={`
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              text-[13px]
              font-bold
              ${styles.status}
            `}
          >
            <span className="h-2 w-2 rounded-full bg-current" />

            {status.label}
          </div>
        )}
      </div>

      {/* =====================================================
          INSTRUCTIONS
      ====================================================== */}

      <div className="mt-5 space-y-3.5">
        {instructions.map((instruction) => (
          <div key={instruction.number} className="flex items-center gap-4">
            {/* Number */}

            <div
              className="
                flex
                h-[29px]
                w-[29px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#CF3828]
                text-[13px]
                font-bold
                text-white
              "
            >
              {instruction.number}
            </div>

            {/* Instruction */}

            <div className="text-[16px] leading-6 text-[#202020]">
              {instruction.content}
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          RECIPIENT
      ====================================================== */}

      {recipient && (
        <div
          className="
            mt-5
            rounded-[8px]
            border
            border-[#E2DEDB]
            bg-[#F8F6F4]
            px-5
            py-4
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[1px]
                  text-[#A19C97]
                "
              >
                {recipient.label ?? "Send to M-Pesa number"}
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-[20px]
                  font-bold
                  tracking-wide
                  text-[#171717]
                "
              >
                {recipient.number}
              </p>

              {recipient.accountName && (
                <p className="mt-1 text-[14px] text-[#777]">
                  Account: {recipient.accountName}
                </p>
              )}
            </div>

            {/* Copy */}

            <button
              type="button"
              onClick={copyRecipient}
              className="
                flex
                shrink-0
                items-center
                gap-2
                rounded-md
                border
                border-[#DED8D4]
                bg-white
                px-4
                py-2
                text-[14px]
                font-bold
                text-[#242424]
                transition
                hover:bg-[#F5F3F1]
              "
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
