/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTaskList = /* GraphQL */ `
  subscription OnCreateTaskList {
    onCreateTaskList {
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
export const onUpdateTaskList = /* GraphQL */ `
  subscription OnUpdateTaskList {
    onUpdateTaskList {
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
export const onDeleteTaskList = /* GraphQL */ `
  subscription OnDeleteTaskList {
    onDeleteTaskList {
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
export const onCreateUsersTaskLists = /* GraphQL */ `
  subscription OnCreateUsersTaskLists {
    onCreateUsersTaskLists {
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
export const onUpdateUsersTaskLists = /* GraphQL */ `
  subscription OnUpdateUsersTaskLists {
    onUpdateUsersTaskLists {
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
export const onDeleteUsersTaskLists = /* GraphQL */ `
  subscription OnDeleteUsersTaskLists {
    onDeleteUsersTaskLists {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
