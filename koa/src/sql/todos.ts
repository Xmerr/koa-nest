import { Todo, UnsavedTodo, User } from '../types';
import db from './_db';

export const addTodo = (todo: UnsavedTodo) => db.one<Todo>(`
  INSERT INTO public.todos (
    title,
    assignee
  ) VALUES (
    $(title),
    $(assignee)
  ) returning *;
`, todo);

export const getAllTodos = () => db.manyOrNone<Todo>(`
  SELECT
    id,
    title,
    assignee
  FROM
    public.todos;
`);

export const getTodo = (id: string) => db.oneOrNone<Todo>(`
  SELECT
    id,
    title,
    assignee
  FROM
    public.todos
  WHERE
    id = $(id);
`, { id });

export const getTodoAssignee = (id: string) => db.oneOrNone<User>(`
  SELECT
    u.id,
    u.first_name,
    u.last_name
  FROM
    public.todos t
  JOIN
    public.users u
      ON u.id = t.assignee
  WHERE
    t.id = $(id);
`, { id });

export const updateTodo = (todo: Todo) => db.oneOrNone<Todo>(`
    UPDATE public.todos
    SET
      title = $(title)
    WHERE id = $(id)
    returning *;
`, todo);

export const assignTodo = (todoId: string, userId: string) => db.oneOrNone<Todo>(`
    UPDATE public.todos
    SET
      assignee = $(userId)
    WHERE id = $(todoId)
    returning *;
`, { todoId, userId });

export const deleteTodo = (id: string) => db.oneOrNone<Todo>(`
    DELETE FROM public.todos
    WHERE id = $(id)
    returning *;
`, { id });