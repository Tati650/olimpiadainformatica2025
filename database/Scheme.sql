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


Create table Clientes (
Cliente_ID PRIMARY KEY,
Nombre VARCHAR(100),
Apellidos VARCHAR(150),
Nombre_Usuario VARCHAR (100),
Contrasena VARCHAR (255),
Fecha_Nacimiento DATE,
Pais CHAR (150),
Direccion VARCHAR (150),
Telefono INT (15),
Email VARCHAR (150),
)

Create table Administradores(
Admin_ID PRIMARY KEY,
Nombre VARCHAR(100),
Apellidos VARCHAR (150),
Nombre_Usuario VARCHAR (100),
Contrasena VARCHAR (255),
Fecha_Nacimiento DATE,
Pais CHAR (150),
Direccion VARCHAR (150),
Telefono INT (15),
Email VARCHAR (150),
)

Create table Catalogo(

)