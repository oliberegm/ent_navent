package com.navent.entrevista.service;

import com.navent.entrevista.model.Pedido;

public interface PedidoService {

	Pedido select(Long id);

	Pedido insertOrUpdate(Pedido pedido);

	void delete(Long id);

}
