/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTaskList = /* GraphQL */ `
  subscription OnCreateTaskList($owner: String!, $editors: String!) {
    onCreateTaskList(owner: $owner, editors: $editors) {
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
export const onUpdateTaskList = /* GraphQL */ `
  subscription OnUpdateTaskList($owner: String!, $editors: String!) {
    onUpdateTaskList(owner: $owner, editors: $editors) {
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
export const onDeleteTaskList = /* GraphQL */ `
  subscription OnDeleteTaskList($owner: String!, $editors: String!) {
    onDeleteTaskList(owner: $owner, editors: $editors) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
