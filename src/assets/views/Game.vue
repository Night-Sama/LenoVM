<script setup>
import { ref, reactive } from "vue"
import DialogueBox from "./components/DialogueBox.vue"
import Character from "./components/Character.vue"
import { createStory } from "./components/story.js"
import { p11 } from "./components/Characters/positions.js"
import { charlist } from "./components/Characters/characters.js"

const dialogueBox = ref(null)

const storyLines = []
let currentLine = 0

function speak(text, char = false) {
  const charname = typeof char === "object" ? char.charactername : char
  storyLines.push({
    text: text,
    name: charname,
    type: "speech"
  })
}

function story(text) {
  storyLines.push({
    text: text,
    name: false,
    type: "story"
  })
}

// function next() {
//   if (currentLine >= storyLines.length) {
//     dialogueBox.value.hideBox()
//     return
//   }

//   const line = storyLines[currentLine]

//   if (line.type === "show") {
//     line.character.position = line.position
//     line.character.pose = line.pose
//     line.character.expression = line.expression
//     line.character.visible = true

//     currentLine++
//     next()
//     return
//   } else if (line.type === "hide") {
//     line.character.visible = false

//     currentLine++
//     next()
//     return
//   } else {

//     dialogueBox.value.speak(
//       line.text,
//       line.name,
//       line.type
//     )

//     if (!dialogueBox.value.getIsTyping()) {
//       currentLine++
//     }
//   }
// }

function next() {
  if (dialogueBox.value.getIsTyping()) {
    dialogueBox.value.skipTyping()
    return
  }

  while (currentLine < storyLines.length) {
    const line = storyLines[currentLine++]

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

    dialogueBox.value.speak(line.text, line.name, line.type)
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

// function show(character, position = p11, pose = "4", expression = "b") {
//   character.position = position
//   character.pose = pose
//   character.expression = expression
//   character.visible = true
// }

function hide(charname) {
  storyLines.push({
    type: "hide",
    character: charname
  })
}

createStory({
    speak,
    story,
    show,
    hide
})

</script>

<template>
  <main class="container" @click="next">
    <!-- <div class="guides">
      <div v-for="p in [15, 38, 62, 85]" :key="p"
          :style="{ left: (p + 2) + 'vw'}" class="guide">{{ p }}</div>
    </div> -->
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