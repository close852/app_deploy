const mysql = require('mysql')

class MySQLConnector {
    get MYSQL_DB_USER() { return process.env.MYSQL_DB_USER || 'jiwoo' }
    get MYSQL_DB_NAME() { return process.env.MYSQL_DB_NAME || 'exapp' }
    get MYSQL_DB_PASSWORD() { return process.env.MYSQL_DB_PASSWORD || '1234' }
    get MYSQL_DB_ADDRESS() { return process.env.MYSQL_DB_ADDRESS || 'localhost' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOK_SIZE || 10 }

    constructor() {
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
            waitForConnections: true
        })
    }
    getConnector() {
        return mysql.createConnection({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD
        })
    }
}
const my = new MySQLConnector();
const conn = my.getConnector();
conn.connect();
let sql = 'select * from bacons';
conn.query(sql, (err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log('rows', rows)
        console.log('fields', fields)
    }
})
