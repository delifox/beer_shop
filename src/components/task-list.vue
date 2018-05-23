<template>
  <section>
    <h2>{{label}} ({{tasks.length}})</h2>
    <ul>
      <task-list-item v-for="t in tasks" :task="t" @change="onChange" @delete="onDelete" :key="t.idx" />
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-list',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    onChange(task) {
      let arr = [...this.value]
      arr[task.idx] = task
      this.$emit('input', arr)
    },
    onDelete(task) {
      let arr = [...this.value]
      arr.splice(task.idx, 1)
      this.$emit('input', arr)
    }
  }
}
</script>
