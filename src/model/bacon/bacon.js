const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/mysqlWrapper')

class Bacon extends DAO {
    static get TABLE_NAME() {
        return 'bacons'
    }

    static async getByID(id) {
        return await this.find(id)
    }
    static async findAllBacons() {
        return this.findAll();
    }
}
module.exports = Bacon;