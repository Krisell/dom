'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _betterArguments = require('@krisell/better-arguments');

var _betterArguments2 = _interopRequireDefault(_betterArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadStates = {};

var DOM = {
  /**
   * Creates a DOM-element with tag and class set in
   * the given options. This can easily be extended
   * for setting other attributes.
   */
  make: function make() {
    for (var _len = arguments.length, specs = Array(_len), _key = 0; _key < _len; _key++) {
      specs[_key] = arguments[_key];
    }

    var options = _betterArguments2.default.build({
      specs: specs,
      defaultOptions: { tag: 'div' },
      namedOptions: ['tag', 'class', 'content']
    });

    /**
     * Create an element of the specified type.
     */
    var element = document.createElement(options.tag);

    /**
     * Add a the class string, if provided.
     */
    if (options.class) {
      element.className = options.class;
    }

    if (options.content) {
      element.innerHTML = options.content;
    }

    if (options.dataset) {
      for (var key in options.dataset) {
        element.dataset[key] = options.dataset[key];
      }
    }

    return element;
  },
  clear: function clear(node) {
    node.innerHTML = '';
  },
  stripContext: function stripContext(node) {
    if (!node.parentElement) {
      return;
    }

    node.outerHTML = node.innerHTML;
  },


  /**
   * Helper-function to append an array of nodes to an
   * existing DOM-element.
   *
   * Children may be passed as an array or as a single element.
   */
  appendChildren: function appendChildren(node, children) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach(function (child) {
      return node.appendChild(child);
    });
  },


  /**
   * Sets the children of a given DOM element.
   *
   * Children may be passed as an array or as a single element.
   */
  setChildren: function setChildren(node, children) {
    node.innerHTML = '';
    DOM.appendChildren(node, children);
  },


  /**
   * Wraps the elements given as children in a container
   * element of the type specified in options (defaulting to div).
   *
   * Children may be passed as an array or as a single element.
   */
  wrapIn: function wrapIn(options, children) {
    var parent = DOM.make(options);
    DOM.appendChildren(parent, children);
    return parent;
  },


  /**
   * Loads a script dynamically and returns a promise which
   * resolves when the script has been loaded.
   */
  loadScript: function loadScript(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var forceLoad = options.force === true;
    var skipLoad = loadStates[src] === 'pending' || loadStates[src] === 'success';

    if (skipLoad && !forceLoad) {
      return Promise.resolve();
    }

    loadStates[src] = 'pending';

    var script = document.createElement('script');

    return new Promise(function (resolve, reject) {
      script.onload = function () {
        loadStates[src] = 'success';
        resolve();
      };

      script.onerror = function () {
        loadStates[src] = 'error';
        reject(new Error('Script load error'));
      };

      script.src = src;
      document.body.appendChild(script);
    });
  },
  showAtPosition: function showAtPosition(element, position) {
    element.style.display = 'block';
    element.style.left = position.x + 'px';
    element.style.top = position.y + 'px';

    // Move box if it is outside the window
    setTimeout(function () {
      var missingHeight = position.y + element.offsetHeight + 20 - window.innerHeight;
      var missingWidth = position.x + element.offsetWidth + 20 - window.innerWidth;
      if (missingHeight > 0) {
        element.style.top = Math.max(position.y - missingHeight, 0) + 'px';
      }

      if (missingWidth > 0) {
        element.style.left = position.x - missingWidth + 'px';
      }
    }, 0);
  },
  hide: function hide(element) {
    element.style.display = 'none';
  }
};

exports.default = DOM;