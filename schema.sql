CREATE TABLE task (
  id serial primary key,
  description text NOT NULL,
  done boolean default FALSE NOT NULL
);
