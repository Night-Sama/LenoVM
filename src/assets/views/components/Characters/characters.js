import { reactive } from "vue"
import { p11 } from "./positions.js"

function makeCharacter(charactername) {
  return reactive({
    charactername,
    position: p11,
    visible: false,
    expression: "b",
    pose: "4"
  })
}

export const m = makeCharacter("Markiplier")
export const a = makeCharacter("Markiplier")
export const b = makeCharacter("Markiplier")
export const c = makeCharacter("Markiplier")

export const charlist = [m, a, b, c]