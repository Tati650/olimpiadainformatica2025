	-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."Alojamiento"
(
    "Alojamiento_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Hotel" character varying COLLATE pg_catalog."default" NOT NULL,
    "IncluyeComida" boolean NOT NULL DEFAULT false,
    "Fecha_Inicio" date NOT NULL,
    "Fecha_Final" date NOT NULL,
    "Ubicacion" character varying COLLATE pg_catalog."default" NOT NULL,
    "Precio" money NOT NULL,
    "ImageURL" character varying COLLATE pg_catalog."default",
    CONSTRAINT "Alojamiento_pkey" PRIMARY KEY ("Alojamiento_ID")
);

CREATE TABLE IF NOT EXISTS public."AlquilerAuto"
(
    "Alquiler_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Proveedor" character varying COLLATE pg_catalog."default" NOT NULL,
    "Tipo_Auto" character varying COLLATE pg_catalog."default" NOT NULL,
    "Fecha_Inicio" date NOT NULL,
    "Fecha_Final" date NOT NULL,
    "Precio" money,
    CONSTRAINT "AlquilerAuto_pkey" PRIMARY KEY ("Alquiler_ID")
);

CREATE TABLE IF NOT EXISTS public."Carrito"
(
    "Cliente_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Vencimiento" date NOT NULL,
    "Carrito_ID" bigint NOT NULL,
    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("Carrito_ID")
);

CREATE TABLE IF NOT EXISTS public."Carrito_Item"
(
    "Carrito_ID" bigint NOT NULL,
    "Paquete_ID" bigint,
    "Viaje_ID" bigint,
    "Alojamiento_ID" bigint,
    "Alquiler_ID" bigint
);

CREATE TABLE IF NOT EXISTS public."Historial"
(
    "Historial_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Cliente_ID" bigint NOT NULL,
    CONSTRAINT "Historial_pkey" PRIMARY KEY ("Historial_ID")
);

CREATE TABLE IF NOT EXISTS public."Historial_Item"
(
    "Reserva_ID" bigint NOT NULL,
    "Pago_ID" bigint NOT NULL,
    "Historial_ID" bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS public."PC_Item"
(
    "PC_ID" bigint NOT NULL,
    "Paquete_ID" bigint,
    "Viaje_ID" bigint,
    "Alojamiento_ID" bigint,
    "Alquiler_ID" bigint
);

CREATE TABLE IF NOT EXISTS public."Pago"
(
    "Pago_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "PC_ID" bigint NOT NULL,
    "Pago_Metodo" character varying COLLATE pg_catalog."default" NOT NULL,
    "Total" money NOT NULL,
    "Restante_Pago" money NOT NULL,
    "Estado" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Pago_pkey" PRIMARY KEY ("Pago_ID")
);

CREATE TABLE IF NOT EXISTS public."Paquete"
(
    "Paquete_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Destino" character varying COLLATE pg_catalog."default" NOT NULL,
    "CantViajeros" bigint NOT NULL,
    "Precio" money NOT NULL,
    "ImageURL" character varying COLLATE pg_catalog."default",
    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("Paquete_ID")
);

CREATE TABLE IF NOT EXISTS public."PedidoDeCompra"
(
    "Vencimiento" date NOT NULL ,
    "PC_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "UserName" character varying COLLATE pg_catalog."default" NOT NULL,
    "PrecioTotal" money NOT NULL,
    "DireccionDeEnvio" character varying COLLATE pg_catalog."default" NOT NULL,
    "Notas" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PedidoDeCompra_pkey" PRIMARY KEY ("PC_ID")
);

CREATE TABLE IF NOT EXISTS public."ProductosPaquete"
(
    "Paquete_ID" bigint NOT NULL,
    "Viaje_ID" bigint NOT NULL,
    "Alojamiento_ID" bigint NOT NULL,
    "Alquiler_ID" bigint
);

CREATE TABLE IF NOT EXISTS public."Recibo"
(
    "Recibo_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Fecha" date NOT NULL,
    "Reserva_ID" bigint NOT NULL,
    "Pago_ID" bigint,
    CONSTRAINT "Recibo_pkey" PRIMARY KEY ("Recibo_ID")
);

CREATE TABLE IF NOT EXISTS public."Reserva"
(
    "Reserva_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Cliente_ID" bigint,
    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("Reserva_ID")
);

CREATE TABLE IF NOT EXISTS public."Reserva_Item"
(
    "Reserva_ID" bigint NOT NULL,
    "Paquete_ID" bigint NOT NULL,
    "Viaje_ID" bigint NOT NULL,
    "Alojamiento_ID" bigint NOT NULL,
    "Alquiler_ID" bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS public."Usuario"
(
    "Cliente_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Nombres" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "Apellidos" character varying(100) COLLATE pg_catalog."default",
    "Nombre_Usuario" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "Contrasena" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Fecha_Nacimiento" date,
    "Pais" character varying(50) COLLATE pg_catalog."default",
    "Direccion" character varying(30) COLLATE pg_catalog."default",
    "Telefono" bigint,
    "Email" character varying(100) COLLATE pg_catalog."default",
    "IsAdmin" boolean DEFAULT false,
    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("Cliente_ID"),
    CONSTRAINT "Nombre_Usuario" UNIQUE ("Nombre_Usuario")
);

CREATE TABLE IF NOT EXISTS public."Viaje"
(
    "Viaje_ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "Tipo_Viaje" character varying COLLATE pg_catalog."default" NOT NULL,
    "Origen" character varying COLLATE pg_catalog."default" NOT NULL,
    "Destino" character varying COLLATE pg_catalog."default" NOT NULL,
    "FechaIda" date NOT NULL,
    "FechaVuelta" date NOT NULL,
    "Precio" money NOT NULL,
    CONSTRAINT "VIaje_pkey" PRIMARY KEY ("Viaje_ID")
);

ALTER TABLE IF EXISTS public."Carrito"
    ADD CONSTRAINT "FK_Cliente" FOREIGN KEY ("Cliente_ID")
    REFERENCES public."Usuario" ("Cliente_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Carrito_Item"
    ADD CONSTRAINT "FK_Alojamiento" FOREIGN KEY ("Alojamiento_ID")
    REFERENCES public."Alojamiento" ("Alojamiento_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Carrito_Item"
    ADD CONSTRAINT "FK_Alquiler" FOREIGN KEY ("Alquiler_ID")
    REFERENCES public."AlquilerAuto" ("Alquiler_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Carrito_Item"
    ADD CONSTRAINT "FK_Carrito" FOREIGN KEY ("Carrito_ID")
    REFERENCES public."Carrito" ("Carrito_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Carrito_Item"
    ADD CONSTRAINT "FK_Paquete" FOREIGN KEY ("Paquete_ID")
    REFERENCES public."Paquete" ("Paquete_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Carrito_Item"
    ADD CONSTRAINT "FK_Viaje" FOREIGN KEY ("Viaje_ID")
    REFERENCES public."Viaje" ("Viaje_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Historial"
    ADD CONSTRAINT "FK_Cliente" FOREIGN KEY ("Cliente_ID")
    REFERENCES public."Usuario" ("Cliente_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Historial_Item"
    ADD CONSTRAINT "FK_Historial" FOREIGN KEY ("Historial_ID")
    REFERENCES public."Historial" ("Historial_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Historial_Item"
    ADD CONSTRAINT "FK_Pago" FOREIGN KEY ("Pago_ID")
    REFERENCES public."Pago" ("Pago_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Historial_Item"
    ADD CONSTRAINT "FK_Reserva" FOREIGN KEY ("Reserva_ID")
    REFERENCES public."Reserva" ("Reserva_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PC_Item"
    ADD CONSTRAINT "FK_Alojamiento" FOREIGN KEY ("Alojamiento_ID")
    REFERENCES public."Alojamiento" ("Alojamiento_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PC_Item"
    ADD CONSTRAINT "FK_Alquiler" FOREIGN KEY ("Alquiler_ID")
    REFERENCES public."AlquilerAuto" ("Alquiler_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PC_Item"
    ADD CONSTRAINT "FK_PC" FOREIGN KEY ("PC_ID")
    REFERENCES public."PedidoDeCompra" ("PC_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PC_Item"
    ADD CONSTRAINT "FK_Paquete" FOREIGN KEY ("Paquete_ID")
    REFERENCES public."Paquete" ("Paquete_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PC_Item"
    ADD CONSTRAINT "FK_Viaje" FOREIGN KEY ("Viaje_ID")
    REFERENCES public."Viaje" ("Viaje_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Pago"
    ADD CONSTRAINT "FK_PedidoDeCompra" FOREIGN KEY ("PC_ID")
    REFERENCES public."PedidoDeCompra" ("PC_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."PedidoDeCompra"
    ADD CONSTRAINT "user" FOREIGN KEY ("UserName")
    REFERENCES public."Usuario" ("Nombre_Usuario") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."ProductosPaquete"
    ADD CONSTRAINT "FK_Alojamiento" FOREIGN KEY ("Alojamiento_ID")
    REFERENCES public."Alojamiento" ("Alojamiento_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."ProductosPaquete"
    ADD CONSTRAINT "FK_Alquiler" FOREIGN KEY ("Alquiler_ID")
    REFERENCES public."AlquilerAuto" ("Alquiler_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."ProductosPaquete"
    ADD CONSTRAINT "FK_Paquete" FOREIGN KEY ("Paquete_ID")
    REFERENCES public."Paquete" ("Paquete_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."ProductosPaquete"
    ADD CONSTRAINT "FK_Viaje" FOREIGN KEY ("Viaje_ID")
    REFERENCES public."Viaje" ("Viaje_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public."Recibo"
    ADD CONSTRAINT "FK_Reserva" FOREIGN KEY ("Reserva_ID")
    REFERENCES public."Reserva" ("Reserva_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva"
    ADD CONSTRAINT "FK_Cliente" FOREIGN KEY ("Cliente_ID")
    REFERENCES public."Usuario" ("Cliente_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva_Item"
    ADD CONSTRAINT "FK_Alojamiento" FOREIGN KEY ("Alojamiento_ID")
    REFERENCES public."Alojamiento" ("Alojamiento_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva_Item"
    ADD CONSTRAINT "FK_Alquiler" FOREIGN KEY ("Alquiler_ID")
    REFERENCES public."AlquilerAuto" ("Alquiler_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva_Item"
    ADD CONSTRAINT "FK_Paquete" FOREIGN KEY ("Paquete_ID")
    REFERENCES public."Paquete" ("Paquete_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva_Item"
    ADD CONSTRAINT "FK_Reserva" FOREIGN KEY ("Reserva_ID")
    REFERENCES public."Reserva" ("Reserva_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Reserva_Item"
    ADD CONSTRAINT "FK_Viaje" FOREIGN KEY ("Viaje_ID")
    REFERENCES public."Viaje" ("Viaje_ID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;