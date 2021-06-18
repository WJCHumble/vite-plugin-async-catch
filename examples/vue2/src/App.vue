<template>
  <div>vue</div>
</template>

<script>
export default {
  async created() {
    await Promise.reject("Throw error.")
  }
}
</script>

<style scoped>
.div {
  width: 200px;
  height: 200px;
  background: #faa;
  text-align: center;
  line-height: 200px;
}
</style>