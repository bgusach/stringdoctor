'use strict'

/**
 *  Returns a copy of the string S with only its first character capitalized
 */
exports.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.stringView(1)
}


/**
 * Returns string centered in a string of length width. Padding is done using the specified 
 * fill character (default is a space)
 */ 
exports.center = function (str, width, fillchar) {
    fillchar = fillchar || ' '
    var padding = width - str.length

    if (padding <= 0) { return str }

    var leftPadding = Math.floor(padding / 2) // Safe. Can't be negative
    var rightPadding = padding - leftPadding

    return _multiplyChar(fillchar, leftPadding) + str + _multiplyChar(fillchar, rightPadding)

}


function _multiplyChar(char, count) {
    // Use native, if possible
    if (char.repeat) { return char.repeat(count) }

    var str = ''

    // Ugly, but it seems to be the standard JS "join" method
    for (var i = 0; i < count; i++) {
        str += char
    }

    return str
}

/**
 * Returns the number of non-overlapping occurrences of substring sub in
 * string S[start:end].
 */
exports.count = function (str, sub, start, end) {
    if (sub.length === 0) { return str.length + 1 }

    start = _getDefault(start, 0)
    end = _getDefault(end, str.length - 1)

    var count = 0
    var pos

    for (var i = start; i <= end; i++) {
        pos = str.indexOf(sub, start)

	if (pos === -1 || pos >= end) { break } 
        
	count++
	start = pos + 1
    }

    return count
}

/**
 * Returns the default argument when the value argument is undefined
 */
function _getDefault(value, def, undefined) {
    return (value === undefined) ? def : value
}

exports.decode = function () { throw 'TODO' }
exports.encode = function () { throw 'TODO' }

exports.endswith = function (str, suffix, start, end) {
    var strView = StringView.__new__(str, start, end)
    var suffixes = _isString(suffix) ? [suffix] : suffix
    var suffix
    var subView

    for (var i = 0; i < suffixes.length; i++) {
        suffix = suffixes[i]
        subView = strView.getSubview(-suffix.length)

        if (subView.equals(suffix)) { return true } 
    }

    return false
}


/**
 * Prototype for python like memory view for strings. Useful to handle substrings in a memory efficient way
 */
var StringView = {
    equals: function (strViewOrStr) {
        var strView = _isString(strViewOrStr) ? StringView.__new__(strViewOrStr) : strViewOrStr
        

        if (this.width != strView.width) { return false } 

        for (var i = 0; i < strView.width; i++) {
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
    getSubview: function (start, end) {
        start = _getDefault(start, 0)
        end = _getDefault(end, 0)

        return StringView.__new__(this.str, this.start + start, this.end + end)
    },

    toString: function () {
        var str = ''
	for (var i = this.start; i < this.end; i++) {
            str += this.str.charAt(i)
	}
	return str
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
    __new__: function (str, start, end) {
        var stringView = Object.create(StringView)
        
        stringView.str = str
    
        start = _getDefault(start, 0)
        start = this._normalizeSlicePosition(start, str.length)
        stringView.start = start
    
        end = _getDefault(end, str.length)
        end = this._normalizeSlicePosition(end, str.length)
        stringView.end = end
    
        stringView.width = end - start
    
        return stringView
    }
}

exports.StringView = StringView

function _isString(obj) {
    return typeof obj === 'string'
}
