const mongoose = require("mongoose");
const faker = require("faker");
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// db connection
function dbConnect(cb) {
    mongoose
        .connect("mongodb://localhost/travel", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
            cb();
        })
        .catch(err => {
            console.error("Error connecting to mongo", err);
        });
}

dbConnect(() => {
    const Cities = require('../models/City');

    const fakeCities = Array(6)
        .fill()
        .map(() => {
            return {
                name: faker.address.city(),
                country: faker.address.country(),
                socket: faker.lorem.word(),
                currency: faker.finance.currencySymbol(),
                language: faker.lorem.word(),
                position: {
                    lat: faker.address.latitude(),
                    lon: faker.address.longitude()
                },
                img: faker.image.abstract(),
                description: faker.lorem.paragraphs()
            }
        })
    Cities.deleteMany()
        .then(() => {
            return Cities.create(fakeCities)
        })
        .then(() => {
            console.log('succesfully added the movies to te data')
            mongoose.connection.close()
            process.exit(0)
        })
})