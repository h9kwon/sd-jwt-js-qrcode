import express, { Application } from 'express';
// import issuerRoutes from './routes/issuerRoutes';
// import holderRoutes from './routes/holderRoutes';
// import verifierRoutes from './routes/verifierRoutes';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
// app.use('/issuer', issuerRoutes);
// app.use('/holder', holderRoutes);
// app.use('/verifier', verifierRoutes);

export default app;