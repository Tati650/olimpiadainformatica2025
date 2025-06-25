SELECT *
FROM "Carrito"
INNER JOIN "Carrito_Item" ON  "Carrito_Item"."Carrito_ID" = "Carrito"."Carrito_ID"
INNER JOIN "Paquete" ON "Carrito_Item"."Paquete_ID" = "Paquete"."Paquete_ID"
INNER JOIN "Viaje" ON "Carrito_Item"."Viaje_ID" = "Viaje"."Viaje_ID"
INNER JOIN "Alojamiento" ON "Carrito_Item"."Alojamiento_ID" = "Alojamiento"."Alojamiento_ID"
INNER JOIN "AlquilerAuto" ON "Carrito_Item"."Alquiler_ID" = "AlquilerAuto"."Alquiler_ID"