import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loadAuthUser,
  saveAuthUser,
  type StoredUser,
} from "../services/storage";

// Tipo dell'utente
type User = StoredUser;

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    loadAuthUser()
      .then((storedUser) => {
        if (active) {
          setUser(storedUser);
          setIsReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setIsReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = (nextUser: User) => {
    setUser(nextUser);
    void saveAuthUser(nextUser);
  };

  const logout = () => {
    setUser(null);
    void saveAuthUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isReady,
    }),
    [user, isReady],
  );

  return (
    <AuthContext.Provider value={value}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
