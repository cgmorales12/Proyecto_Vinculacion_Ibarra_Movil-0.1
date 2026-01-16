import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  checkmarkCircle,
  locationOutline,
  star,
} from 'ionicons/icons';
import { EventosService } from '../eventos.service';
import { Evento } from '../evento.model';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class DetallePage implements OnInit {
  evento?: Evento;
  meGusta = false;
  asistire = false;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService
  ) {
    addIcons({ heart, heartOutline, checkmarkCircle, locationOutline, star });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.evento = this.eventosService.obtenerEvento(id);
    }
  }

  toggleMeGusta() {
    this.meGusta = !this.meGusta;
  }

  toggleAsistire() {
    this.asistire = !this.asistire;
  }

  abrirUbicacion() {
    if (!this.evento) return;
    const url =
      this.evento.ubicacionUrl ||
      `https://www.google.com/maps/search/?api=1&query=${this.evento.ubicacion.lat},${this.evento.ubicacion.lng}`;
    window.open(url, '_blank');
  }

  obtenerEstrellas(prioridad?: number): number[] {
    const total = Math.min(3, Math.max(0, prioridad ?? 0));
    return Array.from({ length: total }, (_, index) => index);
  }
}
