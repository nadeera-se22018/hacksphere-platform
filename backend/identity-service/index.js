require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const passport = require('passport');

require('./config/passport');

dotenv.config();

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(passport.initialize()); 

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Identity Service is up and running!' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Identity Service is running on port ${PORT}`);
});