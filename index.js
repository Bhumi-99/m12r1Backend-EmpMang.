const express = require('express');
const connection = require('./db');
const app = express();
app.use(express.json());

app.listen(7700, async () => {
    try {
        console.log('server running at port 7700');
        await connection;
    }
    catch (err) {
        console.log(err);
    }
})
