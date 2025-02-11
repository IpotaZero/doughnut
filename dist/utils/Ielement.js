"use strict";
var _a;
class Ielement extends HTMLElement {
    static #idCount = 0;
    #styleElement = document.createElement("style");
    // キャメルケースをケバブケースに変換する関数
    #toKebabCase(str) {
        let s = str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        if (s.startsWith("webkit"))
            s = "-" + s;
        return s;
    }
    constructor(container, options = {}) {
        super();
        this.#setCSS(options.css);
        if (options.className)
            this.classList.add(options.className);
        container.appendChild(this);
    }
    #setCSS(css) {
        // ユニークなクラス名を生成
        const uniqueClass = `i-element-${_a.#idCount++}`;
        this.classList.add(uniqueClass);
        if (css) {
            let style = `.${uniqueClass} {\n`;
            style += this.#createStyleString(1, css);
            this.#styleElement.textContent = style + "}";
            document.head.appendChild(this.#styleElement);
        }
    }
    #createStyleString(depth, css) {
        let style = "";
        Object.entries(css).forEach(([property, value], i, list) => {
            if (typeof value == "string") {
                style += " ".repeat(4 * depth) + `${this.#toKebabCase(property)}: ${value};`;
                if (i != list.length - 1)
                    style += "\n";
                return;
            }
            style +=
                "\n" +
                    " ".repeat(4 * depth) +
                    `&${property} {\n${this.#createStyleString(depth + 1, value)}` +
                    "\t".repeat(depth) +
                    `}`;
        });
        return style + "\n";
    }
    remove() {
        super.remove();
        this.#styleElement.remove();
    }
}
_a = Ielement;
customElements.define("i-element", Ielement);
class Itext extends Ielement {
    #tempDiv = document.createElement("div");
    #interval = 0;
    #originalHTML;
    #voice = null;
    #frame = 0;
    isEnd = false;
    ready;
    constructor(container, text, options = {}) {
        super(container, options);
        this.#voice = options.voice ?? null;
        this.#setupText(text, options.speed ?? 24);
    }
    async #fetchHtmlFile(url) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            // HTTPステータスコードが正常（200-299）の場合
            if (response.ok) {
                return await response.text(); // 成功時、HTML内容を文字列として返す
            }
            else {
                throw new Error(`HTTP error! Status: ${response.status}`); // ステータスコードが正常でない場合のエラー
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return `Error: ${error.message}`; // エラーメッセージを文字列として返す
            }
            else {
                return `Unknown error occurred`; // 想定外のエラーの場合
            }
        }
    }
    async #setupText(text, speed) {
        if (text.endsWith(".html")) {
            this.innerHTML = "読み込み中...";
            text = await this.#fetchHtmlFile(text);
        }
        // 元のHTMLを保存
        this.#originalHTML = text.replace(/\s{2,}/g, " ").replace(/\n/g, "");
        this.#tempDiv.innerHTML = this.#originalHTML;
        // 表示用の要素を初期化
        this.innerHTML = this.#originalHTML;
        this.#processTextNodes(this);
        this.ready = new Promise((resolve) => {
            // アニメーション開始
            this.#interval = setInterval(() => {
                this.#updateText(resolve);
            }, 1000 / speed);
        });
    }
    // テキストノードを再帰的に処理
    #processTextNodes(element) {
        const childNodes = Array.from(element.childNodes);
        childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent?.trim();
                if (text) {
                    // テキストノードをspanで置き換え
                    const span = document.createElement("span");
                    span.setAttribute("data-original", text);
                    span.textContent = "";
                    node.parentNode?.replaceChild(span, node);
                }
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                // 要素ノードの場合は、その子要素も処理
                this.#processTextNodes(node);
                const elem = node;
                // ルビ要素の場合は特別な属性を設定
                if (elem.tagName.toLowerCase() === "rt") {
                    elem.querySelectorAll("span[data-original]").forEach((span) => {
                        span.setAttribute("data-ruby", "true");
                    });
                }
            }
        });
    }
    #updateText(resolve) {
        // ボイス再生
        if (this.#voice && this.#frame % 2 == 0) {
            this.#voice.currentTime = 0;
            this.#voice.play();
        }
        this.#frame++;
        const spans = Array.from(this.getElementsByTagName("span")).filter((span) => span.hasAttribute("data-original") &&
            span.textContent.length < span.getAttribute("data-original").length);
        if (spans.length === 0) {
            clearInterval(this.#interval);
            this.innerHTML = this.#originalHTML;
            this.isEnd = true;
            resolve();
            return;
        }
        // メインのテキストを取得（ルビ以外）
        const mainSpan = spans.find((span) => !span.hasAttribute("data-ruby"));
        if (mainSpan) {
            const originalText = mainSpan.getAttribute("data-original");
            const currentLength = mainSpan.textContent.length;
            mainSpan.textContent = originalText.substring(0, currentLength + 1);
            // ルビ元の文字が表示されたかチェック
            const rubyBase = mainSpan.closest("ruby");
            if (rubyBase) {
                const rt = rubyBase.querySelector("rt");
                if (rt && rt.querySelector("span[data-original]")) {
                    const rtSpan = rt.querySelector("span[data-original]");
                    const originalRuby = rtSpan.getAttribute("data-original");
                    rtSpan.textContent = originalRuby.substring(0, ((currentLength + 1) / originalText.length) * originalRuby.length);
                }
            }
        }
    }
    // アニメーションを即座に完了
    finish() {
        clearInterval(this.#interval);
        this.innerHTML = this.#originalHTML;
        this.isEnd = true;
        this.ready = Promise.resolve();
    }
    buttonize(tabIndex) {
        this.tabIndex = tabIndex;
        this.addEventListener("keydown", (e) => {
            if (e.code == "Enter")
                this.click();
        });
    }
}
customElements.define("i-text", Itext);
class Icommand extends Ielement {
    #handlerDict = new Idict({});
    #optionDict = new Idict({});
    #branch = "";
    #currentState = {
        optionList: undefined,
    };
    constructor(container, dict, options = {}) {
        super(container, options);
        this.#optionDict = dict;
        this.#setOptions();
    }
    async #setOptions() {
        this.#currentState.optionList = this.#optionDict.get(this.#branch);
        [...this.children].forEach((n) => {
            n.remove();
        });
        // 途中変更
        const currentBranch = this.#branch;
        if (!this.#currentState.optionList)
            return;
        for (const [i, option] of this.#currentState.optionList.entries()) {
            if (currentBranch != this.#branch)
                break;
            const itext = new Itext(this, option);
            itext.tabIndex = i + 1;
            itext.classList.add("i-command-option");
            itext.addEventListener("keydown", (e) => {
                if (["KeyZ", "Space", "Enter"].includes(e.code)) {
                    itext.click();
                }
            });
            itext.onclick = () => {
                this.#onClickOption(i);
            };
            await itext.ready;
        }
    }
    #onClickOption(i) {
        this.#branch += i;
        this.#setOptions();
        this.#handlerDict.get(this.#branch)?.(i);
    }
    cancel(depth) {
        for (let i = 0; i < depth; i++) {
            if (this.#branch == "")
                break;
            this.#branch = this.#branch.substring(0, -1);
        }
        this.#handlerDict.get(this.#branch)?.(+this.#branch.slice(-1));
        this.#setOptions();
    }
    on(regex, handler) {
        this.#handlerDict.dict[regex] = handler;
    }
}
customElements.define("i-command", Icommand);
class Iimage extends Ielement {
    constructor(container, src, options = {}) {
        super(container, options);
        const img = new Image();
        img.src = src;
        img.onload = () => {
            this.appendChild(img);
        };
        container.appendChild(this);
    }
}
customElements.define("i-image", Iimage);
//# sourceMappingURL=Ielement.js.map