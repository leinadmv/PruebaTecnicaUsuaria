import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LoginService } from 'src/app/servicios/login.service';

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
  public darkMode: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class')
  get themeMode() {
    return this.darkMode ? 'dark-theme' : 'light-theme';
  }


  constructor(
    public service: AdminService,
    public dialog: MatDialog,
    public modal: NgbModal,
    public overlayContainer: OverlayContainer,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('theme') === 'dark-theme' ? true : false;
    this.getProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de controlar el modo dark del aplicativo
   * @param modeDark variable que se encarga del cambio de tema en el local storage
   */
  changeTheme(modeDark): void {
    localStorage.setItem('theme', modeDark ? 'light-theme' : 'dark-theme');
  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de traer la lista de productos
   */
  getProductos() {
    this.dataSource.data = this.service.getProducts();
  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de agregar un producto a la lista de deseos del aplicativo
   * @param item producto a agregar
   */
  addWishList(item) {

    if (item.cantidad_stock - 1 >= 0) {
      item.cantidad_stock -= 1
      if (this.dataSourceWish.data.includes(item)) {
        for (let i = 0; i < this.dataSourceWish.data.length; i++) {
          if (this.dataSourceWish.data[i].id == item.id) {
            this.dataSourceWish.data[i].sell_stock += 1;
            this.dataSourceWish.data[i].total = this.dataSourceWish.data[i].precio * this.dataSourceWish.data[i].sell_stock;
          }
        }
      } else {
        item.sell_stock = 1;
        item.total = item.precio * item.sell_stock;
        this.dataSourceWish.data.push(item);
      }


        Swal.fire(
          'Agregado a la lista de deseo!',
          'Usted ha agregado un producto con exito!',
          'success'
        )


    } else {
      Swal.fire(
        'No tenemos el suficiente stock!',
        'Se agregara la solicitud para tenerlo pronto',
        'error'
      )
    }
  }

  /**
   * @autor Jhonathan lopez
   * Metodo que elimina un producto de la lista de deseos
   * @param element producto a eliminar
   */
  deleteWishList(element) {
    if (element.sell_stock - 1 > 0) {
      element.sell_stock -= 1;
      element.cantidad_stock += 1;

      Swal.fire(
        'Eliminado!',
        'Has devuelto el stock a la tienda!',
        'success'
      );

    } else {
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

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de cerrar sesion
   */
  cerrarSesion() {
    this.loginService.logOut();
  }


}
