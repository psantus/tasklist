// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TaskStatus = {
  "CREATED": "created",
  "ASSIGNED": "assigned",
  "DONE": "done"
};

const { TaskList, Task, UsersTaskLists, User } = initSchema(schema);

export {
  TaskList,
  Task,
  UsersTaskLists,
  User,
  TaskStatus
};