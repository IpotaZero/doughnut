"use strict";
const container = document.getElementById("container");
if (!container)
    throw new Error("no container");
let interval = 0;
let currentScene;
document.addEventListener("DOMContentLoaded", () => {
    currentScene = new SceneTitle();
});
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
//# sourceMappingURL=run.js.map