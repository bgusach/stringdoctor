/**
 *  Returns a copy of the string S with only its first character capitalized
 */
export function capitalize(str) {
    // TODO try to avoid slicing. Maybe a custom join function helps
    return str.charAt(0).toUpperCase() + str.slice(1)
}


/**
 * Returns string centered in a string of length width. Padding is done using the specified 
 * fill character (default is a space)
 */ 
export function center(str, width, fillchar = ' ') {
    const padding = width - str.length

    if (padding <= 0) { return str }

    const leftPadding = Math.floor(padding / 2) // Safe. Can't be negative
    const rightPadding = padding - leftPadding

    return _multiplyChar(fillchar, leftPadding) + str + _multiplyChar(fillchar, rightPadding)
}


function _multiplyChar(char, count) {
    // Use native, if possible
    if (char.repeat) { return char.repeat(count) }

    let str = ''

    // Ugly, but it seems to be the standard JS "join" method
    for (let i = 0; i < count; i++) {
        str += char
    }

    return str
}

/**
 * Returns the number of non-overlapping occurrences of substring str[start:end].
 */
export function count(str, sub, start = 0, end = str.length - 1) {
    if (sub.length === 0) { return str.length + 1 }

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



export function endswith(str, suffix, start, end) {
    const strView = StringView.__new__(str, start, end)
    const suffixes = _isString(suffix) ? [suffix] : suffix
    let thisSuffix
    let subView

    for (let i = 0; i < suffixes.length; i++) {
        thisSuffix = suffixes[i]
        subView = strView.getSubview(-thisSuffix.length)

        if (subView.equals(suffix)) { return true } 
    }

    return false
}


/**
 * Prototype for python like memory view for strings. Useful to handle substrings in a memory efficient way
 */
const StringView = {
    equals: function (strViewOrStr) {
        const strView = _isString(strViewOrStr) ? StringView.__new__(strViewOrStr) : strViewOrStr
        

        if (this.width != strView.width) { return false } 

        for (let i = 0; i < strView.width; i++) {
            if (this.charAt(this.start + i) != strView.charAt(strView.start + i)) { 
                return false 
            }
        }

        return true
    },

    /**
     * Returns a new view of the underlying string, optionally using new offsets, relative to the 
     * existing ones
     */ 
    getSubview: function (start = 0, end = 0) {
        // TODO: this.end + .... is wrong
        return StringView.__new__(this.str, this.start + start, this.end + end)
    },

    toString: function () {
        if (this.start === 0 && this.end === this.str.length) {
            return this.str
        }

        return this.str.slice(this.start, this.end)
    },

    /**
     * Returns character at given position. It starts counting from beginning of view
     */
    charAt: function (pos) {
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
    __new__: function (str, start = 0, end = str.length) {
        const stringView = Object.create(StringView)
        
        stringView.str = str
    
        stringView.start = this._normalizeSlicePosition(start, str.length)
        stringView.end = this._normalizeSlicePosition(end, str.length)
        stringView.width = end - start
    
        return stringView
    }
}

function _isString(obj) {
    return typeof obj === 'string'
}
