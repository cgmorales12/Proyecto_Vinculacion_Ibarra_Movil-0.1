import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, star } from 'ionicons/icons';
import { EventosService } from '../eventos.service';
import { Evento } from '../evento.model';

interface EventoForm {
  titulo: string;
  descripcionCorta: string;
  descripcion: string;
  imagenPrincipal: string;
  galeria1: string;
  galeria2: string;
  galeria3: string;
  fechaInicio: string;
  fechaFin: string;
  direccion: string;
  lat: number;
  lng: number;
  ubicacionUrl: string;
  contactos: string;
  auspiciantes: string;
  servicios: string;
  tipo: string;
  categoria: Evento['categoria'];
  prioridad: number;
}

@Component({
  selector: 'app-registro-eventos',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegistroPage implements OnInit {
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  mesesDisponibles: { key: string; label: string }[] = [];
  mesSeleccionado = '';
  eventoEditando?: Evento;

  categoriasEventos: Evento['categoria'][] = [
    'Feria de emprendedores',
    'Días festivos',
    'Capacitaciones',
    'Evento comunitario',
  ];

  form: EventoForm = this.crearFormularioVacio();

  constructor(private eventosService: EventosService) {
    addIcons({ createOutline, trashOutline, star });
  }

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventos = this.eventosService.listarEventos();
    this.mesesDisponibles = this.generarMesesDisponibles();
    this.mesSeleccionado = this.obtenerMesActual();
    this.filtrarEventosPorMes(this.mesSeleccionado);
  }

  onMesEventosChange(event: any) {
    this.filtrarEventosPorMes(event.detail.value);
  }

  seleccionarEvento(evento: Evento) {
    this.eventoEditando = evento;
    this.form = {
      titulo: evento.titulo,
      descripcionCorta: evento.descripcionCorta,
      descripcion: evento.descripcion,
      imagenPrincipal: evento.imagenPrincipal,
      galeria1: evento.galeria[0] || '',
      galeria2: evento.galeria[1] || '',
      galeria3: evento.galeria[2] || '',
      fechaInicio: this.formatearFecha(evento.fechaInicio),
      fechaFin: this.formatearFecha(evento.fechaFin),
      direccion: evento.ubicacion.direccion || '',
      lat: evento.ubicacion.lat,
      lng: evento.ubicacion.lng,
      ubicacionUrl: evento.ubicacionUrl || '',
      contactos: (evento.contactos || []).join(', '),
      auspiciantes: (evento.auspiciantes || []).join(', '),
      servicios: evento.servicios.join(', '),
      tipo: evento.tipo,
      categoria: evento.categoria,
      prioridad: evento.prioridad ?? 1,
    };
  }

  guardarEvento() {
    const nuevoEvento: Evento = {
      id: this.eventoEditando?.id || '',
      titulo: this.form.titulo,
      descripcionCorta: this.form.descripcionCorta,
      descripcion: this.form.descripcion,
      imagenPrincipal: this.form.imagenPrincipal,
      galeria: [this.form.galeria1, this.form.galeria2, this.form.galeria3].filter(Boolean),
      fechaInicio: new Date(this.form.fechaInicio),
      fechaFin: new Date(this.form.fechaFin),
      ubicacion: {
        lat: this.form.lat,
        lng: this.form.lng,
        direccion: this.form.direccion,
      },
      ubicacionUrl: this.form.ubicacionUrl,
      contacto: this.form.contactos.split(',')[0]?.trim(),
      contactos: this.convertirLista(this.form.contactos),
      auspiciantes: this.convertirLista(this.form.auspiciantes),
      servicios: this.convertirLista(this.form.servicios),
      tipo: this.form.tipo,
      categoria: this.form.categoria,
      prioridad: this.form.prioridad,
    };

    if (this.eventoEditando) {
      this.eventosService.actualizarEvento(nuevoEvento);
    } else {
      this.eventosService.crearEvento(nuevoEvento);
    }

    this.resetFormulario();
    this.cargarEventos();
  }

  eliminarEvento(evento: Evento) {
    this.eventosService.eliminarEvento(evento.id);
    if (this.eventoEditando?.id === evento.id) {
      this.resetFormulario();
    }
    this.cargarEventos();
  }

  cancelarEdicion() {
    this.resetFormulario();
  }

  obtenerEstrellas(prioridad?: number): number[] {
    const total = Math.min(3, Math.max(0, prioridad ?? 0));
    return Array.from({ length: total }, (_, index) => index);
  }

  private resetFormulario() {
    this.eventoEditando = undefined;
    this.form = this.crearFormularioVacio();
  }

  private crearFormularioVacio(): EventoForm {
    return {
      titulo: '',
      descripcionCorta: '',
      descripcion: '',
      imagenPrincipal: '',
      galeria1: '',
      galeria2: '',
      galeria3: '',
      fechaInicio: '',
      fechaFin: '',
      direccion: '',
      lat: -0.339,
      lng: -78.127,
      ubicacionUrl: '',
      contactos: '',
      auspiciantes: '',
      servicios: '',
      tipo: '',
      categoria: 'Feria de emprendedores',
      prioridad: 1,
    };
  }

  private convertirLista(valor: string): string[] {
    return valor
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private formatearFecha(valor: Date): string {
    const fecha = new Date(valor);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private filtrarEventosPorMes(mes: string) {
    this.mesSeleccionado = mes;
    const [year, month] = mes.split('-').map((value) => parseInt(value, 10));
    const inicioMes = new Date(year, month - 1, 1, 0, 0, 0, 0).getTime();
    const finMes = new Date(year, month, 0, 23, 59, 59, 999).getTime();

    this.eventosFiltrados = this.eventos
      .filter((evento) => {
        const inicio = new Date(evento.fechaInicio).getTime();
        const fin = new Date(evento.fechaFin).getTime();
        return fin >= inicioMes && inicio <= finMes;
      })
      .sort((a, b) => {
        const pa = a.prioridad ?? 0;
        const pb = b.prioridad ?? 0;
        if (pa !== pb) {
          return pb - pa;
        }
        return new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime();
      });
  }

  private generarMesesDisponibles(): { key: string; label: string }[] {
    const mesesMap: Record<string, { key: string; label: string }> = {};
    const nombres = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    this.eventos.forEach((evento) => {
      const inicio = new Date(evento.fechaInicio);
      const fin = new Date(evento.fechaFin);
      const cursor = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
      const limite = new Date(fin.getFullYear(), fin.getMonth(), 1);
      while (cursor.getTime() <= limite.getTime()) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`;
        mesesMap[key] = {
          key,
          label: `${nombres[cursor.getMonth()]} ${cursor.getFullYear()}`,
        };
        cursor.setMonth(cursor.getMonth() + 1);
      }
    });
    return Object.values(mesesMap).sort((a, b) => a.key.localeCompare(b.key));
  }

  private obtenerMesActual(): string {
    const ahora = new Date();
    return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;
  }
}
