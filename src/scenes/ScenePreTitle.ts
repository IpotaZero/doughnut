class ScenePreTitle {
    constructor() {
        new Ielement(container, {
            css: {
                width: "100%",
                height: "100%",
                backgroundColor: "#111",
            },
        })

        new Itext(container, "Presented by<br>MCR", {
            css: {
                textAlign: "center",
                fontSize: "12vh",
                fontFamily: "dot",
                animation: "fadeIn 2s forwards",
                display: "inline",
                color: "white",
            },
            speed: 200,
        })

        this.#wait()
    }

    async #wait() {
        await waitOK()
        await fade(1000)
        currentScene = new SceneTitle()
    }
}
