"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout } from "@/lib/api/auth";

const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // পেজ খোলার সময় একবার জিজ্ঞাসা করি কে লগইন করা
  useEffect(() => {
    let cancelled = false;
    getMe().then((u) => {
      if (cancelled) return;
      setUser(u);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {}
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}