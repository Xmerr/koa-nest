import Koa from 'koa';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import setRoutes from './routes';
import { authenticateUser } from './middleware';

const port = process.env.PORT || 4000;

const createApp = async () => {
  const httpServer = http.createServer();

  const app = new Koa();
  app.use(bodyParser());
  app.use(authenticateUser);

  setRoutes(app);

  httpServer.on('request', app.callback());

  await new Promise(resolve => httpServer.listen({ port }, () => resolve(null)));

  return { app };
};

createApp();
