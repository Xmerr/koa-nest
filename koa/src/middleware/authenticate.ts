import { DefaultState } from "koa";
import { getUser } from "../sql/users";

export const authenticateUser = async (ctx: DefaultState, next: any) => {
  const { authorization } = ctx?.request?.header;

  if(authorization) {
    const userUuid = authorization.split(' ')[1];
    ctx.state.user = await getUser(userUuid);
  }

  await next();
};

export default authenticateUser