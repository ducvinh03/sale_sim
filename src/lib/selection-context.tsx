"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type SelectedPlan = {
  code: string;
  price: number;
  type: "Trả trước" | "Trả sau";
};

type SelectionContextValue = {
  numbers: string[];
  plan: SelectedPlan | null;
  cartOpen: boolean;
  addNumber: (so: string) => void;
  removeNumber: (so: string) => void;
  setPlan: (p: SelectedPlan | null) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [plan, setPlanState] = useState<SelectedPlan | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const value = useMemo<SelectionContextValue>(
    () => ({
      numbers,
      plan,
      cartOpen,
      addNumber: (so) =>
        setNumbers((prev) => (prev.includes(so) ? prev : [...prev, so].slice(-8))),
      removeNumber: (so) => setNumbers((prev) => prev.filter((n) => n !== so)),
      setPlan: (p) => setPlanState(p),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toggleCart: () => setCartOpen((v) => !v),
    }),
    [numbers, plan, cartOpen]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within SelectionProvider");
  return ctx;
}
