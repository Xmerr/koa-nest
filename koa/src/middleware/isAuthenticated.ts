import { DefaultState } from "koa";

export const isAuthenticated = async (ctx: DefaultState, next: any) => {
  ctx.assert(ctx.state.user?.id, 403, 'User not authorized')

  await next();
};

export default isAuthenticated