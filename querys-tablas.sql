-- Database: lab0

CREATE TABLE PERSONA (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(45),
	apellido varchar(45),
    telefono varchar (25),
    edad INT,
    sexo VARCHAR(25),
	vivienda_id_viv INT,
	persona_id INT,
	CONSTRAINT chk_telefono_numerico
		CHECK (telefono ~ '^[0-9]{7,20}$')
);

CREATE TABLE MUNICIPIO (
    id_mun SERIAL PRIMARY KEY,
    nombre VARCHAR(45),
    area FLOAT,
    presupuesto FLOAT,
    persona_id INT,
    CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES PERSONA(id)
);

CREATE TABLE DIRECCION (
	id_direccion SERIAL PRIMARY KEY,
	calle_principal varchar(45),
	calle_secundaria varchar(45),
	cod_postal int
);

CREATE TABLE VIVIENDA (
    id_viv SERIAL PRIMARY KEY,
    direccion_id int,
    capacidad INT,
    niveles INT,
    municipio_id_mun INT,
    CONSTRAINT fk_municipio FOREIGN KEY (municipio_id_mun) REFERENCES MUNICIPIO(id_mun),
	CONSTRAINT fk_direccion FOREIGN KEY (direccion_id) REFERENCES DIRECCION(id_direccion)
);

CREATE TABLE PERSONA_has_VIVIENDA (
    persona_id INT,
    vivienda_id_viv INT,
    CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES PERSONA(id),
    CONSTRAINT fk_vivienda FOREIGN KEY (vivienda_id_viv) REFERENCES VIVIENDA(id_viv)
);

ALTER TABLE PERSONA
ADD CONSTRAINT fk_vivienda FOREIGN KEY (vivienda_id_viv)
        REFERENCES public.vivienda (id_viv) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

ALTER TABLE PERSONA
ADD CONSTRAINT fk_persona FOREIGN KEY (persona_id)
        REFERENCES public.persona (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;




select * from persona;