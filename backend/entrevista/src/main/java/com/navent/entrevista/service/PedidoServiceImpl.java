package com.navent.entrevista.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.navent.entrevista.model.Pedido;
import com.navent.entrevista.repository.PedidoRepository;

@Service
public class PedidoServiceImpl implements PedidoService{
	
	@Autowired
	PedidoRepository pedidoRepository;

	@Override
	public Pedido select(Long id) {
		return pedidoRepository.findById(id).get();
	}
	
	@Override
	public Pedido insertOrUpdate(Pedido pedido) {
		return pedidoRepository.save(pedido);		
	}	
	
	@Override
	public void delete(Long id) {
		pedidoRepository.findById(id).map(data->{
			pedidoRepository.delete(data);
			return true;
		}).orElseGet(()->{
			return false;
		});
	}

}
