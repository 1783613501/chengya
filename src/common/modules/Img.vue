<template>
  <div style="height:100%;width:100%">
    <img style="height:calc(100% - 10px);width:100%" :src="img_Data.src" >
  </div>
</template>

<script>
export default {
  name: 'Img',
  props: ['img_Data']
}
</script>

<style>

</style>
