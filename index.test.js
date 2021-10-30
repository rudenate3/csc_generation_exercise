const sortCategoriesForInsert = require('./index')

const inputJson = require('./input.json')
const outputJson = require('./output.json')

test('Sorts Categories for Insert', () => {
  expect(sortCategoriesForInsert(inputJson)).toEqual(outputJson)
})
