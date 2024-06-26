const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de aplicación
        this.routes();

    }
    async conectarDB() {
        await dbConnection();
    }   

    middlewares() {
        //cors
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json());
        
        //Directorio público
        this.app.use(express.static('public'));        
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Example app listening on port!', this.port);
        });
    }
}

module.exports = Server;    