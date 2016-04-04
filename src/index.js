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

    return _repeatString(fillchar, leftPadding) + str + _repeatString(fillchar, rightPadding)
}

    
export function _repeatString(str, count) {
    // Based on russian peasant multiplication technique
    let result = '' 
    let remainder = count
    let strBlock = str

    while (true) {
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


export function endsWith(str, suffix, end = str.length) {

    const endPos = _normalizePosition(end, str.length)
    const suffixes = _isString(suffix) ? [suffix] : suffix

    let thisSuffix
    let startCheckPos

    for (let i = 0; i < suffixes.length; i++) {
        thisSuffix = suffixes[i]
        startCheckPos = str.length - thisSuffix.length
        console.log(thisSuffix, startCheckPos, endPos)
        
        if (_areStringsEqual({str1: str, start1: startCheckPos, end1: endPos, str2: thisSuffix})) {
            return true
        }
    }

    return false
}


export function _areStringsEqual({str1, start1 = 0, end1 = str1.length, str2, start2 = 0, end2 = str2.length}) {
    // This function does work with negative offsets
    const length = end1 - start1

    if (length !== end2 - start2) {
        return false
    }

    for (let i = 0; i < length; i++) {
        if (str1.charAt(i + start1) !== str2.charAt(i + start2)) {
            return false
        }
    }

    return true
}



export function _normalizePosition(pos, len) {
    if (pos < 0) {
        return Math.max(0, len + pos) 
    }

    return Math.min(pos, len)
}

export function startsWith(str, prefix, start = 0, end = str.length) {

}

function _isString(obj) {
    return typeof obj === 'string'
}
