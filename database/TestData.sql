INSERT INTO public."Alojamiento" (
    "Alojamiento_ID", "Hotel", "IncluyeComida", "Fecha_Inicio", "Fecha_Final", "Ubicacion", "Precio"
) VALUES
(1, 'Hotel del Lago', true, '2025-07-01', '2025-07-07', 'Carlos Paz, Córdoba', 75000.00),
(2, 'Hostería La Cumbre', false, '2025-07-10', '2025-07-15', 'La Cumbre, Córdoba', 42000.00),
(3, 'Hotel Boutique Sur', true, '2025-08-01', '2025-08-05', 'San Martín de los Andes, Neuquén', 98000.00),
(4, 'Cabañas El Refugio', false, '2025-09-15', '2025-09-20', 'Villa General Belgrano, Córdoba', 56000.00),
(5, 'Hotel Patagonia Norte', true, '2025-10-01', '2025-10-10', 'Bariloche, Río Negro', 125000.00)
(6, 'Hotel Royal Palace', true, '2025-12-01', '2025-12-07', 'Madrid, España', 195000.00),
(7, 'Tokyo Garden Hotel', false, '2025-11-10', '2025-11-18', 'Tokio, Japón', 220000.00),
(8, 'The Grand New York', true, '2025-09-01', '2025-09-10', 'Nueva York, EE.UU.', 310000.00),
(9, 'Hotel Riviera Azul', false, '2025-08-20', '2025-08-25', 'Cancún, México', 165000.00),
(10, 'Roma Bella Hotel', true, '2025-10-15', '2025-10-22', 'Roma, Italia', 205000.00),
(11, 'Paris Central Inn', false, '2025-12-10', '2025-12-17', 'París, Francia', 230000.00),
(12, 'Hotel das Palmeiras', true, '2025-07-05', '2025-07-12', 'Río de Janeiro, Brasil', 145000.00),
(13, 'Munich City Hotel', false, '2025-11-01', '2025-11-06', 'Múnich, Alemania', 188000.00),
(14, 'Cape Town Seaview', true, '2025-10-05', '2025-10-12', 'Ciudad del Cabo, Sudáfrica', 160000.00),
(15, 'Sydney Harbour Hotel', true, '2025-09-20', '2025-09-27', 'Sídney, Australia', 275000.00);

INSERT INTO public."Usuario" (
    "Cliente_ID", "Nombres", "Apellidos", "Nombre_Usuario", "Contrasena", "Fecha_Nacimiento", "Pais", "Direccion", "Telefono", "Email", "IsAdmin"
) VALUES
(1, 'Lucía', 'Gómez', 'lucia_g', '1234segura', '1995-03-12', 'Argentina', 'Calle Falsa 123', 3411234567, 'lucia.gomez@example.com', false),
(2, 'Juan', 'Pérez', 'juanpe', 'claveSegura2025', '1990-07-24', 'Argentina', 'Av. Libertador 456', 1145678901, 'juanperez@gmail.com', true),
(3, 'Sofia', 'Martínez', 'sofym', 'sofy2025!', '1998-11-05', 'Chile', 'Calle Andes 789', 56912345678, 'sofia.martinez@correo.cl', false),
(4, 'Carlos', 'Fernández', 'carlitox', 'car123LOS!', '1987-01-19', 'México', 'Av. Reforma 102', 525512345678, 'carlosf@mxmail.mx', false),
(5, 'Emily', 'Johnson', 'emjnyc', 'passNY2025$', '1993-06-30', 'Estados Unidos', '5th Avenue 350', 12125551234, 'emily.johnson@usa.com', false),
(6, 'Yuki', 'Takahashi', 'yuki_t', 'tokyoSecure99', '2000-12-10', 'Japón', 'Shinjuku 3-24', 81398765432, 'yuki@tokyo.jp', false),
(7, 'Francesco', 'Rossi', 'frarossi', 'italiaViva!', '1985-02-14', 'Italia', 'Via Roma 11', 39061234567, 'francesco.rossi@itmail.it', false),
(8, 'Ana', 'Silva', 'ana_silva', 'brasil123#', '1996-08-22', 'Brasil', 'Rua das Palmeiras 77', 5521987654321, 'ana.silva@brmail.br', false),
(9, 'Marie', 'Dubois', 'maried', 'parisClave', '1992-04-18', 'Francia', 'Rue Lafayette 98', 33123456789, 'marie.dubois@france.fr', false),
(10, 'Peter', 'Müller', 'pete_mueller', 'germanPass45', '1989-09-09', 'Alemania', 'Berliner Str. 22', 4915123456789, 'peter.mueller@de.de', false);

INSERT INTO public."Viaje" (
    "Viaje_ID", "Tipo_Viaje", "Origen", "Destino", "FechaIda", "FechaVuelta", "Precio"
) VALUES
-- Nacionales
(1, 'Avión', 'Buenos Aires, Argentina', 'Bariloche, Argentina', '2025-07-10', '2025-07-20', 120000.00),
(2, 'Colectivo', 'Córdoba, Argentina', 'Mendoza, Argentina', '2025-08-05', '2025-08-08', 75000.00),
(3, 'Avión', 'Rosario, Argentina', 'Salta, Argentina', '2025-09-15', '2025-09-22', 89000.00),
(4, 'Colectivo', 'La Plata, Argentina', 'Puerto Iguazú, Argentina', '2025-10-01', '2025-10-10', 98000.00),
(5, 'Tren', 'Santa Fe, Argentina', 'San Miguel de Tucumán, Argentina', '2025-11-03', '2025-11-30', 56000.00),

-- Internacionales (todos avión)
(6, 'Avión', 'Buenos Aires, Argentina', 'Madrid, España', '2025-12-15', '2025-12-30', 430000.00),
(7, 'Avión', 'Buenos Aires, Argentina', 'Nueva York, EE.UU.', '2025-09-10', '2025-09-18', 520000.00),
(8, 'Avión', 'Buenos Aires, Argentina', 'Tokio, Japón', '2025-08-01', '2025-08-15', 750000.00),
(9, 'Avión', 'Buenos Aires, Argentina', 'Santiago, Chile', '2025-10-05', '2025-10-12', 150000.00),
(10, 'Avión', 'Buenos Aires, Argentina', 'Roma, Italia', '2025-11-20', '2025-12-05', 470000.00);

INSERT INTO public."AlquilerAuto" (
    "Alquiler_ID", "Proveedor", "Tipo_Auto", "Fecha_Inicio", "Fecha_Final"
) VALUES
(1, 'Hertz', 'Sedán', '2025-07-01', '2025-07-07'),
(2, 'Avis', 'SUV', '2025-08-10', '2025-08-15'),
(3, 'Localiza', 'Compacto', '2025-09-20', '2025-09-25'),
(4, 'Alamo', 'Pick-up', '2025-10-05', '2025-10-12'),
(5, 'Europcar', 'Furgoneta', '2025-11-01', '2025-11-08'),
(6, 'Sixt', 'Deportivo', '2025-12-15', '2025-12-20'),
(7, 'Budget', 'Sedán', '2025-09-01', '2025-09-06'),
(8, 'Enterprise', 'SUV', '2025-10-15', '2025-10-22'),
(9, 'Rentacar', 'Compacto', '2025-11-10', '2025-11-15'),
(10, 'Thrifty', 'Sedán', '2025-12-05', '2025-12-12');

INSERT INTO public."Paquete" (
    "Paquete_ID", "Destino", "CantViajeros", "Precio"
) VALUES
(1, 'Bariloche, Argentina', 2, 240000.00),
(2, 'Madrid, España', 1, 650000.00),
(3, 'Buenos Aires - Salta, Argentina', 4, 356000.00),
(4, 'Tokio, Japón', 1, 820000.00),
(5, 'Puerto Iguazú, Argentina', 3, 290000.00);

INSERT INTO public."ProductosPaquete" (
    "Paquete_ID", "Viaje_ID", "Alojamiento_ID", "Alquiler_ID"
) VALUES
(1, 1, 1, 2),  -- Paquete 1: viaje a Bariloche, alojamiento hotel 1, alquiler auto 2
(2, 6, 6, NULL), -- Paquete 2: viaje a Madrid, alojamiento 6, sin alquiler
(3, 3, 4, 1),  -- Paquete 3: viaje Buenos Aires-Salta, alojamiento 4, alquiler 1
(4, 8, 3, 6),  -- Paquete 4: viaje a Tokio, alojamiento 3, alquiler 6
(5, 4, 4, NULL); -- Paquete 5: viaje a Puerto Iguazú, alojamiento 4, sin alquiler

