const [w, h] = [1440, 810]

const SceneMain = class {
    #notes: number[]
    #originNotes: number[]
    #startTime = Date.now()
    #score = 0
    #itext: Itext
    #sound = new Audio("assets/sounds/se_touch.wav")
    #targetScore: number

    #interval = 0

    constructor(targetScore: number, notes: number[]) {
        this.#clearContainer()

        this.#originNotes = [...notes]
        this.#notes = [...notes]
        this.#targetScore = targetScore

        this.#itext = new Itext(container, "タイミングよくZを押す", {
            css: {
                top: "14%",
                left: "8%",
            },
        })

        new Itext(container, `Target Score: ${targetScore}`, {
            css: {
                top: "8%",
                left: "8%",
            },
        })

        const cvs = document.createElement("canvas")
        cvs.width = w
        cvs.height = h

        container.appendChild(cvs)

        const ctx = cvs.getContext("2d", {
            willReadFrequently: true,
        })!

        this.#interval = setInterval(() => {
            this.#update(ctx)
        }, 1000 / 60)
    }

    #update(ctx: CanvasRenderingContext2D) {
        const elapsed = Date.now() - this.#startTime

        ctx.clearRect(0, 0, w, h)

        ctx.strokeStyle = `black`

        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, 100, 0, Math.PI * 2)
        ctx.stroke()

        ctx.lineWidth = 1

        this.#notes = this.#notes.filter((note) => note - elapsed > -50)

        let isClicked = true
        let isMiss = false

        this.#notes.forEach((note) => {
            const radius = 100 + (note - elapsed) / 5

            ctx.beginPath()
            ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2)
            ctx.stroke()

            if (keyboard.pushed.has("ok")) {
                const onClicked = (score: number) => {
                    isClicked = false

                    this.#score += score
                    this.#itext.innerHTML = `Score: ${this.#score}`

                    note = -1

                    this.#sound.currentTime = 0
                    this.#sound.play()

                    new Ianimation(1000).start((progress) => {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0, 0, 0, ${1 - progress})`
                        ctx.arc(w / 2, h / 2, 100 + 200 * progress, 0, Math.PI * 2)
                        ctx.stroke()

                        ctx.font = "48px serif"
                        ctx.textAlign = "center"
                        ctx.fillStyle = `rgba(0, 0, 0, ${1 - progress})`

                        ctx.beginPath()
                        ctx.fillText(["GOOD", "GREAT", "PERFECT"][score - 1], w / 2, h / 2 - 100 - 100 * progress)
                    })
                }

                const diff = Math.abs(note - elapsed)

                // 100ms以内なら
                if (diff < 50) {
                    onClicked(3)
                } else if (diff < 75) {
                    onClicked(2)
                } else if (diff < 100) {
                    onClicked(1)
                } else {
                    isMiss = true
                }
            }
        })

        if (isClicked && isMiss) {
            this.#score--
            this.#itext.innerHTML = `Score: ${this.#score}`
        }

        if (this.#notes.length == 0) {
            clearInterval(this.#interval)

            if (this.#score >= this.#targetScore) {
                this.#end()
            } else {
                this.#miss()
            }
        }

        inputHandler.updateInput()
    }

    async #miss() {
        await fadeOut(1000)
        currentScene = new SceneMain(this.#targetScore, this.#originNotes)
    }

    async #end() {
        await fadeOut(1000)
        currentScene = new SceneNovel()
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
    }
}
