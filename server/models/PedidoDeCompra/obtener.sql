SELECT *
FROM "PedidoDeCompra"
INNER JOIN "PC_Item" ON "PC_Item"."PC_ID" = "PedidoDeCompra"."PC_ID"
INNER JOIN "Usuario" ON "Usuario"."Cliente_ID" = "PedidoDeCompra"."Cliente_ID"
INNER JOIN "Paquete" ON "Paquete"."Paquete_ID" = "PC_Item"."Paquete_ID"
INNER JOIN "Viaje" ON "Viaje"."Viaje_ID" = "PC_Item"."Viaje_ID"
INNER JOIN "Alojamiento" ON "Alojamiento"."Alojamiento_ID" = "PC_Item"."Alojamiento_ID"
INNER JOIN "AlquilerAuto" ON "AlquilerAuto"."Alquiler_ID" = "PC_Item"."Alquiler_ID"