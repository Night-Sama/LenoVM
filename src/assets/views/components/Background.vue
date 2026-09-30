<script setup>

import { computed } from 'vue'

const props = defineProps({
    bgname: String
})

const images = import.meta.glob(
  '/src/assets/views/components/Backgrounds/*.{png,jpg,jpeg,webp}',
  { eager: true, query: "?url", import: "default" }
)

const exts = ["png", "jpg", "jpeg", "webp"]

const bgimg = computed(() => {
  for (const ext of exts) {
    const url = images[`/src/assets/views/components/Backgrounds/${props.bgname}.${ext}`]
    if (url) return url
  }
})

</script>


<template>
    <body>
        <img v-if="bgimg" :src="bgimg" class="bg" />
    </body>
</template>


<style scoped>
body {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  background-color: black;
}
.bg {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
}
</style>
