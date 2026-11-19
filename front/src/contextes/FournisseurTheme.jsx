import { useState, useEffect } from "react";
import { ContexteTheme } from "./theme";

const CLE = "mediatheque.theme";

function FournisseurTheme({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(CLE) ?? "clair",
  );

  const basculerTheme = () => {
    setTheme((actuel) => (actuel === "clair" ? "sombre" : "clair"));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(CLE, theme);
  },[theme])
  return (
    <ContexteTheme value={{ theme, basculerTheme }}>{children}</ContexteTheme>
  );
}

export default FournisseurTheme;
