import { ORDER_STAGES, type Order } from "@/lib/shop-store";

/** Hours after the order was placed at which each stage completes. */
const STAGE_OFFSET_HOURS = [2, 20, 34, 58, 96, 118];

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const fmtTime = (d: Date) =>
  d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

function stageDate(order: Order, index: number) {
  const base = new Date(`${order.date}T09:00:00`);
  // deterministic per-order jitter so timings are not identical across orders
  const jitter = (Number(order.number.slice(-3)) % 90) + (index * 17) % 40;
  const hours = STAGE_OFFSET_HOURS[index] ?? index * 24;
  return new Date(base.getTime() + hours * 3600_000 + jitter * 60_000);
}

export type StageStamp = { stage: string; done: boolean; date: string; time: string };

export function stageTimeline(order: Order): StageStamp[] {
  const currentIndex = ORDER_STAGES.indexOf(order.status);
  return ORDER_STAGES.map((stage, i) => {
    const d = stageDate(order, i);
    return {
      stage,
      done: i <= currentIndex,
      date: fmtDate(d),
      time: fmtTime(d),
    };
  });
}

/** Delivered date for completed orders, expected delivery date otherwise. */
export function deliveryInfo(order: Order) {
  const delivered = order.status === "Delivered";
  const d = stageDate(order, ORDER_STAGES.length - 1);
  return {
    delivered,
    label: delivered ? "Delivered on" : "Expected delivery by",
    date: fmtDate(d),
    time: fmtTime(d),
  };
}

export const formatOrderDate = (iso: string) => fmtDate(new Date(`${iso}T09:00:00`));
