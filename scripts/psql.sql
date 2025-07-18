-- -- File: scripts/psql.sql
-- This script creates a PostgreSQL database and user for authentication.
-- It grants all privileges on the database to the user.
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo systemctl start postgresql
sudo -u postgres psql



CREATE DATABASE authdb;
CREATE USER piuser WITH ENCRYPTED PASSWORD 'pisecret';
GRANT ALL PRIVILEGES ON DATABASE authdb TO piuser;
\q

psql -U piuser -d authdb -h localhost -W


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
\q




-- .env

-- DB_USER=piuser
-- DB_PASSWORD=pisecret
-- DB_HOST=localhost
-- DB_PORT=5432
-- DB_DATABASE=authdb
-- SESSION_SECRET=somesecretvalue
