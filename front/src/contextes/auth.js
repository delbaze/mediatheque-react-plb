import { createContext, useContext } from "react";

export const ContexteAuth = createContext({
    utilisateur: {},
    connecter: () => {},
    deconnecter: () => {}
})


export function useAuth() {
    const contexte = useContext(ContexteAuth)
    return contexte
}