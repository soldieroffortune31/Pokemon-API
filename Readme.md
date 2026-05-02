# Pokemon API Service

REST API built with Node.js, Express.js, MySQL, and Redis to consume external data from PokeAPI, persist it locally, and provide optimized CRUD endpoints with caching support.

---

## Tech Stack

| Layer       | Technology |
| ----------- | ---------- |
| Runtime     | Node.js    |
| Framework   | Express.js |
| Database    | MySQL      |
| Cache       | Redis      |
| HTTP Client | Axios      |
| Environment | dotenv     |

---

## Installation

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd pokemon-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

Create database

### 4. Configure Environment Variables

Create `.env` file:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=pokemon_db
DB_USER=root
DB_PASS=password

POKEMON_API_URL=https://pokeapi.co/api/v2

REDIS_URL=redis://username:password@host:port
```

### 5. Run Redis Server

```bash
redis-server
```

### 6. Start Application

Development mode:

```bash
npm run dev
```

## Base URL

```http
http://localhost:3000
```

# 📚 API Endpoints

## 1. Sync Pokemon from PokeAPI

### Request

```http
POST /pokemon/sync/:id
```

Response
```json
{
  "code": 200,
  "message": "Success create data pokemon",
  "data": {
    "pokemon_id": 7,
    "id": 4,
    "name": "charmander",
    "height": 6,
    "weight": 85,
    "base_experience": 62,
    "abilities": [
      {
        "is_hidden": false,
        "slot": 1,
        "ability": {
          "name": "blaze",
          "url": "https://pokeapi.co/api/v2/ability/66/"
        }
      },
      {
        "is_hidden": true,
        "slot": 3,
        "ability": {
          "name": "solar-power",
          "url": "https://pokeapi.co/api/v2/ability/94/"
        }
      },
      {
        "is_hidden": false,
        "slot": 1,
        "ability": {
          "name": "blaze",
          "url": "https://pokeapi.co/api/v2/ability/66/"
        }
      },
      {
        "is_hidden": true,
        "slot": 3,
        "ability": {
          "name": "solar-power",
          "url": "https://pokeapi.co/api/v2/ability/94/"
        }
      }
    ],
    "sprites": {
      "sprite_id": 13,
      "pokemon_id": 7,
      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
      "back_female": null,
      "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
      "back_shiny_female": null,
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "front_female": null,
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
      "front_shiny_female": null,
      "createdAt": "2026-05-02T06:39:11.000Z",
      "updatedAt": "2026-05-02T06:51:47.000Z",
      "deletedAt": null
    }
  }
}
```


## 2. Update Pokemon

### Request

```http
PUT /pokemon/:id
```

### Body

```json
{
  "name": "charmanderaaa",
  "height": 6,
  "weight": 85,
  "base_experience": 62
}
```

Response
```json
{
  "code": 200,
  "message": "Success create update pokemon",
  "data": {
    "pokemon_id": 7,
    "id": 4,
    "name": "charmanderaaa",
    "height": 6,
    "weight": 85,
    "base_experience": 62,
    "abilities": [
      {
        "is_hidden": false,
        "slot": 1,
        "ability": {
          "name": "blaze",
          "url": "https://pokeapi.co/api/v2/ability/66/"
        }
      },
      {
        "is_hidden": true,
        "slot": 3,
        "ability": {
          "name": "solar-power",
          "url": "https://pokeapi.co/api/v2/ability/94/"
        }
      }
    ],
    "sprites": {
      "sprite_id": 13,
      "pokemon_id": 7,
      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
      "back_female": null,
      "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
      "back_shiny_female": null,
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "front_female": null,
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
      "front_shiny_female": null,
      "createdAt": "2026-05-02T06:39:11.000Z",
      "updatedAt": "2026-05-02T06:39:11.000Z",
      "deletedAt": null
    }
  }
}
```

## 3. Get Pokemon By ID

### Request

```http
GET /pokemon/:id
```

Response
```json
{
  "code": 200,
  "message": "Success get data pokemon",
  "data": {
    "pokemon_id": 7,
    "id": 4,
    "name": "charmander",
    "height": 6,
    "weight": 85,
    "base_experience": 62,
    "abilities": [
      {
        "is_hidden": false,
        "slot": 1,
        "ability": {
          "name": "blaze",
          "url": "https://pokeapi.co/api/v2/ability/66/"
        }
      },
      {
        "is_hidden": true,
        "slot": 3,
        "ability": {
          "name": "solar-power",
          "url": "https://pokeapi.co/api/v2/ability/94/"
        }
      }
    ],
    "sprites": {
      "sprite_id": 13,
      "pokemon_id": 7,
      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
      "back_female": null,
      "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
      "back_shiny_female": null,
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "front_female": null,
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
      "front_shiny_female": null,
      "createdAt": "2026-05-02T06:39:11.000Z",
      "updatedAt": "2026-05-02T06:41:16.000Z",
      "deletedAt": null
    }
  }
}
```


## 4. Get All Pokemon

### Request

```http
GET /pokemon?limit=10&offset=0
```

Response
```json
{
  "code": 200,
  "message": "Success get all data pokemon",
  "data": [
    {
      "pokemon_id": 1,
      "id": 1,
      "name": "bulbasaura",
      "height": 7,
      "weight": 69,
      "base_experience": 64,
      "createdAt": "2026-04-30T17:52:54.000Z",
      "updatedAt": "2026-05-02T06:03:58.000Z",
      "deletedAt": null
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0,
    "total": 1
  }
}
```

## 5. Delete Pokemon

### Request

```http
DELETE /pokemon/:id
```

Response
```json
{
    "code": 200,
    "message": "Success delete pokemon data"
}
```


