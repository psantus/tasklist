<template>
    <div>
        <h2>{{taskListName}}</h2>
        <ul class="tasks">
          <li v-for="item in tasksToDisplay" :key="item.id">
            {{ item.description }} - {{ item.status }}
          </li>
        </ul>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { getTaskList } from '../graphql/queries.ts';

export default {
  name: 'TaskListViewer',
  props: ['taskListId'],
  watch: {
    taskListId: function(newVal, oldVal) {
      console.log('Switching list from ', oldVal, ' to ', newVal);
      this.taskListIdToDisplay = newVal;
      this.getTaskList();
    }
  },
  data() {
    return {
      taskListIdToDisplay: null,
      taskListName: '',
      tasksToDisplay: null
    }
  },
  methods: {
    async getTaskList() {
      console.log('Calling getTaskList', this.taskListId, this.taskListIdToDisplay, this.tasksToDisplay);
      const taskListToSearch = this.taskListIdToDisplay;

      let tasksToDisplay;

      tasksToDisplay = await API.graphql({
              query: getTaskList,
              variables: {id: taskListToSearch},
      });

      this.taskListName = tasksToDisplay.data.getTaskList.name
      this.tasksToDisplay = tasksToDisplay.data.getTaskList.tasks.items
    }
  }
};

</script>

<style type="text/css" scoped>
    h2 {
          text-transform: uppercase;
          font-size: 14px;
    }
    .tasks {
          font-size: 12px
    }
</style>
