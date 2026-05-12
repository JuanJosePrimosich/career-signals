# Career Signals Landing Page MVP

Landing funcional para Career Signals, con upload local, análisis dummy y diseño responsive.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir la URL que indique Vite.

## Build de producción

```bash
npm run build
```

La carpeta final queda en `dist/`.

## Deploy recomendado: Vercel

1. Subir este proyecto a GitHub.
2. Entrar a Vercel.
3. Importar el repositorio.
4. Framework: Vite.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

## Dominio sugerido

`careersignals.signaliq.com.ar`

En Cloudflare/Zona DNS crear un CNAME:

- Type: CNAME
- Name: careersignals
- Target: el dominio asignado por Vercel, por ejemplo `career-signals.vercel.app`
- Proxy: DNS only al principio si Vercel lo solicita.

## Nota sobre el upload

El upload actual es funcional en frontend: selecciona o arrastra archivos y activa el análisis dummy. No sube archivos a servidor. Para producción real habría que agregar backend, storage seguro y política de privacidad.
