const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const teamRoutes = require('./routes/teamRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: true, 
    credentials: true
}));

app.options('*', cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Team & Event Service is up and running!' });
});

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => console.log(`Team & Event Service running on port ${PORT}`));
}

module.exports = app;