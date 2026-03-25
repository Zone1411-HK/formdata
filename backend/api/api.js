const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/ujkonyv', upload.none(), async (request, response) => {
    const { cim, szerzo, kiado, ev, oldal, mufaj, ar } = request.body;
    const sqlCall = await database.ujkonyv(cim, szerzo, kiado, ev, oldal, mufaj, ar);
    response.status(200).json({
        status: sqlCall,
        data: request.body
    });
});

router.post('/ujauto', upload.none(), async (request, response) => {
    const {
        marka,
        modell,
        gyartas,
        alvazszam,
        loero,
        kilometer,
        uzemanyag,
        fogyasztas,
        uzemanyagSzint
    } = request.body;
    const sqlCall = await database.ujauto(
        marka,
        modell,
        gyartas,
        alvazszam,
        loero,
        kilometer,
        uzemanyag,
        fogyasztas,
        uzemanyagSzint
    );
    response.status(200).json({
        status: sqlCall,
        data: request.body
    });
});

router.get('/konyvek', async (request, response) => {
    const konyvek = await database.konyvek();
    response.status(200).json({
        status: 'success',
        data: konyvek
    });
});

router.get('/autok', async (request, response) => {
    const autok = await database.autok();
    response.status(200).json({
        status: 'success',
        data: autok
    });
});

module.exports = router;
