# Cargo SaaS Backoffice

Minimal backoffice foundation aligned with the current Cargo backend modules.

## Kept modules

- Gp - general settings
- Ad - administration
- Ap - application / portal
- Cr - customer
- Ca - cargo operations
- Pos - point of sale
- Re - reports
- Gl - ledger / posting setup

## Project structure

```text
src/Auth
src/components
src/constants
src/contexts
src/layouts
src/Modules/{Ad,Ap,Ca,Cr,Gl,Gp,Pos,Re}
src/routes
src/services
```

## Convention

- Internal API: `POST /api/v1/back/action`
- Action header: `posting_code`
- Action values use Cargo codes such as `adm0010`, `gen0010`, `car0020`.
- Third-party/private UI packages, copied legacy assets and copied UI design are not used.
- Current screens are foundation placeholders. Cargo-specific design can replace them later without changing the route/module/action skeleton.

## Route and API pattern

Each module keeps a `*RouteConfig.jsx` file similar to the core backoffice pattern. Action screens are reachable by Cargo action code paths, for example `/adm0010`, `/gen0010`, `/car0020`.

API calls can use `send(action_code, data, showLoading)` for core-style component code. Internally it calls `ApiService(action_code, data)`, which sends `POST /api/v1/back/action` with `posting_code: <action_code>`. Multipart requests use `sendMultiForm(action_code, data, showLoading)`.

## Run

```powershell
copy .env.example .env
npm install
npm run dev
```
