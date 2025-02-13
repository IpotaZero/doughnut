class Iinput {
    #element: HTMLElement | Document
    #handler: EventListener
    #type: string

    constructor(element: HTMLElement | Document, type: string, handler: EventListener) {
        this.#element = element
        this.#handler = handler
        this.#type = type

        this.#element.addEventListener(this.#type, this.#handler)
    }

    remove() {
        this.#element.removeEventListener(this.#type, this.#handler)
    }
}
