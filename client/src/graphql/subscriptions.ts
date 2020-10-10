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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
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
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      taskLists {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      taskLists {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      taskLists {
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
