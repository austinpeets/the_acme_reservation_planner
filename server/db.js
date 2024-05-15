const pg = require('pg');
const { v4: uuidv4 } = require('uuid');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_reservation_planner');


module.exports = {
    client
};

const createTables = async() => {
    const SQL = 
    `DROP TABLE IF EXISTS customer;
     DROP TABLE IF EXISTS restaurant;
     DROP TABLE IF EXISTS reservation;
     CREATE TABLE customer(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
     );
     CREATE TABLE restaurant(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
     );
     CREATE TABLE reservation(
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        customer_id UUID REFERENCES customer(id) NOT NULL,
        restaurant_id UUID REFERENCES restaurant(id) NOT NULL
     );
     `;
     
     await client.query(SQL);
};

const createCustomer = async(name) => {
    const SQL = `
    INSERT INTO customer(id, name) VALUES($1, $2) RETURNING *`;

    const response = await client.query(SQL, [uuidv4(), name]);
    return response.rows[0]
}