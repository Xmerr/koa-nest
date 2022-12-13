import Router from 'koa-router';
import { addTodo, assignTodo, deleteTodo, getAllTodos, getTodo, getTodoAssignee, updateTodo } from '../sql/todos';
import { UnsavedTodo } from '../types';

export const router = new Router({
  prefix: '/todos'
});

router.post('/', async ctx => {
  const { assignee, title } = ctx.request.body as UnsavedTodo;
  const newTodo = await addTodo({ assignee, title });
  ctx.body = newTodo;
});

router.get('/', async ctx => {
  const todos = await getAllTodos();
  ctx.body = todos;
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const todo = await getTodo(id);
  ctx.body = todo;
});

router.get('/:id/assignee', async ctx => {
  const { id } = ctx.params;
  const assignee = await getTodoAssignee(id);
  ctx.body = assignee;
});

router.put('/:id', async ctx => {
  const { title } = ctx.request.body as UnsavedTodo
  const { id } = ctx.params;
  const updatedTodo = await updateTodo({ title, id });
  ctx.body = updatedTodo;
});

router.put('/:id/assign', async ctx => {
  const { userId } = ctx.request.body as any;
  const { id } = ctx.params;
  const updatedTodo = await assignTodo(id, userId);
  ctx.body = updatedTodo;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const deletedTodo = await deleteTodo(id);
  ctx.body = deletedTodo;
});