import { createContext, useContext, useState } from "react";
import { loadFavoriteIds } from "../services/storage";
import React from "react";

type FavoriteContextType = {
  favorites: string[] | undefined;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[] | undefined>();
  async function loadFavorites() {
    const data = await loadFavoriteIds();
    setFavorites(data);
  }

  React.useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
