// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene o cuándo: «Estancia de agosto», «Agosto de 2026»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/**
 * Habitación, suite o apartamento. `precio` siempre como cadena («desde 145 €/noche»); `personas` también
 * («2 personas»); `categoria` es el tipo («Habitación», «Suite», «Apartamento»); `extras` es UNA cadena separada
 * por comas («Balcón, bañera exenta, minibar»), nunca una lista.
 */
export interface Habitacion { nombre: string; categoria: string; texto: string; precio: string; personas: string; extras: string; imagen: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  /** habitaciones */
  habitaciones: Habitacion[];
  /** esencia: la frase grande y quién la firma */
  declaracion: string;
  autor: string;
  /** reservas */
  nota?: string;
  enlace_reservas?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v).trim());
/** Botón válido (con destino) o undefined. */
const enlace = (v: unknown): Enlace | undefined => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : undefined;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    cta: enlace(s.cta),
    cta_secundario: enlace(s.cta_secundario),
    // Los elementos sin título no se pintan (filas vacías que deja el editor).
    items: lista<Crudo>(s.items)
      .filter((i) => texto(i.titulo))
      .map((i) => ({ titulo: texto(i.titulo), texto: texto(i.texto), icono: texto(i.icono), imagen: texto(i.imagen) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios)
      .filter((t) => texto(t.texto))
      .map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    habitaciones: lista<Crudo>(s.habitaciones)
      .filter((h) => texto(h.nombre))
      .map((h) => ({
        nombre: texto(h.nombre),
        categoria: texto(h.categoria),
        texto: texto(h.texto),
        precio: texto(h.precio),
        personas: texto(h.personas),
        extras: texto(h.extras),
        imagen: texto(h.imagen),
      })),
    declaracion: texto(s.declaracion),
    autor: texto(s.autor),
    nota: texto(s.nota),
    enlace_reservas: texto(s.enlace_reservas),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi alojamiento',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#15120e', acento: '#a8844a', fondo: '#efe8dc', texto: '#1d1a15', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url) && texto(e?.texto)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Hotel',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** Valores de una cadena separada por comas o punto y coma («Wifi, desayuno; chimenea»). */
export const valores = (t?: string) => (t ? t.split(/[,;]/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Es un enlace a otra web? (se abre en pestaña nueva) */
export const externo = (u?: string) => !!u && /^https?:\/\//.test(u);
/** Atributos para abrir en pestaña nueva los enlaces a otras webs. */
export const nueva = (u?: string) => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
