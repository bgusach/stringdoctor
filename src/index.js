export const asciiLowerCase = 'abcdefghijklmnopqrstuvwxyz'
export const asciiUpperCase = asciiLowerCase.toUpperCase()
export const asciiLetters = asciiLowerCase + asciiUpperCase
export const digits = '0123456789'
export const hexDigits = digits + 'abcdefABCDEF'
export const octDigits = '01234567'


/**
 *  Returns a copy of the string S with only its first character capitalized
 */
export function capitalize(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}


export function partition(str, sep) {
    return _executePartition(str, sep, str.indexOf(sep), [str, '', ''])
}


export function _executePartition(str, sep, pos, onNotFound) {
    if (pos === -1) {
        return onNotFound
    }

    const endOfSep = pos + sep.length

    return [str.slice(0, pos), str.slice(pos, endOfSep), str.slice(endOfSep)]
}

export function rightPartition(str, sep) {
    return _executePartition(str, sep, str.lastIndexOf(sep), ['', '', str])
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

    return repeat(fillchar, leftPadding) + str + repeat(fillchar, rightPadding)
}

    
export function repeat(str, count) {
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
export function count(str, sub, start = 0, end = str.length) {
    if (!sub.length) { 
        return sub === '' ? 1 : 0
    }

    let count = 0
    let next
    let currentPos = start

    for (;;) {
        next = str.indexOf(sub, currentPos)

        if (next === -1 || next >= end) {
            return count
        } 
            
        count++
        currentPos = next + 1
    }
}

export function join(strArray, delimiter = '') {
    if (!strArray.length) {
        return ''
    }

    let res = strArray[0]

    for (let i = 1; i < strArray.length; i++) {
        res += delimiter + strArray[i]
    }

    return res
}


export function endsWith(str, suffix, end = str.length) {

    const endPos = _normalizePosition(end, str.length)
    const suffixes = _isString(suffix) ? [suffix] : suffix

    let thisSuffix
    let startCheckPos

    for (let i = 0; i < suffixes.length; i++) {
        thisSuffix = suffixes[i]
        startCheckPos = endPos - thisSuffix.length
        
        if (_areStringsEqual({str1: str, start1: startCheckPos, end1: endPos, str2: thisSuffix})) {
            return true
        }
    }

    return false
}

export function startsWith(str, preffix, start = 0) {
    
}


export function contains(str, substr) {
    return str.indexOf(substr) !== -1
}


export function _areStringsEqual({str1, start1 = 0, end1 = str1.length, str2, start2 = 0, end2 = str2.length}) {
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


function _isString(obj) {
    return typeof obj === 'string'
}
