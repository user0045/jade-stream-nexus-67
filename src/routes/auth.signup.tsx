import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create an Account — Deal One" },
      {
        name: "description",
        content: "Create a Deal One account for private previews, order tracking and saved addresses.",
      },
      { property: "og:title", content: "Create an Account — Deal One" },
      { property: "og:description", content: "Join the house of Deal One." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <AuthShell
      eyebrow="Membership"
      title="Create account"
      intro="Private previews, saved addresses and a complete order archive."
      footer={
        <span>
          Already a member?{" "}
          <Link to="/auth/login" className="underline-lux text-foreground">
            Sign in
          </Link>
        </span>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (form.password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
          }
          toast.success("Verification email sent");
          navigate({ to: "/auth/verify-email", search: { email: form.email } });
        }}
      >
        <Field
          label="Full name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          autoComplete="email"
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
        />
        <div className="mt-2">
          <LuxButton type="submit" className="w-full">
            Create account
          </LuxButton>
        </div>
      </form>
    </AuthShell>
  );
}
