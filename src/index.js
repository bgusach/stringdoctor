/**
 *  Returns a copy of the string S with only its first character capitalized
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}


/**
 * Returns string centered in a string of length width. Padding is done using the specified 
 * fill character (default is a space)
 */ 
export function center(str, width, fillchar = ' ') {
    if (fillchar.length !== 1) {
        throw new TypeError('fillchar must be char, not string')
    }

    const padding = width - str.length

    if (padding <= 0) { 
        return str 
    }

    const leftPadding = Math.floor(padding / 2) // Safe. Can't be negative
    const rightPadding = padding - leftPadding

    return repeatString(fillchar, leftPadding) + str + repeatString(fillchar, rightPadding)
}

    
function repeatString(str, count) {
    // Based on russian peasant multiplication technique
    let result = '' 
    let remainder = count
    let strBlock = str

    for (;;) {
        if (remainder & 1) {
            result += strBlock
        }

        if (!remainder) {
            return result
        }

        remainder >>>= 1

        strBlock += strBlock
    }
}

/**
 * Returns the number of non-overlapping occurrences of substring str[start:end].
 */
export function count(str, sub, start = 0, end = str.length - 1) {
    if (sub.length === 0) { 
        return str.length + 1 
    }

    let count = 0
    let next
    let currentPos = start

    for (let i = start; i <= end; i++) {
        next = str.indexOf(sub, currentPos)

        if (next === -1 || next >= end) {
            break 
        } 
            
        count++
        currentPos = next + 1
    }

    return count
}



export function endsWith(str, suffix, start = 0, end = str.length) {
    const strView = _stringView.create(str, start, end)
    const suffixes = _isString(suffix) ? [suffix] : suffix

    let thisSuffix
    let subView

    for (let i = 0; i < suffixes.length; i++) {
        thisSuffix = suffixes[i]
        subView = strView.createSubview(-thisSuffix.length)

        if (subView.equals(suffix)) { 
            return true 
        } 
    }

    return false
}

export function startsWith(str, prefix, start = 0, end = str.length) {

}




/**
 * Prototype for python like memory view for strings. Useful to handle substrings in a memory efficient way
 */
export const _stringView = {

    equals(other) {
        if (this.length != other.length) { 
            return false 
        } 

        const thisStart = this.start
        const otherStart = other.start || 0 // If other is just a string, start from beginning

        for (let i = 0; i < other.length; i++) {

            // console.log(this.charAt(thisStart + i) + '-----' + other.charAt(otherStart + i))
            if (this.charAt(thisStart + i) != other.charAt(otherStart + i)) { 
                return false 
            }
        }

        return true
    },

    /**
     * Returns a new view of the underlying string, optionally using new offsets, relative to the 
     * existing ones
     */ 
    createSubview(start = 0, end = this.length) {
        const absStart = this.start + this._normalizeSlicePosition(start, this.length)
        const absEnd = this.start + this._normalizeSlicePosition(end, this.length)

        return this.create(this.str, absStart, absEnd)
    },

    toString() {
        if (this.start === 0 && this.end === this.str.length) {
            return this.str
        }

        return this.str.slice(this.start, this.end)
    },

    valueOf() {
        return this.toString()
    },

    /**
     * Returns character at given position. It starts counting from beginning of view
     */
    charAt(pos) {
        return this.str.charAt(pos)
    },

    /**
     * Helper function to emulate python positions for enumerable slicings. Handles negative numbers and
     * takes care of indices out of bounds
     */
    _normalizeSlicePosition: function (pos, len) {
        if (pos < 0) {
            return Math.max(0, len + pos) 
        }

        if (pos === 0) {
            return 0
        }

        return Math.min(pos, len)
    },

    /**
     * Creates and initializes stringView objects
     */
    create(str, start = 0, end = str.length) {
        const stringView = Object.create(this)
        
        stringView.str = str

        stringView.start = this._normalizeSlicePosition(start, str.length)
        stringView.end = this._normalizeSlicePosition(end, str.length)
        stringView.length = end - start

        return stringView
    },
}


function _isString(obj) {
    return typeof obj === 'string'
}
