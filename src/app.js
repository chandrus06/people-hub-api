import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json({
  limit: '10kb'
}));

app.use(limiter);

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

export default app;
