class Iinput {
    #element: HTMLElement | Document
    #handler: EventListener
    #type: string
    #options: AddEventListenerOptions | boolean

    constructor(
        element: HTMLElement | Document,
        type: string,
        handler: EventListener,
        options: AddEventListenerOptions | boolean = false
    ) {
        this.#element = element
        this.#handler = handler
        this.#type = type
        this.#options = options

        this.#element.addEventListener(this.#type, this.#handler, this.#options)
    }

    remove() {
        this.#element.removeEventListener(this.#type, this.#handler, this.#options)
    }
}
