const SceneTitle = class {
    constructor() {
        this.#clearContainer()
        this.#setup()
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
    }

    #setup() {
        const img = new Image()
        img.src = "../assets/images/title.png"
        img.style.height = "100%"
        img.style.objectFit = "contain"

        container.appendChild(img)

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

        new Iimage(container, "assets/images/start.png", {
            css: {
                top: "20%",
                left: "7%",

                width: "20%",
                height: "10%",

                fontFamily: "tegaki",
                fontSize: "5vh",
                backgroundColor: "white",
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "start-label shake",
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

        new Iimage(container, "assets/images/continue.png", {
            css: {
                top: "25%",
                left: "30%",

                width: "20%",
                height: "10%",

                fontFamily: "tegaki",
                fontSize: "5vh",
                backgroundColor: "white",
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "continue-label shake",
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

        new Iimage(container, "assets/images/delete.png", {
            css: {
                top: "40%",
                left: "65%",

                width: "20%",
                height: "10%",

                fontFamily: "tegaki",
                fontSize: "5vh",
                backgroundColor: "white",
                display: "none",

                border: "#111 solid 0.4vh",
                borderRadius: "1vh",
            },
            className: "delete-label shake",
        })

        startButton.onclick = async () => {
            await fadeOut(1000)
            currentScene = new SceneNovel()
        }

        continueButton.onclick = async () => {
            storyNum = +(localStorage.getItem("save") ?? 0)

            storyIterator = stories[storyNum]()

            await fadeOut(1000)
            currentScene = new SceneNovel()
        }

        deleteButton.onclick = () => {
            localStorage.clear()
            fadeOut(1000)
        }
    }
}

let storyNum = 0
