import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeliculaResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PeliculaService } from '../services/users.service';
import { ModalFormularioComponent } from './components/modal-formulario/modal-formulario.component';

@Component({
  selector: 'app-users',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  displayedColumns: string[] = [
    'titulo',
    'anio',
    'critica',
    'cveAutor',
    'editar',
    'eliminar'
  ];
  lstPeliculas: PeliculaResponse[] = [];

  constructor(private userSvc: PeliculaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userSvc.lista()
    .pipe(takeUntil(this.destroy$))
    .subscribe(peliculas => this.lstPeliculas = peliculas);
  }

  onOpenModal(peliculas = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: {title: 'Nuevo usuario', peliculas}
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
