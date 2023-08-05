import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosForm } from 'src/app/shared/formsModels/productosForms';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss'],
})
export class AdminProductosComponent {
  titulo = 'Crear Producto';
  isCreate = true;
  constructor(
    public productoForm: ProductosForm,
    private srvProductos: ProductosService,
    @Inject(MAT_DIALOG_DATA) public data: { producto: any }
  ) {}
  ngOnInit() {
    if (this.data?.producto) {
      this.isCreate = false;
      this.titulo = 'Modificar Producto';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Crear Producto';
    }
  }
  cargarDatosForm() {
    this.productoForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,
      stock: this.data.producto.stock,
      fechaIngreso: this.data.producto.fechaIngreso,
      estado: true,
    });
  }

  guardar() {
    if (this.productoForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvProductos.guardar(this.productoForm.baseForm.value).subscribe(
          (dato) => {
            this.productoForm.baseForm.reset();
            alert('SE GUARDO CORRECTAMENTE');
          },
          (error) => {
            alert('Error al guardar');
          }
        );
      } else {
        this.srvProductos.modificar(this.productoForm.baseForm.value).subscribe(
          (dato) => {
            this.productoForm.baseForm.reset();
            alert('SE MODIFICO CORRECTAMENTE');
          },
          (error) => {
            alert('Error al guardar');
          }
        );
      }
    }
  }
}
