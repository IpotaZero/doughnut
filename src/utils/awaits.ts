// msミリ秒待つ
const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })

// クリック待ち
const waitOK = () =>
    new Promise((resolve) => {
        document.addEventListener("click", resolve, { once: true })

        document.addEventListener(
            "keydown",
            (e) => {
                if (["Enter", "KeyZ", "Space"].includes(e.code)) {
                    resolve(undefined)
                }
            },
            { once: true }
        )
    })

// msミリ秒かけてフェードアウトする
const fadeOut = (ms: number) =>
    new Promise((resolve) => {
        container.style.transition = `opacity ${ms}ms`
        container.style.opacity = "0"

        container.addEventListener(
            "transitionend",
            () => {
                container.style.opacity = "1"
                resolve(undefined)
            },
            { once: true }
        )
    })
