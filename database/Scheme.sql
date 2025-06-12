-- Database: Portal turistico

-- DROP DATABASE IF EXISTS "Portal turistico";

CREATE DATABASE "Portal turistico"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Argentina.1252'
    LC_CTYPE = 'Spanish_Argentina.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "Portal turistico"
    IS 'Portal de ventas de paquetes turisticos.';

GO
Create table Clientes (
Cliente_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nombre VARCHAR(100),
Apellidos VARCHAR(150),
Nombre_Usuario VARCHAR (100) PRIMARY KEY NOT NULL,
Contrasena VARCHAR (255),
Fecha_Nacimiento DATE,
Pais CHAR (150),
Direccion VARCHAR (150),
Telefono INT (15),
Email VARCHAR (150),
)
GO
    
Create table Administradores(
Admin_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nombre VARCHAR(100),
Apellidos VARCHAR (150),
Nombre_Usuario VARCHAR (100) PRIMARY KEY NOT NULL,
Contrasena VARCHAR (255),
Fecha_Nacimiento DATE,
Pais CHAR (150),
Direccion VARCHAR (150),
Telefono INT (15),
Email VARCHAR (150),
)
GO
Create table Paquete(
Paquete_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Destino VARCHAR (3),//nac int
CantViajeros int (2),
Precio MONEY ()
)

GO
Create table ProductosPaquete(
Paquete_ID
viaje_ID
AlojamientoID
)

GO
Create table Producto(
Producto_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Tipo_Producto VARCHAR (255),

)
GO
Create table viaje(
Viaje_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Tipo_Viaje VARCHAR (255),
Destino VARCHAR (255),
FechaIda DATETIME,
FechaVuelta DATETIME,
Precio MONEY,
)
GO
Create table Alojamiento(
Alojamiento_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Hotel VARCHAR (100),
Servicios VARCHAR (255),
Desayuno VARCHAR (255),
Fecha_Inicio DATETIME ()
Fecha_Final DATETIME ()
Ubicacion VARCHAR (255)
Precio MONEY,
)

GO
Create table Carrito(
Compra_ID
Producto_ID
Paquete_ID,
Vencimiento DATE,
)

GO
Create table DetallesCompra(
Compra_ID PRIMARY KEY IDENTITY (1,1) NOT NULL,
Producto_ID
Paquete_ID
Tipo_Paquete
Cantidad_Paquete
Cantidad_Producto
Direccion
Pais
)
