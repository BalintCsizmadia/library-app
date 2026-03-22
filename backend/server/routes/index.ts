import Router from '@koa/router';
import type { ParameterizedContext } from 'koa';

const router = new Router();

router.get('/', (ctx: ParameterizedContext) => {
  ctx.body = { message: 'Server running' };
});

export default router;
