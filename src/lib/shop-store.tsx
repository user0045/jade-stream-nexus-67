import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS, findProduct, type Product } from "@/data/catalog";

export type CartLine = { id: string; qty: number };

export type OrderStatus =
  "Confirmed" | "Packed" | "Shipped" | "In transit" | "Out for delivery" | "Delivered";

export const ORDER_STAGES: OrderStatus[] = [
  "Confirmed",
  "Packed",
  "Shipped",
  "In transit",
  "Out for delivery",
  "Delivered",
];

/** Order numbers are 12-digit integers, e.g. 480192774531 */
export const generateOrderNumber = () =>
  String(Math.floor(100000000000 + Math.random() * 899999999999));

export type Order = {
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { id: string; name: string; qty: number; price: number }[];
  address: string;
};

export type Account = { name: string; email: string } | null;

export type Review = {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
};

export type Address = {
  id: string;
  name: string;
  phone: string;
  house: string;
  road: string;
  pincode: string;
  city: string;
  state: string;
};

export const formatAddress = (a: Address) =>
  `${a.house}, ${a.road}, ${a.city} ${a.pincode}, ${a.state}`;

type ShopState = {
  cart: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lines: { product: Product; qty: number }[];
  orders: Order[];
  placeOrder: (address: string) => Order;
  placeDirectOrder: (
    address: string,
    items: { id: string; name: string; qty: number; price: number }[],
  ) => Order;
  addresses: Address[];
  saveAddress: (a: Omit<Address, "id"> & { id?: string }) => Address;
  deleteAddress: (id: string, nextDefaultId?: string) => void;
  setDefaultAddress: (id: string) => void;
  maxAddresses: number;
  account: Account;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  reviews: Review[];
  reviewsFor: (productId: string) => Review[];
  saveReview: (r: { productId: string; rating: number; comment: string }) => void;
  deleteReview: (productId: string) => void;
};

const ShopContext = createContext<ShopState | null>(null);

const KEY = "dealone.state.v1";

const SEED_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    name: "Aarav Sharma",
    phone: "9876543210",
    house: "402, Vasant Residency",
    road: "MG Road, Indiranagar",
    pincode: "560038",
    city: "Bengaluru",
    state: "Karnataka",
  },
];

const MAX_ADDRESSES = 3;

const SEED_ORDERS: Order[] = [
  {
    number: "480192774531",
    date: "2026-07-18",
    status: "In transit",
    total: 1130,
    items: [
      { id: "eclipse-headphones", name: "Eclipse ANC Headphones", qty: 1, price: 890 },
      { id: "lumiere-serum", name: "Lumière Perfecting Serum", qty: 1, price: 240 },
    ],
    address: "18 Rue Saint-Honoré, Paris",
  },
  {
    number: "477304182960",
    date: "2026-06-02",
    status: "Delivered",
    total: 480,
    items: [{ id: "obsidian-tea-ritual", name: "Obsidian Tea Ritual", qty: 1, price: 480 }],
    address: "18 Rue Saint-Honoré, Paris",
  },
];

const REVIEW_VOICES: { name: string; email: string; rating: number; comment: string }[] = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    rating: 5,
    comment:
      "Arrived in flawless packaging. The finish is deeper and quieter than the photographs suggest.",
  },
  {
    name: "Meera Iyer",
    email: "meera@example.com",
    rating: 4,
    comment: "Beautifully made. Took a week longer than I hoped, but worth the wait.",
  },
  {
    name: "Kabir Nair",
    email: "kabir@example.com",
    rating: 5,
    comment: "Genuinely premium. It has become the quietest, most used object in the room.",
  },
  {
    name: "Ananya Rao",
    email: "ananya@example.com",
    rating: 5,
    comment: "The weight and balance are exceptional — you feel the craftsmanship immediately.",
  },
  {
    name: "Rohan Mehta",
    email: "rohan@example.com",
    rating: 3,
    comment: "Lovely design, though slightly smaller in person than I expected.",
  },
  {
    name: "Isha Kapoor",
    email: "isha@example.com",
    rating: 4,
    comment: "Elegant, restrained and very well finished. Would order from the house again.",
  },
  {
    name: "Dev Patel",
    email: "dev@example.com",
    rating: 5,
    comment: "Second purchase from Deal One. Consistency of quality is what keeps me here.",
  },
  {
    name: "Naina Bose",
    email: "naina@example.com",
    rating: 5,
    comment: "Feels considered from the unboxing onward. A proper luxury experience.",
  },
  {
    name: "Vikram Sethi",
    email: "vikram@example.com",
    rating: 4,
    comment: "Excellent object. The matte black holds fingerprints less than I feared.",
  },
  {
    name: "Tara Menon",
    email: "tara@example.com",
    rating: 5,
    comment: "Understated and gorgeous. Compliments every single time it is seen.",
  },
  {
    name: "Arjun Das",
    email: "arjun@example.com",
    rating: 2,
    comment: "Well made but not quite what I needed. Returns process was painless.",
  },
  {
    name: "Sara Khan",
    email: "sara@example.com",
    rating: 5,
    comment: "Impeccable. The detailing near the edges is the giveaway that this is hand finished.",
  },
];

const SEED_REVIEWS: Review[] = PRODUCTS.flatMap((p, pi) => {
  const total = 8 + ((pi * 5) % 15);
  return Array.from({ length: total }, (_, i) => {
    const v = REVIEW_VOICES[(pi * 7 + i * 3) % REVIEW_VOICES.length]!;
    return {
      id: `seed-${p.id}-${i}`,
      productId: p.id,
      name: v.name,
      email: `${v.email}.${pi}.${i}`,
      rating: v.rating,
      comment: v.comment,
      date: `2026-0${(i % 7) + 1}-${String(((pi + i) % 27) + 1).padStart(2, "0")}`,
    };
  });
});

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [account, setAccount] = useState<Account>(null);
  const [addresses, setAddresses] = useState<Address[]>(SEED_ADDRESSES);
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.cart)) setCart(parsed.cart);
        if (Array.isArray(parsed.orders) && parsed.orders.length) setOrders(parsed.orders);
        if (parsed.account) setAccount(parsed.account);
        if (Array.isArray(parsed.addresses) && parsed.addresses.length)
          setAddresses(parsed.addresses);
        if (Array.isArray(parsed.reviews) && parsed.reviews.length) setReviews(parsed.reviews);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, orders, account, addresses, reviews }));
  }, [cart, orders, account, addresses, reviews, hydrated]);

  const add = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const lines = useMemo(
    () =>
      cart
        .map((l) => ({ product: findProduct(l.id), qty: l.qty }))
        .filter((l): l is { product: Product; qty: number } => Boolean(l.product)),
    [cart],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines],
  );

  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);

  const placeOrder = useCallback(
    (address: string) => {
      const order: Order = {
        number: generateOrderNumber(),
        date: new Date().toISOString().slice(0, 10),
        status: "Confirmed",
        total: subtotal,
        items: lines.map((l) => ({
          id: l.product.id,
          name: l.product.name,
          qty: l.qty,
          price: l.product.price,
        })),
        address,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [lines, subtotal],
  );

  const placeDirectOrder = useCallback(
    (address: string, items: { id: string; name: string; qty: number; price: number }[]) => {
      const order: Order = {
        number: generateOrderNumber(),
        date: new Date().toISOString().slice(0, 10),
        status: "Confirmed",
        total: items.reduce((s, i) => s + i.price * i.qty, 0),
        items,
        address,
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    [],
  );

  const saveAddress = useCallback((a: Omit<Address, "id"> & { id?: string }) => {
    const next: Address = { ...a, id: a.id ?? `addr-${Date.now()}` };
    setAddresses((prev) => {
      if (prev.some((x) => x.id === next.id)) return prev.map((x) => (x.id === next.id ? next : x));
      if (prev.length >= MAX_ADDRESSES) return prev;
      return [...prev, next];
    });
    return next;
  }, []);

  /** Default address is always the first entry of the list. */
  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target) return prev;
      return [target, ...prev.filter((a) => a.id !== id)];
    });
  }, []);

  const deleteAddress = useCallback((id: string, nextDefaultId?: string) => {
    setAddresses((prev) => {
      if (prev.length <= 1) return prev;
      const rest = prev.filter((a) => a.id !== id);
      if (!nextDefaultId) return rest;
      const target = rest.find((a) => a.id === nextDefaultId);
      return target ? [target, ...rest.filter((a) => a.id !== nextDefaultId)] : rest;
    });
  }, []);

  const reviewsFor = useCallback(
    (productId: string) =>
      reviews
        .filter((r) => r.productId === productId)
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [reviews],
  );

  const saveReview = useCallback(
    (r: { productId: string; rating: number; comment: string }) => {
      if (!account) return;
      setReviews((prev) => {
        const existing = prev.find((x) => x.productId === r.productId && x.email === account.email);
        const next: Review = {
          id: existing?.id ?? `rev-${Date.now()}`,
          productId: r.productId,
          name: account.name,
          email: account.email,
          rating: r.rating,
          comment: r.comment,
          date: new Date().toISOString().slice(0, 10),
        };
        return existing ? prev.map((x) => (x.id === existing.id ? next : x)) : [next, ...prev];
      });
    },
    [account],
  );

  const deleteReview = useCallback(
    (productId: string) => {
      if (!account) return;
      setReviews((prev) =>
        prev.filter((x) => !(x.productId === productId && x.email === account.email)),
      );
    },
    [account],
  );

  const signIn = useCallback((name: string, email: string) => setAccount({ name, email }), []);
  const signOut = useCallback(() => setAccount(null), []);

  const value: ShopState = {
    cart,
    add,
    remove,
    setQty,
    clear,
    count,
    subtotal,
    lines,
    orders,
    placeOrder,
    placeDirectOrder,
    addresses,
    saveAddress,
    deleteAddress,
    setDefaultAddress,
    maxAddresses: MAX_ADDRESSES,
    account,
    signIn,
    signOut,
    reviews,
    reviewsFor,
    saveReview,
    deleteReview,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export const ALL_PRODUCTS = PRODUCTS;
