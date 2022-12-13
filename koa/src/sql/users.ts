import { Todo, UnsavedUser, User } from '../types';
import db from './_db';

export const addUser = (user: UnsavedUser) => db.one<User>(`
  INSERT INTO public.users (
    first_name,
    last_name
  ) VALUES (
    $(firstName),
    $(lastName)
  ) returning *;
`, user);

export const getAllUsers = () => db.manyOrNone<User>(`
  SELECT
    id,
    first_name,
    last_name
  FROM
    public.users;
`);

export const getUser = (id: string) => db.oneOrNone<User>(`
  SELECT
    id,
    first_name,
    last_name
  FROM
    public.users
  WHERE
    id = $(id);
`, { id });

export const getUserTodos = (id: string) => db.manyOrNone<Todo>(`
  SELECT
    t.id,
    t.title,
    t.assignee
  FROM
    public.users u
  JOIN
    public.todos t
      ON u.id = t.assignee
  WHERE
    u.id = $(id);
`, { id });

export const updateUser = (user: User) => db.oneOrNone<User>(`
    UPDATE public.users
    SET
      first_name = $(firstName),
      last_name = $(lastName)
    WHERE id = $(id)
    returning *;
`, user);

export const deleteUser = (id: string) => db.oneOrNone<User>(`
    DELETE FROM public.users
    WHERE id = $(id)
    returning *;
`, { id });