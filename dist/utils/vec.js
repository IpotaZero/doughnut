"use strict";
const vec = (x, y) => {
    return new Vec(x, y);
};
vec.arg = (theta) => vec(Math.cos(theta), Math.sin(theta));
class Vec {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get l() {
        return [this.x, this.y];
    }
    set l(list) {
        ;
        [this.x, this.y] = list;
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    add(v) {
        return vec(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return vec(this.x - v.x, this.y - v.y);
    }
    mlt(m) {
        return vec(this.x * m, this.y * m);
    }
    nor() {
        if (this.length() == 0) {
            return this;
        }
        else {
            return vec(this.x / this.length(), this.y / this.length());
        }
    }
    rot(rad) {
        return vec(this.x * Math.cos(rad) - this.y * Math.sin(rad), this.x * Math.sin(rad) + this.y * Math.cos(rad));
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - v.x * this.y;
    }
    arg() {
        return Math.atan2(this.y, this.x);
    }
    normal() {
        const n = this.nor();
        return vec(n.y, -n.x);
    }
    new() {
        return vec(this.x, this.y);
    }
}
//# sourceMappingURL=vec.js.map