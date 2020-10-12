/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTaskListInput = {
  id?: string | null,
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

export type CreateUsersTaskListsInput = {
  id?: string | null,
  user: string,
  usersTaskListsTaskListId?: string | null,
};

export type ModelUsersTaskListsConditionInput = {
  user?: ModelStringInput | null,
  and?: Array< ModelUsersTaskListsConditionInput | null > | null,
  or?: Array< ModelUsersTaskListsConditionInput | null > | null,
  not?: ModelUsersTaskListsConditionInput | null,
};

export type UpdateUsersTaskListsInput = {
  user?: string | null,
  usersTaskListsTaskListId?: string | null,
};

export type DeleteUsersTaskListsInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelTaskListFilterInput = {
  id?: ModelIDInput | null,
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

export type ModelUsersTaskListsFilterInput = {
  user?: ModelStringInput | null,
  and?: Array< ModelUsersTaskListsFilterInput | null > | null,
  or?: Array< ModelUsersTaskListsFilterInput | null > | null,
  not?: ModelUsersTaskListsFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type CreateTaskListMutationVariables = {
  input: CreateTaskListInput,
  condition?: ModelTaskListConditionInput | null,
};

export type CreateTaskListMutation = {
  createTaskList:  {
    __typename: "TaskList",
    id: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
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

export type CreateUsersTaskListsMutationVariables = {
  input: CreateUsersTaskListsInput,
  condition?: ModelUsersTaskListsConditionInput | null,
};

export type CreateUsersTaskListsMutation = {
  createUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUsersTaskListsMutationVariables = {
  input: UpdateUsersTaskListsInput,
  condition?: ModelUsersTaskListsConditionInput | null,
};

export type UpdateUsersTaskListsMutation = {
  updateUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUsersTaskListsMutationVariables = {
  input: DeleteUsersTaskListsInput,
  condition?: ModelUsersTaskListsConditionInput | null,
};

export type DeleteUsersTaskListsMutation = {
  deleteUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
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
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
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

export type GetUsersTaskListsQueryVariables = {
  id: string,
};

export type GetUsersTaskListsQuery = {
  getUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersTaskListssQueryVariables = {
  filter?: ModelUsersTaskListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersTaskListssQuery = {
  listUsersTaskListss:  {
    __typename: "ModelUsersTaskListsConnection",
    items:  Array< {
      __typename: "UsersTaskLists",
      id: string,
      user: string,
      taskList:  {
        __typename: "TaskList",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTaskListSubscription = {
  onCreateTaskList:  {
    __typename: "TaskList",
    id: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskListSubscription = {
  onUpdateTaskList:  {
    __typename: "TaskList",
    id: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskListSubscription = {
  onDeleteTaskList:  {
    __typename: "TaskList",
    id: string,
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
    users:  {
      __typename: "ModelUsersTaskListsConnection",
      items:  Array< {
        __typename: "UsersTaskLists",
        id: string,
        user: string,
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

export type OnCreateUsersTaskListsSubscription = {
  onCreateUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUsersTaskListsSubscription = {
  onUpdateUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUsersTaskListsSubscription = {
  onDeleteUsersTaskLists:  {
    __typename: "UsersTaskLists",
    id: string,
    user: string,
    taskList:  {
      __typename: "TaskList",
      id: string,
      name: string,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
      users:  {
        __typename: "ModelUsersTaskListsConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    name: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
