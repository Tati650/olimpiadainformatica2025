SELECT *
FROM "Reserva"
INNER JOIN "Reserva_Item" ON "Reserva_Item"."Reserva_ID" = "Reserva"."Reserva_ID"
INNER JOIN "Paquete" ON "Paquete"."Paquete_ID" = "Reserva_Item"."Reserva_ID" 
INNER JOIN "Viaje" ON "Viaje"."Viaje_ID" = "Reserva_Item"."Viaje_ID"
INNER JOIN "Alojamiento" ON "Alojamiento"."Alojamiento_ID" = "Reserva_Item"."Alojamiento_ID"
INNER JOIN "AlquilerAuto" ON "AlquilerAuto"."Alquiler_ID" = "Reserva_Item"."Alquiler_ID"