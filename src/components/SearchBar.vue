<template>
  <div class="form-group">
    <input type="text"
           class="form-control col-md-4"
           :placeholder="placeholder"
           v-model="input"
           @input="setSearchableInput">
  </div>
</template>

<script>
  export default {
    props: ['placeholder'],
    data() {
      return {
        input: ''
      }
    },
    methods: {
      setSearchableInput() {
        // When fired, it triggers our root instance method which is listening to the 'input' event
        this.$emit('input', this.input);
      }
    }
  }
</script>

<style>

</style>
