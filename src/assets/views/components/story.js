import { p11, p21, p22, p31, p32, p33, p41, p42, p43, p44 } from "./Characters/positions"
import { m, a, b, c } from "./Characters/characters"
export function createStory({ speak, story, show, hide, scene }) {

    scene("living_room_n")
    show(m, p11)
    speak("Markiplier?", m)

    // hide(m)
    // story("The story progresses")

    show(m, p21)
    show(a, p22)
    speak("*GASP* MarkipliERS...?\nWhy are there two of you?", m)

    show(m, p31)
    show(a, p32)
    show(b, p33)
    speak("...Oh no...", "Narrator")

    show(m, p41)
    show(a, p42)
    show(b, p43)
    show(c, p44)
    speak("......................\nMarkiplier, Market flyer, Multiplier-", a)

}