import DOM from '../lib/index.js'

test('Can create DOM elements using primitive arguments', () => {
   let div = DOM.make('div', 'klass', 'innehåll')

   expect(div.outerHTML).toBe('<div class="klass">innehåll</div>')
})

test('Can create other node types', () => {
   let div = DOM.make('notUsed', 'klass', 'innehåll', { tag: 'a' })

   expect(div.outerHTML).toBe('<a class="klass">innehåll</a>')
})

test('Can attach data attributes other node types', () => {
   let div = DOM.make('span', { dataset: { a: 'a', b: 2 } })

   expect(div.outerHTML).toBe('<span data-a="a" data-b="2"></span>')
})

test('Can clear a node', () => {
   let div = DOM.make('div', { content: 'innehåll' })
   expect(div.outerHTML).toBe('<div>innehåll</div>')

   DOM.clear(div)

   expect(div.outerHTML).toBe('<div></div>')
})

test('Can add children', () => {
   let div = DOM.make('div')
   
   let child = DOM.make('a', 'klass', 'hej')

   DOM.appendChildren(div, child)

   expect(div.outerHTML).toBe('<div><a class="klass">hej</a></div>')
})
