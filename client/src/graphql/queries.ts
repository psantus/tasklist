/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTaskList = /* GraphQL */ `
  query GetTaskList($id: ID!) {
    getTaskList(id: $id) {
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
export const listTaskLists = /* GraphQL */ `
  query ListTaskLists(
    $filter: ModelTaskListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        editors
        name
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
