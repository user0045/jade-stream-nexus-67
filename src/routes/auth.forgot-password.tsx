import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password — Deal One" },
      {
        name: "description",
        content: "Request a secure password reset link for your Deal One account.",
      },
      { property: "og:title", content: "Reset Your Password — Deal One" },
      { property: "og:description", content: "We'll send a secure reset link." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <AuthShell
      eyebrow="Security"
      title="Forgot password"
      intro="Enter your email and we will send a single-use reset link, valid for 30 minutes."
      footer={
        <Link to="/auth/login" className="underline-lux w-fit">
          Back to sign in
        </Link>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Reset link sent");
          navigate({ to: "/auth/verify-email", search: { email, mode: "reset" } });
        }}
      >
        <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <div className="mt-2">
          <LuxButton type="submit" className="w-full">
            Send reset link
          </LuxButton>
        </div>
      </form>
    </AuthShell>
  );
}
