const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const { Sequelize, DataTypes } = require('sequelize')
const CoworkingModel = require('./models/coworking')
const app = express()
const port = 3000

const sequelize = new Sequelize('lapiscine_coworking', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
    port: 8889
})

const Coworking = CoworkingModel(sequelize, DataTypes);

sequelize.sync({ force: true })
    .then(() => {
        Coworking.create({
            id: 12,
            name: "Oasis Coworking",
            price: { "hour": 4, "day": 21, "month": 100 },
            address: { "number": "68bis", "street": "avenue Jean Jaurès", "postCode": 33150, "city": "Cenon" },
            picture: "",
            superficy: 200,
            capacity: 27
        })
        .then(() => {console.log('La base a bien été synchronisée');})
        .catch((error) => {console.error(error);})
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})
