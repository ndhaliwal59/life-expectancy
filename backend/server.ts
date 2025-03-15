import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
app.use(cors({
  origin: [
    'https://life-expectancy-theta.vercel.app',
    'https://life-expectancy-git-main-nishan-dhaliwals-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Life Expectancy Calculator API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
