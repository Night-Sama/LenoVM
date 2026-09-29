export function createStory({ speak, story, show, hide, m }) {
    show(m, 50, "2", "r")
    speak("Hello everybody, my name is Welcome.", "Markiplier")

    hide(m)
    story("He shits himself profusely")

    show(m)
    speak("Markiplier.", "Markiplier")
}