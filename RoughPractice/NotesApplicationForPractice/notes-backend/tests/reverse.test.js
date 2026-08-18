import  { test } from 'node:test'
import assert from 'node:assert'
import dummyTest from "../utils/for_testing.js"

test('reverse of a', () => {
  const result = dummyTest.reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result =dummyTest.reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = dummyTest.reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})
