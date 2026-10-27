import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const USER_ID_KEY = "id_usuario";
const USER_ROLE   = "cargo";

// ─── one place that knows how to read/write ─────────────────────────
async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    // Optional: throw instead, so web failures are obvious.
    globalThis.localStorage?.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return globalThis.localStorage?.getItem(key) ?? null;
  }
  return SecureStore.getItemAsync(key);         // already string | null
}

async function removeItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    globalThis.localStorage?.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

// ─── user id ────────────────────────────────────────────────────────
export function salvarUserId(id: string): Promise<void> {
  return setItem(USER_ID_KEY, String(id));      // always raw
}

export async function obterUserId(): Promise<string | null> {
  return getItem(USER_ID_KEY);                  // already a string
}

export async function obterIdUsuarioLogado(): Promise<string | null> {
  return obterUserId();                         // ✅ no JSON.parse
}

export function removerUserId(): Promise<void> {
  return removeItem(USER_ID_KEY);
}

// ─── cargo ──────────────────────────────────────────────────────────
export function salvarCargoUsuario(cargo: string): Promise<void> {
  return setItem(USER_ROLE, normalizarCargo(cargo));
}

export async function obterCargo(): Promise<string | null> {
  const raw = await getItem(USER_ROLE);
  return raw == null ? null : normalizarCargo(raw);
}

export function removerCargo(): Promise<void> {
  return removeItem(USER_ROLE);
}

// ─── normalization at the boundary ──────────────────────────────────
// Kills accidental double-encoding ("\"kitchen\"") and casing drift ("Kitchen").
export function normalizarCargo(value: string): string {
  let v = value.trim();
  // strip one level of accidental JSON string quoting: "\"kitchen\"" → kitchen
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    try { v = JSON.parse(v) as string; } catch { /* keep raw */ }
  }
  return v.trim().toLowerCase();
}