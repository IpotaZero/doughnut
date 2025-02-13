"use strict";
// msミリ秒待つ
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
// クリック待ち
const waitOK = () => new Promise((resolve) => {
    const onClick = new Iinput(document, "click", () => {
        onKeydown.remove();
        onClick.remove();
        resolve(undefined);
    });
    const onKeydown = new Iinput(document, "keydown", (e) => {
        if (["Enter", "KeyZ", "Space"].includes(e.code)) {
            onKeydown.remove();
            onClick.remove();
            resolve(undefined);
        }
    });
});
// msミリ秒かけてフェードアウトする
const fadeOut = (ms) => new Promise((resolve) => {
    container.style.transition = `opacity ${ms}ms`;
    container.style.opacity = "0";
    container.addEventListener("transitionend", () => {
        container.style.opacity = "1";
        resolve(undefined);
    }, { once: true });
});
//# sourceMappingURL=awaits.js.map