const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});