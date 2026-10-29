# Hotel y apartamentos: brief de diseño

Plantilla `hotel-boutique` creada el 29/10/2026 a partir de `alojamiento-rural` con `php artisan plantillas:nueva` y
rediseñada entera a ancho completo. Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe
la plantilla.

## Brief

- **Para quién**: hoteles boutique, hoteles pequeños, hostales con encanto, apartamentos turísticos y alquiler
  vacacional. Quien entra está eligiendo dónde dormir: quiere ver las habitaciones con fotos grandes, saber qué
  puede hacer cerca, si hay desayuno o restaurante, cómo llegar y cuánto cuesta.
- **Qué tiene que conseguir la web**: que consulte disponibilidad (formulario de llegada, salida y personas, o
  WhatsApp) o que reserve en su motor externo (`enlace_reservas`). Secundario: llamar.
- **Tono y estilo** (`exclusivo`): elegante, sereno, de lujo discreto. Sí: las webs de los hoteles boutique de
  revista (fotos a sangre, didona enorme, mucho negro y un oro apagado). No: la caja centrada con tarjetas blancas,
  los degradados vivos, las esquinas redondeadas o el aire rústico de `alojamiento-rural`.
- **Paleta de ejemplo**: primario `#15120e` (negro noche), acento `#a8844a` (oro viejo), fondo `#efe8dc` (lino),
  texto `#1d1a15`. Derivados con `color-mix` en `global.css`: `--noche-honda` (pie, cómo llegar, portada sin foto),
  `--noche-suave` (filas pares de habitaciones), `--oro-claro` (oro sobre oscuro), `--oro-texto` (oro legible sobre
  lino, AA en texto pequeño), `--piedra` (banda lino tostado), `--sobre-oscuro` y `--sobre-oro` (texto sobre
  noche y sobre oro), `--filete` (líneas finas doradas). Aguanta otros cuatro colores siempre que el primario sea
  oscuro, el acento medio y el fondo claro.
- **Tipografía**: didona del sistema para títulos (Bodoni 72, Didot, Bodoni MT, Big Caslon, Book Antiqua, Georgia
  de respaldo) en peso 400, enorme (portada hasta 7,4 rem, títulos de sección hasta 4,9 rem, nombre del pie hasta
  9 rem), cursiva para la frase de la casa y las opiniones. Texto en Avenir Next / Segoe UI / system-ui. Rótulos,
  antetítulos y botones en sans geométrica (Futura, Century Gothic) en mayúsculas con interletrado de 0,2-0,32 em;
  antetítulos con una línea dorada delante. Botones rectos.
- **Motivos propios**: el marco fino dorado por dentro de la portada; el arco de medio punto (fotos con remate de
  arco y filete dorado separado) en «La casa» y «Experiencias»; números grandes en oro en las habitaciones; números
  romanos en las experiencias.
- **Ritmo de bandas** (todas de borde a borde, contenido a `max-width: 90rem`):
  portada a pantalla completa (foto a sangre + velo noche + marco dorado + franja de detalles) → la casa (lino, foto
  en arco y frase enorme) → habitaciones (noche; filas 50/50 a sangre en zigzag, pares en noche suave) →
  experiencias (lino, fila de cuatro arcos) → restaurante (50/50: foto a sangre + oro pleno con horarios) →
  galería (noche, mosaico de borde a borde sin márgenes) → opiniones (piedra, primera enorme y el resto en columnas)
  → cómo llegar (50/50: noche honda + plano a sangre) → reservas (50/50: oro pleno + formulario sobre noche) →
  preguntas (lino, titular fijo a la izquierda y acordeón a la derecha) → contacto (piedra, vías en letra grande
  + formulario en bloque noche) → pie (noche honda, nombre enorme en oro de borde a borde y cuatro columnas).
- **Responsive**: móvil primero. A 375 px todo en una columna con 16 px de margen del texto (las fotos y fondos
  tocan el borde), franja de la portada en 2 × 2, experiencias con el arco pequeño a la izquierda y el texto al lado,
  mosaico en dos columnas con la primera foto a lo ancho, menú plegable (`details`) con enlaces grandes. Desde 768 px
  las filas foto/texto pasan a 50/50 a sangre, experiencias a dos columnas, mosaico a cuatro. Desde 1100 px, cuatro
  arcos en fila; desde 1180 px, menú completo en la cabecera.
- **Cabecera**: fija a todo el ancho; transparente sobre la portada y noche al hacer scroll (script pequeño en
  `Header.astro`); nombre en versales didonas con la localidad debajo, menú en mayúsculas espaciadas y botón oro.

## Apartados (en orden) y listas propias

1. `hero`: antetítulo, título, texto, foto, dos botones y `items` (titulo + icono) en franja al pie.
2. `esencia`: `declaracion` (frase grande), `autor`, `imagen` (en arco), `antetitulo`, `titulo` opcional.
3. `habitaciones`: `habitaciones` [{nombre, categoria, texto, precio, personas, extras, imagen}].
4. `experiencias`: `items` [{titulo, texto, imagen, icono}].
5. `gastronomia`: texto, imagen, `cta` e `items` [{titulo, texto}] como filas de horario.
6. `galeria`: `galeria` (lista de rutas; con 5 o 9 fotos el mosaico queda cerrado).
7. `opiniones`: `testimonios` [{texto, autor, nota}].
8. `como-llegar`: texto, plano (`imagen`), `items` (coche, tren, avión) y botón a Google Maps.
9. `reservas`: texto, `cta`, `cta_secundario`, `enlace_reservas`, `nota` y formulario de estancia.
10. `preguntas`: `preguntas` [{pregunta, respuesta}].
11. `contacto`: titular, vías de contacto de `site.yaml → contacto` y formulario.
12. `texto` (diseño genérico para apartados nuevos).

## Fotos

16 en `fotos.json`: portada (ciudad blanca sobre el desfiladero al atardecer), patio de arcos con naranjos, tres
habitaciones y un apartamento, cuatro experiencias en vertical (viñedo, bajada al desfiladero, baños árabes, pueblo
blanco), terraza del restaurante y cinco de galería (azotea con piscina, galería de arcos, desayuno, escalera,
baño). Paleta negro, oro y lino; sin texto legible, sin logotipos y sin personas.

## Qué no hacer

- Volver a la caja centrada estrecha con tarjetas, al hero de la base o a la cabecera editorial centrada de
  `alojamiento-rural`.
- Usar la serifa de `abogados` o `bodega-vinos` sin los arcos ni el marco: lo que distingue esta plantilla es la
  didona enorme, el arco y el negro con oro viejo apagado.
- Poner textos fijos en los componentes o inventar precios, cifras u opiniones.
