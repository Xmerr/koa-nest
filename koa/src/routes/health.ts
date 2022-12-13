import Router from 'koa-router';

export const router = new Router();

router.get('/health', ctx => {
  ctx.body = 'ok';
});
