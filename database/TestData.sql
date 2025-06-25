INSERT INTO public."Usuario" ("Nombres", "Apellidos", "Nombre_Usuario", "Contrasena", "Fecha_Nacimiento", "Pais", "Direccion", "Telefono", "Email", "IsAdmin") 
VALUES 
('Lucía', 'Gómez', 'lucia_g', '1234segura', '1995-03-12', 'Argentina', 'Calle Falsa 123', 3411234567, 'lucia.gomez@example.com', false),
('Juan', 'Pérez', 'juanpe', 'claveSegura2025', '1990-07-24', 'Argentina', 'Av. Libertador 456', 1145678901, 'juanperez@gmail.com', true),
('Sofia', 'Martínez', 'sofym', 'sofy2025!', '1998-11-05', 'Chile', 'Calle Andes 789', 56912345678, 'sofia.martinez@correo.cl', false);

INSERT INTO public."Alojamiento" ("Hotel", "IncluyeComida", "Fecha_Inicio", "Fecha_Final", "Ubicacion", "Precio", "ImageURL") VALUES
('Hotel del Sol', false, '2025-07-05', '2025-07-14', 'Bariloche, Argentina', 129307, NULL),
('Gran Palace', false, '2025-07-10', '2025-07-18', 'Mendoza, Argentina', 137856, NULL),
('Riviera Resort', false, '2025-07-15', '2025-07-25', 'Madrid, España', 225976, NULL),
('Patagonia Lodge', false, '2025-07-20', '2025-07-23', 'Tokio, Japón', 146336, NULL),
('Cumbres del Lago', true, '2025-07-25', '2025-08-01', 'Roma, Italia', 137935, NULL);

INSERT INTO public."AlquilerAuto" ("Proveedor", "Tipo_Auto", "Fecha_Inicio", "Fecha_Final", "Precio") VALUES
('Hertz', 'Sedán', '2025-07-10', '2025-07-15', 58184),
('Avis', 'SUV', '2025-07-13', '2025-07-19', 145568),
('Localiza', 'Compacto', '2025-07-16', '2025-07-25', 144478),
('Alamo', 'Pick-up', '2025-07-19', '2025-07-25', 82728),
('Europcar', 'Furgoneta', '2025-07-22', '2025-08-01', 149684);

INSERT INTO public."Viaje" ("Tipo_Viaje", "Origen", "Destino", "FechaIda", "FechaVuelta", "Precio") VALUES
('Colectivo', 'Buenos Aires, Argentina', 'Bariloche, Argentina', '2025-07-15', '2025-07-25', 266964),
('Colectivo', 'Rosario, Argentina', 'Mendoza, Argentina', '2025-07-20', '2025-07-28', 239274),
('Colectivo', 'Rosario, Argentina', 'Madrid, España', '2025-07-25', '2025-07-28', 191416),
('Colectivo', 'Buenos Aires, Argentina', 'Tokio, Japón', '2025-07-30', '2025-08-05', 205756),
('Avión', 'Rosario, Argentina', 'Roma, Italia', '2025-08-04', '2025-08-14', 260353);

INSERT INTO public."Paquete" ("Destino", "CantViajeros", "Precio", "ImageURL") VALUES
('Bariloche, Argentina', 2, 716758, NULL),
('Madrid, España', 1, 349622, NULL),
('Tokio, Japón', 1, 765992, NULL),
('Puerto Iguazú, Argentina', 2, 507096, NULL);

INSERT INTO public."ProductosPaquete" ("Paquete_ID", "Viaje_ID", "Alojamiento_ID", "Alquiler_ID") VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4);
