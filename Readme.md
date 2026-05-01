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
    "pokemon_id": 5,
    "id": 3,
    "name": "venusaur",
    "height": 20,
    "weight": 1000,
    "base_experience": 236,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png",
    "updatedAt": "2026-05-01T09:01:43.171Z",
    "createdAt": "2026-05-01T09:01:43.171Z"
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
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "base_experience": 64,
  "image": "image-url"
}
```

Response
```json
{
  "code": 200,
  "message": "Success create update pokemon",
  "data": {
    "pokemon_id": 4,
    "id": 2,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    "createdAt": "2026-05-01T04:39:04.000Z",
    "updatedAt": "2026-05-01T09:06:39.000Z",
    "deletedAt": null
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
    "pokemon_id": 1,
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    "createdAt": "2026-04-30T17:52:54.000Z",
    "updatedAt": "2026-05-01T04:11:09.000Z",
    "deletedAt": null
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
      "name": "bulbasaur",
      "height": 7,
      "weight": 69,
      "base_experience": 64,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
      "createdAt": "2026-04-30T17:52:54.000Z",
      "updatedAt": "2026-05-01T04:11:09.000Z",
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


