SELECT *
FROM "Historial"
INNER JOIN "Historial_Item" ON "Historial_Item"."Historial_ID" = "Historial"."Historial_ID"
INNER JOIN "Reserva" ON "Reserva"."Reserva_ID" = "Historial_Item"."Reserva_ID"
INNER JOIN "Pago" ON "Pago"."Pago_ID" = "Historial_Item"."Pago_ID"