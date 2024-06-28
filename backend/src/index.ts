import { Hono } from 'hono';
import userRouter from './routes/auth.route';
import todoRouter from './routes/todo.routes';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId?: string
  }
}>().basePath('/api/v1');

app.route('/auth', userRouter);
app.route('/todo', todoRouter);

export default app;
