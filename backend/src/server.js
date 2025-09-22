import express from 'express';
import session from 'express-session';
import SequelizeStoreInit from 'connect-session-sequelize';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mortgageRoutes from './routes/mortgageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { sequelize, syncDatabase } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 4000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretkey';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/mortgages', mortgageRoutes);
app.use('/admin', adminRoutes);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected error', error: err.message });
});

const startServer = async () => {
  try {
    await sessionStore.sync();
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
