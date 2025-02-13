const Ianimation = class {
    duration: number
    stop: boolean
    isRunning: boolean
    promise: Promise<void>

    constructor(duration: number) {
        this.duration = duration
        this.reset()
    }

    reset() {
        this.stop = false
        this.isRunning = false
    }

    /**
     * アニメーションを開始し、これを返す
     * @param {Function} onUpdate 各フレームで実行されるコールバック関数
     * @returns {Ianimation} これ
     */
    start(onUpdate: (progress: number) => void) {
        if (this.isRunning) {
            return
        }

        this.isRunning = true
        const startTime = performance.now()

        this.promise = new Promise((resolve) => {
            const animate = (currentTime: number) => {
                if (this.stop) {
                    this.#handleStop(onUpdate, resolve)
                    return
                }

                const progress = this.#calculateProgress(currentTime - startTime)
                onUpdate(progress)

                if (progress < 1) {
                    requestAnimationFrame(animate)
                } else {
                    this.#complete(resolve)
                }
            }

            requestAnimationFrame(animate)
        })

        return this
    }

    /**
     * アニメーションを強制終了する
     */
    async stopAnimation() {
        this.stop = true
        await this.promise
    }

    /**
     * 経過時間から進捗率(0-1)を計算
     * @private
     */
    #calculateProgress(elapsedTime: number) {
        return Math.min(elapsedTime / this.duration, 1)
    }

    /**
     * 強制停止時の処理
     * @private
     */
    #handleStop(onUpdate: Function, resolve: Function) {
        this.isRunning = false
        onUpdate(1)
        resolve()
    }

    /**
     * アニメーション完了時の処理
     * @private
     */
    #complete(resolve: Function) {
        this.isRunning = false
        resolve()
    }
}
