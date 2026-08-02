import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/catalog";
import { Logo } from "@/components/site/Logo";
import { useShop } from "@/lib/shop-store";

export function Footer({ variant = "full" }: { variant?: "full" | "minimal" }) {
  const { account } = useShop();

  return (
    <footer className="mt-20 border-t border-hairline bg-surface/60">
      {variant === "full" && (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-7 px-5 py-8 md:grid-cols-[1.4fr_1.2fr_0.8fr_0.8fr] md:gap-10 md:px-8 md:py-10">
          {/* left half on mobile: brand + client care */}
          <div className="flex flex-col gap-7 md:contents">
            <div className="md:order-1">
              <div className="flex items-center gap-3">
                <Logo size={30} />
                <p className="brand-wordmark text-xl">Deal One</p>
              </div>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
                Every product in our collection is selected to meet the highest standards of quality
                and reliability
              </p>
            </div>

            <div className="md:order-3">
              <FooterCol title="Client care">
                <Link to="/track-order" className="underline-lux w-fit hover:text-foreground">
                  Track an order
                </Link>
                <Link to="/contact" className="underline-lux w-fit hover:text-foreground">
                  Contact
                </Link>
                <Link to="/faq" className="underline-lux w-fit hover:text-foreground">
                  FAQ
                </Link>
              </FooterCol>
            </div>
          </div>

          {/* right half on mobile: collections + house */}
          <div className="flex flex-col gap-7 md:contents">
            <div className="md:order-2">
              <p className="eyebrow block -translate-x-3 text-center md:-translate-x-6">
                Collections
              </p>
              <div className="mx-auto mt-3 grid w-fit grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/shop"
                    search={{ category: c.slug }}
                    className="underline-lux w-fit transition-colors duration-500 hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:order-4">
              <FooterCol title="House">
                <Link to="/about" className="underline-lux w-fit hover:text-foreground">
                  About us
                </Link>
                <Link to="/privacy" className="underline-lux w-fit hover:text-foreground">
                  Privacy
                </Link>
                {!account && (
                  <Link to="/auth/login" className="underline-lux w-fit hover:text-foreground">
                    Become the member
                  </Link>
                )}
              </FooterCol>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-hairline px-5 py-4 md:px-8 md:py-5">
        <p className="mx-auto max-w-7xl text-center text-[0.55rem] uppercase tracking-[0.26em] text-muted-foreground md:text-left md:text-[0.58rem] md:tracking-[0.3em]">
          © {new Date().getFullYear()} Deal One — All rights reserved
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">{children}</div>
    </div>
  );
}
