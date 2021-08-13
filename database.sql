
CREATE USER eliteauto WITH CREATEDB ENCRYPTED PASSWORD 'eliteauto'; -- Create user eliteauto

CREATE DATABASE eliteauto;
\c eliteauto

GRANT ALL PRIVILEGES ON DATABASE eliteauto TO eliteauto;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO eliteauto;

DROP TYPE IF EXISTS fuel;
CREATE TYPE fuel AS ENUM (
    'diesel', 
    'gasoline', 
    'electric'
);

DROP TYPE IF EXISTS transmission;
CREATE TYPE transmission AS ENUM (
    'automatic', 
    'manual'
);

-- Brands
DROP TYPE IF EXISTS brand;
CREATE TYPE brand AS ENUM (
    'Audi',
    'BMW',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Dodge',
    'Ferrari',
    'Ford',
    'GM',
    'GEM',
    'GMC',
    'Honda',
    'Hummer',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Kia',
    'Lamborghini',
    'Lexus',
    'Lincoln',
    'Lotus',
    'Mazda',
    'Mercedes Benz',
    'Mercury',
    'Mitsubishi',
    'Nissan',
    'Oldsmobile',
    'Peugeot',
    'Pontiac',
    'Porsche',
    'Regal',
    'Saab',
    'Saturn',
    'Subaru',
    'Suzuki',
    'Toyota',
    'Volkswagen',
    'Volvo'
);

DROP TYPE IF EXISTS color;
CREATE TYPE color AS ENUM (
    'white',
    'black',
    'gray',
    'red',
    'yellow',
    'blue',
    'green',
    'purple',
    'orange'
);

DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id SERIAL PRIMARY KEY NOT NULL,
    brand brand NOT NULL,
    model VARCHAR(64) NOT NULL,
    km INT NOT NULL,
    price INT NOT NULL,
    discount INT NOT NULL,
    engine INT NOT NULL,
    horsepower INT NOT NULL,
    fuel fuel NOT NULL,
    transmission transmission NOT NULL,
    year INT NOT NULL,
    color color NOT NULL
);


-- Procedures

DROP FUNCTION IF EXISTS CREATE_CAR;
CREATE FUNCTION CREATE_CAR (
    brand integer, 
    model varchar,
    km integer,
    price integer,
    discount integer,
    engine integer,
    horsepower integer,
    fuel integer,
    transmission integer,
    year integer,
    color integer
)
RETURNS void
AS $$
BEGIN
    INSERT INTO cars VALUES (
        DEFAULT,
        (ENUM_RANGE(NULL::brand))[brand+1],
        model,
        km,
        price,
        discount,
        engine,
        horsepower,
        (ENUM_RANGE(NULL::fuel))[fuel+1],
        (ENUM_RANGE(NULL::transmission))[transmission+1],
        year,
        (ENUM_RANGE(NULL::color))[color+1]
    );
END; 
$$ LANGUAGE plpgsql;

SELECT CREATE_CAR(
    1, 
    'a'::VARCHAR(64),
    0,
    1000,
    100,
    0,
    0,
    0,
    0,
    2021,
    0
);
