SELECT *
FROM "Recibo"
INNER JOIN "Pago" ON "Pago"."Pago_ID" = "Recibo"."Pago_ID"
INNER JOIN "PedidoDeCompra" ON "PedidoDeCompra"."PC_ID" = "Pago"."PC_ID"
INNER JOIN "Reserva" ON "Reserva"."Reserva_ID" = "Recibo"."Reserva_ID"