/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTaskListInput = {
  id?: string | null,
  owner?: string | null,
  editors?: Array< string | null > | null,
  name: string,
};

export type ModelTaskListConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTaskListConditionInput | null > | null,
  or?: Array< ModelTaskListConditionInput | null > | null,
  not?: ModelTaskListConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum TaskStatus {
  created = "created",
  assigned = "assigned",
  done = "done",
}


export type UpdateTaskListInput = {
  id: string,
  owner?: string | null,
  editors?: Array< string | null > | null,
  name?: string | null,
};

export type DeleteTaskListInput = {
  id?: string | null,
};

export type CreateTaskInput = {
  id?: string | null,
  description: string,
  status: TaskStatus,
  followingTask?: string | null,
  taskListId: string,
};

export type ModelTaskConditionInput = {
  description?: ModelStringInput | null,
  status?: ModelTaskStatusInput | null,
  followingTask?: ModelIDInput | null,
  taskListId?: ModelIDInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type ModelTaskStatusInput = {
  eq?: TaskStatus | null,
  ne?: TaskStatus | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateTaskInput = {
  id: string,
  description?: string | null,
  status?: TaskStatus | null,
  followingTask?: string | null,
  taskListId?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type ModelTaskListFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  editors?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTaskListFilterInput | null > | null,
  or?: Array< ModelTaskListFilterInput | null > | null,
  not?: ModelTaskListFilterInput | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  status?: ModelTaskStatusInput | null,
  followingTask?: ModelIDInput | null,
  taskListId?: ModelIDInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type CreateTaskListMutationVariables = {
  input: CreateTaskListInput,
  condition?: ModelTaskListConditionInput | null,
};

export type CreateTaskListMutation = {
  createTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskListMutationVariables = {
  input: UpdateTaskListInput,
  condition?: ModelTaskListConditionInput | null,
};

export type UpdateTaskListMutation = {
  updateTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskListMutationVariables = {
  input: DeleteTaskListInput,
  condition?: ModelTaskListConditionInput | null,
};

export type DeleteTaskListMutation = {
  deleteTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTaskListQueryVariables = {
  id: string,
};

export type GetTaskListQuery = {
  getTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTaskListsQueryVariables = {
  filter?: ModelTaskListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTaskListsQuery = {
  listTaskLists:  {
    __typename: "ModelTaskListConnection",
    items:  Array< {
      __typename: "TaskList",
      id: string,
      owner: string | null,
      editors: Array< string | null > | null,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      description: string,
      status: TaskStatus,
      followingTask: string | null,
      taskListId: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTaskListSubscriptionVariables = {
  owner: string,
  editors: string,
};

export type OnCreateTaskListSubscription = {
  onCreateTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskListSubscriptionVariables = {
  owner: string,
  editors: string,
};

export type OnUpdateTaskListSubscription = {
  onUpdateTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskListSubscriptionVariables = {
  owner: string,
  editors: string,
};

export type OnDeleteTaskListSubscription = {
  onDeleteTaskList:  {
    __typename: "TaskList",
    id: string,
    owner: string | null,
    editors: Array< string | null > | null,
    name: string,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        description: string,
        status: TaskStatus,
        followingTask: string | null,
        taskListId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    id: string,
    description: string,
    status: TaskStatus,
    followingTask: string | null,
    taskListId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
