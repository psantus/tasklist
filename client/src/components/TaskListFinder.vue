<template>
    <div>
        <h2>Your task lists</h2>
        <input type="text" size="18" v-on:keyup="listTaskLists" v-model="name" placeholder="Search...">
        <ul id="listOfTaskList">
          <li v-for="item in taskListsToDisplay" :key="item.id">
            <a v-on:click="$emit('togglelist', item.id)">{{ item.name }}</a>
          </li>
        </ul>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { listTaskLists } from '../graphql/queries.ts';

export default {
  name: 'TaskListFinder',
  async mounted() {
        let taskListsToDisplay;
        taskListsToDisplay = await API.graphql({
                query: listTaskLists
        });
        this.taskListsToDisplay = taskListsToDisplay.data.listTaskLists.items
      },
  data() {
    return {
      name: '',
      taskListsToDisplay: null
    }
  },
  methods: {
    async listTaskLists() {
      const { name } = this;
      if (!name) return;
      const nameToSearch = this.name;

      let taskListsToDisplay;

      let filter = {
          name: {
              contains: nameToSearch
          }
      };

      taskListsToDisplay = await API.graphql({
              query: listTaskLists,
              variables: {filter: filter},
      });

      this.taskListsToDisplay = taskListsToDisplay.data.listTaskLists.items
    }
  }
};
</script>

<style type="text/css" scoped>
    h2 {
          text-transform: uppercase;
          font-size: 14px;
    }
</style>
