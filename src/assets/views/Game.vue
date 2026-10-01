<script setup>
import { ref } from "vue"
import DialogueBox from "./components/DialogueBox.vue"
import Character from "./components/Character.vue"
import Background from "./components/Background.vue"
import { createStory } from "./components/story.js"
import { p11 } from "./components/Characters/positions.js"
import { charlist } from "./components/Characters/characters.js"

const dialogueBox = ref(null)
const background = ref(null)

const storyLines = []
let currentLine = 0
let isWaiting
const skip = true

function interrupt(percentage = 50) {
  return percentage / 100
}

function say(text, char = false, interrupted = false) {
  const charname = typeof char === "object" ? char.charactername : char
  storyLines.push({
    text: text,
    name: charname,
    type: "speech",
    interruption: interrupted
  })
}

function story(text, char = false, interrupted = false) {
  const charname = typeof char === "object" ? char.charactername : char
  storyLines.push({
    text: text,
    name: charname,
    type: "story",
    interruption: interrupted
  })
}

function next() {
  if (isWaiting) return

  if (dialogueBox.value.getIsTyping()) {
    dialogueBox.value.skipTyping()
    return
  }
  

  while (currentLine < storyLines.length) {
    const line = storyLines[currentLine++]
    let interrupted
    let thisLine = line.text

    if ((line.type === "speech" || line.type === "story") && line.interruption) {
      interrupted = true
      thisLine = line.text.slice(0, line.text.length * line.interruption)
    }

    if (line.type === "show") {
      line.character.position = line.position
      line.character.pose = line.pose
      line.character.expression = line.expression
      line.character.visible = true
      continue
    }

    if (line.type === "hide") {
      line.character.visible = false
      continue
    }

    if (line.type === "scene") {
      background.value = line.name
      continue
    }

    if (line.type === "wait") {
      isWaiting = true
      if (isWaiting) {
        setTimeout(() => {
          isWaiting = false
          next()
        }, line.duration)
      }
      return
    }

    if (interrupted === true) {
      dialogueBox.value.speak(thisLine, line.name, interrupted, line.type,)
      autoAdvance(0)
    } else {
      dialogueBox.value.speak(thisLine, line.name, false, line.type)
    }
    const upcoming = storyLines[currentLine]
    if (line.type === "wait" && upcoming.initial) {
      currentLine++
      autoAdvance(upcoming.duration)
    }
    return
  }
  dialogueBox.value.hideBox()
}

function show(char, position = p11, pose = "4", expression = "b") {
  storyLines.push({
    type: "show",
    character: char,
    position: position,
    pose: pose,
    expression: expression
  })
}

function hide(charname) {
  storyLines.push({
    type: "hide",
    character: charname
  })
}

function scene(name) {
  storyLines.push({ type: "scene", name })
}

function wait(seconds, initial) {
  storyLines.push({
    type: "wait",
    duration: seconds * 1000,
    initial: initial
  })
}

function autoAdvance(duration) {
  isWaiting = true
  next()
  const check = setInterval(() => {
    if (!dialogueBox.value.getIsTyping()) {
      clearInterval(check)
      setTimeout(() => {
        isWaiting = false
        next()
      }, duration)
    }
  }, 50)
}

createStory({
  say,
  story,
  show,
  hide,
  scene,
  wait,
  skip,
  interrupt
})

</script>

<template>
  <main class="container" @click="next">
    <!-- <div class="guides">
      <div v-for="p in [15, 38, 62, 85]" :key="p"
          :style="{ left: (p + 2) + 'vw'}" class="guide">{{ p }}</div>
    </div> -->
    <Background :bgname="background" />
    <Character v-for="char in charlist"
      :charactername="char.charactername"
      :position="char.position"
      :visible="char.visible"
      :expression="char.expression"
      :pose="char.pose"
    />
    <DialogueBox ref="dialogueBox" class="dialoguebox"/>
  </main>
</template>

<style scoped>

* {
    user-select: none;
}

/* .guides { 
  position: fixed;
  inset: 0;
  pointer-events: none; 
  z-index: 99999; }

.guide { 
  position: fixed; 
  top: 0; 
  bottom: 0; 
  transform: translateX(-100%);
  border-left: 1px solid red;
         color: red; font-size: 12px; } */

.container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
}

.dialoguebox {
  z-index: 9999999;
}
</style>