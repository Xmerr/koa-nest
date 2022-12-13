insert into Todos (
  title,
  assignee
)
  values
  (
    'Do this thing',
    (select id from Users where first_name ilike '%David%' limit 1)
  ),
  (
    'Do that thing',
    (select id from Users where first_name ilike '%Jane%' limit 1)
  );