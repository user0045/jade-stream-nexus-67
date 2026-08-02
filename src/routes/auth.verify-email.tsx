import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";

export const Route = createFileRoute("/auth/verify-email")({
  validateSearch: z.object({
    email: z.string().optional(),
    mode: z.enum(["signup", "reset"]).optional(),
  }),
  head: () => ({
    meta: [
      { title: "Verify Your Email — Deal One" },
      { name: "description", content: "Enter the six-digit code we sent to verify your email." },
      { property: "og:title", content: "Verify Your Email — Deal One" },
      { property: "og:description", content: "Confirm your email with a six-digit code." },
    ],
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const { email, mode } = Route.useSearch();
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const isReset = mode === "reset";

  const setDigit = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => prev.map((c, idx) => (idx === i ? digit : c)));
    if (digit && i < 5) {
      const next = document.getElementById(`code-${i + 1}`) as HTMLInputElement | null;
      next?.focus();
    }
  };

  return (
    <AuthShell
      eyebrow={isReset ? "Password reset" : "Verification"}
      title="Check your email"
      intro={`We sent a six-digit code to ${email || "your inbox"}. It expires in 30 minutes.`}
      footer={
        <div className="flex flex-col gap-2">
          <button
            onClick={() => toast.success("A new code is on its way")}
            className="underline-lux w-fit text-left"
          >
            Resend code
          </button>
          <Link to="/auth/login" className="underline-lux w-fit">
            Back to sign in
          </Link>
        </div>
      }
    >
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.some((c) => !c)) {
            toast.error("Enter all six digits.");
            return;
          }
          if (isReset) {
            navigate({ to: "/auth/reset-password" });
          } else {
            toast.success("Email verified");
            navigate({ to: "/auth/login" });
          }
        }}
      >
        <div className="flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              id={`code-${i}`}
              value={c}
              inputMode="numeric"
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => setDigit(i, e.target.value)}
              className="h-14 w-full rounded-2xl border border-hairline bg-surface text-center font-display text-2xl outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)] focus:border-foreground/40 focus:shadow-[var(--shadow-emission)]"
            />
          ))}
        </div>
        <LuxButton type="submit" className="w-full">
          <MailCheck className="h-3.5 w-3.5" /> {isReset ? "Continue" : "Verify email"}
        </LuxButton>
      </form>
    </AuthShell>
  );
}
