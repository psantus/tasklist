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
      owner
      editors
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
      owner
      editors
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
      owner
      editors
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
