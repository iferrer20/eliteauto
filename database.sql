
CREATE USER eliteauto WITH CREATEDB ENCRYPTED PASSWORD 'eliteauto'; -- Create user eliteauto

CREATE DATABASE eliteauto;
\c eliteauto

GRANT ALL PRIVILEGES ON DATABASE eliteauto TO eliteauto;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO eliteauto;

DROP TYPE IF EXISTS car;
CREATE TYPE car AS (
    brand brand,
    model VARCHAR(64),
    km INT,
    price INT,
    discount INT,
    engine INT,
    horsepower INT,
    fuel fuel,
    transmission transmission,
    year INT,
    color color
);

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
    car car
    -- brand brand NOT NULL,
    -- model VARCHAR(64) NOT NULL,
    -- km INT NOT NULL,
    -- price INT NOT NULL,
    -- discount INT NOT NULL,
    -- engine INT NOT NULL,
    -- horsepower INT NOT NULL,
    -- fuel fuel NOT NULL,
    -- transmission transmission NOT NULL,
    -- year INT NOT NULL,
    -- color color NOT NULL
);


DROP TABLE IF EXISTS admin_accounts;
CREATE TABLE admin_accounts (
    username VARCHAR(16) PRIMARY KEY NOT NULL,
    hash CHAR(70) NOT NULL
);

-- Procedures

CREATE EXTENSION pgcrypto; -- Import pgcrypto module

DROP FUNCTION IF EXISTS NEW_ADMIN;
CREATE FUNCTION NEW_ADMIN(
    username varchar(16),
    password varchar(128)
) RETURNS void
AS $$
DECLARE
    salt CHAR(6) := SUBSTR(MD5(RANDOM()::TEXT), 1, 6); -- Random salt
    hash CHAR(70) := salt || ENCODE(HMAC(password, salt, 'sha256'), 'hex');
BEGIN
    INSERT INTO admin_accounts VALUES (username, hash);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS ADMIN_LOGIN;
CREATE FUNCTION ADMIN_LOGIN(
    _username varchar(16),
    password varchar(128)
) RETURNS void
AS $$
DECLARE
    realhash CHAR(70);
    salt CHAR(6);
BEGIN
    SELECT ac.hash INTO realhash FROM admin_accounts AS ac WHERE ac.username = _username LIMIT 1;
    IF realhash IS NOT NULL THEN
        salt := SUBSTR(realhash, 1, 6);
        IF (salt || ENCODE(HMAC(password, salt, 'sha256'), 'hex')) = realhash THEN
            RETURN;
        END IF;
    END IF;

    RAISE EXCEPTION 'Invalid username or password' USING ERRCODE = '45000';
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS GET_BRAND;
CREATE FUNCTION GET_BRAND (
    brand integer
) RETURNS brand
AS $$
DECLARE
    _brand brand;
BEGIN
    _brand := (ENUM_RANGE(NULL::brand))[brand+1];

    IF _brand IS NULL THEN
        RAISE EXCEPTION 'Invalid brand' USING ERRCODE = '45000';
    END IF;
    
    RETURN _brand;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS GET_FUEL;
CREATE FUNCTION GET_FUEL (
    fuel integer
) RETURNS fuel
AS $$
DECLARE
    _fuel fuel;
BEGIN
    _fuel := (ENUM_RANGE(NULL::fuel))[fuel+1];

    IF _fuel IS NULL THEN
        RAISE EXCEPTION 'Invalid fuel' USING ERRCODE = '45000';
    END IF;
    
    RETURN _fuel;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS GET_COLOR;
CREATE FUNCTION GET_COLOR (
    color integer
) RETURNS color
AS $$
DECLARE
    _color color;
BEGIN
    _color := (ENUM_RANGE(NULL::color))[color+1];

    IF _color IS NULL THEN
        RAISE EXCEPTION 'Invalid color' USING ERRCODE = '45000';
    END IF;
    
    RETURN _color;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS GET_TRANSMISSION;
CREATE FUNCTION GET_TRANSMISSION (
    transmission integer
) RETURNS transmission
AS $$
DECLARE
    _transmission transmission;
BEGIN
    _transmission := (ENUM_RANGE(NULL::transmission))[transmission+1];

    IF _transmission IS NULL THEN
        RAISE EXCEPTION 'Invalid transmission' USING ERRCODE = '45000';
    END IF;
    
    RETURN _transmission;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS NEW_CAR;
CREATE FUNCTION NEW_CAR (car car)
RETURNS void
AS $$
BEGIN
    INSERT INTO cars VALUES (
        DEFAULT,
        car
    );
END; 
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS LIST_CARS;
CREATE FUNCTION LIST_CARS (
    _brand brand
)
RETURNS TABLE(
    LIKE cars
)
AS $$
BEGIN
    RETURN QUERY 
        SELECT * FROM cars AS c WHERE _brand IS NULL OR (c.car).brand = _brand;
END; 
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS DELETE_CAR;
CREATE FUNCTION DELETE_CAR (
    car_id integer
)
RETURNS void
AS $$
DECLARE
    affected_rows integer;
BEGIN
    WITH d AS (DELETE FROM cars AS c WHERE c.id = car_id RETURNING 1) SELECT COUNT(*) INTO affected_rows FROM d;
    IF affected_rows = 0 THEN
        RAISE EXCEPTION 'Car not found' USING ERRCODE = '45000';
    END IF;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS GET_CAR;
CREATE FUNCTION GET_CAR (
    car_id integer
)
RETURNS car
AS $$
DECLARE
    car car;
BEGIN
    SELECT (c.car).* INTO STRICT car FROM cars AS c WHERE c.id = car_id;
    RETURN car;

EXCEPTION 
    WHEN no_data_found THEN
        RAISE EXCEPTION 'Car not found' USING ERRCODE = '45000';
END;
$$ LANGUAGE plpgsql;


SELECT NEW_CAR((
    GET_BRAND(0), 
    'xd'::VARCHAR(64),
    0,
    10000,
    0, -- discount
    0,
    0,
    GET_FUEL(0),
    GET_TRANSMISSION(0),
    2021,
    GET_COLOR(0)
)::CAR);
