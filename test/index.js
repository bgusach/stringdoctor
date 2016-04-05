import test from 'tape'
import * as sd from '../src'

test('capitalize', t => {
    const res = sd.capitalize('hello')
    const expected = 'Hello'
    t.equal(res, expected)

    t.end()
})

test('center', t => {
    t.equal(sd.center('hey', 5), ' hey ', 'Simmetric centering works')
    t.equal(sd.center('hey', 5, '#'), '#hey#', 'Passing filling char works')
    t.equal(sd.center('hey', 4), 'hey ', 'If padding with is not even, the right side has priority')
    t.throws(() => { sd.center('hey', 5, '###') }, 'Passing a fillchar longer than one char throws an exception')

    t.end()
})

test('_areStringsEqual', t => {
    t.ok(sd._areStringsEqual({str1: 'hello', str2: 'hello'}), 'Simple positive case')
    t.notOk(sd._areStringsEqual({str1: 'ello', str2: 'hell yeah'}), 'Simple negative case')
    t.ok(sd._areStringsEqual({str1: 'hello', str2: 'hell', end1: 4}), 'Offsets work')
    t.ok(sd._areStringsEqual({
        str1: 'indianapolis', 
        start1: 4,
        end1: 7,
        str2: 'santana, carlos', 
        start2: 4,
        end2: 7,
    }), 'Offset more complex case')
    t.end()
})

test('_normalizePosition', t => {
    const np = sd._normalizePosition
    t.equals(np(0, 10), 0, 'Value within bounds')
    t.equals(np(4, 10), 4, 'Value within bounds')
    t.equals(np(10, 10), 10, 'Value out of bounds')
    t.equals(np(15, 10), 10, 'Value out of bounds')
    t.equals(np(-1, 10), 9, 'Negative offset within bounds')
    t.equals(np(-10, 10), 0, 'Negative offset within bounds')
    t.end()
})

test('endsWith', t => {
    const ew = sd.endsWith

    t.ok(ew('hola', 'la'), 'Simple endsWith case works')
    t.notOk(ew('hola', 'xx'), 'Simple false case')
    t.ok(ew('hola', 'ho', 2), 'Passing string end')
    t.ok(ew('hola', 'ol', -1), 'Wrapping around works')
    t.end()
})
