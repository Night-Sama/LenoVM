<script setup>
import { computed, ref, watch } from 'vue'

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

const previous = ref(null)      // outgoing image url, or null = black
const dissolving = ref(false)

watch(bgimg, (newVal, oldVal) => {
  if (!newVal) return
  previous.value = oldVal || null
  dissolving.value = true
}, { immediate: true })

function onDissolveEnd() {
  dissolving.value = false
  previous.value = null
}
</script>

<template>
  <div class="bg-wrapper">
    <img v-if="bgimg" :src="bgimg" class="bg" />

    <template v-if="dissolving">
      <img
        v-if="previous"
        :src="previous"
        class="bg dissolve"
        @animationend="onDissolveEnd"
      />
      <div
        v-else
        class="bg dissolve black"
        @animationend="onDissolveEnd"
      />
    </template>
  </div>
</template>

<style scoped>
@property --p {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.bg-wrapper {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: black;
}

.bg {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.black {
  background-color: black;
}

.dissolve {
  z-index: 1;
  mask-image: linear-gradient(290deg, transparent calc(var(--p) - 20%), black var(--p));
  animation: dissolve 0.5s ease-in-out forwards;
}

@keyframes dissolve {
  from { --p: 0%; }
  to   { --p: 120%; }
}
</style>