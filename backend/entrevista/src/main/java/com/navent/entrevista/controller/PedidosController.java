package com.navent.entrevista.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import com.navent.entrevista.model.Pedido;
import com.navent.entrevista.service.PedidoService;



@RestController
@SessionScope
@RequestMapping(value = "/api/pedidos")
public class PedidosController {
	@Autowired
	PedidoService pedidoService; 
	
	@GetMapping("/{id}")
	public Pedido getById(@PathVariable Long id) {
		return pedidoService.select(id);
	}
	
	@PostMapping("/")
	public Pedido save(@RequestBody Pedido pedido) {
		return pedidoService.insertOrUpdate(pedido);		
	}
	
	public Pedido update(@RequestBody Pedido pedido) {
		return pedidoService.insertOrUpdate(pedido);
	}
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id) {
		pedidoService.delete(id);
		return "OK";
	}
	
	
}
