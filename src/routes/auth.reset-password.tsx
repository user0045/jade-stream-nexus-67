import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a New Password — Deal One" },
      { name: "description", content: "Choose a new password for your Deal One account." },
      { property: "og:title", content: "Set a New Password — Deal One" },
      { property: "og:description", content: "Choose a new, secure password." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = Math.min(4, Math.floor(password.length / 3));

  return (
    <AuthShell
      eyebrow="Security"
      title="New password"
      intro="Choose something long and private. Minimum eight characters."
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
          if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
          }
          if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
          }
          toast.success("Password updated");
          navigate({ to: "/auth/login" });
        }}
      >
        <Field
          label="New password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all duration-700 ${
                i < strength ? "bg-foreground" : "bg-hairline"
              }`}
            />
          ))}
        </div>
        <Field
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
        />
        <div className="mt-2">
          <LuxButton type="submit" className="w-full">
            Update password
          </LuxButton>
        </div>
      </form>
    </AuthShell>
  );
}
