import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/model/pedido.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BOTON_NUEVO, BOTON_BUSCAR, BOTON_CANCELAR, BOTON_AGREGAR, BOTON_ELIMINAR, BOTON_MODIFICAR } from './textos';
import { PedidosEstado } from './pedidos.enums';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {
  pedido: Pedido;
  pedidoForm: FormGroup;
  accion: PedidosEstado = PedidosEstado.BUSCAR;  
  mensajeError: string = "";
  mensajeExito: string = "";
  error: boolean = false;
  exito: boolean = false;
  constructor(private pedidoService: PedidoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pedidoForm = this.formBuilder.group({
      idPedido: [Validators.required],
      nombre:     [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.maxLength(100)])],
      monto:      [{value: '', disabled: true}, Validators.required],
      descuento:  [{value: '', disabled: true}, Validators.required]
      
    });
  }
  ngOnDestroy() {
    
  }
  private habilitar(){
    this.pedidoForm.get('idPedido').disable();
    this.pedidoForm.get('nombre').enable();
    this.pedidoForm.get('monto').enable();
    this.pedidoForm.get('descuento').enable();
  }
  private deshabilitar(){
    this.pedidoForm.get('idPedido').enable();
    this.pedidoForm.get('nombre').disable();
    this.pedidoForm.get('monto').disable();
    this.pedidoForm.get('descuento').disable();
  }
  private limpiar(){
    this.pedidoForm.get('idPedido').setValue('');
    this.pedidoForm.get('nombre').setValue('');
    this.pedidoForm.get('monto').setValue('');
    this.pedidoForm.get('descuento').setValue('');
  }

  onBuscar(){
    console.log('buscando');
    let id: number = this.pedidoForm.get('idPedido').value;

    this.pedidoService.getPedidoById(id)
      .subscribe( data => {
        this.pedido = data;
        this.habilitar();
      }, error =>{
        this.mensajeError = 'id no encontrado';
        this.error = true;
        this.habilitar();
        this.accion = PedidosEstado.AGREGAR;
      }
    );
  }
  onCancelar(){
    this.deshabilitar();
    this.limpiar();
    this.error = false;
    this.exito = false;
  }
  onAgregar(){
    if(!this.pedidoForm.valid){
      this.mensajeError = this.errorMensajeCampos();
      this.error = true;      
    }else{
      this.error = false;
      this.pedidoService.createPedido(this.pedidoForm.value)
      .subscribe(data=>{
        this.mensajeExito = "Se registro exitosamente!!!";
        this.exito = true;
        this.accion = PedidosEstado.EDITAR;        
      },
      error =>{
        this.mensajeError = "Error al momento de agregar pedido";
        this.error = true;
      });
    }
  }
  onEliminar(){
    if(!this.pedidoForm.valid){
      this.mensajeError = this.errorMensajeCampos();
      this.error = true;      
    }else{
      this.error = false;
      this.pedidoService.deletePedido(this.pedidoForm.value)
      .subscribe(data=>{
        this.mensajeExito = "Se elimino exitosamente!!!";
        this.exito = true;
        this.accion = PedidosEstado.EDITAR;        
      },
      error =>{
        this.mensajeError = "Error al momento de eliminar pedido";
        this.error = true;
      });
    }
  }
  onActualizar(){
    if(!this.pedidoForm.valid){
      this.mensajeError = this.errorMensajeCampos();
      this.error = true;      
    }else{
      this.error = false;
      this.pedidoService.updatePedido(this.pedidoForm.value)
      .subscribe(data=>{
        this.mensajeExito = "Se actualizo exitosamente!!!";
        this.exito = true;
        this.accion = PedidosEstado.EDITAR;        
      },
      error =>{
        this.mensajeError = "Error al momento de actualizar pedido";
        this.error = true;
      });
    }
  }

  errorMensajeCampos(): string{
    let estado: string = "";
    if(this.pedidoForm.get('nombre').hasError('required')){
      estado += "Campo nombre requediro";
    }
    if(this.pedidoForm.get('nombre').hasError('maxlength')){
      estado += "Campo nombre excede el tamaño";
    }
    if(this.pedidoForm.get('monto').hasError('required')){
      estado += "Campo monto requediro";
    }
    if(this.pedidoForm.get('descuento').hasError('required')){
      estado += "Campo descuento requediro";
    }
    return estado;
  }

  onSubmit(){
    console.info(this.pedidoForm.valid);
  }
  
}
