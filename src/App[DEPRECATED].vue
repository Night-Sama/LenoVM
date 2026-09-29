<script setup>
import { ref } from "vue";
import './assets/style.css'


const textBoxText = ref("")
const nameBoxText = ref("")
const textBoxIsVisible = ref(false)
const nameIsVisible = ref(false)

let speech = ["Hello everybody, my name is Welcome (welcome.).", "i am making a super cool game"]
let progress = 0

const toggleBoxVisibility = () => {
  textBoxIsVisible.value = !textBoxIsVisible.value
}

const toggleNameVisibility = () => {
  nameIsVisible.value = !nameIsVisible.value
}


let isTyping = false
let typingInterval = null

function speak(text, name = false, type = "default", speed = 30) {

  if (!textBoxIsVisible.value) {
    toggleBoxVisibility()
  }

  if (progress >= speech.length) {
    textBoxIsVisible.value = !textBoxIsVisible.value
    return
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

  if (isTyping) {
    clearInterval(typingInterval)
    if (type === "speech") {
      textBoxText.value = `\"${text}\"`
    } else {
      textBoxText.value = text
    }
    
    isTyping = false
    progress++
    return
  } else {
    
    if (type === "speech") {
      textBoxText.value = "\""
    } else {
      textBoxText.value = ""
    }
    isTyping = true

    let index = 0

    typingInterval = setInterval(() => {
      if (index < text.length) {
        textBoxText.value += text[index]
        index++
      } else {
        if (type == "speech") {
          textBoxText.value += "\""
        }
        clearInterval(typingInterval)
        isTyping = false
        progress++
      }
    }, speed)
  }
}



</script>

<template>
	<main class="container">
    <button @click="toggleBoxVisibility()">
      {{ textBoxIsVisible ? 'Hide Box' : 'Show Box' }}
    </button>
    <button @click="toggleNameVisibility()">
      {{ nameIsVisible ? 'Hide Name' : 'Show Name' }}
    </button>
    <button @click="speak(speech[progress], 'Mark', 'speech')">
      Next
    </button>
    <button @click="progress = 0">
      Reset
    </button>
    <Transition name="fade">
      <div id="textboxmain" v-show="textBoxIsVisible">
        <div id="nameBox" :style="{ visibility: nameIsVisible ? 'visible' : 'hidden' }">
          {{nameBoxText}}
        </div>
        <div id="textbox">
          {{ textBoxText }}
        </div>
      </div>
    </Transition>
	</main>
</template>

<style scoped>

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
}

#textbox {
  height: 30vh;
  width: 70vw;
  border-width: 0.3vw;
  border-radius: 1vw;
  margin: 0 auto auto auto;
  padding: 1%;
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
}

button {
  border: 1vh solid black;
  border-radius: 2vh;
  padding: 0.5vh;
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
