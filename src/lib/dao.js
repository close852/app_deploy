const mysql = require('./mysqlWrapper');
const { sqlConstants } = require('../util/sqlConstants')
class DAO {
    static get PRIMARY_KEY() {
        return "id"
    }

    static async find(id) {
        return (await mysql.createQuery({
            query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift()
    }

    static findAll() {
        return mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }
}
module.exports = DAO;