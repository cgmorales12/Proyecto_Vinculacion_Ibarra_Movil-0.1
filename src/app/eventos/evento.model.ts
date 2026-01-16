export interface Evento {
  id: string;
  titulo: string;
  descripcionCorta: string;
  descripcion: string;
  imagenPrincipal: string;
  galeria: string[];
  fechaInicio: Date;
  fechaFin: Date;
  inicioPromocion?: Date;
  finPromocion?: Date;
  ubicacion: {
    lat: number;
    lng: number;
    direccion?: string;
  };
  ubicacionUrl?: string;
  contacto?: string; // telefono o email
  contactos?: string[];
  auspiciantes?: string[];
  servicios: string[];
  tipo: string;
  categoria: 'Feria de emprendedores' | 'Días festivos' | 'Capacitaciones' | 'Evento comunitario';
  prioridad?: number; // mayor = más prioridad si misma fecha
}
