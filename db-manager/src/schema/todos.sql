CREATE TABLE Todos (
  id  uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
  title varchar NOT NULL,
  assignee uuid NULL references users(id)
);