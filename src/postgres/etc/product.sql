CREATE TABLE product (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL,
    -- price INTEGER NOT NULL
    -- price DOUBLE PRECISION NOT NULL,
    photo_url TEXT NOT NULL
);