const express = require('express');

const converterRoutes = require('./routes/converter');

const app = express();

app.use('/', converterRoutes);

app.listen(8080);