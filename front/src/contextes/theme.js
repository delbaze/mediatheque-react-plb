import { createContext, useContext } from "react";
export const ContexteTheme = createContext({
  theme: "",
  basculerTheme: () => {},
});

export function useTheme() {
  const contexte = useContext(ContexteTheme);
  return contexte;
}
