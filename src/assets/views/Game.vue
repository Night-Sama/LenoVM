<script setup>
import { ref, reactive } from "vue"
import DialogueBox from "./components/DialogueBox.vue"
import Character from "./components/Character.vue"
import { createStory } from "./components/story.js"

const dialogueBox = ref(null)

const p11 = 50

const p21 = 35
const p22 = 65

const p31 = 25
const p32 = 50
const p33 = 75

const p41 = 15
const p42 = 38
const p43 = 62
const p44 = 85

let m = reactive({
  charactername: "Markiplier",
  position: p11,
  visible: false,
  expression: "b",
  pose: "4"
})

const storyLines = []
let currentLine = 0

function speak(text, name = false) {
  storyLines.push({
    text: text,
    name: name,
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
  // Click while typing: just reveal the full line
  if (dialogueBox.value.getIsTyping()) {
    dialogueBox.value.skipTyping()
    return
  }

  // Otherwise consume lines until one needs a click (speech/story)
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

  // Ran out of lines
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
    hide,
    m
})

</script>

<template>
  <main class="container" @click="next">
    <Character 
      :charactername="m.charactername"
      :position="m.position"
      :visible="m.visible"
      :expression="m.expression"
      :pose="m.pose"
    />
    <DialogueBox ref="dialogueBox" class="dialoguebox"/>
  </main>
</template>

<style scoped>

* {
    user-select: none;
}

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