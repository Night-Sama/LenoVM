<script setup>

import { computed } from 'vue'

const props = defineProps({
    charactername: String,
    pose: {
        type: String,
        default: "4"
    },
    expression: {
        type: String,
        default: "b"
    },
    position: {
        type: Number,
        default: 50
    },
    visible: {
        type: Boolean,
        default: false
    }
})

const images = import.meta.glob(
  '/src/assets/views/components/Characters/**/*.{png,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' }
)


const headimg = computed(() =>
  images[`/src/assets/views/components/Characters/${props.charactername}/Expressions/${props.expression}.png`]
)
const bodyimg = computed(() =>
  images[`/src/assets/views/components/Characters/${props.charactername}/Poses/${props.pose}.png`]
)

</script>

<template>

    <Transition name="character-fade">
        <div
            v-if="props.visible"
            class="character-container"
            :style="{ left: (2 + props.position) + 'vw' }"
        >
            <div class="character">
                <img class="head" :src="headimg">
                <img class="body" :src="bodyimg">
            </div>
        </div>
    </Transition>

</template>

<style scoped>



* {
    user-select: none;
}

.character-container {
    position: absolute;
    height: 90vh;
    width: 90vh;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 500;
    transition: left 0.2s ease;
}

.character {
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transform-origin: bottom center;
}

.head {
    position: absolute;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.body {
    position: absolute;
    height: 100%;
    z-index: 1;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.character-fade-enter-active,
.character-fade-leave-active {
    transition: opacity 0.1s ease;
}
.character-fade-enter-from,
.character-fade-leave-to {
    opacity: 0;
}

.character-fade-enter-active .character,
.character-fade-leave-active .character {
    transition: transform 0.2s ease;
}

.character-fade-enter-from .character,
.character-fade-leave-to .character {
    transform: scale(0.6);
}
</style>