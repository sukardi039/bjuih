export function makeTextArray(jStr) {
  let data = JSON.parse(JSON.stringify(jStr))
  const t = {} // Use an object instead of an array

  data.forEach(({ page, mark, text }) => {
    if (!t[page]) t[page] = {} // Ensure each page key exists
    t[page][mark] = text
  })
  console.log('t', t)

  return t
}
