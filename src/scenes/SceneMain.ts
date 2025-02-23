const SceneMain = class {
    #grid: Ielement[][]
    #step: number

    #src: string
    #size: number
    #reverse: [number, number][]

    #listeners: Iinput[] = []
    #itext: Itext

    #se_clear = new Audio("assets/sounds/win.wav")
    #bgm = new IBGM("assets/sounds/puzzle.wav")

    constructor(src: string, size: number, reverse: [number, number][]) {
        this.#bgm.fetch()
        this.#bgm.play()

        this.#src = src
        this.#size = size
        this.#reverse = reverse

        this.#setSoundVolume()
        this.#resetGame()
    }

    #setSoundVolume() {
        this.#se_clear.volume = 0.5
    }

    #resetGame() {
        // 画面をクリア
        this.#clearContainer()

        new Ielement(container, {
            css: {
                width: "100%",
                height: "100%",
                backgroundImage: "url(assets/images/background.png)",
                backgroundSize: "10%",
            },
        })

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

                fontFamily: "dot",
                fontSize: "4vh",

                // borderRadius: "1vh",
                border: "#f4f4f4 solid 0.5vh",

                // backgroundColor: "#f4f4f4",

                color: "#f4f4f4",

                ":hover": {
                    // opacity: "0.5",
                    backgroundColor: "#1118",
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
                    border: "#f4f4f4 0.5vh solid",

                    boxSizing: "content-box",
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
                    border: "#f4f4f4 0.5vh solid",

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

                    ":hover": {
                        cursor: "pointer",
                    },
                },
            })

            // セルをクリックしたとき
            this.#listeners.push(
                new Iinput(cell, "click", () => {
                    this.#step--
                    this.#itext.innerText = `のこり: ${this.#step}`
                    this.#onClick(r, c)

                    // this.#se_roll.play()
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
        this.#itext = new Itext(container, `のこり: ${this.#step}`, {
            css: {
                top: "15%",
                fontFamily: "dot",
                color: "#f4f4f4",
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
        // this.#se_wrong.play()

        this.#listeners.forEach((l) => {
            l.remove()
        })

        await sleep(500)
        await fadeOut(500)

        this.#resetGame()
    }

    async #end() {
        this.#bgm.fadeout(5000)

        this.#listeners.forEach((l) => {
            l.remove()
        })

        await sleep(500)

        this.#grid.flat().forEach((cell) => {
            cell.classList.add("remove-border")
        })

        await sleep(1000)
        this.#se_clear.play()
        await sleep(1000)

        await fadeOut(1000)

        this.#clearContainer()

        let itext = new Itext(container, "Saveしますか?", { css: { fontFamily: "dot" } })

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

                    fontFamily: "dot",

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
            itext.remove()

            itext = new Itext(container, "Saveしました", {
                css: {
                    fontFamily: "dot",
                },
            })

            storyNum++
            localStorage.setItem("save", "" + storyNum)

            await sleep(2000)
            await fadeOut(1000)

            currentScene = new SceneNovel()
        })

        icommand.on("1", async () => {
            itext.remove()

            itext = new Itext(container, "Saveしませんでした", {
                css: {
                    fontFamily: "dot",
                },
            })

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
