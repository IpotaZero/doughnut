"use strict";
let isFirst = false;
const SceneTitle = class {
    constructor() {
        this.#clearContainer();
        this.#setup();
    }
    #clearContainer() {
        ;
        [...container.children].forEach((c) => c.remove());
        [...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove());
    }
    #setup() {
        const img = new Image();
        img.src = "../assets/images/title.png";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        container.appendChild(img);
        if (isFirst)
            return;
        isFirst = true;
        const startButton = new Ielement(container, {
            css: {
                top: "20%",
                left: "10%",
                width: "15%",
                height: "80%",
                cursor: "pointer",
            },
        });
        startButton.tabIndex = 1;
        startButton.onkeydown = (e) => {
            if (["Enter", "KeyZ", "Space"].includes(e.code)) {
                startButton.click();
            }
        };
        startButton.onclick = async () => {
            await fadeOut(1000);
            currentScene = new SceneNovel();
        };
    }
};
//# sourceMappingURL=SceneTitle.js.map