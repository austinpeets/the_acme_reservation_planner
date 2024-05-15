const { client } = require('./db')


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
};

init();