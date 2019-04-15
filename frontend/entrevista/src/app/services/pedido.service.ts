import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pedido } from '../model/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private urlApi: string =`${environment.APIS}/pedidos`;
  constructor(private http: HttpClient) { }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.urlApi}/${id}`);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.urlApi}`, Pedido);
  }

  updatePedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.urlApi}/${pedido.idPedido}`, pedido);
  }

  deletePedido(id: number) {
    return this.http.delete<String>(`${this.urlApi}/${id}`);
  }
}
