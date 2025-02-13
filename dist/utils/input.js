"use strict";
const InputHandler = class {
    container;
    cvsStyle;
    canInput;
    keyboard;
    focusState;
    constructor(container) {
        this.canInput = true;
        this.container = container;
        this.cvsStyle = getComputedStyle(container);
        // Keyboard state
        this.keyboard = {
            pressed: new Set(),
            longPressed: new Set(),
            pushed: new Set(),
            upped: new Set(),
            ctrlKey: false,
        };
        // Focus state
        this.focusState = {
            isFocused: true,
            justFocused: false,
            justBlurred: false,
        };
        this.#initializeEventListeners();
    }
    #initializeEventListeners() {
        // Keyboard events
        document.addEventListener("keydown", this.#handleKeyDown.bind(this));
        document.addEventListener("keyup", this.#handleKeyUp.bind(this));
        // Window focus events
        window.addEventListener("blur", this.#handleBlur.bind(this));
        window.addEventListener("focus", this.#handleFocus.bind(this));
    }
    #handleKeyDown(e) {
        if (!this.canInput)
            return;
        if (e.ctrlKey)
            keyboard.ctrlKey = true;
        if (!this.keyboard.pressed.has(e.code)) {
            this.keyboard.pushed.add(e.code);
            if (["KeyZ", "Enter", "Space"].includes(e.code)) {
                this.keyboard.pushed.add("ok");
            }
            if (["KeyX", "Escape", "Backspace"].includes(e.code)) {
                this.keyboard.pushed.add("cancel");
            }
            // console.log(keyboard.pushed)
        }
        this.keyboard.pressed.add(e.code);
        this.keyboard.longPressed.add(e.code);
    }
    #handleKeyUp(e) {
        if (!this.canInput)
            return;
        this.keyboard.pressed.delete(e.code);
        this.keyboard.upped.add(e.code);
    }
    #handleBlur() {
        console.log("よそ見するにゃ!");
        this.focusState.isFocused = false;
        this.focusState.justBlurred = true;
    }
    #handleFocus() {
        console.log("こっち見んにゃ!");
        this.focusState.isFocused = true;
        this.focusState.justFocused = true;
    }
    updateInput() {
        this.keyboard.longPressed.clear();
        this.keyboard.pushed.clear();
        this.keyboard.upped.clear();
        this.keyboard.ctrlKey = false;
        this.focusState.justFocused = false;
        this.focusState.justBlurred = false;
        if (!this.canInput) {
            this.keyboard.pressed.clear();
        }
    }
};
const inputHandler = new InputHandler(container);
const { keyboard, focusState } = inputHandler;
//# sourceMappingURL=input.js.map