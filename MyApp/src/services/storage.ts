import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = "app:v1:favs";
export const AUTH_KEY = "app:v1:auth";

export interface StoredUser {
  email: string;
  name: string;
  avatarUri: string;
}

export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    alert("errore controllo storage");
    // ignora errori storage in dev
  }
}

export async function loadAuthUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as { email?: unknown }).email === "string" &&
      typeof (parsed as { name?: unknown }).name === "string" &&
      typeof (parsed as { avatarUri?: unknown }).avatarUri === "string"
    ) {
      return parsed as StoredUser;
    }

    return null;
  } catch {
    return null;
  }
}

export async function saveAuthUser(user: StoredUser | null): Promise<void> {
  try {
    if (!user) {
      await AsyncStorage.removeItem(AUTH_KEY);
      return;
    }

    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch {
    // ignora errori storage in dev
  }
}
