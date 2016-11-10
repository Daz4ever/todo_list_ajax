# Todo List

Download the `todo_list.zip` file and extract it. Run `python server.py` to run the app and go to `http://localhost:5000` to run it. It already has 2 JSON-based APIs implemented for you under the URLs `/tasks` and `/add_task`.

* `GET /tasks` - retrieves an array of tasks that are currently in the database.
* `POST /add_task` - creates a new task in the database given a "task" form parameter that contains the description of the task.

## Step 0: Create a database

You'll need to create a database called `todo_list_db` - or you can change the database name if you wish. You've been given a schema in `schema.sql`.

## Step 1: Add a task

When the user types in a new task and hits ENTER, add a new task to the list and save it to the database by making an Ajax POST request to the `/add_task` in the backend. Here are the steps to do this:

1. Register the form's submit events, within which:
  1. prevent the default submit action.
  2. make an Ajax POST request to `/add_task` with a "task" parameter containing the task description
  3. Check the database to see that the new task has been added.

## Step 2: Update the list

You may have noticed that while adding a task to the database worked, it didn't not show up in the todo list. That's because you need to first retrieve the list from the database to display it. Write an `updateList` function which will

1. make an Ajax GET request to `/tasks` to retrieve the current task list
2. then for each task retrieved, it creates an `<li>` element and appends it to `#task-list`.

Call this `updateList` function at the beginning of document-ready to populate the list whenever you first load the page.

## Step 3: Re-update the list on task created

Now you may notice that when you add a new task, the list doesn't not update to reflect the change. This is easy to fix: call `updateList` again after a task has successfully been added to the database.

## Step 4: Marking off tasks - Part 1

Now let's implement the ability to mark off tasks. First, you'll need to implement the backend functionality: an API to mark a task as done or undone.

The `/mark_task` API will work only with POST requests, and will take in two form parameters:

* `id` - this will be the id of the task
* `done` - this will be a string containing either "true" or "false"

Given the above 2 pieces of information, the API will change the `done` field of the database to TRUE or FALSE depending on the value of the sent in `done` parameter.

## Step 5: Marking off tasks - Part 2

Now that the backend API is done, you can implement code to mark off tasks in the UI. To make this work, first you'll need to remember the IDs of each task.

1. Give each `li` representing a task an `id` attribute that equals the `id` of the task in the database table.

Next, you'll need to write a jQuery handler to receive click events from checkbox inputs (you would have a checkbox next to each item), when a checkbox is clicked:

1. Use `.prop('checked')` to get the current "checked" state as a boolean value.
2. Use jQuery's `.closest()` or `.parent()` to get the `li` element that contains the clicked checkbox.
3. Send a Ajax POST request to `/mark_task` with 2 form parameters:
  * `id` - the id of the task
  * `done` - a true or false value based on the value of the checkbox

## Displaying a task as crossed off

Once a task has been crossed off, we'd like to display the task with a line through it. You'll need to style the `li` associated with the task in order to do this. You'll need to update the `updateList` function:

1. Add a class of "done" to the `li` element if the associated task is done.
2. Add styling for the done class to put a line through the text.

## Bonus: Remove completed tasks

Add a "Removed Completed" button to the UI, which will remove all the "done" tasks from the database. You will need to implement both the backend and frontend portions to make this work.

## Bonus: Minimally update the screen

Currently, after every change to any task, we are calling the `updateList` function again to refresh the entire list. This causes a slight flicker. It would be better to only change the parts of the screen that need to be changed. For example, if you are adding a new task, simply append a new li element to the list; if you are marking off a task, simply add "done" class to the `li` element. If you are removing a task, simply remove the `li` element associated with that task.

Remove flickering from the app by minimally updating the screen for every action.
