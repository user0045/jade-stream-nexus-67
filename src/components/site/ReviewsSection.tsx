import { useMemo, useState } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { LuxButton } from "@/components/site/LuxButton";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const VISIBLE = 20;

export function ReviewsSection({
  productId,
  totalReviews,
  baseRating,
}: {
  productId: string;
  totalReviews: number;
  baseRating: number;
}) {
  const { account, reviewsFor, saveReview, deleteReview } = useShop();
  const all = reviewsFor(productId);

  const mine = account ? all.find((r) => r.email === account.email) : undefined;
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(mine?.rating ?? 0);
  const [comment, setComment] = useState(mine?.comment ?? "");

  /*
   * The catalogue holds the authoritative review count for a product, so the
   * summary panel is scaled onto that number — this keeps the total identical
   * to the one shown under the product title and everywhere else.
   */
  const stats = useMemo(() => {
    const sampled = all.length;
    const total = Math.max(totalReviews, sampled);
    const buckets = [5, 4, 3, 2, 1].map((star) => {
      const share = sampled ? all.filter((r) => r.rating === star).length / sampled : 0;
      return { star, count: Math.round(share * total) };
    });
    const average = sampled ? all.reduce((s, r) => s + r.rating, 0) / sampled : baseRating;
    return { buckets, total, average: sampled ? average : baseRating };
  }, [all, totalReviews, baseRating]);

  // the signed-in member's own review always leads the list
  const listed = useMemo(() => {
    const rest = all.filter((r) => r.id !== mine?.id);
    return (mine ? [mine, ...rest] : rest).slice(0, VISIBLE);
  }, [all, mine]);

  const openEditor = () => {
    setRating(mine?.rating ?? 0);
    setComment(mine?.comment ?? "");
    setEditing(true);
  };

  return (
    <section className="mx-auto mt-16 max-w-7xl">
      <p className="eyebrow">Voices</p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">Ratings & reviews</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        {/* summary */}
        <div className="glass-panel halo h-fit rounded-[1.75rem] p-6">
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl leading-none">{stats.average.toFixed(1)}</span>
            <div className="pb-1">
              <Stars value={Math.round(stats.average)} />
              <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                {stats.total} review{stats.total === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            {stats.buckets.map((b) => (
              <div key={b.star} className="flex items-center gap-3">
                <span className="w-3 text-[0.65rem] text-muted-foreground">{b.star}</span>
                <Star className="h-3 w-3 fill-foreground text-foreground" strokeWidth={1.25} />
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-foreground/85 transition-[width] duration-1000 [transition-timing-function:var(--ease-lux)]"
                    style={{
                      width: `${stats.total ? (b.count / stats.total) * 100 : 0}%`,
                      boxShadow: "0 0 14px -2px oklch(1 0 0 / 0.55)",
                    }}
                  />
                </span>
                <span className="w-6 text-right text-[0.6rem] text-muted-foreground">
                  {b.count}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7">
            {!account ? (
              <Link
                to="/auth/login"
                className="underline-lux text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
              >
                Sign in to review
              </Link>
            ) : editing ? null : mine ? (
              <div className="flex flex-wrap gap-2">
                <LuxButton variant="outline" size="sm" onClick={openEditor}>
                  <Pencil className="h-3 w-3" /> Edit your review
                </LuxButton>
                <LuxButton
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    deleteReview(productId);
                    toast.success("Your review was removed");
                  }}
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </LuxButton>
              </div>
            ) : (
              <LuxButton size="sm" onClick={openEditor}>
                Write a review
              </LuxButton>
            )}
          </div>
        </div>

        {/* editor + list */}
        <div>
          {editing && account && (
            <form
              className="glass-panel animate-rise mb-6 rounded-[1.75rem] p-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (rating < 1) {
                  toast.error("Choose a rating first");
                  return;
                }
                const text = comment.trim();
                if (text.length < 4) {
                  toast.error("Your review needs at least 4 characters");
                  return;
                }
                if (text.length > 50) {
                  toast.error("Your review can be at most 50 characters");
                  return;
                }
                saveReview({ productId, rating, comment: comment.trim() });
                setEditing(false);
                toast.success(mine ? "Your review was updated" : "Thank you for your review");
              }}
            >
              <p className="eyebrow">{mine ? "Edit your review" : "Your review"}</p>
              <div className="mt-4 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} star`}
                    onClick={() => setRating(n)}
                    className="halo grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 [transition-timing-function:var(--ease-lux)] hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        n <= rating
                          ? "fill-foreground text-foreground drop-shadow-[0_0_8px_oklch(1_0_0/0.6)]"
                          : "text-muted-foreground",
                      )}
                      strokeWidth={1.25}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 50))}
                maxLength={50}
                rows={3}
                placeholder="Tell the house what you think… (4–50 characters)"
                className="mt-4 w-full resize-none rounded-2xl border border-hairline bg-surface-2 p-4 text-sm outline-none transition-all duration-700 [transition-timing-function:var(--ease-lux)] placeholder:text-muted-foreground/60 focus:border-foreground/45 focus:shadow-[var(--shadow-emission)]"
              />
              <p className="mt-2 text-[0.6rem] tracking-[0.08em] text-muted-foreground">
                {comment.trim().length}/50 characters · minimum 4
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <LuxButton type="submit" size="sm">
                  {mine ? "Update review" : "Publish review"}
                </LuxButton>
                <LuxButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </LuxButton>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-4">
            {listed.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No reviews yet — be the first voice on this piece.
              </p>
            )}
            {listed.map((r) => (
              <article
                key={r.id}
                className={cn(
                  "light-sweep rounded-[1.5rem] border p-5 transition-all duration-700 [transition-timing-function:var(--ease-lux)]",
                  r.id === mine?.id
                    ? "border-foreground/30 bg-surface-2/70 shadow-[var(--shadow-emission)]"
                    : "border-hairline bg-surface/70",
                )}
              >
                <div className="relative z-[3] flex flex-wrap items-center gap-3">
                  <span className="light-highlight grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hairline font-display text-base font-bold uppercase leading-none text-foreground">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm">{r.name}</span>
                  {r.id === mine?.id && (
                    <span className="rounded-full border border-hairline px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.2em] text-muted-foreground">
                      You
                    </span>
                  )}
                  <span className="ml-auto flex items-center gap-3">
                    <Stars value={r.rating} />
                    <span className="text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {r.date}
                    </span>
                  </span>
                </div>
                <p className="relative z-[3] mt-3 text-sm leading-relaxed text-muted-foreground">
                  {r.comment}
                </p>
              </article>
            ))}
            {stats.total > listed.length && (
              <p className="text-center text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                And {stats.total - listed.length}+ more voices have reviewed this piece
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "h-3 w-3",
            n <= value ? "fill-foreground text-foreground" : "text-muted-foreground/50",
          )}
          strokeWidth={1.25}
        />
      ))}
    </span>
  );
}
