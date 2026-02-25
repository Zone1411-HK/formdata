const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'konyvdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function ujkonyv(cim, szerzo, kiado, ev, oldal, mufaj, ar) {
    try {
        const sql = `
        INSERT INTO konyv(cim, szerzo, kiado, kiadas_ev, oldal, mufaj, ar)
        VALUES(?,?,?,?,?,?,?);
        `;
        await pool.execute(sql, [cim, szerzo, kiado, ev, oldal, mufaj, ar]);
        return 'success';
    } catch (error) {
        throw new Error(error);
    }
}

async function konyvek() {
    const sql = `
    SELECT * 
    FROM konyv
    `;
    const [rows] = await pool.execute(sql);
    return rows;
}
//!Export
module.exports = {
    selectall,
    ujkonyv,
    konyvek
};
