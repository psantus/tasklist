<template>
  <amplify-authenticator>
      <div id="app">
        <div class="sidenav">
            <TaskListFinder v-on:togglelist="currentTaskListId = $event"></TaskListFinder>
            <TaskListCreator></TaskListCreator>
        </div>
        <div class="main">
            <span v-if="!currentTaskListId">Please select a list from the left menu...</span>
            <TaskListViewer v-if="currentTaskListId" v-bind:taskListId="currentTaskListId"></TaskListViewer>
            <TaskCreator v-if="currentTaskListId" v-bind:taskListId="currentTaskListId"></TaskCreator>
        </div>
      </div>
  <amplify-sign-out class="footer"></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import TaskListCreator from './components/TaskListCreator.vue';
import TaskListFinder from './components/TaskListFinder.vue';
import TaskListViewer from './components/TaskListViewer.vue';
import TaskCreator from './components/TaskCreator.vue';
// import { DataStore } from '@aws-amplify/datastore';

export default {
  name: 'app',
  data() {
    return {
      currentTaskListId: null
    }
  },
  components: {
    TaskListFinder,
    TaskListCreator,
    TaskListViewer,
    TaskCreator
  }
};
</script>
  <style type="text/css" scoped>
  .sidenav {
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #FF9900;
    overflow-x: hidden;
    padding-top: 20px;
    color: #fff;
    font-family: 'Amazon Ember', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  .main {
    margin-left: 200px; /* Same as the width of the sidenav */
    font-size: 28px; /* Increased text to enable scrolling */
    padding: 0px 10px;
  }
  .footer{
  position:absolute;
  bottom:0;
  width:100%;
  padding-top:50px;
  height:45px;
  }
  </style>
