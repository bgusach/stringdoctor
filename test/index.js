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

test('_stringView', t => {
    const create = sd._stringView.create.bind(sd._stringView)

    t.equal(create('hey there').toString(), 'hey there', 'Simple view works')
    t.equal(create('hey there', 4).toString(), 'there', 'Slicing view works')
    t.equal(create('hey there', 0, 3).toString(), 'hey', 'Slicing view works')
    t.equal(create('hey there', -5, -2).toString(), 'the', 'Slicing with negative index works')

    t.ok(create('hallo').equals('hallo'), 'Comparison to strings works')
    t.ok(create('hallo').equals(create('hallo')), 'Comparison to other views works')
    t.ok(create('hallo amigo', 0, 4).equals('hallo'), 'Comparison with slicing works')
    t.end()
})

test('endsWith', t => {
    t.ok(sd.endsWith('hola', 'la'), 'Simple endsWith case works')
    t.end()
})
