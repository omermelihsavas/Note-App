const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const noteRoute = require('./routes/notes');
const userRoute = require('./routes/user');

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Veritabanı bağlantısı başarılı.');
        app.listen(process.env.PORT, () => {
            console.log(`${process.env.PORT}. port dinleniyor.`);
        });
    })
    .catch(err => {
        console.log(err);
    });

app.use('/api/notes', noteRoute);
app.use('/api/user', userRoute);