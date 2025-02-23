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
        resolve(undefined);
    }, {
        once: true,
    });
    const onKeydown = new Iinput(document, "keydown", (e) => {
        if (["Enter", "KeyZ", "Space"].includes(e.code)) {
            onClick.remove();
            resolve(undefined);
        }
    }, {
        once: true,
    });
});
// msミリ秒かけてフェードアウトする
const fade = (ms) => new Promise((resolve) => {
    container.style.transition = `opacity ${ms}ms`;
    container.style.opacity = "0";
    setTimeout(() => {
        container.style.opacity = "1";
        resolve(undefined);
    }, ms);
});
const fadeOut = (ms) => new Promise((resolve) => {
    container.style.transition = `opacity ${ms}ms`;
    container.style.opacity = "0";
    setTimeout(() => {
        resolve(undefined);
    }, ms);
});
const fadeIn = (ms) => new Promise((resolve) => {
    container.style.transition = `opacity ${ms}ms`;
    container.style.opacity = "1";
    setTimeout(() => {
        resolve(undefined);
    }, ms);
});
//# sourceMappingURL=awaits.js.map