CREATE DATABASE `pokemon_database`

CREATE TABLE pokemons (
    pokemon_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL,
    name VARCHAR(225),
    height INT NOT NULL,
    weight INT NOT NULL,
    base_experience INT NOT NULL,
    image TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    deletedAt DATETIME
);