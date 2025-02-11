"use strict";
// msミリ秒待つ
const sleep = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
// クリック待ち
const waitOK = () => new Promise((resolve) => {
    const onClick = () => {
        resolve(undefined);
        document.removeEventListener("keydown", onKeyDown);
    };
    const onKeyDown = (e) => {
        if (["Enter", "KeyZ", "Space"].includes(e.code)) {
            resolve(undefined);
            document.removeEventListener("click", onClick);
        }
    };
    document.addEventListener("click", onClick, { once: true });
    document.addEventListener("keydown", onKeyDown, { once: true });
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