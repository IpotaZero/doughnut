const SceneMain = class {
    #grid: Ielement[][]
    #step: number

    #src: string
    #size: number
    #reverse: [number, number][]

    #listeners: Iinput[] = []
    #itext: Itext

    #se_save = new Audio("assets/sounds/save.mp3")
    #se_noSave = new Audio("assets/sounds/not-save.mp3")
    #se_clear = new Audio("assets/sounds/clear.mp3")
    #se_wrong = new Audio("assets/sounds/wrong.mp3")

    constructor(src: string, size: number, reverse: [number, number][]) {
        this.#src = src
        this.#size = size
        this.#reverse = reverse

        this.#resetGame()
    }

    #resetGame() {
        // 画面をクリア
        this.#clearContainer()

        // 手数
        this.#step = this.#reverse.length

        // 盤面
        this.#grid = Array.from({ length: this.#size }, () => [])

        this.#listeners = []

        this.#setupResetButton()
        this.#setupGrid()
        this.#setupStepText()
    }

    #setupResetButton() {
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

            this.#resetGame()
        }
    }

    #setupGrid() {
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

        Iloop([0, 0], [this.#size - 1, this.#size - 1], (r, c) => {
            //  背景
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

            // セル
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

            // セルをクリックしたとき
            this.#listeners.push(
                new Iinput(cell, "click", () => {
                    this.#step--
                    this.#itext.innerText = `残り: ${this.#step}`
                    this.#onClick(r, c)
                })
            )

            this.#grid[r][c] = cell
        })

        // パズルを作る
        this.#reverse.forEach(([r, c]) => {
            this.#onClick(r, c)
        })
    }

    #setupStepText() {
        this.#itext = new Itext(container, `残り: ${this.#step}`, {
            css: {
                top: "10%",
            },
        })
    }

    // ひっくり返す
    #onClick(r: number, c: number) {
        Iloop([r - 1, c - 1], [r + 1, c + 1], (R, C) => {
            const isInRange = 0 <= R && R <= this.#size - 1 && 0 <= C && C <= this.#size - 1
            if (!isInRange) return

            this.#grid[R][C].classList.toggle("reversed")
        })

        // 全て表の時
        if (this.#grid.flat().every((cell) => !cell.classList.contains("reversed"))) {
            this.#end()
            return
        }

        // 負け
        if (this.#step == 0) {
            this.#lose()
        }
    }

    async #lose() {
        this.#se_wrong.play()

        this.#listeners.forEach((l) => {
            l.remove()
        })

        await sleep(500)
        await fadeOut(500)

        this.#resetGame()
    }

    async #end() {
        this.#se_clear.play()

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
            this.#se_save.play()
            itext.innerHTML = "Saveしました"

            storyNum++
            localStorage.setItem("save", "" + storyNum)

            await sleep(2000)
            await fadeOut(1000)

            currentScene = new SceneNovel()
        })

        icommand.on("1", async () => {
            this.#se_noSave.play()
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
