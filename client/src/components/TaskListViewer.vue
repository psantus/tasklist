<template>
    <div>
        <h2>{{taskListName}}</h2>
        <ul class="tasks">
          <li v-for="item in tasksToDisplay" v-bind:key="item.id">
            {{ item.description }} - {{ item.status }} - Move after:

                <select v-model="willPrecede">
                  <option disabled value="">Move after</option>
                  <option v-for="opt in tasksToDisplay.filter(el => el != item.id)" v-bind:key="opt.id" value="opt.id">{{ opt.description }}</option>
                </select>
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
      console.log('Viewer : Switching list from ', oldVal, ' to ', newVal);
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
  computed: {
    sortedTasks: function () {
      let result = [];
      //Todo implement LinkedList (cf. https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript/)
      return result;
      })
    }
  },
  methods: {
    async getTaskList() {
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
