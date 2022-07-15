import { Component, OnInit, ViewChild, HostBinding} from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['accion', 'id', 'nombre', 'descripcion', 'referencia', 'precio', 'cantidad_stock'];
  displayedColumnsWishList: string[] = ['accion', 'id', 'nombre', 'descripcion', 'referencia', 'precioU', 'precioT', 'cantidad_stock'];
  dataSource = new MatTableDataSource<any>();
  dataSourceWish = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') componentCssClass: any;
  constructor(
    public service : AdminService, 
    public dialog: MatDialog, 
    public modal:NgbModal,
    public overlayContainer: OverlayContainer,
    ) { }

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
      );

      //this.getPost();

    });

  }

  addWishList(item){
    
    if(item.cantidad_stock-1 >= 0){
      item.cantidad_stock -=1
      if(this.dataSourceWish.data.includes(item)){
        for (let i = 0; i < this.dataSourceWish.data.length; i++) {
          if(this.dataSourceWish.data[i].id == item.id){
            this.dataSourceWish.data[i].sell_stock += 1;
            this.dataSourceWish.data[i].total = this.dataSourceWish.data[i].precio * this.dataSourceWish.data[i].sell_stock;
          }
        }
      }else {
        item.sell_stock = 1; 
        item.total = item.precio * item.sell_stock;
        this.dataSourceWish.data.push(item);
      }

      this.service.updatePost(item.id, item).subscribe((resp) => {
        Swal.fire(
          'Agregado a la lista de deseo!',
          'Usted ha agregado un post con exito!',
          'success'
        )
      });

    } else {
      Swal.fire(
        'No tenemos el suficiente stock!',
        'Se agregara la solicitud para tenerlo pronto',
        'error'
      )
    }
  }

  deleteWishList(element){
    if(element.sell_stock-1 > 0){
      element.sell_stock -= 1;
      element.cantidad_stock += 1;

      Swal.fire(
        'Eliminado!',
        'Has devuelto el stock a la tienda!',
        'success'
      );

    }else {
      element.sell_stock -= 1;
      element.cantidad_stock += 1;
      this.dataSourceWish.data.splice(this.dataSourceWish.data.indexOf(element), 1);
      Swal.fire(
        'Eliminado!',
        'Has devuelto el stock a la tienda y eliminado de tu lista de deseos!',
        'success'
      );
    }
  }

  public onSetTheme(e: string) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }

}
