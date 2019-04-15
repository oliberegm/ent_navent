package com.navent.entrevista.repository;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.navent.entrevista.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	
	@Override
	@Cacheable("pedidoById")	
	public Optional<Pedido> findById(Long id);	
	
	@Override
	@CacheEvict(value= "pedidoById")
	@Transactional()
	public <S extends Pedido> S save(S entity);
	
	@Override
	@CacheEvict(value= "pedidoById")
	public void delete(Pedido entity);
	
}
