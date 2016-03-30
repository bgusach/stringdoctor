import test from 'tape'
import * as sd from '../src'

test('capitalize', t => {
    const res = sd.capitalize('hello')
    const expected = 'Hello'
    t.equal(res, expected)

    t.end()
})

test('center', t => {
    t.equal(sd.center('hey', 5), ' hey ')
    t.equal(sd.center('hey', 5, '#'), '#hey#')

    t.end()
})
