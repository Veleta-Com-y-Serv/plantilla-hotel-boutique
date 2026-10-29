# Plantilla «Hotel y apartamentos» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **exclusivo**, a ancho completo (bandas de borde a borde, fotos a sangre).
Todo en castellano de España, frases cortas, sin jerga.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga, lo tipa y lo normaliza; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = negro noche, acento = oro viejo, fondo = lino, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los tonos derivados (`--noche-honda`, `--noche-suave`, `--oro-claro`, `--oro-texto`, `--piedra`, `--sobre-oscuro`, `--sobre-oro`, `--filete`) se calculan con `color-mix` en `src/styles/global.css`. El diseño cuenta con un primario oscuro y un fondo claro.
- **Tipografías y aspecto general**: `src/styles/global.css` (didona del sistema —Bodoni, Didot, Georgia de respaldo— para títulos; sans del sistema para el texto; sans geométrica en mayúsculas espaciadas para rótulos y botones). Bandas `.banda--noche|honda|lino|piedra|oro`, filas a sangre `.estancia` y `.partida`, arcos `.arco`, mosaico `.mosaico`. Fuentes del sistema: no añadas fuentes externas.
- **Cabecera**: `src/components/Header.astro` (fija; transparente sobre la portada y sólida al hacer scroll, con un script pequeño). **Pie**: `src/components/Footer.astro` (nombre enorme en oro y cuatro columnas).
- **Imágenes**: en `public/`. Fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. El plano de situación es `/placeholders/plano.svg` (dibujo propio). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en versales didonas y, en escritorio, la localidad debajo.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis; esta plantilla es de plan presencia).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro` (portada a pantalla completa, foto a sangre con velo y marco dorado)
- `esencia` → `esencia.astro` (frase grande junto a una foto en arco)
- `habitaciones` → `habitaciones.astro` (filas 50/50 a sangre en zigzag)
- `experiencias` → `experiencias.astro` (fila de arcos con foto)
- `gastronomia` → `gastronomia.astro` (foto a sangre + oro pleno con horarios)
- `galeria` → `galeria.astro` (mosaico de borde a borde)
- `opiniones` → `opiniones.astro`
- `como-llegar` → `como-llegar.astro` (texto + plano a sangre)
- `reservas` → `reservas.astro` (oro pleno + formulario sobre noche, a sangre)
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta)
- `contacto` → `contacto.astro`
- `texto` → `texto.astro` (apartado genérico para `tipo: texto`: con foto, fila a sangre; sin foto, dos columnas)

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` (sin él, el botón llama), `cta_secundario` (enlace con flecha), `items` [{titulo, icono}] = franja de detalles al pie de la portada (hasta 6).
- `esencia`: `declaracion` (la frase grande), `autor` (quién la firma), `imagen` (foto en arco), `antetitulo`, `titulo` opcional, `cta` opcional. Sin frase ni título no se pinta.
- `habitaciones.habitaciones` [{nombre, categoria, texto, precio, personas, extras, imagen}]: `categoria` es el tipo («Suite», «Habitación», «Apartamento»). `precio` y `personas` SIEMPRE como cadena (`"desde 145 €/noche"`, `"2 personas"`); vacíos = no se pintan. `extras` es UNA cadena separada por comas, nunca una lista. `cta` de la sección opcional (botón al final).
- `experiencias.items` [{titulo, texto, imagen, icono}]: arcos con número romano; sin `imagen`, arco noche con el `icono`.
- `gastronomia`: `texto` (párrafos separados por una línea en blanco), `imagen`, `cta`, `items` [{titulo, texto}] como filas de horario («Desayuno» · «De 8:00 a 11:00»).
- `galeria.galeria`: lista de rutas; la primera (y una de cada nueve) va grande. Con 5 o 9 fotos el mosaico queda cerrado.
- `opiniones.testimonios` [{texto, autor, nota}]: la primera sale enorme; `nota` opcional. Sin opiniones, no se pinta. Sin estrellas ni puntuaciones.
- `como-llegar`: `texto`, `imagen` (plano), `items` (con `icono` `coche`, `tren`, `bus`, `avion`) y botón a Google Maps con `contacto.direccion` (texto en `cta.texto`; si `cta.url` tiene una dirección web, se usa esa).
- `reservas`: `texto`, `cta` (WhatsApp o teléfono), `nota` (cancelación, estancia mínima…), formulario con llegada, salida y personas por `mailto`. `enlace_reservas` (opcional): web externa de reservas; si es `https://…`, aparece otro botón (texto en `cta_secundario.texto`).
- Iconos útiles: `montana`, `taza`, `piscina`, `parking`, `wifi`, `huella`, `spa`, `copa`, `cama`, `llave`, `arco`, `coche`, `tren`, `bus`, `avion` (lista completa en `src/components/ui/Icono.astro`).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, habitaciones, precios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Varios valores = una cadena separada por comas (`extras`). Máximo 24 elementos por lista.
5. **Nunca inventes** precios, cifras ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan).
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, empezando por una `<section class="banda banda--noche">` (la cabecera es fija y la primera banda ya deja su hueco); enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `habitaciones`, `experiencias`, `gastronomia`, `galeria`, `esencia`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el de la cabecera), bandas de borde a borde, 16 px de margen lateral del texto en móvil (`.contenedor`), botones de 44 px de alto como mínimo y sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`, o el `titulo`/`nombre` de la ficha); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
