<template>
  <div id="app" class='app-main'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
