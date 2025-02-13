"use strict";
class Iinput {
    #element;
    #handler;
    #type;
    #options;
    constructor(element, type, handler, options = false) {
        this.#element = element;
        this.#handler = handler;
        this.#type = type;
        this.#options = options;
        this.#element.addEventListener(this.#type, this.#handler, this.#options);
    }
    remove() {
        this.#element.removeEventListener(this.#type, this.#handler, this.#options);
    }
}
//# sourceMappingURL=Iinput.js.map