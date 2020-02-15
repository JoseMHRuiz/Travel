const mongoose = require("mongoose");
const faker = require("faker");
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const User = require('../models/User')
const Travel = require('../models/Travel')
const City = require('../models/City')


const bcrypt = require("bcrypt");

const bcryptSalt = 10;






// const fakeTravel = Array(20)
//     .fill()
//     .map(() => {
//         return {
//             relax: score[randomInt(0, score.length - 1)],
//             cultural: score[randomInt(0, score.length - 1)],
//             party: score[randomInt(0, score.length - 1)],
//             budget: dolar[randomInt(0, dolar.length - 1)],
//             name: faker.lorem.words(),
//         }
//     })


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
    let counter = 0

    const idCity = Array(6)
        .fill()
        .map(() => {
            return new mongoose.mongo.ObjectId()
        })

    const idUser = Array(2)
        .fill()
        .map(() => {
            return new mongoose.mongo.ObjectId()
        })

    let users = [{
            _id: idUser[0],
            username: "Arturo",
            password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
            email: 'arturo@gmail.com',
            cityOrigin: faker.address.city()
        },
        {
            _id: idUser[1],
            username: "Jose",
            password: bcrypt.hashSync("123", bcrypt.genSaltSync(bcryptSalt)),
            email: 'jose@gmail.com',
            cityOrigin: faker.address.city()
        }
    ]


    const fakeCity = Array(6)
        .fill()
        .map(() => {
            return {
                _id: idCity[counter++],
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
    User.deleteMany()
        .then(() => {
            return User.create(users)
        })
        .then(() => {
            console.log('succesfully added the city to te data')
        })
    City.deleteMany()
        .then(() => {
            return City.create(fakeCity)
        })
        .then(() => {
            console.log('succesfully added the city to te data')
        })
    const dolar = ['💵', '💵💵', '💵💵💵']
    const score = [1, 2, 3, 4, 5]
    const fakeTravel = Array(20)
        .fill()
        .map(() => {
            return {
                type: [{
                    relax: score[randomInt(0, score.length - 1)]
                }, {
                    cultural: score[randomInt(0, score.length - 1)]
                }, {
                    party: score[randomInt(0, score.length - 1)]
                }],
                budget: dolar[randomInt(0, dolar.length - 1)],
                name: faker.lorem.words(),
                city: idCity[randomInt(0, idCity.length - 1)],
                user: idUser[randomInt(0, idUser.length - 1)]
            }
        })
    Travel.deleteMany()
        .then(() => {
            return Travel.create(fakeTravel)
        })
        .then(() => {
            console.log('succesfully added the travel to te data')
            mongoose.connection.close()
            process.exit(0)
        })
})


// User.collection.drop();
// Travel.collection.drop();
// City.collection.drop();
// db connection
// const dolar = ['💵', '💵💵', '💵💵💵']
// const score = [1, 2, 3, 4, 5]

// const travels = [{
//     mode: [{
//             relax: 2
//         },
//         {
//             cultural: 1
//         },
//         {
//             party: 5
//         },
//     ],
//     budget: '💵',
//     name: 'Ibiza botellón',
//     city: {
//         name: 'Ibiza',
//         coutry: 'Spain',
//         socket: 'Normal',
//         currency: '€',
//         language: 'Spanish',
//         position: {
//             lat: 40.1217837,
//             lon: -8.2007301
//         },
//         description: 'La ciudad española de Ibiza es la capital de la isla Balear del mismo nombre, en el mar Mediterráneo.',
//     }
// }]

// const createCities = travels.map(travel => {
//     const newCity = new City(travel.city)
//     return newCity.save()
//         .then(city => {
//             return city.name;
//         })
//         .catch(error => {
//             throw new Error(`Impossible to add the city. ${error}`)
//         })
// })


// let findCities = Promise.all(createCities)
//     .then(cities => {
//         return travels.map(travel => {
//             return City.findOne({
//                     name: travel.city.name,
//                     lastName: travel.city.lastName
//                 })
//                 .then(city => {
//                     if (!city) {
//                         throw new Error(`unknown city ${travel.city.name} ${travel.city.lastName}`);
//                     }
//                     return Object.assign({}, travel, {
//                         city: city._id
//                     });
//                 })
//         });
//     })
//     .catch(error => {
//         throw new Error(error)
//     })

// const saveTravels = findCities.then(findCities => {
//     return Promise.all(findCities)
//         .then(travels => {
//             return travels.map(travel => {
//                 const newTravel = new Travel(travel);
//                 return newTravel.save();
//             })
//         })
// }).then(savedTravels => {
//     Promise.all(savedTravels)
//         .then(travels => travels.forEach(travel => console.log(`created ${travel.title}`)))
//         .then(() => mongoose.connection.close())
//         .catch(err => console.log("Error while saving the travel: ", err))
// })