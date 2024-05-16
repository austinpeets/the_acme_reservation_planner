const {
    client,
    createTables,
    createCustomer,
    createReservation,
    createRestaurant,
    fetchCustomer,
    fetchReservation,
    fetchRestaurant,
    destroyReservation } = require('./db.js')
const express = require('express')
const app = express();


const init = async() => {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('created tables');
    const [moe, lucy, larry, ethyl, applebees, cheesecakefactory, olivegarden] = await Promise.all([
        createCustomer({ name: 'moe'}),
        createCustomer({ name: 'lucy'}),
        createCustomer({ name: 'larry'}),
        createCustomer({ name: 'ethyl'}),
        createRestaurant({ name: 'applebees'}),
        createRestaurant({ name: 'cheesecakefactory'}),
        createRestaurant({ name: 'olivegarden'})
    ])
    console.log(await fetchCustomer());
    console.log(await fetchRestaurant());

    const [reservation, reservation2] = await Promise.all([
        createReservation({
            customer_id: moe.id,
            restaurant_id: applebees.id,
            party_count: 3,
            date: '05/20/2024'
        }),
        createReservation({
            customer_id: lucy.id,
            restaurant_id: olivegarden.id,
            party_count: 4,
            date: '05/25/2024'
        })
    ]);
    console.log(await fetchReservation())
    await destroyReservation({ id: reservation.id, customer_id: reservation.customer_id})
    console.log(await fetchReservation())
    

    const port =  process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
        console.log('some curl commands to test');
        console.log(`curl localhost:${port}/api/customer`);
        console.log(`curl localhost:${port}/api/reservation`);
        console.log(`curl localhost:${port}/api/restaurant`);
    });

    app.get('/api/customer', async (req, res, next) => {
        try {
            const SQL = ` SELECT * from customer`
    
            const response = await client.query(SQL)
            console.log(response)
            res.send(response.rows)
        } catch (ex){
            next(ex)
        }
    })
};

init();