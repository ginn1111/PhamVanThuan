import { ReactNode, SVGAttributes } from "react";

declare global {
  interface TokenItem {
    label: ReactNode;
    value: string;
  }

  type ValueOf<T> = T[keyof T];

  interface PricItem {
    currency: string;
    price: string;
    date: string;
  }
}

export {};
