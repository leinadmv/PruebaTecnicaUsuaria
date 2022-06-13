import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/servicios/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  postForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service : AdminService ) { }

  ngOnInit(): void {

   this.formControl();

   this.setEdit();

  }

  get error(): any { return this.postForm.controls; }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Metodo que se realizar las validaciones del formulario reactivo
   */
  formControl() {

    this.postForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.maxLength(35), Validators.minLength(3)]),
      body: new FormControl('', [Validators.required, Validators.maxLength(300), Validators.minLength(3)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]),
    });

  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Metodo que se encarga de setear en el formulario los datos del post a editar
   */
  setEdit(){

    if(this.data.type === 'editar' ){

      this.postForm.controls.userId.setValue(this.data.data.userId);
      this.postForm.controls.body.setValue(this.data.data.body);
      this.postForm.controls.title.setValue(this.data.data.title);

    }

  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Metodo que se encarga de enviar la informacion del post a editar o a crear a sus respectivos servicios
   * @param postForm: formulario reactivo
   */
  savePost(postForm){

    if(this.data.type === "editar") {

      const post = {
        id:this.data.data.id,
        title: postForm.value.title,
        body: postForm.value.body,
        userId: postForm.value.userId,
      }

      this.service.updatePost(this.data.data.id, post).subscribe((resp) => {
        Swal.fire(
          'Editado!',
          'Usted ha editado un post con exito!',
          'success'
        )


      });

    } else if (this.data.type === "crear") {

      const post = {
        title: postForm.value.title,
        body: postForm.value.body,
        userId: postForm.value.userId,
      }

      this.service.savePost(post).subscribe((resp) => {
        Swal.fire(
          'Creado!',
          'Usted ha creado un post con exito!',
          'success'
        )

      });

    }

  }

}
