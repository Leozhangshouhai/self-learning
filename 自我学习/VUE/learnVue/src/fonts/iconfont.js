;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xingxing" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M484.932016 187.17396c14.722306-31.228235 38.818097-31.228235 53.538357 0l63.772442 135.237077c14.721283 31.225165 54.809303 61.039191 89.064478 66.246797l137.750317 20.945031c34.254152 5.206582 42.479487 29.66974 18.286482 54.360072l-101.8292 103.877859c-24.211425 24.692379-39.442314 72.752977-33.865295 106.795305l24.530696 149.630902c5.578042 34.048467-14.669094 48.249911-45.000913 31.556717l-124.33375-68.417229c-30.331819-16.685008-79.960123-16.685008-110.291942 0l-124.340913 68.417229c-30.324656 16.693194-50.582025 2.492774-44.99682-31.556717l24.51637-149.630902c5.585205-34.043351-9.655917-82.10395-33.858132-106.795305l-101.81078-103.875812c-24.202215-24.690332-15.97688-49.154513 18.283412-54.361095l137.747247-20.945031c34.260292-5.206582 74.340125-35.021631 89.062432-66.246797L484.932016 187.17396z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)