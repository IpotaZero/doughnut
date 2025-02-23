"use strict";
class SceneNovel {
    #voice = [new Audio("assets/sounds/syariko.wav"), new Audio("assets/sounds/me.wav")];
    constructor() {
        this.#clearContainer();
        this.#setSoundVolume();
        this.#loop();
    }
    #setSoundVolume() {
        this.#voice[0].volume = 0.5;
        this.#voice[1].volume = 0.5;
    }
    async #loop() {
        const { value, done } = await storyIterator.next();
        if (value == "")
            return;
        const itext = new Itext(container, value, {
            css: {
                bottom: "8%",
            },
            voice: this.#voice[voiceNum],
            speed: 24,
        });
        await waitOK();
        if (!itext.isEnd) {
            itext.finish();
            await waitOK();
        }
        itext.remove();
        await sleep(10);
        this.#loop();
    }
    #clearContainer() {
        ;
        [...container.children].forEach((c) => c.remove());
        [...document.head.children].filter((c) => c.tagName == "STYLE").forEach((c) => c.remove());
    }
}
let voiceNum = 1;
const stories = [
    async function* () {
        // voiceNum = 0: シャリ子
        // voiceNum = 1: 僕
        yield "シャリ子と僕の対話";
        await fadeOut(1000);
        new Ianime(container, ["assets/images/pill0.png", "assets/images/pill1.png", "assets/images/pill2.png"], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        voiceNum = 1;
        yield "「なぜ僕たちは生きることに苦しむか、知ってるかな?」";
        voiceNum = 0;
        yield "「知らない」";
        voiceNum = 1;
        yield "「仏陀によると、それは、僕たちが世界をバラバラなものだと思っているからだ」";
        voiceNum = 0;
        yield "「そうなの、胡散臭いなあ」";
        voiceNum = 1;
        yield "「重要なのは、本質を見ることだ」";
        await fadeOut(1000);
        currentScene = new SceneMain("assets/images/mug.png", 4, [
            [0, 0],
            [3, 3],
            [2, 1],
        ]);
        storyIterator = stories[1]();
        return "";
    },
    async function* () {
        new Ianime(container, ["assets/images/tofu0.png", "assets/images/tofu1.png", "assets/images/tofu2.png"], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        voiceNum = 1;
        yield "「マグカップとドーナツは同相」";
        voiceNum = 0;
        yield "「使い古されて臭くなった話」";
        voiceNum = 1;
        yield "「でも、小学生にもわかるものさ」";
        yield "「君は君自身を特別な存在と思っているかもしれないけど、」";
        yield "「君も、僕も、宇宙のほんの一部なんだよ」";
        voiceNum = 0;
        yield "「だから？」";
        await fadeOut(1000);
        currentScene = new SceneMain("assets/images/p-bottle.png", 4, [
            [0, 0],
            [3, 3],
            [2, 1],
            [3, 2],
        ]);
        storyIterator = stories[2]();
        return "";
    },
    async function* () {
        new Ianime(container, [
            "assets/images/angel0.png",
            "assets/images/angel1.png",
            "assets/images/angel2.png",
            "assets/images/angel1.png",
        ], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        voiceNum = 1;
        yield "「ところで君はアドラー心理学を知っているかな？」";
        voiceNum = 0;
        yield "「知らないけど」";
        voiceNum = 1;
        yield "「人間は社会的存在であり、他者との『関係』を通じて自己を形成する」";
        yield "「これは仏教における『縁起』の考え方によく似ていると思わないかい？」";
        voiceNum = 0;
        yield "「思わないけど」";
        await fadeOut(1000);
        currentScene = new SceneMain("assets/images/d-ring.png", 4, [
            [0, 0],
            [3, 3],
            [1, 2],
            [3, 2],
            [3, 1],
        ]);
        storyIterator = stories[3]();
        return "";
    },
    async function* () {
        new Ianime(container, ["assets/images/heart0.png", "assets/images/heart1.png", "assets/images/heart2.png"], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        voiceNum = 1;
        yield "「僕が言いたいのは、人間も宇宙の部分集合だってことさ」";
        voiceNum = 0;
        yield "「なんで君はそんなに捻くれてしまったの」";
        voiceNum = 1;
        yield "「少しずつ捩れて、何度か穴が開いて、元には戻らなくなったのさ」";
        voiceNum = 0;
        yield "「哀れ」";
        yield "「君が言いたいことはそんなんじゃなかったでしょ」";
        await fadeOut(1000);
        currentScene = new SceneMain("assets/images/box.png", 4, [
            [0, 1],
            [3, 2],
            [3, 1],
            [2, 3],
            [0, 3],
            [0, 2],
        ]);
        storyIterator = stories[4]();
        return "";
    },
    async function* () {
        new Ianime(container, ["assets/images/knife0.png", "assets/images/knife1.png", "assets/images/knife2.png"], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        yield "「君が言いたいことは、そんなんじゃない」";
        yield "「声にならない痛みを、難しい言葉で誤魔化して、笑っているんでしょう」";
        yield "「泣き出したい衝動を、虚空に向かって投げつけているんでしょう」";
        yield "「だから今、こうして蹲っているんでしょう？」";
        await fadeOut(1000);
        currentScene = new SceneMain("assets/images/doughnut.png", 4, [
            [3, 0],
            [3, 1],
            [0, 2],
            [1, 1],
            [1, 3],
            [3, 3],
            [0, 3],
        ]);
        storyIterator = stories[5]();
        return "";
    },
    async function* () {
        new Ianime(container, ["assets/images/coffee0.png", "assets/images/coffee1.png", "assets/images/coffee2.png"], {
            css: {
                width: "100%",
                height: "100%",
                " .hide": {
                    display: "none",
                },
            },
        });
        voiceNum = 1;
        yield "「数年後の未来が怖くて息ができない」";
        yield "「動こうとしても足跡が僕の前で威嚇をする」";
        yield "「小学二年生は今でも僕の首を絞め続けている」";
        yield "「どうすればいいって言うんだ」";
        voiceNum = 0;
        yield "「何もできない自分が嫌で、継ぎ接ぎの知識で強がっているんだね」";
        yield "「アドラー曰く、昨日も明日も無いんじゃなかった？」";
        voiceNum = 1;
        yield "「そうだね、だからと言ってそのまま受け入れられるほど勇気があるわけじゃないんだ」";
        voiceNum = 0;
        yield "「......」";
        yield "「じゃあそのまま後悔を抱えて死んでしまえ！」";
        voiceNum = 1;
        yield "「死にたくないから生きているんだ！」";
        yield "「でもそんな生き方は良くない」";
        yield "「分かってるんだ」";
        yield "「最終的に決めるのは僕だから」";
        voiceNum = 0;
        yield "「どうするの」";
        voiceNum = 1;
        yield "「生きるために手を動かし続けるのさ」";
        await fadeOut(1000);
        currentScene = new SceneTitle();
        return "";
    },
];
let storyIterator = stories[0]();
//# sourceMappingURL=SceneNovel.js.map