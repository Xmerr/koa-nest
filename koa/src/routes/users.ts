import Router from 'koa-router';
import { isAuthenticated } from '../middleware';
import { addUser, deleteUser, getAllUsers, getUser, getUserTodos, updateUser } from '../sql/users';
import { UnsavedUser, User } from '../types';

export const router = new Router({
  prefix: '/users'
});
router.use(isAuthenticated);

router.post('/', async ctx => {
  const { firstName, lastName } = ctx.request.body as UnsavedUser;
  const newUser = await addUser({ firstName, lastName });
  ctx.body = newUser;
});

router.get('/', async ctx => {
  const users = await getAllUsers();
  ctx.body = users;
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const user = await getUser(id);
  ctx.body = user;
});

router.get('/:id/todos', async ctx => {
  const { id } = ctx.params;
  const todos = await getUserTodos(id);
  ctx.body = todos;
});

router.put('/:id', async ctx => {
  const { firstName, lastName } = ctx.request.body as User;
  const { id } = ctx.params;
  const updatedUser = await updateUser({ id, firstName, lastName });
  ctx.body = updatedUser;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const deletedUser = await deleteUser(id);
  ctx.body = deletedUser;
});