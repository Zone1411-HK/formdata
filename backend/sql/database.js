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

const pool2 = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'autokdb',
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

async function autok() {
    const sql = `
    SELECT * 
    FROM auto
    `;
    const [rows] = await pool2.execute(sql);
    return rows;
}

async function ujauto(
    marka,
    modell,
    gyartas,
    alvazszam,
    loero,
    kilometer,
    uzemanyag,
    fogyasztas,
    uzemanyagSzint
) {
    try {
        const sql = `
        INSERT INTO auto(marka, modell, gyartas, alvazszam, loero, kilometer, uzemanyag, fogyasztas, allas)
        VALUES(?,?,?,?,?,?,?,?,?);
        `;
        await pool2.execute(sql, [
            marka,
            modell,
            gyartas,
            alvazszam,
            loero,
            kilometer,
            uzemanyag,
            fogyasztas,
            uzemanyagSzint
        ]);
        return 'success';
    } catch (error) {
        throw new Error(error);
    }
}

async function auto(id) {
    const sql = `
    SELECT marka, modell, gyartas, alvazszam, loero, kilometer, uzemanyag, fogyasztas, allas
    FROM auto
    WHERE id = ?
    `;
    const [rows] = await pool2.execute(sql, [id]);
    return rows[0];
}

//!Export
module.exports = {
    selectall,
    ujkonyv,
    konyvek,
    ujauto,
    autok,
    auto
};
