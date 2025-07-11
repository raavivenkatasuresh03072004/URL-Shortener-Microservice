const express = require('express');
const cors = require('cors');
require('dotenv').config();

const logger = require('./middleware/logger');
const shorturlRoutes = require('./routes/shorturls.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', shorturlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
