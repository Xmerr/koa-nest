CREATE TABLE Users (
  id  uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
  first_name varchar NOT NULL,
  last_name varchar NOT NULL
);