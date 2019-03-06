import BetterArguments from '@krisell/better-arguments'

const DOM = {
  /**
   * Creates a DOM-element with tag and class set in
   * the given options. This can easily be extended
   * for setting other attributes.
   */
  make (...specs) {
    let options = BetterArguments.build({
      specs,
      defaultOptions: { tag: 'div' },
      namedOptions: ['tag', 'class', 'content'],
    })

    /**
     * Create an element of the specified type.
     */
    let element = document.createElement(options.tag)

    /**
     * Add a the class string, if provided.
     */
    if (options.class) {
      element.className = options.class
    }

    if (options.content) {
      element.innerHTML = options.content
    }

    if (options.dataset) {
      for (let key in options.dataset) {
        element.dataset[key] = options.dataset[key]
      }
    }

    return element
  },

  clear (node) {
    node.innerHTML = ''
  },

  stripContext (node) {
    if (!node.parentElement) {
      return
    }

    node.outerHTML = node.innerHTML
  },

  /**
   * Helper-function to append an array of nodes to an
   * existing DOM-element.
   *
   * Children may be passed as an array or as a single element.
   */
  appendChildren (node, children) {
    if (!Array.isArray(children)) {
      children = [children]
    }

    children.forEach(child => node.appendChild(child))
  },

  /**
   * Sets the children of a given DOM element.
   *
   * Children may be passed as an array or as a single element.
   */
  setChildren (node, children) {
    node.innerHTML = ''
    DOM.appendChildren(node, children)
  },

  /**
   * Wraps the elements given as children in a container
   * element of the type specified in options (defaulting to div).
   *
   * Children may be passed as an array or as a single element.
   */
  wrapIn (options, children) {
    let parent = DOM.make(options)
    DOM.appendChildren(parent, children)
    return parent
  },

  /**
   * Loads a script dynamically and returns a promise which
   * resolves when the script has been loaded.
   */
  loadScript (src) {
    let script = document.createElement('script')

    return new Promise((resolve, reject) => {
      script.onload = function () {
        resolve()
      }

      script.onerror = function () {
        reject(new Error('Script load error'))
      }

      script.src = src
      document.body.appendChild(script)
    })
  },

  showAtPosition (element, position) {
    element.style.display = 'block'
    element.style.left = position.x + 'px'
    element.style.top = position.y + 'px'

    // Move box if it is outside the window
    setTimeout(() => {
      const missingHeight = position.y + element.offsetHeight + 20 - window.innerHeight
      const missingWidth = position.x + element.offsetWidth + 20 - window.innerWidth
      if (missingHeight > 0) {
        element.style.top = Math.max(position.y - missingHeight, 0) + 'px'
      }

      if (missingWidth > 0) {
        element.style.left = position.x - missingWidth + 'px'
      }
    }, 0)
  },

  hide (element) {
    element.style.display = 'none'
  }
}

export default DOM

