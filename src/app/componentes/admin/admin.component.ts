import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['accion', 'id', 'nombre', 'descripcion', 'referencia', 'precio', 'cantidad_stock'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public service : AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getProductos();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getProductos(){

    this.dataSource.data = this.service.getProducts();

  }

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Metodo que se encarga de abrir el modal de creacion o edicion de post
   */
  /* form(row?:any){

    if(row){

      const dialogRef = this.dialog.open(FormComponent,{
        width: '60%',
        data: {
          type: 'editar',
          title: 'Editar post',
          data: row
        },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(result => {
        //this.getPost();
      });

    }else{

      const dialogRef = this.dialog.open(FormComponent,{
        width: '60%',
        data: {
          type: 'crear',
          title: 'Crear post'
        },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(result => {
        //this.getPost();
      });

    }

  } */

  /**
   * @author Daniel Martinez
   * @fecha 12/05/2022
   * Metodo que se encarga de eliminar un post
   * @param id: id del post a eliminar
   */
  delete(id){

    this.service.deletePost(id).subscribe((resp) => {
      Swal.fire(
        'Eliminado!',
        'Usted ha eliminado un post con exito!',
        'success'
      )

      //this.getPost();

    });

  }

}
