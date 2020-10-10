/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTaskList = /* GraphQL */ `
  query GetTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      name
      tasks {
        items {
          id
          description
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
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
        taskList {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsersTaskLists = /* GraphQL */ `
  query GetUsersTaskLists($id: ID!) {
    getUsersTaskLists(id: $id) {
      id
      user {
        id
        name
        taskLists {
          nextToken
        }
        createdAt
        updatedAt
      }
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
export const listUsersTaskListss = /* GraphQL */ `
  query ListUsersTaskListss(
    $filter: ModelUsersTaskListsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersTaskListss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          name
          createdAt
          updatedAt
        }
        taskList {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      taskLists {
        items {
          id
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        taskLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
