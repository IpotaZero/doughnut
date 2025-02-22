const container = document.getElementById("container") as HTMLDivElement
if (!container) throw new Error("no container")

let interval = 0
let currentScene: Scene

document.addEventListener("DOMContentLoaded", () => {
    currentScene = new ScenePreTitle()
})

type Scene = {}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})
