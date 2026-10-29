# Pizarras — Nica English Club

Editor Excalidraw 0.18.0 completo para el maestro; vista de solo lectura para alumnos. Datos en Google Sheets + Drive.

## 1. Google (una vez)
1. Crea un Google Sheet nuevo → Extensiones → Apps Script → pega `apps-script/Code.gs`.
2. Configuración del proyecto → Propiedades del script → agrega `ADMIN_KEY` = tu clave de maestro.
3. Ejecuta cualquier función una vez (autoriza permisos de Drive y Sheets).
4. Implementar → Nueva implementación → Aplicación web → Ejecutar como: yo · Acceso: cualquier persona. Copia la URL.

## 2. App
```bash
cp .env.example .env     # pega la URL en VITE_API_URL
npm install
npm run dev              # prueba local
npm run build            # genera /dist para Vercel, Netlify o GitHub Pages
```

## Rutas
- `#/admin` → panel del maestro (clave). Crear horarios, copiar enlace de alumnos, entrar a la clase de hoy (nace en blanco) o a otra fecha. Autoguardado cada 2 s.
- `#/g/CODIGO` → enlace del grupo para alumnos: clase de hoy + selector de fechas, solo lectura.
