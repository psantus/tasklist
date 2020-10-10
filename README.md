# Task-list exercise

## Functional overview

### Data Model
![Class diagram](ClassDiagram.png)
- (Multiple) Users may access TaskList(s)
- Each TaskList may contain multiple Tasks
- Within a TaskList, tasks are sorted

### Services
* TaskList: 
    * Create
    * Delete
    * List
    * Share
    * Leave
* Task
    * Create
    * Delete
    * Move after Task
* We're not describing User management services here.
    * For the purpose of this demo, 2 users will be created in Cognito user pool
    * This [workshop](http://regappworkshop.com/overview/appsync/) offers an example of such 
    registration feature.

## Technical requirements
1. API should be easy to call by cross-platform client apps, including native mobile apps
1. API should scale on millions of TaskLists, and thousands of Tasks per TaskList
1. Near real-time sync
1. Works offline and syncs when back online, with conflict resolution strategy

## Approach
* The back-end (API) will rely on AWS AppSync service, which comes with a number of features supporting our use case:
    * Subscription, enabling for near-realtime sync
    * Row-level access control and user management with AWS Cognito
    * Scalability with AWS DynamoDB
* The front-end (Client) will be developed using AWS Amplify, which provides
    * Easy support for multiple client-side technologies (including Android, iOS, and single-page JS Frameworks like 
    Angular), using Amplify CLI 
    * Client-side storage using Amplify Datastore, enabling offline use
* An important point on data model:
    * As the most frequent mutation will be task prioritization, we don't use an absolute rank column (that would 
    require rewriting all the tasks every time a task is moved) but rather a "followingTask" field. Hence moving a task
    will only modifying two other tasks (its previous predecessor, its new predecessor) on top of the task itself.
    * Since a Tasklist only contains limited number of tasks, we can load all the tasks in the client app and let it 
    reconstruct the ordered list
    
## Organisation of this repository and set up

* /infra folder contains templates enabling to deploy the back-end
* /client folder contains an example of a client app