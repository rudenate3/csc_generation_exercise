// recursively get children of a category
const getChildren = (categoryObject, parentId) => {
  if (parentId in categoryObject) {
    let parent = categoryObject[parentId]

    parent.map(({ id }) => {
      if (id in categoryObject) {
        const children = getChildren(categoryObject, id)

        parent = [...parent, ...children]
      }
    })

    return parent
  }
}

// Generates object with categories as keys and array of children as values
const formatCategoriesObject = (prev, curr) => {
  if (curr.parent_id === null) {
    prev['root'] = [...prev['root'], curr]
  } else {
    if (!(curr.parent_id in prev)) prev[curr.parent_id] = [curr]
    else prev[curr.parent_id] = [...prev[curr.parent_id], curr]
  }
  return prev
}

module.exports = function sortCategoriesForInsert(inputJson) {
  return getChildren(
    inputJson.reduce(formatCategoriesObject, {
      root: []
    }),
    'root'
  )
}
