import { Hono } from 'hono';
import userRouter from './routes/auth.route';
import todoRouter from './routes/todo.routes';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId?: string
  }
}>().basePath('/api/v1');

app.use('*',cors({ origin: 'http://localhost:5173', credentials: true }))
app.route('/auth', userRouter);
app.route('/todo', todoRouter);

export default app;
