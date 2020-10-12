<template>
    <div>
        <h2>Sharing</h2>
        <div v-if="currentEditors != []">
            <h3>Currently shared with</h3>
            <ul class="editors">
              {{ currentEditors.join(', ') }}
            </ul>
        </div>
        <h3>Share</h3>
        <input type="text" size="10" v-model="editorToAdd" placeholder="Share with...">
        <button v-on:click="shareWith">Share</button>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { updateTaskList } from '../graphql/mutations.ts';
import { getTaskList } from '../graphql/queries.ts';

export default {
  name: 'TaskListSharing',
  props: ['taskListId'],
  watch: {
      taskListId: function(newVal, oldVal) {
        console.log('Sharing : Switching list from ', oldVal, ' to ', newVal);
        this.taskListIdToDisplay = newVal;
        this.getTaskListEditors();
      }
  },
  data() {
    return {
      taskListIdToDisplay: null,
      editorToAdd: null,
      currentEditors: []
    }
  },
  methods: {
    async shareWith() {
      let currentEditors = Array.from(this.currentEditors);
      currentEditors.push(this.editorToAdd);

      const taskList = {
        id: this.taskListIdToDisplay,
        editors: currentEditors
       };
      console.log('taskList: ', taskList)
      await API.graphql({
        query: updateTaskList,
        variables: {input: taskList},
      });
      this.editorToAdd = '';
    },
    async getTaskListEditors() {
          const taskListToSearch = this.taskListIdToDisplay;

          let taskList;

          taskList = await API.graphql({
                  query: getTaskList,
                  variables: {id: taskListToSearch},
          });

          console.log(taskList);
          if (taskList.data.getTaskList.editors != null) {
            this.currentEditors = taskList.data.getTaskList.editors
          }
          console.log('Current Editors: ', this.currentEditors)
        }
  }
};
</script>

<style type="text/css" scoped>
    h2 {
          text-transform: uppercase;
          font-size: 14px;
    }
    h3 {
          text-transform: uppercase;
          font-size: 12px;
    }
    .editors {
          font-size: 12px;
    }
</style>
