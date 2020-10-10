import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TaskStatus {
  CREATED = "created",
  ASSIGNED = "assigned",
  DONE = "done"
}



export declare class TaskList {
  readonly id: string;
  readonly name: string;
  readonly tasks?: Task[];
  readonly users?: UsersTaskLists[];
  constructor(init: ModelInit<TaskList>);
  static copyOf(source: TaskList, mutator: (draft: MutableModel<TaskList>) => MutableModel<TaskList> | void): TaskList;
}

export declare class Task {
  readonly id: string;
  readonly description: string;
  readonly status: TaskStatus | keyof typeof TaskStatus;
  readonly taskList?: TaskList;
  constructor(init: ModelInit<Task>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

export declare class UsersTaskLists {
  readonly id: string;
  readonly user?: User;
  readonly taskList?: TaskList;
  constructor(init: ModelInit<UsersTaskLists>);
  static copyOf(source: UsersTaskLists, mutator: (draft: MutableModel<UsersTaskLists>) => MutableModel<UsersTaskLists> | void): UsersTaskLists;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly taskLists?: UsersTaskLists[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}