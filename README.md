# Plantilla NoExpertise · Hotel y apartamentos

Web exclusiva para hoteles y apartamentos, con habitaciones en zigzag, experiencias, restaurante y reservas.

- Sectores: hotel, hotel-boutique, hostal, apartamentos-turisticos, alquiler-vacacional. Estilo: exclusivo. Plan mínimo: presencia.
- Secciones: hero, esencia, habitaciones, experiencias, gastronomia, galeria, opiniones, como-llegar, reservas, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo: negro noche + oro viejo + lino; portada a pantalla completa con la foto a sangre, velo y marco fino dorado; serif didona enorme; la frase de la casa junto a una foto en arco; habitaciones en filas 50/50 a sangre en zigzag; experiencias en una fila de arcos; restaurante con foto a sangre sobre oro pleno; galería en mosaico de borde a borde; reservas partidas oro / noche; pie oscuro con el nombre enorme en oro.
- Campos propios: `esencia.declaracion` y `esencia.autor`; `habitaciones.habitaciones` [{nombre, categoria, texto, precio, personas, extras, imagen}]; `experiencias.items` con `imagen`; `gastronomia.items` como filas de horario; `reservas.enlace_reservas` y `reservas.nota`. Detalle en `CLAUDE.md`.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`Hotel`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml` (ejemplo: Casa Nueve Arcos, hotel ficticio en Ronda); metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.
