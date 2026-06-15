# 11ONCE — Landing Page

Sitio web oficial de **11ONCE Restobar**, restobar en Chile con smash burgers, comida mexicana, tablas para compartir y carta de tragos.

**Sitio en producción:** [https://11once.cl](https://11once.cl)

---

## Ramas

| Rama | Contenido | Uso |
|------|-----------|-----|
| `marco` | Código fuente completo | Desarrollo |
| `main` | Solo `dist/` (build) | Deploy en cPanel |

---

## Desarrollo local

```bash
git clone -b marco git@github.com:mcarvallorestify/11-once-landing.git
cd 11-once-landing
npm install
npm run dev
```

---

## Deploy a producción

Desde la rama `marco`:

```bash
npm run build
git add .
git commit -m "feat: descripcion del cambio"
git push origin marco

# Actualizar main (solo dist) para cPanel
npm run deploy:main
```

El script `deploy:main` copia el build a la rama `main` y la sube a GitHub.

### cPanel

- **Rama de deploy:** `main`
- **Document Root:** `/home/marquito/11once.cl/web`
- El `.cpanel.yml` de `main` copia los archivos del build a `web/`

---

## Stack

Vite · React · TypeScript · Tailwind · shadcn/ui · API Fudo (Supabase proxy)

---

Desarrollado por [Restify](https://github.com/mcarvallorestify).
