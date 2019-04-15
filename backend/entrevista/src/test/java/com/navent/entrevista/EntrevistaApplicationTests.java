package com.navent.entrevista;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.navent.entrevista.controller.PedidosController;
import com.navent.entrevista.model.Pedido;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EntrevistaApplicationTests {
	
	private static final Logger log = LoggerFactory.getLogger(EntrevistaApplicationTests.class);
	@Autowired
	PedidosController pedidosController;
	
	
	@Test
	public void contextLoads() {
		SimpleDateFormat formato = new SimpleDateFormat("HH:mm:ss");
		log.info("Iniciando test"+formato.format(new Date()));
		Pedido p = new Pedido();
		for(int i = 0; i< 5000; i++) {
			p = new Pedido();
			p.setMonto(i);
			p.setDescuento(i);
			pedidosController.save(p);
		}
		log.info("Fin test"+formato.format(new Date()));
		
	}

}
