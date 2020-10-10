<template>
  <div id="app">
    <h1>Welcome to Collaborative Task Manager!</h1>
    <input type="text" v-model="name" placeholder="TaskList name">
    <button v-on:click="createTaskList">Create TaskList</button>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTaskList } from './graphql/mutations';

export default {
  name: 'app',
  data() {
    return {
      name: '',
      description: ''
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