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

test('endsWith', t => {
    t.ok(sd.endsWith('hola', 'la'), 'Simple endsWith case works')
    t.notOk(sd.endsWith('hola', 'xx'), 'Simple false case')
    t.ok(sd.endsWith('hola', 'la', -3), 'Wrapping around works')
    t.notOk(sd.endsWith('hola', 'la', -1), 'Simple endsWith case works')
    t.end()
})
