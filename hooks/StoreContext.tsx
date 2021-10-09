import { createContext, Dispatch, SetStateAction } from "react";

export const StoreContext = createContext<{ cart: { itemId: string, qty: number }[], setCart: Dispatch<SetStateAction<{ itemId: string, qty: number }[]>> } | null>(null);