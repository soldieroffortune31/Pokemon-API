CREATE DATABASE `pokemon_database`

CREATE TABLE pokemons (
    pokemon_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL,
    name VARCHAR(225),
    height INT NOT NULL,
    weight INT NOT NULL,
    base_experience INT NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME,
    deletedAt DATETIME
);

CREATE TABLE abilities (
	ability_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(225),
	url TEXT,
	createdAt DATETIME,
    updatedAt DATETIME,
    deletedAt DATETIME
)

CREATE TABLE pokemon_abilities (
    pokemonability_id INT AUTO_INCREMENT PRIMARY KEY,
    pokemon_id INT,
    ability_id INT,
    is_hidden BOOLEAN,
    slot INT,
    createdAt DATETIME,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    CONSTRAINT fk_pokemons_abilities_pokemons
    	FOREIGN KEY (pokemon_id)
    	REFERENCES pokemons(pokemon_id),
    
    CONSTRAINT fk_pokemon_abilities_ability
        FOREIGN KEY (ability_id)
        REFERENCES abilities(ability_id)
);

CREATE TABLE sprites (
   sprite_id INT AUTO_INCREMENT PRIMARY KEY,
   pokemon_id INT UNIQUE,
   back_default TEXT,
   back_female TEXT,
   back_shiny TEXT,
   back_shiny_female TEXT,
   front_default TEXT,
   front_female TEXT,
   front_shiny TEXT,
   front_shiny_female TEXT,
   createdAt DATETIME,
   updatedAt DATETIME,
   deletedAt DATETIME,
    
   CONSTRAINT fk_sprites_pokemons
    	FOREIGN KEY (pokemon_id)
    	REFERENCES pokemons(pokemon_id)
);