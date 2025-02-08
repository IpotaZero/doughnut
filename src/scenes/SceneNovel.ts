const SceneNovel = class {
    constructor() {
        this.#clearContainer()
        this.#loop()
    }

    async #loop() {
        const { value, done } = await storyIterator.next()

        if (value == "") return

        const itext = new Itext(container, value, {
            css: {
                bottom: "8%",
            },
        })

        await waitOK()

        if (!itext.isEnd) {
            itext.finish()
            await waitOK()
        }

        itext.remove()

        this.#loop()
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
    }
}

const story = async function* () {
    yield "キーワードは、つながりコスモロジー"

    await fadeOut(1000)
    currentScene = new SceneMain()
    yield ""

    yield "「なぜ僕たちが老いや病に苦しむか、知ってるかな?」"
    yield "「知らない」"
    yield "「仏陀によると、それは、僕たちが世界をバラバラなものだと思っているからだ」"
    yield "「そうなの」"
    yield "「重要なのは、本質を見ることだ」"

    await fadeOut(1000)
    currentScene = new SceneMain()
    yield ""

    return ""
}

const storyIterator = story()
