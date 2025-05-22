export function makeText(jStr) {
  let data = JSON.parse(JSON.stringify(jStr))
  const result = data.reduce((acc, { id, page, mark, text }) => {
    if (!acc[page]) acc[page] = {} // Ensure the category exists
    acc[page][mark] = { text, id } // Store text and id in nested objects
    return acc
  }, {})

  return result
}
