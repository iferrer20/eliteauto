
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
    color color,
    sold bool,
    nimgs INT
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
    car car NOT NULL
);


DROP TABLE IF EXISTS admin_accounts;
CREATE TABLE admin_accounts (
    username VARCHAR(16) PRIMARY KEY NOT NULL,
    hash CHAR(70) NOT NULL
);

DROP TABLE IF EXISTS contact_messages;
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(16) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    message VARCHAR(1024) NOT NULL,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    seen BOOLEAN NOT NULL,
    carid INT REFERENCES cars (id) ON DELETE CASCADE
);

-- Procedures

CREATE EXTENSION pgcrypto; -- Import pgcrypto module

DROP FUNCTION IF EXISTS NEW_ADMIN;
CREATE FUNCTION NEW_ADMIN (
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
RETURNS integer
AS $$
DECLARE
    _id INT;
BEGIN
    INSERT INTO cars VALUES (
        DEFAULT,
        car
    ) RETURNING id INTO _id;
    RETURN _id;
END; 
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS UPDATE_CAR;
CREATE FUNCTION UPDATE_CAR (_id integer, _car car)
RETURNS void
AS $$
BEGIN
    UPDATE cars SET car = _car WHERE id = _id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Car not found' USING ERRCODE = '45000';
    END IF;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS LIST_CARS;
CREATE FUNCTION LIST_CARS (
    _brand brand,
    min_price integer,
    max_price integer
)
RETURNS TABLE(
    LIKE cars
)
AS $$
BEGIN
    RETURN QUERY 
        SELECT * FROM cars AS c WHERE (_brand IS NULL OR (c.car).brand = _brand) AND (c.car).price-(c.car).discount BETWEEN min_price AND max_price;
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
    DELETE FROM cars AS c WHERE c.id = car_id;
    IF NOT FOUND THEN
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


DROP FUNCTION IF EXISTS GET_BRANDS;
CREATE FUNCTION GET_BRANDS ()
RETURNS TABLE (
    brand brand
)
AS $$
BEGIN
    RETURN QUERY 
        SELECT (car).brand FROM cars GROUP BY brand; 
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS GET_ALLBRANDS;
CREATE FUNCTION GET_ALLBRANDS ()
RETURN TABLE (
    brand brand
)
AS $$
BEGIN
    
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS LIST_MESSAGES;
CREATE FUNCTION LIST_MESSAGES()
RETURNS TABLE (
    LIKE contact_messages
)
AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM contact_messages ORDER BY seen, post_date DESC;
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS NEW_MESSAGE;
CREATE FUNCTION NEW_MESSAGE(name varchar(32), surname varchar(32), email varchar(128), message varchar(64), carid integer)
RETURNS void
AS $$
BEGIN
    INSERT INTO contact_messages VALUES (DEFAULT, name, surname, email, message, DEFAULT, false, carid);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Car not found' USING ERRCODE = '45000';
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS SEEN_MESSAGE;
CREATE FUNCTION SEEN_MESSAGE(msg_id integer)
RETURNS void
AS $$
BEGIN
    UPDATE contact_messages SET seen = true WHERE id = msg_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Message not found' USING ERRCODE = '45000';
    END IF;
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS DELETE_MESSAGE;
CREATE FUNCTION DELETE_MESSAGE(msg_id integer)
RETURNS void
AS $$
BEGIN
    DELETE FROM contact_messages WHERE id = msg_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Message not found' USING ERRCODE = '45000';
    END IF;
END;
$$ language plpgsql;