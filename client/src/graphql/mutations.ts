/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTaskList = /* GraphQL */ `
  mutation CreateTaskList(
    $input: CreateTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    createTaskList(input: $input, condition: $condition) {
      id
      name
      tasks {
        items {
          id
          description
          status
          followingTask
          taskListId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          user
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTaskList = /* GraphQL */ `
  mutation UpdateTaskList(
    $input: UpdateTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    updateTaskList(input: $input, condition: $condition) {
      id
      name
      tasks {
        items {
          id
          description
          status
          followingTask
          taskListId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          user
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTaskList = /* GraphQL */ `
  mutation DeleteTaskList(
    $input: DeleteTaskListInput!
    $condition: ModelTaskListConditionInput
  ) {
    deleteTaskList(input: $input, condition: $condition) {
      id
      name
      tasks {
        items {
          id
          description
          status
          followingTask
          taskListId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          user
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      description
      status
      followingTask
      taskListId
      createdAt
      updatedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      description
      status
      followingTask
      taskListId
      createdAt
      updatedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      description
      status
      followingTask
      taskListId
      createdAt
      updatedAt
    }
  }
`;
export const createUsersTaskLists = /* GraphQL */ `
  mutation CreateUsersTaskLists(
    $input: CreateUsersTaskListsInput!
    $condition: ModelUsersTaskListsConditionInput
  ) {
    createUsersTaskLists(input: $input, condition: $condition) {
      id
      user
      taskList {
        id
        name
        tasks {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUsersTaskLists = /* GraphQL */ `
  mutation UpdateUsersTaskLists(
    $input: UpdateUsersTaskListsInput!
    $condition: ModelUsersTaskListsConditionInput
  ) {
    updateUsersTaskLists(input: $input, condition: $condition) {
      id
      user
      taskList {
        id
        name
        tasks {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUsersTaskLists = /* GraphQL */ `
  mutation DeleteUsersTaskLists(
    $input: DeleteUsersTaskListsInput!
    $condition: ModelUsersTaskListsConditionInput
  ) {
    deleteUsersTaskLists(input: $input, condition: $condition) {
      id
      user
      taskList {
        id
        name
        tasks {
          nextToken
        }
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
