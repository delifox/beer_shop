<template>
  <div class="box">
    <h1>To Do List</h1>
    <task-list v-model="tasks" :tasks="incompleteTasks" label="Active" />
    <task-list v-model="tasks" :tasks="completeTasks" label="Done" />
    <input type="text" v-model="newTask.name">
    <button @click="addTask">Add</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: {
        name: '',
        complete: false,
        edit: false
      }
    }
  },
  created() {
    let storedTasks = localStorage.getItem('tasks')
    if (storedTasks !== null) {
      this.tasks = JSON.parse(storedTasks)
    }
  },
  methods: {
    addTask() {
      this.tasks.push({ ...this.newTask })
      this.newTask.name = ''
    }
  },
  computed: {
    incompleteTasks() {
      return this.tasks
        .map((t, idx) => {
          t.idx = idx
          return t
        })
        .filter(t => !t.complete)
    },
    completeTasks() {
      return this.tasks
        .map((t, idx) => {
          t.idx = idx
          return t
        })
        .filter(t => t.complete)
    }
  },

  watch: {
    tasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
}
</script>


<style lang="scss">
ul {
  list-style-type: none;
}
</style>

