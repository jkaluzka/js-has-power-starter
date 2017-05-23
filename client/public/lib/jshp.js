;(function(jshp, undefined) {
  // Private members
  var doc = document;

  // Public methods
  jshp.get = function(selector) {
    return doc.querySelectorAll(selector);
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

  jshp.removeClass = function(element, className) {
    element.classList.remove(className);
  };

  jshp.setAttr = function (element, attrName, attrValue) {
    element.setAttribute(attrName, attrValue);
  };

  jshp.getAttr = function (element, attrName) {
    return element.getAttribute(attrName);
  };

  jshp.attr = function(element, attrName, attrValue) {
    if (attrValue) {
      jshp.setAttr(element, attrName, attrValue);
    } else {
      return jshp.getAttr(element, attrName);
    }
  }

  jshp.toggleClass = function (element, classValue) {
    if (element.classList.contains(classValue)) {
      jshp.removeClass(element, classValue);
    } else {
      jshp.addClass(element, classValue);
    }
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

  // support for events
  jshp.on = function(element, event, callback) {
    element.addEventListener(event, callback);
  }

  jshp.off = function(element, eventName, eventHandler) {
    element.removeEventListener(eventName, eventHandler);
  }

  // support for ajax
  jshp.ajax = function(options, handleSuccess, handleError) {
    var opt = {
      async: true
    };

    if (!options.url) {
      throw Error('url option required !!!');
    }

    options = Object.assign({}, options, opt);

    var request = new XMLHttpRequest();
    request.onreadystatechange = handleData;
    request.open(options.method, options.url, options.async);
    if (options.method.toUpperCase() === 'POST') {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    request.send();

    function handleData() {
      if (request.readyState === XMLHttpRequest.DONE) {
        var data = request.responseText;
        if (request.status === 200) {
          if (typeof handleSuccess === 'function') {
            handleSuccess(data);
          }
        } else {
          if (typeof handleError === 'function') {
            handleError(data);
          }
        }
      }
    }

  };

  jshp.ajaxGet = function (options, handleSuccess, handleError) {
    var opts = Object.assign({}, options, {method: 'GET'});
    jshp.ajax(opts, handleSuccess, handleError);
  }

  jshp.ajaxPost = function (options, handleSuccess, handleError) {
    var opts = Object.assign({}, options, {method: 'POST'});
    jshp.ajax(opts, handleSuccess, handleError);
  }

  function top() {
    var s = 'world';
    return function(name) {
      alert(name + s);
    }
  }

})(window.jshp = window.jshp || {});
