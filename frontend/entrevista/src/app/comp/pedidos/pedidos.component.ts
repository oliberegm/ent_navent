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
  accion: PedidosEstado = PedidosEstado.INICIAR;
  tituloAccion1: string = "22";
  tituloAccion2: string = "22";
  constructor(private pedidoService: PedidoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pedidoForm = this.formBuilder.group({
      idPedido: [Validators.required],
      nombre:     [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.maxLength(100)])],
      monto:      [{value: '', disabled: true}, Validators.required],
      descuento:  [{value: '', disabled: true}, Validators.required]
      
    });
    this.evaluarEstado();
  }
  ngOnDestroy() {
    
  }

  onBuscar(){
    let id: number = this.pedidoForm.get('idPedido').value;
    this.pedidoService.getPedidoById(id)
      .subscribe( data => {
        this.pedido = data;
      }, error =>{
        
      }
    );
  }
  onCancelar(){
    this.pedidoForm.get('idPedido').setValue('');
    this.pedidoForm.get('nombre').disable();
    this.pedidoForm.get('monto').disable();
    this.pedidoForm.get('descuento').disable();
    this.pedidoForm.get('nombre').setValue('');
    this.pedidoForm.get('monto').setValue('');
    this.pedidoForm.get('descuento').setValue('');
  }

  onAccion1(){
    if(this.accion == PedidosEstado.INICIAR){
      this.nuevo();
    }
  }
  onAccion2(){
    if(this.accion == PedidosEstado.INICIAR){
      this.buscar();
    }
  }
  nuevo() {
    this.pedidoForm.get('idPedido').disable();
    this.pedidoForm.get('nombre').enable();
    this.pedidoForm.get('monto').enable();
    this.pedidoForm.get('descuento').enable();
    this.pedidoForm.get('nombre').setValue('');
    this.pedidoForm.get('monto').setValue('');
    this.pedidoForm.get('descuento').setValue('');
    this.cambirEstado1();
  }
  buscar(){

  }

  onSubmit(){
    console.info(this.pedidoForm.valid);
  }
  cambirEstado1(){
    if(this.accion == PedidosEstado.INICIAR){
      this.accion = PedidosEstado.AGREGAR;
      this.evaluarEstado();
    }else if(this.accion == PedidosEstado.AGREGAR){
      //this.accion = PedidosEstado.
    }
  }
  cambiarEstado2(){
    if(this.accion == PedidosEstado.INICIAR){
      this.accion = PedidosEstado.BUSCAR;
    }else if(this.accion == PedidosEstado.BUSCAR){
      //this.accion = PedidosEstado.
    }
  }
  evaluarEstado(){
    switch(this.accion){
      case PedidosEstado.INICIAR:
        this.tituloAccion1 = BOTON_NUEVO;
        this.tituloAccion2 = BOTON_BUSCAR;
      break;
      case PedidosEstado.AGREGAR:
        this.tituloAccion1 = BOTON_AGREGAR;
        this.tituloAccion2 = BOTON_CANCELAR;
      break;
      case PedidosEstado.BUSCAR:
        this.tituloAccion1 = BOTON_ELIMINAR;
        this.tituloAccion2 = BOTON_MODIFICAR;
      break;
    }
  }

}
