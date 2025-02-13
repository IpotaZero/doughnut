class SceneNovel {
    #voice = [new Audio("../assets/sounds/syariko.wav"), new Audio("../assets/sounds/me.wav")]

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
            voice: this.#voice[voiceNum],
        })

        await waitOK()

        if (!itext.isEnd) {
            itext.finish()
            await waitOK()
        }

        itext.remove()

        await sleep(10)

        this.#loop()
    }

    #clearContainer() {
        ;[...container.children].forEach((c) => c.remove())
        ;[...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove())
    }
}

let voiceNum = 1

const stories = [
    async function* (): AsyncGenerator<string, string, unknown> {
        // voiceNum = 0: シャリ子
        // voiceNum = 1: 僕
        yield "シャリ子と僕の対話"

        voiceNum = 1
        yield "「なぜ僕たちは生きることに苦しむか、知ってるかな?」"
        voiceNum = 0
        yield "「知らない」"
        voiceNum = 1
        yield "「仏陀によると、それは、僕たちが世界をバラバラなものだと思っているからだ」"
        voiceNum = 0
        yield "「そうなの、胡散臭いなあ」"
        voiceNum = 1
        yield "「重要なのは、本質を見ることだ」"

        await fadeOut(1000)
        currentScene = new SceneMain("assets/images/mug.png", 4, [
            [0, 0],
            [3, 3],
            [2, 1],
        ])
        storyIterator = stories[1]()
        return ""
    },
    async function* (): AsyncGenerator<string, string, unknown> {
        voiceNum = 1
        yield "「マグカップとドーナツは同相」"
        voiceNum = 0
        yield "「使い古されて臭くなった話」"
        voiceNum = 1
        yield "「でも、小学生にもわかるものさ」"
        yield "「君は君自身を特別な存在と思っているかもしれないけど、」"
        yield "「君も、僕も、宇宙のほんの一部なんだよ」"
        voiceNum = 0
        yield "「だから？」"

        await fadeOut(1000)
        currentScene = new SceneMain("assets/images/p-bottle.png", 4, [
            [0, 0],
            [3, 3],
            [2, 1],
            [3, 2],
        ])
        storyIterator = stories[2]()
        return ""
    },
    async function* () {
        voiceNum = 1
        yield "「ところで君はアドラー心理学を知っているかな？」"
        voiceNum = 0
        yield "「知らないけど」"
        voiceNum = 1
        yield "「人間は社会的存在であり、他者との『関係』を通じて自己を形成する」"
        yield "「これは仏教における『縁起』の考え方によく似ていると思わないかい？」"
        voiceNum = 0
        yield "「思わないけど」"

        await fadeOut(1000)
        currentScene = new SceneMain("assets/images/d-ring.png", 4, [
            [0, 0],
            [3, 3],
            [1, 2],
            [3, 2],
            [3, 1],
        ])
        storyIterator = stories[3]()
        return ""
    },
    async function* () {
        voiceNum = 1
        yield "「僕が言いたいのは、人間も宇宙の部分集合だってことさ」"
        voiceNum = 0
        yield "「なんで君はそんなに捻くれてしまったの」"
        voiceNum = 1
        yield "「少しずつ捩れて、何度か穴が開いて、元には戻らなくなったのさ」"
        voiceNum = 0
        yield "「哀れ」"
        yield "「君が言いたいことはそんなんじゃなかったでしょ」"

        await fadeOut(1000)
        currentScene = new SceneMain("assets/images/box.png", 4, [
            [0, 1],
            [3, 2],
            [3, 1],
            [2, 3],
            [0, 3],
            [0, 2],
        ])
        storyIterator = stories[4]()
        return ""
    },
    async function* () {
        yield "「君が言いたいことは、そんなんじゃない」"
        yield "「声にならない痛みを、難しい言葉で誤魔化して、笑っているんでしょう」"
        yield "「泣き出したい衝動を、虚空に向かって投げつけているんでしょう」"
        yield "「だから今、こうして蹲っているんでしょう？」"

        await fadeOut(1000)
        currentScene = new SceneMain("assets/images/doughnut.png", 4, [
            [3, 0],
            [3, 1],
            [0, 2],
            [1, 1],
            [1, 3],
            [3, 3],
            [0, 3],
        ])
        storyIterator = stories[5]()
        return ""
    },
    async function* () {
        voiceNum = 1
        yield "「僕は君を知っている」"
        yield "「今日はちょっと体調が悪かっただけ」"
        yield "「アドラーによると、明日も昨日も存在しないから、」"
        yield "「また、今日を精一杯生きようと思うよ」"
        yield "「Q.E.D. (証明終了)」"

        await fadeOut(1000)
        currentScene = new SceneTitle()
        return ""
    },
]

let storyIterator: AsyncGenerator<string, string, unknown> = stories[0]()
