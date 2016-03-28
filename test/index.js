import test from 'tape'
import * as strdoc from '../src'

test('capitalize', t => {
    t.equal(strdoc.capitalize('hello'), 'Hello')

    t.end()
})
