SELECT "Paquete"."Paquete_ID", "Paquete"."Destino", "Paquete"."CantViajeros", "Paquete"."Precio", "Paquete"."ImageURL", "Viaje"."Tipo_Viaje", "Viaje"."Origen", "Viaje"."Destino", "Alojamiento"."Hotel", "Alojamiento"."Ubicacion", "AlquilerAuto"."Proveedor", "AlquilerAuto"."Tipo_Auto"
FROM "Paquete"
INNER JOIN "ProductosPaquete" ON "Paquete"."Paquete_ID" = "ProductosPaquete"."Paquete_ID"
INNER JOIN "Viaje" ON "ProductosPaquete"."Viaje_ID" = "Viaje"."Viaje_ID"
INNER JOIN "Alojamiento" ON "ProductosPaquete"."Alojamiento_ID" = "Alojamiento"."Alojamiento_ID"
LEFT OUTER JOIN "AlquilerAuto" ON "ProductosPaquete"."Alquiler_ID" = "AlquilerAuto"."Alquiler_ID"
WHERE "Paquete"."Paquete_ID" = $1;