import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '@app/pages/admin/services/users.service';
import { Rol } from '@app/shared/models/rol.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
enum Action{
  EDIT = "edit",
  NEW = "new"
}

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss']
})
export class ModalFormularioComponent implements OnInit, OnDestroy {

  // Variables
  actionTODO = Action.NEW;
  showPasswordField = true;
  private destroy$ = new Subject<any>();


  userForm = this.fb.group({

    titulo : ['', [Validators.required]],
    critica : ['', [Validators.required]],
    anio : ['', [Validators.required]],
    cveAutor : [''],
  })

  constructor(public dialogRef: MatDialogRef<ModalFormularioComponent> ,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private UsersSvc: UsersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
 

    if(this.data?.user.hasOwnProperty("cveUsuario")){
      this.actionTODO = Action.EDIT;
      this.userForm.updateValueAndValidity();
      this.showPasswordField = false;
      this.data.title = "Editar usuario"
      this.editar();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete()
  }

 

  onSave(): void{
    if(this.userForm.invalid)
      return;
    
    const formValue = this.userForm.value;

    if(this.actionTODO == Action.NEW) {
      // Insert
      const { cveUsuario, ...rest } = formValue;
      this.UsersSvc.new(rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);  
      });
    } else {

    }
  }

  private editar(): void {
    this.userForm.patchValue({
      cvePelicula : this.data?.user.cvePelicula,
      titulo : this.data?.user.titulo,
      critica: this.data?.user.critica,
      anio : this.data?.user.anio,
      cveAutor : this.data?.user.cveAutor
    });
  }

  getErrorMessage(field: string): string{
    let message = "";

    const element = this.userForm.get(field);

    if(element?.errors){
      const messages: any = {
        required : "Este campo es requerido",
        minLength : "Los caracteres minimos son 4"
      };

      const errorKey = Object.keys(element?.errors).find(Boolean);
      message = String(messages[String(errorKey)]);
    }

    return message;
  }

}
