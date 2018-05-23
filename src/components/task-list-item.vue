<template>
  <li>
    <input type="checkbox" @click.self="toggleComplete" :checked="task.complete">
    <input type="text" v-if="edit" @keydown.enter="update" @blur="update" v-model="task.name">
    <template v-else>
      {{task.name}}
      <i class="fas fa-edit" @click="toggleEdit"></i>
    </template>
    <button @click="del">
      <i class="fas fa-times"></i>
    </button>
  </li>
</template>

<script>
export default {
  name: 'task-list-item',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: false
    }
  },
  methods: {
    toggleComplete() {
      this.task.complete = !this.task.complete
      this.$emit('change', this.task)
    },
    del() {
      this.$emit('delete', this.task)
    },
    toggleEdit() {
      this.edit = !this.edit
    },
    update() {
      this.$emit('change', this.task)
      this.toggleEdit()
    }
  }
}
</script>

<style>
</style>
