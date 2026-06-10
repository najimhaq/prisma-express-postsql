const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Prisma + Express + PostgreSQL running');
});

// Routes
app.use('/api/users', userRoutes); // ইউজার রাউটস
app.use('/api/posts', postRoutes); // পোস্ট রাউটস

// Error handling middleware
app.use(errorMiddleware);

// Server চালু করুন

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 API URL: http://localhost:${PORT}/api`);
});
