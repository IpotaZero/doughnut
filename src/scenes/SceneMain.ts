const SceneMain = class {
    #grid: Ielement[][]
    #step: number

    #src: string
    #size: number
    #reverse: [number, number][]

    #listeners: Iinput[] = []
    #itext: Itext

    constructor(src: string, size: number, reverse: [number, number][]) {
        this.#clearContainer()

        this.#src = src
        this.#size = size
        this.#reverse = reverse

        this.#setupElement()
    }

    #setupElement() {
        const resetButton = new Itext(container, "りせっと", {
            css: {
                width: "13%",
                height: "8%",

                top: "10%",
                left: "4%",

                fontFamily: "tegaki",
                fontSize: "4vh",

                borderRadius: "1vh",
                border: "#111 solid 0.4vh",

                ":hover": {
                    backgroundColor: "#1114",
                    cursor: "pointer",
                },
            },
        })

        resetButton.onclick = async () => {
            this.#listeners.forEach((l) => {
                l.remove()
            })

            await fadeOut(500)

            this.#clearContainer()
            this.#setupElement()
        }

        this.#step = this.#reverse.length

        const grid = new Ielement(container, {
            css: {
                height: "50%",
                aspectRatio: "1",
                display: "grid",
                gridTemplateColumns: `repeat(${this.#size}, 1fr)`,
                gridTemplateRows: `repeat(${this.#size}, 1fr)`,

                backgroundColor: "#111",
            },
        })

        this.#grid = this.#grid = Array.from({ length: this.#size }, () => [])

        Iloop([0, 0], [this.#size - 1, this.#size - 1], (r, c) => {
            new Ielement(grid, {
                css: {
                    width: "100%",
                    height: "100%",
                    gridRow: `${r + 1}/${r + 2}`,
                    gridColumn: `${c + 1}/${c + 2}`,

                    backgroundColor: "lightGray",
                    border: "azure 1px solid",
                },
            })

            const cell = new Ielement(grid, {
                css: {
                    width: "100%",
                    height: "100%",
                    gridRow: `${r + 1}/${r + 2}`,
                    gridColumn: `${c + 1}/${c + 2}`,

                    backgroundColor: "#111",
                    border: "azure 1px solid",

                    backgroundImage: `url(${this.#src})`,
                    backgroundSize: `${100 * this.#size}% ${100 * this.#size}%`,
                    backgroundPositionX: `${(100 / (this.#size - 1)) * c}%`,
                    backgroundPositionY: `${(100 / (this.#size - 1)) * r}%`,

                    transition: "transform 0.5s, opacity 0s 0.15s, border 1s",

                    boxSizing: "content-box",

                    ".reversed": {
                        transform: "rotateY(180deg)",
                        opacity: "0",
                    },

                    ".remove-border": {
                        transition: "all 1s",
                        borderColor: "rgba(0,0,0,0)",
                    },
                },
            })

            this.#listeners.push(
                new Iinput(cell, "click", () => {
                    this.#step--
                    this.#itext.innerText = `残り: ${this.#step}`
                    this.#onClick(r, c)
                })
            )

            this.#grid[r][c] = cell
        })

        this.#itext = new Itext(container, `残り: ${this.#step}`, {
            css: {
                top: "10%",
            },
        })

        this.#reverse.forEach(([r, c]) => {
            this.#onClick(r, c)
        })
    }

    #onClick(r: number, c: number) {
        Iloop([r - 1, c - 1], [r + 1, c + 1], (R, C) => {
            const isInRange = 0 <= R && R <= this.#size - 1 && 0 <= C && C <= this.#size - 1
            if (!isInRange) return

            this.#grid[R][C].classList.toggle("reversed")
        })

        if (this.#grid.flat().every((cell) => !cell.classList.contains("reversed"))) {
            this.#end()
            return
        }

        if (this.#step == 0) {
            this.#reset()
        }
    }

    async #reset() {
        this.#listeners.forEach((l) => {
            l.remove()
        })

        await sleep(500)
        await fadeOut(500)

        this.#clearContainer()
        this.#setupElement()
    }

    async #end() {
        this.#listeners.forEach((l) => {
            l.remove()
        })

        await sleep(500)

        this.#grid.flat().forEach((cell) => {
            cell.classList.add("remove-border")
        })

        await sleep(1000)

        new Itext(container, "次へ", {
            css: {
                top: "80%",
            },
        })

        await waitOK()

        this.#clearContainer()

        const itext = new Itext(container, "Saveしますか?", { css: { top: "50%" } })

        const icommand = new Icommand(
            container,
            new Idict({
                "": ["はい", "いいえ"],
            }),
            {
                css: {
                    top: "60%",
                    width: "30%",
                    height: "20%",

                    display: "block",

                    " .i-command-option": {
                        position: "relative",
                        width: "100%",
                        height: "50%",

                        borderRadius: "6vh",

                        ":hover": {
                            backgroundColor: "#1114",
                            cursor: "pointer",
                        },
                    },
                },
            }
        )

        icommand.on("0", async () => {
            itext.innerHTML = "Saveしました"

            await sleep(2000)
            await fadeOut(1000)
            currentScene = new SceneNovel()

            storyNum++
            localStorage.setItem("save", "" + storyNum)
        })

        icommand.on("1", async () => {
            itext.innerHTML = "Saveしませんでした"

            await sleep(2000)
            await fadeOut(1000)
            currentScene = new SceneNovel()
        })
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
    }
}
