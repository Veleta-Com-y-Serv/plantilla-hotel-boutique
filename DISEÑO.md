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
  revista (fotos a sangre, garalda en cursiva enorme, mucho negro y un oro apagado). No: la caja centrada con tarjetas blancas,
  los degradados vivos, las esquinas redondeadas o el aire rústico de `alojamiento-rural`.
- **Paleta de ejemplo**: primario `#15120e` (negro noche), acento `#a8844a` (oro viejo), fondo `#efe8dc` (lino),
  texto `#1d1a15`. Derivados con `color-mix` en `global.css`: `--noche-honda` (pie, cómo llegar, portada sin foto),
  `--noche-suave` (filas pares de habitaciones), `--oro-claro` (oro sobre oscuro), `--oro-texto` (oro legible sobre
  lino, AA en texto pequeño), `--piedra` (banda lino tostado), `--sobre-oscuro` y `--sobre-oro` (texto sobre
  noche y sobre oro), `--filete` (líneas finas doradas). Aguanta otros cuatro colores siempre que el primario sea
  oscuro, el acento medio y el fondo claro.
- **Tipografía**: garalda del sistema para títulos (EB Garamond, Adobe Garamond, Garamond, Sabon, Hoefler Text,
  Palatino, Georgia de respaldo) en peso 400 y **en cursiva** los h1/h2, enorme (portada hasta 7,8 rem, títulos de
  sección hasta 5,4 rem, nombre del pie hasta 9,5 rem); la frase de la casa y las opiniones van en redonda, para
  contrastar. Rótulos (tipo de habitación, firmas, etiquetas de contacto, horarios) en cursiva garalda. Texto,
  antetítulos, menú y botones en Avenir Next / Segoe UI / system-ui, **en minúscula y sin interletrado**: nada de
  mayúsculas espaciadas. Antetítulos con un arquito de oro (medio punto en línea) delante. Botones de píldora:
  noche sobre claro y lino sobre oscuro; el oro queda para los detalles (arcos, números, rombos, filetes).
- **Motivos propios**: la **cúpula** (varias bandas empiezan con un arco rebajado de borde a borde que se monta sobre
  la anterior: la casa, habitaciones, galería, preguntas y el pie); el arco de medio punto (fotos con remate de arco
  y filete dorado separado) en «La casa» y «Experiencias»; el arquito de los antetítulos; números grandes en oro en
  las habitaciones; números romanos en cursiva en las experiencias; rombos de oro entre los detalles de la portada.
- **Para no parecerse a `joyeria-artesania`** (también negro y oro): allí, Bodoni recta, mayúsculas espaciadas,
  botones rectos dorados, portada partida con la foto enmarcada por un filete; aquí, Garamond en cursiva, minúscula,
  píldoras noche/lino, portada centrada sin marco y bandas con cúpula.
- **Ritmo de bandas** (todas de borde a borde, contenido a `max-width: 90rem`):
  portada a pantalla completa (foto a sangre + velo noche + texto centrado + detalles con rombos) → la casa (lino con
  cúpula, foto en arco y frase enorme) → habitaciones (noche con cúpula; filas 50/50 a sangre en zigzag, pares en noche suave) →
  experiencias (lino, fila de cuatro arcos) → restaurante (50/50: foto a sangre + oro pleno con horarios) →
  galería (noche con cúpula, mosaico de borde a borde sin márgenes) → opiniones (piedra, primera enorme y el resto en columnas)
  → cómo llegar (50/50: noche honda + plano a sangre) → reservas (50/50: oro pleno + formulario sobre noche) →
  preguntas (lino con cúpula, titular fijo a la izquierda y acordeón a la derecha) → contacto (piedra, vías en letra grande
  + formulario en bloque noche) → pie (noche honda con cúpula, nombre enorme en cursiva de oro, centrado, y cuatro columnas).
- **Responsive**: móvil primero. A 375 px todo en una columna con 16 px de margen del texto (las fotos y fondos
  tocan el borde), detalles de la portada centrados en varias líneas, cúpulas más bajas (2,25 rem), experiencias con el arco pequeño a la izquierda y el texto al lado,
  mosaico en dos columnas con la primera foto a lo ancho, menú plegable (`details`) con enlaces grandes. Desde 768 px
  las filas foto/texto pasan a 50/50 a sangre, experiencias a dos columnas, mosaico a cuatro. Desde 1100 px, cuatro
  arcos en fila; desde 1180 px, menú completo en la cabecera.
- **Cabecera**: fija a todo el ancho; transparente sobre la portada y noche al hacer scroll (script pequeño en
  `Header.astro`); nombre en cursiva garalda con la localidad debajo, menú en minúscula y botón de píldora lino.

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
- Usar la serifa de `abogados` o `bodega-vinos` sin los arcos ni la cúpula: lo que distingue esta plantilla es la
  garalda en cursiva enorme, la cúpula, el arco y el negro con oro viejo apagado. Tampoco volver a la didona recta, las
  mayúsculas espaciadas, los botones dorados rectos ni el marco dorado de la portada: eso es `joyeria-artesania`.
- Poner textos fijos en los componentes o inventar precios, cifras u opiniones.
