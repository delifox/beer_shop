<template>
  <div>
    <h1>Sign Up</h1>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <input type="password" placeholder="Password confirmation" v-model="passwordConfirm">
    <input type="text" placeholder="Full Name" v-model="name">
    <button @click="register">Submit</button>
    <div class="error">{{error}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      errors: []
    }
  },
  methods: {
    register() {
      checkPresence('email', 'Email')
      checkPresence('password', 'Password')
      checkPresence('passwordConfirm', 'Password Confirm')
      checkPresence('name', 'Name')
      if (!this.errors.length === 0) {
        console.log('send to server')(this.email, this.password, this.passwordConfirm, this.name)
      }
    },

    checkPresence(value, visible) {
      'dobavit v massiv errors [visible] is empty'
    }
  }
}
</script>

<style>
</style>
