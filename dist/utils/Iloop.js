"use strict";
const Iloop = (first, last, handler) => {
    //aをコピー
    const arr = [...first];
    while (arr.join() != last.join()) {
        handler(...arr);
        arr[arr.length - 1]++;
        for (let i = arr.length - 1; i != 0; i--) {
            if (arr[i] > last[i]) {
                arr[i] = first[i];
                arr[i - 1]++;
            }
        }
    }
    handler(...arr);
};
const IloopAsync = async (first, last, handler) => {
    //aをコピー
    const arr = [...first];
    while (arr.join() != last.join()) {
        await handler(...arr);
        arr[arr.length - 1]++;
        for (let i = arr.length - 1; i != 0; i--) {
            if (arr[i] > last[i]) {
                arr[i] = first[i];
                arr[i - 1]++;
            }
        }
    }
    await handler(...arr);
};
//# sourceMappingURL=Iloop.js.map