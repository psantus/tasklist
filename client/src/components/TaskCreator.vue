<template>
    <div>
        <h2>Create a new task</h2>
        <input type="text" size="10" v-model="name" placeholder="My new task">
        <button v-on:click="createTask">Create</button>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { createTask } from '../graphql/mutations.ts';

export default {
  name: 'TaskListCreator',
  props: ['taskListId'],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async createTask() {
      const { name } = this;
      if (!name) return;
      const task = {
        description: this.name,
        status: "created",
        taskListId: this.taskListId
       };
      await API.graphql({
        query: createTask,
        variables: {input: task},
      });
      this.name = '';
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
