const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes');
const { port } = require('./config/system-config');
class App {
    constructor() {
        this.expressApp = express();
        this.configs = {
            get port() {
                return process.env.PORT || port;
            }
        }
    }

    applyMiddleware() {
        this.expressApp.use(bodyParser.json())
        new Routes(this.expressApp);
    }

    run() {
        this.expressApp.listen(this.configs.port, () => {
            console.log(this.configs.port)
            console.log('Express server running : ' + `http://localhost:${this.configs.port}/`)
        })
    }
}

const app = new App();
app.applyMiddleware();
app.run();