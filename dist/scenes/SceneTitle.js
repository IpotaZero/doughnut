"use strict";
const SceneTitle = class {
    #se_click = new Audio("assets/sounds/クリック.mp3");
    #bgm = new IBGM("assets/sounds/title.wav");
    constructor() {
        this.#se_click.load();
        this.#startBGM();
        this.#clearContainer();
        this.#setupBackground();
        this.#setupAnime();
        this.#setupButton();
        this.#setupLabel();
    }
    async #startBGM() {
        await this.#bgm.fetch();
        this.#bgm.reset();
        this.#bgm.play();
    }
    #clearContainer() {
        ;
        [...container.children].forEach((c) => c.remove());
        [...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove());
    }
    #setupBackground() {
        new Iimage(container, "../assets/images/title.png", {
            css: {
                width: "100%",
                height: "100%",
                " img": {
                    height: "100%",
                    objectFit: "contain",
                },
            },
        });
    }
    #setupAnime() {
        new Ianime(container, ["assets/images/batsu0.png", "assets/images/batsu1.png"], {
            css: {
                top: "10%",
                left: "3%",
                width: "10%",
                aspectRatio: "1",
                " img": {
                    objectFit: "cover",
                },
                " .hide": {
                    display: "none",
                },
            },
            fps: 24,
            frames: [24, 24],
        });
        new Ianime(container, ["assets/images/batsu0.png", "assets/images/batsu1.png"], {
            css: {
                bottom: "10%",
                right: "3%",
                width: "10%",
                aspectRatio: "1",
                " img": {
                    objectFit: "cover",
                },
                " .hide": {
                    display: "none",
                },
            },
            fps: 24,
            frames: [24, 24],
        });
    }
    #setupLabel() {
        new Itext(container, "はじめから", {
            css: {
                top: "20%",
                left: "7%",
                width: "18%",
                height: "8%",
                fontFamily: "tegaki",
                fontSize: "4vh",
                backgroundColor: "white",
                opacity: "0",
                transition: "all 0.5s",
                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "start-label shake",
        });
        new Itext(container, "つづきから", {
            css: {
                top: "25%",
                left: "30%",
                width: "18%",
                height: "8%",
                fontFamily: "tegaki",
                fontSize: "4vh",
                backgroundColor: "white",
                opacity: "0",
                transition: "all 0.5s",
                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "continue-label shake",
        });
        new Itext(container, "くれじっと", {
            css: {
                top: "40%",
                left: "65%",
                width: "18%",
                height: "8%",
                fontFamily: "tegaki",
                fontSize: "4vh",
                backgroundColor: "white",
                opacity: "0",
                transition: "all 0.5s",
                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "delete-label shake",
        });
    }
    #setupButton() {
        const startButton = new Ielement(container, {
            css: {
                top: "20%",
                left: "12%",
                width: "12%",
                height: "80%",
                cursor: "pointer",
                zIndex: "2",
                ":hover ~ .start-label": {
                    opacity: "1",
                },
            },
        });
        const continueButton = new Ielement(container, {
            css: {
                top: "30%",
                left: "28%",
                width: "25%",
                height: "65%",
                cursor: "pointer",
                zIndex: "2",
                ":hover ~ .continue-label": {
                    opacity: "1",
                },
            },
        });
        const deleteButton = new Ielement(container, {
            css: {
                top: "45%",
                left: "58%",
                width: "30%",
                height: "40%",
                cursor: "pointer",
                zIndex: "2",
                ":hover ~ .delete-label": {
                    opacity: "1",
                },
            },
        });
        startButton.onclick = async () => {
            this.#se_click.play();
            storyNum = 0;
            storyIterator = stories[0]();
            this.#bgm.fadeout(1000);
            await fadeOut(1000);
            currentScene = new SceneNovel();
        };
        continueButton.onclick = async () => {
            this.#se_click.play();
            storyNum = +(localStorage.getItem("save") ?? 0);
            storyIterator = stories[storyNum]();
            this.#bgm.fadeout(1000);
            await fadeOut(1000);
            currentScene = new SceneNovel();
        };
        const credit = new Itext(container, `
                Credit: <br>
                Font: <a href="https://hicchicc.github.io/00ff/" target="_blank">x10y12pxDonguriDuel</a> <br> 
                Font: <a href="http://blog.masuseki.com/?p=197" target="_blank">みちます</a> <br> 
                SE: <a href="https://soundeffect-lab.info/" target="_blank">効果音ラボ</a> <br>
                制作: MCR
            `, {
            css: {
                width: "80%",
                height: "80%",
                backgroundColor: "#f4f4f4",
                borderRadius: "6vh",
                padding: "10%",
                zIndex: "10",
                display: "none",
                ".display": {
                    display: "inline",
                },
            },
        });
        const closeButton = new Itext(credit, "&times;", {
            css: {
                top: "3%",
                left: "3%",
                fontSize: "8vh",
                ":hover": {
                    opacity: "0.5",
                    cursor: "pointer",
                },
            },
        });
        closeButton.onclick = () => {
            this.#se_click.play();
            credit.classList.remove("display");
        };
        deleteButton.onclick = () => {
            this.#se_click.play();
            credit.classList.add("display");
        };
    }
};
let storyNum = 0;
//# sourceMappingURL=SceneTitle.js.map