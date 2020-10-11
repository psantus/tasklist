<template>
    <div>
        <h2>Create a new list</h2>
        <input type="text" size="10" v-model="name" placeholder="My new list">
        <button v-on:click="createTaskList">Create</button>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { createTaskList } from '../graphql/mutations.ts';

export default {
  name: 'TaskListCreator',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async createTaskList() {
      const { name } = this;
      if (!name) return;
      const taskList = { name };
      await API.graphql({
        query: createTaskList,
        variables: {input: taskList},
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
