# koa-nest
Comparing the differences between koa and nest

- These two repos should identical functionality.
- There's CRUD for users and todos.
- There's a many to one relationship between todos and users.
- You must be authenticated (with a bearer token in the format of `Bearer <userId>`) in order to use the user routes
- The routes are:
  - `POST /users`
    - Creates a user
  - `GET /users`
    - Returns all the users
  - `GET /users/:id`
    - Returns the details of just the passed in user id
  - `GET /users/:id/todos`
    - Returns a list of all the todos for the user
  - `PUT /users/:id`
    - Updates a user
  - `DELETE /users/:id`
    - Deletes a user
  - `POST /todos`
    - Creates a todo
  - `GET /todos`
    - Returns a list of all todos
  - `GET /todos/:id`
    - Returns one todo with the passed in id
  - `GET /todos/:id/assignee`
    - Returns the user assigned to this todo
  - `PUT /todos/:id`
    - Updates a todo
  - `PUT /todos/:id/assign`
    - Assigns the todo to the passed in user id
  - `DELETE /todos/:id`
    - Deletes the passed in todo


## Remaining tasks for comparison
- Nest authorization