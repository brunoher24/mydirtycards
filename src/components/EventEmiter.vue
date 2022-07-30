<template>
  <div class="event-emiter-ctnr"></div>
</template>

<script>

export default {
  name: "EventEmiter",
  mounted() {
    this.$emit("trigger");
  },
};
</script>

<style>
  .event-emiter-ctnr {
    width: 0;
    height: 0;
  }
</style>