"use strict";
class Iinput {
    #element;
    #handler;
    #type;
    constructor(element, type, handler) {
        this.#element = element;
        this.#handler = handler;
        this.#type = type;
        this.#element.addEventListener(this.#type, this.#handler);
    }
    remove() {
        this.#element.removeEventListener(this.#type, this.#handler);
    }
}
//# sourceMappingURL=Iinput.js.map