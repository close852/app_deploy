const client = require('./client')
const graphql = require('./graphql')
// 라우터 붙이기
module.exports = class Routes {
    constructor(app) {
        if (!app) throw new Error("You must provide an instance of express")

        app.use('/', client);
        app.use('/', graphql);

    }
}