const SceneTitle = class {
    #se_click = new Audio("assets/sounds/クリック.mp3")

    constructor() {
        this.#se_click.load()

        this.#clearContainer()
        this.#setupBackground()
        this.#setupAnime()
        this.#setupButton()
        this.#setupLabel()
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
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
        })
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
        })

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
        })
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
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "start-label shake",
        })

        new Itext(container, "つづきから", {
            css: {
                top: "25%",
                left: "30%",

                width: "18%",
                height: "8%",

                fontFamily: "tegaki",
                fontSize: "4vh",
                backgroundColor: "white",
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "continue-label shake",
        })

        new Itext(container, "でーたをけす", {
            css: {
                top: "40%",
                left: "65%",

                width: "18%",
                height: "8%",

                fontFamily: "tegaki",
                fontSize: "4vh",
                backgroundColor: "white",
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "delete-label shake",
        })
    }

    #setupButton() {
        const startButton = new Ielement(container, {
            css: {
                top: "20%",
                left: "12%",
                width: "12%",
                height: "80%",

                cursor: "pointer",

                ":hover ~ .start-label": {
                    display: "flex",
                },
            },
        })

        const continueButton = new Ielement(container, {
            css: {
                top: "30%",
                left: "28%",
                width: "25%",
                height: "65%",

                cursor: "pointer",

                ":hover ~ .continue-label": {
                    display: "flex",
                },
            },
        })

        const deleteButton = new Ielement(container, {
            css: {
                top: "45%",
                left: "58%",
                width: "30%",
                height: "40%",

                cursor: "pointer",

                ":hover ~ .delete-label": {
                    display: "flex",
                },
            },
        })

        startButton.onclick = async () => {
            this.#se_click.play()

            storyNum = 0

            storyIterator = stories[0]()

            await fadeOut(1000)
            currentScene = new SceneNovel()
        }

        continueButton.onclick = async () => {
            this.#se_click.play()

            storyNum = +(localStorage.getItem("save") ?? 0)

            storyIterator = stories[storyNum]()

            await fadeOut(1000)
            currentScene = new SceneNovel()
        }

        deleteButton.onclick = () => {
            this.#se_click.play()

            localStorage.clear()
            fadeOut(1000)
        }
    }
}

let storyNum = 0
