import { p11, p21, p22, p31, p32, p33, p41, p42, p43, p44 } from "./Characters/positions"
import { m, a, b, c } from "./Characters/characters"
export function createStory({ say, story, show, hide, scene, wait, skip, interrupt, tbox, every }) {

    scene("living_room_n")
    wait(0.25)
    show(m, p11)
    say("Markiplier?", m)

    // hide(m)
    // story("The story progresses")

    show(m, p21)
    wait(0.5)
    show(a, p22)
    wait(0.5)
    say("*GASP* MarkipliERS...?\nWhy are there two of you?", m, interrupt(50))

    hide(tbox)
    hide(every)
    scene("yuri_bedroom")
    wait(0.25)

    show(m, p31)
    show(a, p32)
    show(b, p33)
    wait(0.25)
    // wait(1.5)
    say("...Oh no...", "Narrator")

    show(m, p41)
    show(a, p42)
    show(b, p43)
    show(c, p44)
    wait(1)
    say("...Markiplier, Market flyer, Multiplier-", a)

}