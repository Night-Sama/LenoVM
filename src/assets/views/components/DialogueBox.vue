<script setup>
import { ref, onUnmounted } from "vue";
import '../../style.css'

const textBoxText = ref("")
const nameBoxText = ref("")
const textBoxIsVisible = ref(false)
const nameIsVisible = ref(false)

const toggleBoxVisibility = () => {
  textBoxIsVisible.value = !textBoxIsVisible.value
}

const toggleNameVisibility = () => {
  nameIsVisible.value = !nameIsVisible.value
}

let isTyping = false
let typingInterval = null
let fullText = ""

function speak(text, name = false, interruption = false, type = "default", speed = 30) {
  clearInterval(typingInterval)

  if (!textBoxIsVisible.value) {
    toggleBoxVisibility()
  }

  if (name) {
    nameBoxText.value = name
    nameIsVisible.value = true
    if (type === "default") {
      type = "speech"
    }
  } else {
    nameIsVisible.value = false
  }

  fullText = type === "speech" ? (interruption ? `"${text}` : `"${text}"`) : text
  textBoxText.value = ""
  isTyping = true

  let index = 0
  typingInterval = setInterval(() => {
    index++
    textBoxText.value = fullText.slice(0, index)

    if (index >= fullText.length) {
      clearInterval(typingInterval)
      isTyping = false
    }
  }, speed)
}

function skipTyping() {
  clearInterval(typingInterval)
  textBoxText.value = fullText
  isTyping = false
}

function getIsTyping() {
  return isTyping
}

function hideBox() {
  textBoxIsVisible.value = false
}

onUnmounted(() => clearInterval(typingInterval))

defineExpose({
  speak,
  skipTyping,
  getIsTyping,
  hideBox
})

</script>

<template>
  <main class="container">
    <button @click.stop="toggleBoxVisibility()">
      {{ textBoxIsVisible ? 'Hide Box' : 'Show Box' }}
    </button>
    <button @click.stop="toggleNameVisibility()">
      {{ nameIsVisible ? 'Hide Name' : 'Show Name' }}
    </button>
    <Transition name="fade">
      <div id="textboxmain" v-show="textBoxIsVisible">
        <div id="nameBox" :style="{ visibility: nameIsVisible ? 'visible' : 'hidden' }">
          {{ nameBoxText }}
        </div>
        <div id="textbox">
          {{ textBoxText }}
        </div>
      </div>
    </Transition>
  </main>
</template>

<style scoped>

* {
    user-select: none;
}

#textboxmain {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 42vh;
  width: 70vw;
  margin: 0 auto 0 auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2.5vw;
  font-weight: 500;
  padding: 1%;
  border-style: solid;
  z-index: 999;
}

#textbox {
  height: 30vh;
  width: 70vw;
  border-width: 0.3vw;
  border-radius: 1vw;
  margin: 0 auto auto auto;
  padding: 1%;
  background-color: white;
}

#nameBox {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 2.5vw;
  overflow: hidden;
  height: 10vh;
  width: fit-content;
  min-width: 12vw;
  max-width: 20vw;
  border-width: 0.3vw;
  border-radius: 1vw;
  border-bottom: 0;
  padding: 1%;
  background-color: white;
}

button {
  border: 1vh solid black;
  border-radius: 2vh;
  padding: 0.5vh;
  background-color: white;
}

button:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>