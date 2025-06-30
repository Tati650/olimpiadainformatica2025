const { db } = require('../config/db');
const sql = require('../config/sql');
const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { Aprovado } = req.params;
    if (!Aprovado || !['true','false'].includes(Aprovado)) {
      return res.status(400).json({ 
        error: "Estado no válido. Debe ser: true o false" 
      });
    }
    
    // Verificar si el pedido existe
    const pedidoExiste = await db.oneOrNone(
      `SELECT "PC_ID" FROM "PedidoDeCompra" WHERE "PC_ID" = $1`,
      [id]
    );
    
    if (!pedidoExiste) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    
    // Actualizar estado del pedido
    const pedidoActualizado = await db.one(
      `UPDATE "PedidoDeCompra" 
       SET "Aprovado" = $1 
       WHERE "PC_ID" = $2 
       RETURNING *`,
      [Aprovado, id]
    );
    res.json({
      success: true,
      pedido: pedidoActualizado,
      message: `Estado del pedido actualizado a ${Aprovado}`
    });
    
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).json({ 
      error: "Error al actualizar estado del pedido",
      details: error.message 
    });
  }
};
const obtenerPedidos = async (req, res) => {
  try {
    const { estado, usuario } = req.query;
    
    // 1. Consulta principal para obtener los pedidos
    let pedidosQuery = `
      SELECT 
        pc."PC_ID" as id,
        pc."Vencimiento" as vencimiento,
        pc."UserName" as usuario,
        pc."PrecioTotal" as total,
        pc."DireccionDeEnvio" as direccion,
        pc."Notas" as notas,
        pc."Aprovado" as aprobado
      FROM "PedidoDeCompra" pc
    `;
    
    const params = [];
    
    if (usuario) {
      pedidosQuery += ` AND pc."UserName" = $${params.length + 1}`;
      params.push(usuario);
    }
    
    pedidosQuery += ' ORDER BY pc."PC_ID" DESC';
    
    // 2. Obtener los pedidos base
    const pedidos = await db.any(pedidosQuery, params);
    
    if (pedidos.length === 0) {
      return res.json([]);
    }
    
    // 3. Obtener los items para cada pedido
    const itemsQuery = `
      SELECT 
        pi."PC_ID" as pedido_id,
        p."Paquete_ID" as id,
        p."Destino" as destino,
        p."Precio" as precio,
        p."ImageURL" as imagen,
        COUNT(*) as cantidad
      FROM "PC_Item" pi
      JOIN "Paquete" p ON p."Paquete_ID" = pi."Paquete_ID"
      WHERE pi."PC_ID" IN (${pedidos.map(p => p.id).join(',')})
      GROUP BY pi."PC_ID", p."Paquete_ID", p."Destino", p."Precio", p."ImageURL"
    `;
    
    const itemsPorPedido = await db.any(itemsQuery);
    
    // 4. Combinar los resultados
    const respuesta = pedidos.map(pedido => {
      const items = itemsPorPedido
        .filter(item => item.pedido_id === pedido.id)
        .map(item => ({
          id: item.id,
          destino: item.destino,
          precio: item.precio, // Mantenemos el formato original de la DB
          imagen: item.imagen,
          cantidad: item.cantidad
        }));
      
      return {
        ...pedido,
        items,
        // Convertir el total a número si es necesario (sin cambiar la DB)
        totalNumerico: parseFloat(pedido.total.replace(/[^\d,]/g, '').replace(',', '.'))
      };
    });
    
    res.json(respuesta);
    
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ 
      error: 'Error al obtener pedidos',
      details: error.message 
    });
  }
};

const crear = async (req, res) => {
  try {
    const { usuario, items, direccion, metodoPago, notas, total } = req.body;
    console.log('Datos recibidos:', req.body);

    // Validar datos
    if (!usuario || !items || !total || !direccion || !metodoPago) {
      return res.status(400).json({ 
        error: "Faltan datos requeridos: usuario, items, total, dirección o método de pago" 
      });
    }

    // Calcular fecha de vencimiento (7 días a partir de hoy)
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 7);

    // Verificar si el usuario existe
    const usuarioExiste = await db.oneOrNone(
      `SELECT "Nombre_Usuario" FROM "Usuario" WHERE "Nombre_Usuario" = $1`,
      [usuario]
    );

    if (!usuarioExiste) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crear el pedido de compra en la tabla PedidoDeCompra
    // Usamos DEFAULT para que la base de datos asigne automáticamente el PC_ID
    const pedido = await db.one(
      `INSERT INTO "PedidoDeCompra" ("Vencimiento", "UserName", "PrecioTotal", "DireccionDeEnvio", "Notas") 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING "PC_ID"`,
      [vencimiento, usuario, total, direccion, notas]
    );

    // Insertar los items del pedido en PC_Item
    for (const item of items) {
      await db.none(
        `INSERT INTO "PC_Item" ("PC_ID", "Paquete_ID") 
         VALUES ($1, $2)`,
        [pedido.PC_ID, item.id]
      );
    }

    // Crear el pago asociado al pedido
    const pago = await db.one(
      `INSERT INTO "Pago" ("PC_ID", "Pago_Metodo", "Total", "Restante_Pago", "Estado") 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING "Pago_ID"`,
      [pedido.PC_ID, metodoPago, total, 0, 'Completado']
    );

    res.status(201).json({ 
      success: true, 
      pedidoId: pedido.PC_ID,
      pagoId: pago.Pago_ID,
      message: "Pedido creado exitosamente" 
    });

  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ 
      error: "Error al procesar el pedido",
      details: error.message 
    });
  }
};
module.exports = {
  obtenerPedidos,
  crear,
  actualizarEstado  
};