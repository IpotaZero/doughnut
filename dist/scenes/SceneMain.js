"use strict";
const SceneMain = class {
    constructor() {
        this.#clearContainer();
        this.#game();
    }
    #game() {
        const { value, done } = questionsIterator.next();
        if (done) {
            currentScene = new SceneTitle();
            return;
        }
        const [text, images, answer] = value;
        const imgContainer = new Ielement(container, {
            css: {
                width: "100%",
                height: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${images.length}, auto)` /* n列 */,
                gridTemplateRows: "repeat(1, auto)" /* 1行 */,
                gap: "12%",
                // padding: "20%",
            },
        });
        images.forEach((image, j) => {
            const img = new Iimage(imgContainer, `../assets/images/${image}.png`, {
                css: {
                    height: "40%",
                    cursor: "pointer",
                    ":hover": {
                        opacity: "0.5",
                    },
                    " img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: "drop-shadow(-5px 5px 5px #aaa8)",
                    },
                },
            });
            img.tabIndex = j + 1;
            img.onkeydown = (e) => {
                if (["KeyZ", "Space", "Enter"].includes(e.code)) {
                    img.click();
                }
                else if (e.code == "ArrowRight") {
                    ;
                    imgContainer.children[(j + 1) % 3]?.focus();
                }
                else if (e.code == "ArrowLeft") {
                    ;
                    imgContainer.children[(j + 2) % 3]?.focus();
                }
            };
            img.onclick = () => {
                if (j == answer) {
                    this.#onClear();
                }
            };
        });
        new Itext(container, text, {
            css: {
                bottom: "5%",
            },
        });
    }
    async #onClear() {
        await fadeOut(1000);
        currentScene = new SceneNovel();
    }
    #clearContainer() {
        ;
        [...container.children].forEach((c) => c.remove());
        [...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove());
    }
};
const questions = function* () {
    yield ["ドーナツと同相なのはどれ?", ["mug", "p-bottle"], 0];
    yield ["パンツと同相なのはどれ?", ["d-ring", "t-ring"], 0];
    yield ["私と同相なのはどれ?", ["S", "T"], 1];
    yield ["私と同相なのはどれ?", ["S", "T"], 1];
    yield ["私と同相なのはどれ?", ["S", "T"], 1];
};
const questionsIterator = questions();
//# sourceMappingURL=SceneMain.js.map