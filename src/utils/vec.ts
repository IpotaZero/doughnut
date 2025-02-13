const vec = (x: number, y: number) => {
    return new Vec(x, y)
}

vec.arg = (theta: number) => vec(Math.cos(theta), Math.sin(theta))

class Vec {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    get l(): [number, number] {
        return [this.x, this.y]
    }

    set l(list: [number, number]) {
        ;[this.x, this.y] = list
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    add(v: Vec) {
        return vec(this.x + v.x, this.y + v.y)
    }

    sub(v: Vec) {
        return vec(this.x - v.x, this.y - v.y)
    }

    mlt(m: number) {
        return vec(this.x * m, this.y * m)
    }

    nor() {
        if (this.length() == 0) {
            return this
        } else {
            return vec(this.x / this.length(), this.y / this.length())
        }
    }

    rot(rad: number) {
        return vec(this.x * Math.cos(rad) - this.y * Math.sin(rad), this.x * Math.sin(rad) + this.y * Math.cos(rad))
    }

    dot(v: Vec) {
        return this.x * v.x + this.y * v.y
    }

    cross(v: Vec) {
        return this.x * v.y - v.x * this.y
    }

    arg() {
        return Math.atan2(this.y, this.x)
    }

    normal() {
        const n = this.nor()
        return vec(n.y, -n.x)
    }

    new() {
        return vec(this.x, this.y)
    }
}
