;(function(jshp, undefined) {
  // Private members
  var doc = document;

  // Public methods
  jshp.get = function(selector) {
    var element = doc.querySelectorAll(selector);
    return element;
  };

  jshp.findChildren = function(parent, selector) {
    return parent.querySelectorAll(selector);
  };

  jshp.create = function(tag) {
    var element = doc.createElement(tag);
    return element;
  };

  jshp.append = function(element, target) {
    target.appendChild(element);
  };

  jshp.text = function(element, text) {
    var t = doc.createTextNode(text);
    jshp.append(t, element);
  };

  jshp.addClass = function(element, className) {
    element.classList.add(className);
  };

  jshp.empty = function(element) {
    element.innerHTML = '';
  };

  jshp.ready = function(fn) {
    if (doc.readyState != 'loading') {
      fn();
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  };

  jshp.ajax = function(options, handleSuccess, handleError) {
    var opt = {
      method: 'GET',
      async: true
    };

    if (!options.url) {
      throw Error('url option required !!!');
    }

    options = Object.assign({}, options, opt);

    var request = new XMLHttpRequest();
    request.open(options.method, options.url, options.async);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;
        if (typeof handleSuccess === 'function') {
          handleSuccess(resp);
        }
      } else {
        if (typeof handleError === 'function') {
          handleError(resp);
        }
      }
    }

    request.onerror = function(xxx) {
      console.log(xxx);
    };

    request.send();
  };

  function top() {
    var s = 'world';
    return function(name) {
      alert(name + s);
    }
  };

})(window.jshp = window.jshp || {});
