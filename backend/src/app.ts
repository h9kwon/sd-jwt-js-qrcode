import express from 'express';
import cors from 'cors';
import issuerRoutes from './routes/issuerRoutes';
// import verifierRouter from './routes/verifierRoutes';
// import holderRouter from './routes/holderRoutes';

const app = express();

// Enable CORS for all domains or specify your frontend's origin
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only the frontend to access the backend
    methods: ['GET', 'POST'],  // Define allowed HTTP methods (adjust as needed)
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow certain headers (optional)
}));

// Middleware
app.use(express.json());

// Routes
app.use('/issuer', issuerRoutes);
// app.use('/holder', holderRoutes);
// app.use('/verifier', verifierRoutes);

export default app;