const Router = require('./route');
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors())
app.use('/v1',Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});