const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Team & Event Service is up and running!' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Team & Event Service is running on port ${PORT}`);
});