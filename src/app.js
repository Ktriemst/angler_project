import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import openApiSpec from './docs/openapi.js';
import authRoutes from './routes/auth.routes.js';
import catchesRoutes from './routes/catches.routes.js';
import spotsRoutes from './routes/spots.routes.js';
import tripsRoutes from './routes/trips.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'Angler Logbook API',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/catches', catchesRoutes);
app.use('/api/spots', spotsRoutes);

app.get('/api-docs.json', (_request, response) => {
  response.json(openApiSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, { explorer: true }));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;