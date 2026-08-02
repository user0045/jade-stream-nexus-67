import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field } from "@/components/site/AuthShell";
import { LuxButton } from "@/components/site/LuxButton";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Deal One" },
      { name: "description", content: "Sign in to your Deal One account to view orders and previews." },
      { property: "og:title", content: "Sign In — Deal One" },
      { property: "og:description", content: "Access your Deal One membership." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell
      eyebrow="Membership"
      title="Sign in"
      intro="Welcome back. Your bag and archive are where you left them."
      footer={
        <div className="flex flex-col gap-2">
          <span>
            New to the house?{" "}
            <Link to="/auth/signup" className="underline-lux text-foreground">
              Create an account
            </Link>
          </span>
          <Link to="/auth/forgot-password" className="underline-lux w-fit">
            Forgot your password?
          </Link>
        </div>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email.split("@")[0] || "Deal One Client", email);
          toast.success("Welcome back");
          navigate({ to: "/profile" });
        }}
      >
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <div className="mt-2">
          <LuxButton type="submit" className="w-full">
            Sign in
          </LuxButton>
        </div>
      </form>
    </AuthShell>
  );
}
