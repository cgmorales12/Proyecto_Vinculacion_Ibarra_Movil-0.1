import { Injectable } from '@angular/core';
import { Evento } from './evento.model';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private eventos: Evento[] = [];
  private nextId = 1;

  constructor() {
    this.eventos = this.crearDatosFicticios();
  }

  private crearDatosFicticios(): Evento[] {
    const hoy = new Date();
    const addDays = (d: Date, n: number) =>
      new Date(d.getTime() + n * 24 * 60 * 60 * 1000);
    const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
    const getId = () => `e${this.nextId++}`;

    const datos: Evento[] = [
      {
        id: getId(),
        titulo: 'Feria de Emprendedores de Ibarra',
        descripcionCorta: 'Encuentro de emprendimientos con productos locales y exhibiciones.',
        descripcion:
          'La feria reúne a emprendedores del cantón con stands, demostraciones en vivo y espacios de networking.',
        imagenPrincipal: 'https://picsum.photos/seed/feria/800/450',
        galeria: [
          'https://picsum.photos/seed/feria1/1200/800',
          'https://picsum.photos/seed/feria2/1200/800',
          'https://picsum.photos/seed/feria3/1200/800',
        ],
        fechaInicio: addDays(hoy, 2),
        fechaFin: addDays(hoy, 3),
        inicioPromocion: addDays(hoy, -5),
        finPromocion: addDays(hoy, 20),
        ubicacion: {
          lat: -0.3397,
          lng: -78.1276,
          direccion: 'Parque Pedro Moncayo, Ibarra',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Parque+Pedro+Moncayo+Ibarra',
        contacto: '+5930999999999',
        contactos: ['+5930999999999', 'feria@ibarra.gob.ec'],
        auspiciantes: ['Municipio de Ibarra', 'Cámara de Comercio'],
        servicios: ['Stands', 'Alimentos', 'Actividades culturales'],
        tipo: 'Feria',
        categoria: 'Feria de emprendedores',
        prioridad: 3,
      },
      {
        id: getId(),
        titulo: 'Capacitación en Emprendimiento Digital',
        descripcionCorta: 'Sesión intensiva sobre marketing y ventas en línea.',
        descripcion:
          'Capacitación para emprendedores sobre canales digitales, herramientas de comercio electrónico y estrategias de marca.',
        imagenPrincipal: 'https://picsum.photos/seed/capacitacion/800/450',
        galeria: [
          'https://picsum.photos/seed/cap1/1200/800',
          'https://picsum.photos/seed/cap2/1200/800',
          'https://picsum.photos/seed/cap3/1200/800',
        ],
        fechaInicio: addDays(hoy, 5),
        fechaFin: addDays(hoy, 5),
        inicioPromocion: addDays(hoy, -2),
        finPromocion: addDays(hoy, 20),
        ubicacion: {
          lat: -0.3412,
          lng: -78.126,
          direccion: 'Centro de Convenciones Ibarra',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Centro+de+Convenciones+Ibarra',
        contacto: '+5930988888888',
        contactos: ['+5930988888888', 'capacitaciones@ibarra.gob.ec'],
        auspiciantes: ['Dirección de Desarrollo Económico'],
        servicios: ['Formación', 'Networking', 'Materiales digitales'],
        tipo: 'Capacitación',
        categoria: 'Capacitaciones',
        prioridad: 2,
      },
      {
        id: getId(),
        titulo: 'Día de Ibarra',
        descripcionCorta: 'Celebración oficial con desfiles y eventos culturales.',
        descripcion:
          'Conmemoración del aniversario de Ibarra con actos cívicos, música en vivo y actividades familiares.',
        imagenPrincipal: 'https://picsum.photos/seed/festivo/800/450',
        galeria: [
          'https://picsum.photos/seed/festivo1/1200/800',
          'https://picsum.photos/seed/festivo2/1200/800',
          'https://picsum.photos/seed/festivo3/1200/800',
        ],
        fechaInicio: addDays(hoy, 8),
        fechaFin: addDays(hoy, 8),
        inicioPromocion: addDays(hoy, -10),
        finPromocion: addDays(hoy, 20),
        ubicacion: {
          lat: -0.3385,
          lng: -78.129,
          direccion: 'Plaza Cívica, Ibarra',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Plaza+Civica+Ibarra',
        contacto: '+5930987777777',
        contactos: ['+5930987777777', 'eventos@ibarra.gob.ec'],
        auspiciantes: ['Municipio de Ibarra', 'Prefectura de Imbabura'],
        servicios: ['Desfiles', 'Escenarios', 'Seguridad'],
        tipo: 'Día festivo',
        categoria: 'Días festivos',
        prioridad: 3,
      },
      {
        id: getId(),
        titulo: 'Evento Comunitario Barrio Seguro',
        descripcionCorta: 'Jornada de integración y prevención comunitaria.',
        descripcion:
          'Encuentro barrial con actividades deportivas, charlas de prevención y feria de servicios municipales.',
        imagenPrincipal: 'https://picsum.photos/seed/comunitario/800/450',
        galeria: [
          'https://picsum.photos/seed/comunitario1/1200/800',
          'https://picsum.photos/seed/comunitario2/1200/800',
          'https://picsum.photos/seed/comunitario3/1200/800',
        ],
        fechaInicio: addDays(hoy, 12),
        fechaFin: addDays(hoy, 12),
        inicioPromocion: addDays(hoy, 0),
        finPromocion: addDays(hoy, 9),
        ubicacion: {
          lat: -0.336,
          lng: -78.125,
          direccion: 'Casa de la Cultura Ibarra',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Casa+de+la+Cultura+Ibarra',
        contacto: '+5930986666666',
        contactos: ['+5930986666666', 'comunitario@ibarra.gob.ec'],
        auspiciantes: ['Policía Comunitaria', 'Municipio de Ibarra'],
        servicios: ['Charlas', 'Deportes', 'Ferias'],
        tipo: 'Evento comunitario',
        categoria: 'Evento comunitario',
        prioridad: 2,
      },
      {
        id: getId(),
        titulo: 'Taller de Innovación y Emprendimiento',
        descripcionCorta: 'Capacitación práctica con mentores locales.',
        descripcion:
          'Programa con sesiones guiadas para fortalecer ideas de negocio y herramientas de innovación.',
        imagenPrincipal: 'https://picsum.photos/seed/taller/800/450',
        galeria: [
          'https://picsum.photos/seed/taller1/1200/800',
          'https://picsum.photos/seed/taller2/1200/800',
          'https://picsum.photos/seed/taller3/1200/800',
        ],
        fechaInicio: addDays(hoy, 15),
        fechaFin: addDays(hoy, 16),
        inicioPromocion: addDays(hoy, -3),
        finPromocion: addDays(hoy, 12),
        ubicacion: {
          lat: -0.339,
          lng: -78.128,
          direccion: 'Centro de Innovación Ibarra',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Centro+de+Innovacion+Ibarra',
        contacto: '+5930985555555',
        contactos: ['+5930985555555', 'innovacion@ibarra.gob.ec'],
        auspiciantes: ['Universidad Técnica del Norte'],
        servicios: ['Mentoría', 'Workshops', 'Materiales'],
        tipo: 'Capacitación',
        categoria: 'Capacitaciones',
        prioridad: 1,
      },
      {
        id: getId(),
        titulo: 'Feria Gastronómica Navideña',
        descripcionCorta: 'Sabores tradicionales y productos artesanales.',
        descripcion:
          'Encuentro de gastronomía local con música y actividades para toda la familia.',
        imagenPrincipal: 'https://picsum.photos/seed/gastro/800/450',
        galeria: [
          'https://picsum.photos/seed/gastro1/1200/800',
          'https://picsum.photos/seed/gastro2/1200/800',
          'https://picsum.photos/seed/gastro3/1200/800',
        ],
        fechaInicio: addMonths(hoy, 1),
        fechaFin: addMonths(hoy, 1),
        inicioPromocion: addDays(hoy, -5),
        finPromocion: addMonths(hoy, 1),
        ubicacion: {
          lat: -0.342,
          lng: -78.13,
          direccion: 'Plaza de los Ponchos',
        },
        ubicacionUrl: 'https://maps.google.com/?q=Plaza+de+los+Ponchos+Ibarra',
        contacto: '+5930984444444',
        contactos: ['+5930984444444'],
        auspiciantes: ['Asociación de Emprendedores'],
        servicios: ['Degustaciones', 'Presentaciones', 'Stands'],
        tipo: 'Feria',
        categoria: 'Feria de emprendedores',
        prioridad: 2,
      }
    ];

    return datos;
  }

  listarEventos(): Evento[] {
    return this.eventos.slice();
  }

  obtenerEvento(id: string): Evento | undefined {
    return this.eventos.find((evento) => evento.id === id);
  }

  crearEvento(evento: Evento): void {
    this.eventos = [...this.eventos, { ...evento, id: `e${this.nextId++}` }];
  }

  actualizarEvento(evento: Evento): void {
    this.eventos = this.eventos.map((item) => (item.id === evento.id ? { ...evento } : item));
  }

  eliminarEvento(id: string): void {
    this.eventos = this.eventos.filter((evento) => evento.id !== id);
  }

  obtenerMasCercanos(n = 5): Evento[] {
    const ahora = new Date().getTime();
    const copia = this.eventos.slice();
    copia.sort((a, b) => {
      const da = Math.abs(new Date(a.fechaInicio).getTime() - ahora);
      const db = Math.abs(new Date(b.fechaInicio).getTime() - ahora);
      if (da === db) {
        const pa = a.prioridad || 0;
        const pb = b.prioridad || 0;
        return pb - pa;
      }
      return da - db;
    });
    return copia.slice(0, n);
  }

  cargarNuevos(desdeIndex: number, cantidad = 5): Evento[] {
    const orden = this.eventos.slice().sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime());
    return orden.slice(desdeIndex, desdeIndex + cantidad);
  }

  cargarAnteriores(hastaIndex: number, cantidad = 5): Evento[] {
    const orden = this.eventos.slice().sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime());
    const start = Math.max(0, hastaIndex - cantidad);
    return orden.slice(start, hastaIndex);
  }
}
