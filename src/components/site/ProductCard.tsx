import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatPrice, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id }}
      className={cn("group block", className)}
    >
      <div className="emission halo light-sweep relative flex aspect-[3/4] flex-col overflow-hidden rounded-3xl border border-hairline bg-surface">
        <div className="lift-img relative aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-95"
          />
          <div className="veil pointer-events-none absolute inset-x-0 bottom-0 h-1/3" />
        </div>

        <div className="relative z-[3] flex flex-1 flex-col justify-center gap-1 bg-surface-2/70 px-4 py-3 backdrop-blur-md">
          <h3 className="truncate font-display text-[1.05rem] leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
            <Star className="h-3 w-3 fill-foreground text-foreground" strokeWidth={1.25} />
            <span className="text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-sm tracking-wide text-foreground">
              {formatPrice(product.price)}
            </span>
            <span className="text-[0.68rem] text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
