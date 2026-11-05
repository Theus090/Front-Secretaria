# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Note: `package.json` currently pins Expo SDK ~58 (React Native 0.88, React 19.3, expo-router ~58). Check the installed versions before relying on version-specific docs.

## Commands

```bash
npm install
npm start            # expo start (Metro dev server)
npm run android      # expo run:android (native build)
npm run ios          # expo run:ios
npm run web          # expo start --web
npm run lint         # expo lint (eslint-config-expo, flat config in eslint.config.js)
npx tsc --noEmit     # type-check (no script defined)
```

There is no test runner configured.

## Architecture

Mobile app (Android/iOS/Web) for a school secretariat ("projeto_secretaria"), written in Portuguese (identifiers, UI strings, file names). It follows **MVVM on top of Expo Router**:

- `app/` — routes (file-based, typed routes enabled). Screens are thin Views: they call one `use<Name>ViewModel()` hook and render. `app/_layout.tsx` is the root `Stack` and owns the `QueryClientProvider`. `app/index.tsx` redirects to `/(tabs)` or `/login` depending on whether a user id is stored. `app/baixa/[task].tsx` is a dynamic route (task id via `useLocalSearchParams`).
- `ViewModel/` — one hook per screen (`useXViewModel.ts`). Holds React Query `useQuery`/`useMutation`, react-hook-form `useForm` with `zodResolver`, and navigation/alerts. Returns only what the View needs.
- `service/` — Model layer: plain async functions calling the backend through the shared axios instance in `lib/axios.config.ts`. Image uploads are sent as `FormData` with `{ uri, name, type }` objects.
- `schemas/` — zod schemas for forms/payloads (form types derived with `z.infer`).
- `types/` — API response/domain types.
- `components/<Name>/<Name>.tsx` — reusable UI components, one folder per component.

### Cross-cutting details

- **Backend URL** is hardcoded in `lib/axios.config.ts` (`baseURL`, currently a LAN IP; the hosted Render URL is in a comment above it). Change it there when pointing at a different backend.
- **Session** is not a token: login (`service/user.service.ts` → `Signin`) stores `id_usuario` and `cargo` (role) via `lib/secureStore.ts`, which wraps `expo-secure-store` and falls back to `localStorage` on web. Role values are normalized (lower-cased, quotes stripped) by `normalizarCargo`.
- **Role-gated tabs**: `app/(tabs)/_layout.tsx` uses `Tabs.Protected guard={isDiretor}` to show the "Gerenciamento" tab (`configsDirec`) only when the role is `"direction"`. The role is read through React Query key `["session", "cargo"]` with `staleTime: Infinity`, so after login/logout that key must be invalidated (see `useIndexViewModel`).
- **Styling**: NativeWind v4 (Tailwind 3) via `className`. Configured in `babel.config.js` (`jsxImportSource: 'nativewind'`), `metro.config.js` (`withNativeWind`, input `global.css`) and `tailwind.config.js` (content globs cover `app/` and `components/` only — classes used elsewhere won't be generated). Use `cn()` from `lib/cn.ts` to merge classes. Colors needed in non-`className` props (e.g. icon `color`) live in `constants/cores.ts`.
- **Path alias**: `@/*` maps to the repo root.
- `app.json` enables `experiments.reactCompiler` and `typedRoutes`.
- `arquitetura-projeto.txt` is an older architecture write-up from when the repo was still the Expo template; its folder tree is outdated, but its MVVM rationale still applies.
